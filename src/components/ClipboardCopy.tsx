import type { ReactElement } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Clipboard } from 'react-feather'

interface Props {
  value: string
}

export default function ClipboardCopy({ value }: Props): ReactElement {
  return (
    <div style={{ marginRight: '3px', marginLeft: '3px' }}>
      <IconButton color="primary" size="small">
        <CopyToClipboard text={value}>
          <Clipboard />
        </CopyToClipboard>
      </IconButton>
    </div>
  )
}
