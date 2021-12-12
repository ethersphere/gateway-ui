import { Reference } from '@ethersphere/bee-js'

export const BEE_HOSTS: string[] = process.env.REACT_APP_BEE_HOSTS?.split(',') || ['http://localhost:1633']
export const POSTAGE_STAMP =
  (process.env.REACT_APP_POSTAGE_STAMP as Reference | undefined) ||
  ('692cc30c7feb221c1a6275bde48fd491c42802763ae6a9af454a07b8d690f8b9' as Reference)
// ('0000000000000000000000000000000000000000000000000000000000000000' as Reference)

export const META_FILE_NAME = '.swarmgatewaymeta.json'
export const PREVIEW_FILE_NAME = '.swarmgatewaypreview.jpeg'

const url = window.location.origin

export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL || url
export const DIRECT_DOWNLOAD_URL = process.env.DIRECT_DOWNLOAD_URL || 'https://download.gateway.ethswarm.org/bzz/'
