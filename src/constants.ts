import { Reference } from '@ethersphere/bee-js'

export const BEE_HOSTS: string[] = process.env.REACT_APP_BEE_HOSTS?.split(',') || ['http://localhost:1633']
export const POSTAGE_STAMP =
  (process.env.REACT_APP_POSTAGE_STAMP as Reference | undefined) ||
  ('0000000000000000000000000000000000000000000000000000000000000000' as Reference)

export const META_FILE_NAME = 'metadata'
export const PREVIEW_DIMENSIONS = { maxWidth: 250, maxHeight: 175 }

const url = window.location.origin

export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL || url
export const DIRECT_DOWNLOAD_URL = process.env.REACT_APP_DIRECT_DOWNLOAD_URL || 'https://api.gateway.ethswarm.org/bzz/'
export const BZZ_LINK_DOMAIN = process.env.REACT_APP_BZZ_LINK_DOMAIN || 'bzz.link'
export const UPLOAD_SIZE_LIMIT = 10000000
