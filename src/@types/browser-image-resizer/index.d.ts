declare module 'browser-image-resizer' {
  interface Config {
    quality: number
    maxWidth: number
    maxHeight: number
    autoRotate: boolean
    debug: boolean
    mimeType: 'image/jpeg' | 'image/png'
  }

  export function readAndCompressImage(file: File, userConfig?: Partial<Config>): Promise<Blob>
}
