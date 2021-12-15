import { createContext, ReactChild, ReactElement } from 'react'
import { Bee, Data, Reference } from '@ethersphere/bee-js'
import { ManifestJs } from '@ethersphere/manifest-js'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import { BEE_HOSTS, META_FILE_NAME, POSTAGE_STAMP, PREVIEW_FILE_NAME } from '../constants'
import { convertSwarmFile } from '../utils/SwarmFile'
import { detectIndexHtml, convertManifestToFiles } from '../utils/file'

const randomIndex = Math.floor(Math.random() * BEE_HOSTS.length)
const randomBee = new Bee(BEE_HOSTS[randomIndex])

interface ContextInterface {
  upload: (files: SwarmFile[], metadata: Metadata, preview?: Blob) => Promise<Reference>
  getMetadata: (
    hash: Reference | string,
  ) => Promise<{ entries: Record<string, string>; files: SwarmFile[]; indexDocument: string | null }>
  getPreview: (entries: Record<string, string>, hash: Reference | string) => string | undefined
  getChunk: (hash: Reference | string) => Promise<Data>
  getDownloadLink: (hash: Reference | string) => string
  download: (hash: Reference | string, entries: Record<string, string>) => Promise<void>
}

const initialValues: ContextInterface = {
  upload: () => Promise.reject(),
  getMetadata: () => Promise.reject(),
  getPreview: () => undefined,
  getChunk: () => Promise.reject(),
  getDownloadLink: () => '',
  download: () => Promise.resolve(),
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
  const upload = async (files: SwarmFile[], metadata: Metadata, preview?: Blob) => {
    const indexDocument = files.length === 1 ? files[0].name : detectIndexHtml(files) || undefined

    const lastModified = files[0].lastModified

    // We want to store only some metadata
    const mtd: SwarmMetadata = {
      name: metadata.name,
      size: metadata.size,
    }

    if (files.length > 1) mtd.type = metadata.type

    files.push(
      convertSwarmFile(
        new File([JSON.stringify(mtd)], META_FILE_NAME, {
          type: 'application/json',
          lastModified,
        }),
      ),
    )

    if (preview) {
      const previewFile = new File([preview], PREVIEW_FILE_NAME, {
        lastModified,
      })
      files.push(convertSwarmFile(previewFile))
    }

    const { reference } = await randomBee.uploadFiles(POSTAGE_STAMP, files, { indexDocument })
    const hashIndex = hashToIndex(reference)

    if (hashIndex !== randomIndex) {
      const bee = new Bee(BEE_HOSTS[hashIndex])
      await bee.uploadFiles(POSTAGE_STAMP, files, { indexDocument })
    }

    return reference
  }

  const download = async (hash: Reference | string, entries: Record<string, string>) => {
    const hashIndex = hashToIndex(hash)
    const bee = new Bee(BEE_HOSTS[hashIndex])

    if (Object.keys(entries).length === 1) {
      window.open(getDownloadLink(hash), '_blank')
    } else {
      const zip = new JSZip()
      for (const [path, hash] of Object.entries(entries)) {
        zip.file(path, await bee.downloadData(hash))
      }
      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, hash + '.zip')
    }
  }

  const getMetadata = async (
    hash: Reference | string,
  ): Promise<{ entries: Record<string, string>; files: SwarmFile[]; indexDocument: string | null }> => {
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

      return { entries, files: convertManifestToFiles(entries), indexDocument }
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

  const getPreview = (entries: Record<string, string>, hash: Reference | string): string | undefined => {
    if (!entries[PREVIEW_FILE_NAME]) return

    const hashIndex = hashToIndex(hash)

    return `${BEE_HOSTS[hashIndex]}/bzz/${hash}/${PREVIEW_FILE_NAME}`
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
    <Context.Provider value={{ getMetadata, upload, getPreview, getChunk, getDownloadLink, download }}>
      {children}
    </Context.Provider>
  )
}
