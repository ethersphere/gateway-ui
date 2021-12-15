import { DragEvent } from 'react'
import { convertSwarmFile } from './SwarmFile'

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
  const isWebsite = Boolean(detectIndexHtml(files))
  const name = getAssetNameFromFiles(files)
  const type = files.length === 1 ? files[0].type : 'folder'
  const count = files.length

  return { size, name, type, isWebsite, count }
}

export function getAssetNameFromFiles(files: SwarmFile[]): string {
  if (files.length === 1) return files[0].name

  if (files.length > 0) return files[0].path.split('/')[0]

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

function readEntryContentAsync(entry: FileSystemEntry) {
  return new Promise<File[]>(resolve => {
    let reading = 0
    const contents: SwarmFile[] = []

    readEntry(entry)

    function readEntry(entry: FileSystemEntry) {
      // This is a file, load it
      if (isFile(entry)) {
        reading++
        entry.file(file => {
          reading--
          contents.push(convertSwarmFile(file, entry.fullPath))

          if (reading === 0) resolve(contents)
        })
      }

      // This is a directory, recursively process it's content
      else if (isDirectory(entry)) {
        reading++
        const reader = entry.createReader()

        reader.readEntries(entries => {
          reading--
          for (const entry of entries) readEntry(entry)

          if (reading === 0) {
            resolve(contents)
          }
        })
      }
    }
  })
}

async function processItem(item: DataTransferItem, files: SwarmFile[]) {
  // This is file or directory
  if (item.kind === 'file') {
    if (typeof item.webkitGetAsEntry === 'function') {
      const entry = item.webkitGetAsEntry()

      if (entry) {
        const entryContent = await readEntryContentAsync(entry)
        files.push(...entryContent.map(f => convertSwarmFile(f)))
      }
    } else {
      const file = item.getAsFile()

      if (file) files.push(convertSwarmFile(file))
    }
  }
}

export async function handleDrop(ev: DragEvent): Promise<SwarmFile[]> {
  const files: SwarmFile[] = []

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s) and directories
    for (let i = 0; i < ev.dataTransfer.items.length; i++) await processItem(ev.dataTransfer.items[i], files)
  } else {
    // Use DataTransfer interface to access the file(s), this is a fallback as we can not handle directories here (even though this API is newer)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) files.push(convertSwarmFile(ev.dataTransfer.files[i]))
  }

  return files
}
