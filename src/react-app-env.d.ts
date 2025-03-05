/// <reference types="react-scripts" />

interface SwarmMetadata {
  size?: number
  name: string
  type?: string
}

interface Metadata extends SwarmMetadata {
  type: string
  count?: number
  hash?: string
  isWebsite?: boolean
  isVideo?: boolean
  isImage?: boolean
}

type FilePath = File & { path?: string; fullPath?: string }

interface SwarmFile extends File {
  path: string
}
