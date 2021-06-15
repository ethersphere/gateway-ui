import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import CloseIcon from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper'
import AddIcon from '@material-ui/icons/Add'

import Header from '../components/Header'
import QRCodeModal from '../components/QRCodeModal'
import Tabs from '../components/Tabs'
import Footer from '../components/Footer'

import * as ROUTES from '../Routes'
import { Context } from '../providers/bee'
import { GATEWAY_URL } from '../constants'

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
      minHeight: `calc(100vh - ${theme.spacing(10)}px)`,
    },
    topNavigation: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      alignItems: 'center',
    },
    fullWidth: {
      width: '100%',
    },
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
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

  const [files, setFiles] = useState<FileList | null>(null)
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const { upload } = useContext(Context)
  const { enqueueSnackbar } = useSnackbar()
  const file = files && (files[0] as File)

  const uploadFile = () => {
    if (!file) return

    setIsUploadingFile(true)
    upload(file)
      .then(hash => {
        setUploadReference(hash)
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
        <div className={classes.fullWidth}>
          <div className={classes.topNavigation}>
            <Header
              leftAction={
                <IconButton
                  onClick={() => {
                    history.push(ROUTES.LANDING_PAGE)
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              }
            >
              Share
            </Header>
          </div>
          <div>You can upload any single file. Some show preview.</div>
        </div>
        <div className={classes.fullWidth}>
          {/*<DropzoneArea onChange={setFiles} filesLimit={1} maxFileSize={10000000} />*/}
          <Button component="label" size="large" startIcon={<AddIcon color="primary" />} className={classes.button}>
            Upload File
            <input
              type="file"
              hidden
              onChange={event => {
                setFiles(event.target.files) // eslint-disable-line
              }}
            />
            <AddIcon style={{ opacity: 0 }} />
          </Button>
        </div>
        <div className={classes.fullWidth}>
          <span>Maximum size for upload is 10MB.</span>
        </div>
      </Container>
    )
  }

  if (uploadReference) {
    return (
      <Container className={classes.root}>
        <div className={classes.fullWidth}>
          <Header
            leftAction={
              <IconButton
                onClick={() => {
                  history.push(ROUTES.LANDING_PAGE)
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            }
          >
            Share
          </Header>
          <small>Share with a Swarm hash (a.k.a. ‘bzzhash’) or a web link.</small>
        </div>
        <div className={classes.fullWidth}>
          <Tabs
            values={[
              {
                label: 'Swarm hash',
                component: (
                  <div style={{ overflowWrap: 'break-word', textAlign: 'left' }}>
                    <Paper>{uploadReference}</Paper>
                  </div>
                ),
              },
              {
                label: 'Web link',
                component: (
                  <div style={{ overflowWrap: 'break-word', textAlign: 'left' }}>
                    <Paper>{`${GATEWAY_URL}${uploadReference}`}</Paper>
                  </div>
                ),
              },
            ]}
          />
          <QRCodeModal value={`${window.location}/download/${uploadReference}`} label="Gateway Share Link" />
          <small>
            Thundercats post-ironic messenger bag chartreuse, fam neutra cloud bread cray fingerstache microdosing
            mlkshk iceland.
          </small>
        </div>
        <div className={classes.fullWidth}>
          <Button
            className={classes.button}
            onClick={uploadFile}
            size="large"
            startIcon={<ArrowUpwardIcon color="primary" />}
          >
            Copy
            {/* Needed to properly align icon to the right and label to center */}
            <ArrowUpwardIcon style={{ opacity: 0 }} />
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className={classes.root}>
      <div className={classes.fullWidth}>
        <Header
          rightAction={
            <IconButton onClick={() => setFiles(null)}>
              <CloseIcon />
            </IconButton>
          }
        >
          File
        </Header>
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
      <div className={classes.fullWidth}>
        <Footer>
          <Button
            className={classes.button}
            onClick={uploadFile}
            size="large"
            startIcon={<ArrowUpwardIcon color="primary" />}
          >
            Upload
            <ArrowUpwardIcon style={{ opacity: 0 }} />
          </Button>
        </Footer>
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
