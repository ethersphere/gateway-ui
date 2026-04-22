import { Reference } from '@ethersphere/bee-js'

export const BEE_HOSTS: string[] = import.meta.env.VITE_BEE_HOSTS?.split(',') || ['http://localhost:1633']
export const POSTAGE_STAMP = new Reference(
  import.meta.env.VITE_POSTAGE_STAMP || '0000000000000000000000000000000000000000000000000000000000000000',
)

export const META_FILE_NAME = 'metadata'
export const PREVIEW_DIMENSIONS = { maxWidth: 250, maxHeight: 175 }

const url = window.location.origin

export const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || url
export const DIRECT_DOWNLOAD_URL = import.meta.env.VITE_DIRECT_DOWNLOAD_URL || 'https://api.gateway.ethswarm.org/bzz/'
export const BZZ_LINK_DOMAIN = import.meta.env.VITE_BZZ_LINK_DOMAIN || 'bzz.link'
export const UPLOAD_SIZE_LIMIT = 10000000
