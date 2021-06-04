import { Bee, Reference } from '@ethersphere/bee-js'

// These values can for now be constants because their change in the app reloads the page
export const apiHost = sessionStorage.getItem('api_host') || process.env.REACT_APP_BEE_HOST || 'http://localhost:1633'
export const bee = new Bee(apiHost)

export const postageStamp = process.env.REACT_APP_POSTAGE_STAMP as Reference
