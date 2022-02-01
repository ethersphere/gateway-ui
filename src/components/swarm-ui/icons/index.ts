import { SVGAttributes } from 'react'
import CheckFill from './CheckFill'
import DownloadLine from './DownloadLine'
import UploadLine from './UploadLine'

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: string | number
}

export const DEFAULT_SIZE = 18

export { CheckFill, DownloadLine, UploadLine }
