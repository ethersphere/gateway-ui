import type { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import { AlertOctagon } from 'react-feather'
import text from '../translations'
import LayoutContent from './LayoutContent'

export default function UnknownFile(): ReactElement {
  return (
    <LayoutContent>
      <AlertOctagon size={48} strokeWidth={0.5} />
      <Typography variant="subtitle1">{text.unknownFile.header}</Typography>
      <Typography variant="body2">{text.unknownFile.description}</Typography>
    </LayoutContent>
  )
}
