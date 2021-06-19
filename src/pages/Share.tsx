import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import { ArrowLeft, ArrowUp, X, Clipboard } from 'react-feather'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import Header from '../components/Header'
import Tabs from '../components/Tabs'
import Footer from '../components/Footer'
import Upload from '../components/Upload'
import Preview from '../components/Preview'
import { readAndCompressImage } from 'browser-image-resizer'

import * as ROUTES from '../Routes'
import { Context } from '../providers/bee'
import { GATEWAY_URL } from '../constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(10),
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
    fullWidth: {
      width: '100%',
      padding: theme.spacing(2),
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
    hash: {},
  }),
)

const SharePage = (): ReactElement => {
  const classes = useStyles()
  const history = useHistory()

  const [file, setFile] = useState<File | null>(null)
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [previewBlob, setPreviewBlob] = useState<Blob | undefined>(undefined)
  const { upload } = useContext(Context)

  const uploadFile = () => {
    if (!file) return

    setIsUploadingFile(true)
    upload(file, previewBlob)
      .then(hash => {
        setUploadReference(hash)
      })
      .catch(e => console.error) // eslint-disable-line
      .finally(() => {
        setIsUploadingFile(false)
      })
  }

  useEffect(() => {
    if (preview) {
      URL.revokeObjectURL(preview) // Clear the preview from memory
      setPreview(undefined)
      setPreviewBlob(undefined)
    }

    if (!file || !file.type.startsWith('image')) return

    readAndCompressImage(file, { maxWidth: 896, maxHeight: 672, autoRotate: false }).then(blob => {
      setPreview(URL.createObjectURL(blob)) // NOTE: Until it is cleared with URL.revokeObjectURL, the file stays allocated in memory
      setPreviewBlob(blob)
    })

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [file])

  if (!file) return <Upload setFile={setFile} />

  if (uploadReference) {
    return (
      <Container maxWidth="md" className={classes.root}>
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
          <small>Share with a Swarm hash (a.k.a. ‘bzzhash’) or a web link.</small>
        </div>
        <div className={classes.fullWidth}>
          <Tabs
            values={[
              {
                label: 'Web link',
                component: (
                  <Paper
                    square
                    elevation={0}
                    style={{ overflowWrap: 'break-word', textAlign: 'left', padding: 16, margin: 4 }}
                  >
                    <Typography variant="caption" className={classes.hash}>{`${GATEWAY_URL}${ROUTES.ACCESS_HASH(
                      uploadReference,
                    )}`}</Typography>
                  </Paper>
                ),
              },
              {
                label: 'Swarm hash',
                component: (
                  <Paper
                    square
                    elevation={0}
                    style={{ overflowWrap: 'break-word', textAlign: 'left', padding: 16, margin: 4 }}
                  >
                    <Typography variant="caption" className={classes.hash}>
                      {uploadReference}
                    </Typography>
                  </Paper>
                ),
              },
            ]}
          />
          <small>
            Thundercats post-ironic messenger bag chartreuse, fam neutra cloud bread cray fingerstache microdosing
            mlkshk iceland.
          </small>
        </div>
        <div className={classes.fullWidth}>
          <Button className={classes.button} onClick={uploadFile} size="large">
            <Clipboard />
            Copy
            {/* Needed to properly align icon to the right and label to center */}
            <Clipboard style={{ opacity: 0 }} />
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.fullWidth}>
        <Header
          rightAction={
            <IconButton onClick={() => setFile(null)}>
              <X />
            </IconButton>
          }
        >
          File
        </Header>
        <div>Double-check before uploading. There is no undo.</div>
      </div>
      <div className={classes.fullWidth}>
        <Preview file={file} preview={preview} />
      </div>
      <div className={classes.fullWidth}>
        <Footer>
          <Button className={classes.button} onClick={uploadFile} size="large">
            <ArrowUp />
            Upload
            <ArrowUp style={{ opacity: 0 }} />
          </Button>
          {isUploadingFile && <LinearProgress />}
        </Footer>
      </div>
    </Container>
  )
}

export default SharePage
