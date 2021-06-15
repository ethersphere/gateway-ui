import { Reference } from '@ethersphere/bee-js'

export const apiHost = process.env.REACT_APP_BEE_API || 'http://localhost:1633'
export const postageStamp = process.env.REACT_APP_POSTAGE_STAMP as Reference | undefined
export const META_FILE_NAME = '.swarmgatewaymeta.json'
export const GATEWAY_URL = 'https://gateway.ethswarm.org/'
