import { Reference } from '@ethersphere/bee-js'

export const BEE_HOSTS: string[] = process.env.REACT_APP_BEE_HOSTS?.split(',') || ['http://localhost:1633']
export const POSTAGE_STAMP =
  (process.env.REACT_APP_POSTAGE_STAMP as Reference | undefined) ||
  ('0000000000000000000000000000000000000000000000000000000000000000' as Reference)

export const META_FILE_NAME = '.swarmgatewaymeta.json'
export const PREVIEW_FILE_NAME = '.swarmgatewaypreview.jpeg'
export const PREVIEW_DIMENSIONS = { maxWidth: 250, maxHeight: 175 }

const url = window.location.origin

export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL || url
export const DIRECT_DOWNLOAD_URL = process.env.REACT_APP_DIRECT_DOWNLOAD_URL || 'https://api.gateway.ethswarm.org/bzz/'
export const BZZ_LINK_DOMAIN = process.env.REACT_APP_BZZ_LINK_DOMAIN || 'bzz.link'
export const UPLOAD_SIZE_LIMIT = 10000000

export const POD_USERNAME = process.env.REACT_APP_POD_USERNAME ?? 'username'
export const POD_PASSWORD = process.env.REACT_APP_POD_PASSWORD ?? 'password'
export const POD_NAME = process.env.REACT_APP_POD_NAME ?? 'swarmgateway'
export const POD_HOSTV1 = process.env.REACT_APP_HOSTV1
export const POD_HOSTV2 = process.env.REACT_APP_HOSTV2
export const KV_TABLE = process.env.REACT_APP_KV_TABLENAME ?? 'fairos-kvs'
export const KEY_STORE_NAME = process.env.REACT_APP_KEY_STORE_NAME ?? '_keystorenam'
