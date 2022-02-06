import { SVGAttributes } from 'react'
import ArrowLeftLine from './ArrowLeftLine'
import CheckFill from './CheckFill'
import FileAddLine from './FileAddLine'
import FolderAddLine from './FolderAddLine'
import DownloadLine from './DownloadLine'
import UploadLine from './UploadLine'

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: string | number
}

export const DEFAULT_SIZE = 18

export { ArrowLeftLine, CheckFill, DownloadLine, UploadLine, FileAddLine, FolderAddLine }
