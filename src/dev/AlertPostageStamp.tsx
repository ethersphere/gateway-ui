import { ReactElement, useState, useContext } from 'react'
import { Alert, AlertTitle, Color } from '@material-ui/lab'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import { X } from 'react-feather'
import { Button } from '@material-ui/core'
import { Context } from '../providers/bee'

export default function VersionAlert(): ReactElement | null {
  const [isCreatingStamp, setIsCreatingStamp] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(true)
  const { purchaseStamp, stamp, isConnected } = useContext(Context)

  const buyStamp = () => {
    setIsCreatingStamp(true)
    purchaseStamp().finally(() => setIsCreatingStamp(false))
  }

  let severity: Color = 'success'

  if (!stamp) severity = 'warning'

  if (isCreatingStamp) severity = 'info'

  if (!isConnected) severity = 'error'

  return (
    <Collapse in={open}>
      <div style={{ zIndex: 900, width: '100%' }}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <X fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>For testing purposes only</AlertTitle>
          {severity === 'warning' && (
            <span>
              There is no postage stamp, please provide one with <code>REACT_APP_POSTAGE_STAMP</code> environment
              variable or{' '}
              <Button variant="outlined" onClick={buyStamp}>
                Create new postage stamp
              </Button>
            </span>
          )}
          {severity === 'info' && <span>Purchasing new postage stamp, please wait</span>}
          {severity === 'success' && <span>All setup, you can now upload files</span>}
          {severity === 'error' && <span>The bee node is not reachable. Please check it is running</span>}
        </Alert>
      </div>
    </Collapse>
  )
}
