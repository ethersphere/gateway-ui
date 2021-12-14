import { createContext, ReactChild, ReactElement } from 'react'
import { Bee, Data, FileData, Reference } from '@ethersphere/bee-js'
import { BEE_HOSTS, META_FILE_NAME, POSTAGE_STAMP, PREVIEW_FILE_NAME } from '../constants'
import { SwarmFile } from '../utils/SwarmFile'
import { detectIndexHtml, convertManifestToFiles } from '../utils/file'
import { ManifestJs } from '@ethersphere/manifest-js'

const randomIndex = Math.floor(Math.random() * BEE_HOSTS.length)
const randomBee = new Bee(BEE_HOSTS[randomIndex])

interface ContextInterface {
  upload: (files: SwarmFile[], preview?: Blob) => Promise<Reference>
  getMetadata: (hash: Reference | string) => Promise<{ files: SwarmFile[]; indexDocument: string | null }>
  getPreview: (hash: Reference | string) => Promise<FileData<Data>>
  getChunk: (hash: Reference | string) => Promise<Data>
  getDownloadLink: (hash: Reference | string) => string
}

const initialValues: ContextInterface = {
  upload: () => Promise.reject(),
  getMetadata: () => Promise.reject(),
  getPreview: () => Promise.reject(),
  getChunk: () => Promise.reject(),
  getDownloadLink: () => '',
}

export const Context = createContext<ContextInterface>(initialValues)
export const Consumer = Context.Consumer

interface Props {
  children: ReactChild
}

function hashToIndex(hash: Reference | string) {
  const n = parseInt(hash.slice(0, 8), 16)

  return n % BEE_HOSTS.length
}

export function Provider({ children }: Props): ReactElement {
  const upload = async (files: SwarmFile[], preview?: Blob) => {
    const indexDocument = files.length === 1 ? files[0].name : detectIndexHtml(files) || undefined
    // const lastModified = file.lastModified

    // const metadata = {
    //   name: file.name,
    //   type: file.type,
    //   size: file.size,
    // }
    //
    // const metafile = new File([JSON.stringify(metadata)], META_FILE_NAME, {
    //   type: 'application/json',
    //   lastModified,
    // })
    //
    // const files = [file, metafile]

    // if (preview) {
    //   const previewFile = new File([preview], PREVIEW_FILE_NAME, {
    //     lastModified,
    //   })
    //   files.push(previewFile)
    // }

    const { reference } = await randomBee.uploadFiles(POSTAGE_STAMP, files, { indexDocument })
    const hashIndex = hashToIndex(reference)

    if (hashIndex !== randomIndex) {
      const bee = new Bee(BEE_HOSTS[hashIndex])
      await bee.uploadFiles(POSTAGE_STAMP, files, { indexDocument })
    }

    return reference
  }

  const getMetadata = async (
    hash: Reference | string,
  ): Promise<{ files: SwarmFile[]; indexDocument: string | null }> => {
    try {
      const hashIndex = hashToIndex(hash)
      const bee = new Bee(BEE_HOSTS[hashIndex])

      const manifestJs = new ManifestJs(bee)
      const isManifest = await manifestJs.isManifest(hash)

      if (!isManifest) {
        throw Error('The specified hash does not contain valid content.')
      }
      const entries = await manifestJs.getHashes(hash)
      const indexDocument = await manifestJs.getIndexDocumentPath(hash)

      return { files: convertManifestToFiles(entries), indexDocument }
    } catch (e) {
      let message = typeof e === 'object' && e !== null && Reflect.get(e, 'message')

      if (message.includes('path address not found')) {
        message = 'The specified hash does not have an index document set.'
      }

      if (message.includes('Not Found: Not Found')) {
        message = 'The specified hash was not found.'
      }
      throw new Error(message)
    }
  }

  const getPreview = (hash: Reference | string): Promise<FileData<Data>> => {
    const hashIndex = hashToIndex(hash)
    const bee = new Bee(BEE_HOSTS[hashIndex])

    return bee.downloadFile(hash, PREVIEW_FILE_NAME)
  }

  const getChunk = (hash: Reference | string): Promise<Data> => {
    const hashIndex = hashToIndex(hash)
    const bee = new Bee(BEE_HOSTS[hashIndex])

    return bee.downloadData(hash)
  }

  const getDownloadLink = (hash: Reference | string) => {
    const hashIndex = hashToIndex(hash)

    return `${BEE_HOSTS[hashIndex]}/bzz/${hash}`
  }

  return (
    <Context.Provider value={{ getMetadata, upload, getPreview, getChunk, getDownloadLink }}>
      {children}
    </Context.Provider>
  )
}
