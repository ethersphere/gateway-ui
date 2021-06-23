import type { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { AlertOctagon } from 'react-feather'
import text from '../translations'
import LayoutContent from './LayoutContent'

export default function InvalidSwarmHash(): ReactElement {
  return (
    <LayoutContent>
      <AlertOctagon size={48} strokeWidth={0.5} />
      <Typography variant="subtitle1">{text.invalidSwarmHash.header}</Typography>
      <Typography variant="body2">{text.invalidSwarmHash.description}</Typography>
    </LayoutContent>
  )
}
