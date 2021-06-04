import type { ReactElement } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { useSnackbar } from 'notistack'

interface Props {
  value: string
}

export default function ClipboardCopy({ value }: Props): ReactElement {
  const { enqueueSnackbar } = useSnackbar()
  const handleCopy = () => enqueueSnackbar(`Copied: ${value}`, { variant: 'success' })

  return (
    <div style={{ marginRight: '3px', marginLeft: '3px' }}>
      <IconButton color="primary" size="small" onClick={handleCopy}>
        <CopyToClipboard text={value}>
          <FileCopyIcon />
        </CopyToClipboard>
      </IconButton>
    </div>
  )
}
