/// <reference types="react-scripts" />

interface Metadata {
  path?: string
  size: number
  type: string
  name: string
}

// Is not the full list that you can operate with
interface AxiosProgressEvent {
  total: number
  loaded: number
}

type FilePath = File & { path?: string }
