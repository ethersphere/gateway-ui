import { SVGAttributes } from 'react'
import DownloadLine from './DownloadLine'
import UploadLine from './UploadLine'

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: string | number
}

export { DownloadLine, UploadLine }
