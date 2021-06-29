import { createContext, ReactChild, ReactElement } from 'react'
import { Bee, Data, FileData, Reference } from '@ethersphere/bee-js'
import { BEE_HOSTS, META_FILE_NAME, POSTAGE_STAMP, PREVIEW_FILE_NAME } from '../constants'

const MAX_TRIES = 1
const bees = BEE_HOSTS.map(host => new Bee(host))
const randomBee = bees[Math.floor(Math.random() * bees.length)]

interface ContextInterface {
  upload: (file: File, preview?: Blob) => Promise<Reference>
  getMetadata: (hash: Reference | string) => Promise<Metadata | undefined>
  getPreview: (hash: Reference | string) => Promise<FileData<Data>>
  getChunk: (hash: Reference | string) => Promise<Data>
}

const initialValues: ContextInterface = {
  upload: () => Promise.reject(),
  getMetadata: () => Promise.reject(),
  getPreview: () => Promise.reject(),
  getChunk: () => Promise.reject(),
}

export const Context = createContext<ContextInterface>(initialValues)
export const Consumer = Context.Consumer

interface Props {
  children: ReactChild
}

/**
 * Sleep for N miliseconds
 *
 * @param ms Number of miliseconds to sleep
 */
function sleep(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => resolve(), ms))
}

interface WithBee {
  bee: Bee
}

type Action<T extends WithBee> = () => Promise<T>

async function race<T extends WithBee>(actions: Action<T>[], options?: { maxTries?: number }): Promise<T> {
  let canceled = false
  const safeAction = async (action: Action<T>) => {
    let numTries = 0
    while (!canceled) {
      if (typeof options?.maxTries === 'number' && numTries >= options.maxTries) {
        return
      }
      try {
        numTries++
        const result = await action()
        canceled = true

        return result
      } catch (e) {
        if (canceled) {
          return
        }
        await sleep(Math.random() * 20 * 1000)
      }
    }
  }

  const result = await Promise.race(actions.map(safeAction))

  if (!result) throw new Error('race failed')

  return result
}

async function downloadFile(bee: Bee, hash: Reference | string, path?: string) {
  const response = await bee.downloadFile(hash, path)

  return {
    ...response,
    bee,
  }
}

function tryDownloadFileFromAll(hash: Reference | string, path?: string) {
  const actions = bees.map(bee => () => downloadFile(bee, hash, path))

  return race(actions, { maxTries: MAX_TRIES })
}

async function downloadData(bee: Bee, hash: Reference | string) {
  const response = await bee.downloadData(hash)

  return {
    ...response,
    bee,
  }
}

function tryDownloadDataFromAll(hash: Reference | string) {
  const actions = bees.map(bee => () => downloadData(bee, hash))

  return race(actions, { maxTries: MAX_TRIES })
}

export function Provider({ children }: Props): ReactElement {
  const upload = (file: File, preview?: Blob) => {
    const metadata = {
      name: file.name,
      type: file.type,
      size: file.size,
    }

    const metafile = new File([JSON.stringify(metadata)], META_FILE_NAME, {
      type: 'application/json',
    })

    const files = [file, metafile]

    if (preview) files.push(new File([preview], PREVIEW_FILE_NAME))

    return randomBee.uploadFiles(POSTAGE_STAMP, files, { indexDocument: metadata.name })
  }

  const getMetadata = async (hash: Reference | string): Promise<Metadata | undefined> => {
    try {
      const metadata = await tryDownloadFileFromAll(hash, META_FILE_NAME)

      return metadata.data.json() as unknown as Metadata
    } catch (e) {
      throw e
    }
  }

  const getPreview = (hash: Reference | string): Promise<FileData<Data>> =>
    tryDownloadFileFromAll(hash, PREVIEW_FILE_NAME)

  const getChunk = (hash: Reference | string): Promise<Data> => tryDownloadDataFromAll(hash)

  return <Context.Provider value={{ getMetadata, upload, getPreview, getChunk }}>{children}</Context.Provider>
}
