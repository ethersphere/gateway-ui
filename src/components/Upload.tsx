import { ReactElement, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { ArrowLeft, Plus } from 'react-feather'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

import Header from '../components/Header'

import * as ROUTES from '../Routes'

interface Props {
  setFile: (file: File | null) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
    },
    fullWidth: {
      width: '100%',
    },
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    dragOverlay: {
      width: '100vw',
      height: '100vh',
      backgroundColor: theme.palette.primary.main,
      zIndex: 150,
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    dragOverlayChildren: {
      margin: theme.spacing(2),
      color: 'white',
    },
  }),
)

export default function Upload({ setFile }: Props): ReactElement | null {
  const classes = useStyles()
  const history = useHistory()
  const [isDragging, setIsDragging] = useState<boolean>(false)

  return (
    <Container
      className={classes.root}
      onDragOver={ev => {
        setIsDragging(true)

        ev.preventDefault()
      }}
      onDrop={ev => {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault()

        if (ev.dataTransfer.items) {
          const fls = []
          // Use DataTransferItemList interface to access the file(s)
          for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
              const fl = ev.dataTransfer.items[i].getAsFile()

              if (fl) fls.push(fl)
            }
          }

          if (fls.length === 1) setFile(fls[0])
        } else {
          // Use DataTransfer interface to access the file(s)
          if (ev.dataTransfer.files.length === 1) setFile(ev.dataTransfer.files[0])
        }
        setIsDragging(false)
      }}
    >
      {isDragging && (
        <div
          onDragLeave={ev => {
            setIsDragging(false)

            ev.preventDefault()
          }}
          className={classes.dragOverlay}
        >
          <Typography className={classes.dragOverlayChildren} variant="button">
            Drop it
          </Typography>
          <Typography className={classes.dragOverlayChildren}>
            Add a file by dropping it anywhere on this window.
          </Typography>
        </div>
      )}
      <div className={classes.fullWidth}>
        <Header
          leftAction={
            <IconButton
              onClick={() => {
                history.push(ROUTES.LANDING_PAGE)
              }}
            >
              <ArrowLeft />
            </IconButton>
          }
        >
          Share
        </Header>
        <div>You can upload any single file. Some show preview.</div>
      </div>
      <div className={classes.fullWidth}>
        <Button component="label" size="large" className={classes.button}>
          <Plus />
          Upload File
          <input
            type="file"
            hidden
            onChange={event => {
              if (event.target?.files?.length === 1) setFile(event.target.files[0]) // eslint-disable-line
            }}
          />
          <Plus style={{ opacity: 0 }} />
        </Button>
      </div>
      <div className={classes.fullWidth}>
        <span>Maximum size for upload is 10MB.</span>
      </div>
    </Container>
  )
}
