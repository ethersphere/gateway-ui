import { Reference } from '@ethersphere/bee-js'

export const BEE_HOSTS: string[] = process.env.REACT_APP_BEE_HOSTS?.split(',') || ['http://localhost:1633']
export const POSTAGE_STAMP =
  (process.env.REACT_APP_POSTAGE_STAMP as Reference | undefined) ||
  ('0000000000000000000000000000000000000000000000000000000000000000' as Reference)

export const META_FILE_NAME = '.swarmgatewaymeta.json'
export const PREVIEW_FILE_NAME = '.swarmgatewaypreview.jpeg'

const url = window.location.origin

export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL || url
export const DIRECT_DOWNLOAD_URL = process.env.DIRECT_DOWNLOAD_URL || 'https://download.gateway.ethswarm.org/bzz/'
