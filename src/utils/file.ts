import { DragEvent } from 'react'
import { convertSwarmFile } from './SwarmFile'
import { isSupportedVideoType } from './video'
import { isSupportedImageType } from './image'

const indexHtmls = ['index.html', 'index.htm']

export function detectIndexHtml(files: SwarmFile[]): string | false {
  if (!files.length) {
    return false
  }

  const exactMatch = files.find(x => indexHtmls.includes(x.path))

  if (exactMatch) {
    return exactMatch.name
  }

  const prefix = files[0].path.split('/')[0] + '/'

  const allStartWithSamePrefix = files.every(x => x.path.startsWith(prefix))

  if (allStartWithSamePrefix) {
    const match = files.find(x => indexHtmls.map(y => prefix + y).includes(x.path))

    if (match) {
      return match.name
    }
  }

  return false
}

export function getMetadata(files: SwarmFile[]): Metadata {
  const size = files.reduce((total, item) => total + item.size, 0)
  const name = getAssetNameFromFiles(files)
  const type = files.length === 1 ? files[0].type : 'folder'
  const count = files.length
  const isWebsite = Boolean(detectIndexHtml(files))
  const isVideo = isSupportedVideoType(type)
  const isImage = isSupportedImageType(type)

  return { size, name, type, isWebsite, count, isVideo, isImage }
}

export function getAssetNameFromFiles(files: SwarmFile[]): string {
  if (files.length === 1) return files[0].name

  if (files.length > 0) {
    const prefix = files[0].path.split('/')[0]

    // Only if all files have a common prefix we can use it as a folder name
    if (files.every(f => f.path.split('/')[0] === prefix)) return prefix
  }

  return 'unknown'
}

/**
 * Directory Typeguard
 */
function isDirectory(entry: FileSystemEntry): entry is FileSystemDirectoryEntry {
  return entry.isDirectory
}

/**
 * File Typeguard
 */
function isFile(entry: FileSystemEntry): entry is FileSystemFileEntry {
  return entry.isFile
}

function readEntries(directoryReader: FileSystemDirectoryReader): Promise<FileSystemFileEntry[]> {
  return new Promise((resolve, reject) => {
    directoryReader.readEntries(async entries => {
      const files = []

      for (let i = 0; i < entries.length; i++) {
        const fls = await scanFiles(entries[i])
        files.push(...fls)
      }
      resolve(files)
    }, reject)
  })
}

/**
 * Promisified item.file function
 */
function fileEntry2File(item: FileSystemFileEntry): Promise<SwarmFile> {
  return new Promise((resolve, reject) => {
    item.file((file: File) => resolve(convertSwarmFile(file, item.fullPath)), reject)
  })
}

function scanFiles(item: FileSystemEntry): Promise<FileSystemFileEntry[]> {
  return new Promise(async (resolve, reject) => {
    if (isDirectory(item)) {
      const directoryReader = item.createReader()
      const files = await readEntries(directoryReader)
      resolve(files)
    } else if (isFile(item)) {
      resolve([item])
    } else reject('Not a file nor directory')
  })
}

export async function handleDrop(ev: DragEvent): Promise<SwarmFile[]> {
  const files: SwarmFile[] = []

  if (ev.dataTransfer.items) {
    const { items } = ev.dataTransfer
    const entries = []

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const entry = item.webkitGetAsEntry()

      if (entry) entries.push(...(await scanFiles(entry)))
    }

    // This is deliberately a separate loop because item.file() function mutates the dataTransferItems object
    for (let i = 0; i < entries.length; i++) {
      const f = await fileEntry2File(entries[i])
      files.push(f)
    }
  } else {
    // Use DataTransfer interface to access the file(s), this is a fallback as we can not handle directories here (even though this API is newer)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) files.push(convertSwarmFile(ev.dataTransfer.files[i]))
  }

  return files
}
