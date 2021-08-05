import { useParams } from 'react-router-dom'
import { DIRECT_DOWNLOAD_URL } from '../constants'

const RedirectToDownload = (): null => {
  const { hash } = useParams<{ hash: string }>()

  // React router can redirect only withing the app itself, that is why we need to assing window.location
  // https://knowbody.github.io/react-router-docs/api/Redirect.html
  window.location.assign(`${DIRECT_DOWNLOAD_URL}${hash}`)

  return null
}

export default RedirectToDownload
