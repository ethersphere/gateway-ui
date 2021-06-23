import type { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import text from '../translations'
import LayoutContent from './LayoutContent'

export default function LoadingFile(): ReactElement {
  return (
    <LayoutContent>
      <CircularProgress size={48} color="inherit" thickness={1} />
      <Typography variant="subtitle1">{text.loadingFile.header}</Typography>
      <Typography variant="body2">{text.loadingFile.description}</Typography>
    </LayoutContent>
  )
}
