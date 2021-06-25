import { createContext, ReactChild, ReactElement } from 'react'
import { Bee, Data, FileData, Reference } from '@ethersphere/bee-js'
import { BEE_HOSTS, META_FILE_NAME, POSTAGE_STAMP, PREVIEW_FILE_NAME } from '../constants'

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

async function race<T>(promises: Promise<T>[]): Promise<T> {
  let canceled = false
  const safePromise = async (promise: Promise<T>) => {
    while (!canceled) {
      try {
        const result = await promise
        canceled = true

        return result
      } catch (e) {
        await sleep(Math.random() * 10 * 1000)
      }
    }
  }

  const result = await Promise.race(promises.map(safePromise))

  if (!result) throw new Error('race failed')

  return result
}

function tryDownloadFileFromAll(hash: Reference | string, path?: string) {
  const actions = bees.map(bee => bee.downloadFile(hash, path))

  return race(actions)
}

function tryDownloadDataFromAll(hash: Reference | string) {
  const actions = bees.map(bee => bee.downloadData(hash))

  return race(actions)
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
