import Typography from '@mui/material/Typography'
import type { ReactElement } from 'react'
import { Wind } from 'react-feather'
import text from '../translations'
import LayoutContent from './LayoutContent'

export default function FileNotFound(): ReactElement {
  return (
    <LayoutContent>
      <Wind size={48} strokeWidth={0.5} />
      <Typography variant="subtitle1">{text.fileNotFound.header}</Typography>
      <Typography variant="body2">{text.fileNotFound.description}</Typography>
    </LayoutContent>
  )
}
