import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import CloseIcon from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper'
import { DropzoneArea } from 'material-ui-dropzone'

import ClipboardCopy from '../components/ClipboardCopy'
import QRCodeModal from '../components/QRCodeModal'

import * as ROUTES from '../Routes'
import Upload from '../components/Upload'
import { Context } from '../providers/bee'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
    },
    topNavigation: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      alignItems: 'center',
    },
    buttonContainer: {
      width: '100%',
    },
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    imageWrapper: {
      padding: theme.spacing(2),
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
)

const SharePage = (): ReactElement => {
  const classes = useStyles()
  const history = useHistory()

  const [files, setFiles] = useState<FilePath[]>([])
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const { upload } = useContext(Context)
  const { enqueueSnackbar } = useSnackbar()
  const file = files[0]

  const uploadFile = () => {
    if (file === null) return
    setIsUploadingFile(true)
    upload(file)
      .then(hash => {
        setUploadReference(hash)
        setFiles([])
      })
      .catch(e => enqueueSnackbar(`Error uploading: ${e.message}`, { variant: 'error' }))
      .finally(() => {
        setIsUploadingFile(false)
      })
  }

  useEffect(() => {
    if (!file || !file.type.startsWith('image')) return

    const reader = new FileReader()
    reader.addEventListener('load', () => setPreview(reader.result?.toString() || null), false)
    reader.readAsDataURL(file)
  }, [file])

  if (!file) {
    return (
      <Container className={classes.root}>
        <div style={{ width: '100%' }}>
          <div className={classes.topNavigation}>
            <IconButton
              onClick={() => {
                history.push(ROUTES.LANDING_PAGE)
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="button">Share</Typography>
            <IconButton style={{ opacity: 0 }}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div>You can upload any single file. Some show preview.</div>
        </div>
        <div>
          <DropzoneArea onChange={setFiles} filesLimit={1} maxFileSize={10000000} />
        </div>
        <div className={classes.buttonContainer}>
          <span>Maximum size for upload is 10MB.</span>
        </div>
      </Container>
    )
  }

  return (
    <Container className={classes.root}>
      <div style={{ width: '100%' }}>
        <div className={classes.topNavigation}>
          <IconButton style={{ opacity: 0 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="button">File</Typography>
          <IconButton onClick={() => setFiles([])}>
            <CloseIcon />
          </IconButton>
        </div>
        <div>Double-check before uploading. There is no undo.</div>
      </div>
      <div>
        <Paper>
          {preview && (
            <div className={classes.imageWrapper}>
              <img src={preview} className={classes.image} />
            </div>
          )}
          <ul>
            <li>Filename: {file.name}</li>
            <li>Size: {file.size} Bytes</li>
            <li>Type: {file.type}</li>
          </ul>
        </Paper>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          size="large"
          startIcon={<ArrowUpwardIcon color="primary" onClick={() => uploadFile()} />}
        >
          Upload
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowUpwardIcon style={{ opacity: 0 }} />
        </Button>
      </div>
    </Container>
  )
}

export default SharePage

//   {file && (
//     <code>
//       <ul>
//         <li>path:{file.path}</li>
//         <li>filename: {file.name}</li>
//         <li>size: {file.size}</li>
//         <li>type: {file.type}</li>
//       </ul>
//     </code>
//   )}
//   {file && (
//     <Button disabled={isUploadingFile} variant="outlined" onClick={() => uploadFile()}>
//       Upload
//     </Button>
//   )}
//   {isUploadingFile && (
//     <Container>
//       <CircularProgress />
//     </Container>
//   )}
//   {uploadReference && (
//     <>
//       <div>
//         <code>{uploadReference}</code>
//         <ClipboardCopy value={uploadReference} />
//         <QRCodeModal value={uploadReference} label="Swarm Hash Reference" />
//       </div>
//       <div>
//         <code>{`${window.location}/download/${uploadReference}`}</code>
//         <ClipboardCopy value={`${window.location}/download/${uploadReference}`} />
//         <QRCodeModal value={`${window.location}/download/${uploadReference}`} label="Gateway Share Link" />
//       </div>
//     </>
//   )}
// </>
