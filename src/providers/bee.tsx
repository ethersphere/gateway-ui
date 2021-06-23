import { createContext, ReactChild, ReactElement, useEffect, useState } from 'react'
import { Bee, Data, FileData, Reference } from '@ethersphere/bee-js'
import {
  UPLOAD_HOSTS,
  META_FILE_NAME,
  POSTAGE_STAMP,
  DOWNLOAD_HOST,
  PREVIEW_FILE_NAME,
  DOWNLOAD_HOSTS,
} from '../constants'

const randomHost = UPLOAD_HOSTS[Math.floor(Math.random() * UPLOAD_HOSTS.length)]
const bee = new Bee(randomHost)
const beeGateway = new Bee(DOWNLOAD_HOST)
const downloadBees = DOWNLOAD_HOSTS.map(host => new Bee(host))

interface ContextInterface {
  isConnected: boolean
  upload: (file: File, preview?: Blob) => Promise<Reference>
  getMetadata: (hash: Reference | string) => Promise<Metadata | undefined>
  getPreview: (hash: Reference | string) => Promise<FileData<Data>>
  getChunk: (hash: Reference | string) => Promise<Data>
}

const initialValues: ContextInterface = {
  isConnected: false,
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

  if (!result) {
    throw new Error('race failed')
  }

  return result
}

function tryDownloadFileFromAll(hash: Reference | string, path?: string) {
  const bees = downloadBees
  const actions = bees.map(bee => bee.downloadFile(hash, path))

  return race(actions)
}

function tryDownloadDataFromAll(hash: Reference | string) {
  const bees = downloadBees
  const actions = bees.map(bee => bee.downloadData(hash))

  return race(actions)
}

export function Provider({ children }: Props): ReactElement {
  const [isConnected, setIsConnected] = useState<boolean>(false)

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

    return bee.uploadFiles(POSTAGE_STAMP, files, { indexDocument: metadata.name })
  }

  const getMetadata = async (hash: Reference | string): Promise<Metadata | undefined> => {
    try {
      const metadata = await tryDownloadFileFromAll(hash, META_FILE_NAME)

      return JSON.parse(metadata.data.text()) as Metadata
    } catch (e) {
      throw e
    }
  }

  const getPreview = (hash: Reference | string): Promise<FileData<Data>> =>
    tryDownloadFileFromAll(hash, PREVIEW_FILE_NAME)

  const getChunk = (hash: Reference | string): Promise<Data> => tryDownloadDataFromAll(hash)

  useEffect(() => {
    bee.isConnected().then(setIsConnected)
  }, [])

  return (
    <Context.Provider value={{ getMetadata, isConnected, upload, getPreview, getChunk }}>{children}</Context.Provider>
  )
}
