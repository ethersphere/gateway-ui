import { Bee, Data, Reference } from '@ethersphere/bee-js'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { createContext, ReactChild, ReactElement } from 'react'

import { BEE_HOSTS, META_FILE_NAME, POSTAGE_STAMP, PREVIEW_FILE_NAME } from '../constants'
import { detectIndexHtml } from '../utils/file'
import { ManifestJs } from '../utils/manifest'
import { packageFile } from '../utils/SwarmFile'

const randomIndex = Math.floor(Math.random() * BEE_HOSTS.length)
const randomBee = new Bee(BEE_HOSTS[randomIndex])

interface ContextInterface {
  upload: (files: SwarmFile[], metadata: Metadata, preview?: Blob) => Promise<Reference> | never
  getMetadata: (hash: Reference | string) => Promise<{
    metadata: Metadata
    preview?: string
    entries: Record<string, string>
  }>
  getChunk: (hash: Reference | string) => Promise<Data>
  getDownloadLink: (hash: Reference | string) => string
  download: (hash: Reference | string, entries: Record<string, string>, metadata?: Metadata) => Promise<void>
}

const initialValues: ContextInterface = {
  upload: () => Promise.reject(),
  getMetadata: () => Promise.reject(),
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
    const fls = files.map(packageFile) // Apart from packaging, this is needed to not modify the original files array as it can trigger effects
    let indexDocument = files.length === 1 ? files[0].name : detectIndexHtml(files) || undefined

    // TODO: Remove once this is fixed in bee-js https://github.com/ethersphere/bee-js/issues/531
    if (indexDocument) indexDocument = unescape(encodeURIComponent(indexDocument))
    const lastModified = files[0].lastModified

    // We want to store only some metadata
    const mtd: SwarmMetadata = {
      name: metadata.name,
      size: metadata.size,
    }

    // Type of the file only makes sense for a single file
    if (files.length === 1) mtd.type = metadata.type

    fls.push(
      new File([JSON.stringify(mtd)], META_FILE_NAME, {
        type: 'application/json',
        lastModified,
      }),
    )

    if (preview) {
      const previewFile = new File([preview], PREVIEW_FILE_NAME, {
        lastModified,
      })
      fls.push(previewFile)
    }

    const { reference } = await randomBee.uploadFiles(POSTAGE_STAMP, fls, { indexDocument })
    const hashIndex = hashToIndex(reference)

    if (hashIndex !== randomIndex) {
      const bee = new Bee(BEE_HOSTS[hashIndex])
      await bee.uploadFiles(POSTAGE_STAMP, fls, { indexDocument })
    }

    return reference
  }

  const download = async (hash: Reference | string, entries: Record<string, string>, metadata?: Metadata) => {
    const hashIndex = hashToIndex(hash)
    const bee = new Bee(BEE_HOSTS[hashIndex])

    if (Object.keys(entries).length <= 1) {
      window.open(getDownloadLink(hash), '_blank')
    } else {
      const zip = new JSZip()
      for (const [path, hash] of Object.entries(entries)) {
        zip.file(path, await bee.downloadData(hash))
      }
      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, metadata?.name + '.zip')
    }
  }

  const getMetadata = async (
    hash: Reference | string,
  ): Promise<{
    metadata: Metadata
    preview?: string
    entries: Record<string, string>
  }> => {
    let metadata: Metadata | undefined = { size: 0, type: 'unknown', name: hash, isWebsite: false }
    let entries: Record<string, string> = {}
    let preview

    const hashIndex = hashToIndex(hash)
    const bee = new Bee(BEE_HOSTS[hashIndex])

    try {
      const mtdt = await bee.downloadFile(hash, META_FILE_NAME)
      metadata = { ...metadata, ...(JSON.parse(mtdt.data.text()) as Metadata) }
    } catch (e) {} // eslint-disable-line no-empty

    try {
      const manifestJs = new ManifestJs(bee)
      const isManifest = await manifestJs.isManifest(hash)

      if (!isManifest) throw Error('The specified hash does not contain valid content.')
      entries = await manifestJs.getHashes(hash)

      const indexDocument = await manifestJs.getIndexDocumentPath(hash)

      metadata.isWebsite = Boolean(indexDocument && /.*\.html?$/i.test(indexDocument)) // only html documents can be websites

      preview = getPreview(entries, hash)

      // Erase the files added by the gateway
      delete entries[META_FILE_NAME]
      delete entries[PREVIEW_FILE_NAME]

      metadata.count = Object.keys(entries).length

      if (metadata.count > 1) metadata.type = 'folder'
    } catch (e) {} // eslint-disable-line no-empty

    metadata.hash = hash

    return { metadata, preview, entries }
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
    <Context.Provider value={{ getMetadata, upload, getChunk, getDownloadLink, download }}>{children}</Context.Provider>
  )
}
