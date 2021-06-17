import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'

import { ArrowLeft, ArrowUp, X, Clipboard } from 'react-feather'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'

import Header from '../components/Header'
import QRCodeModal from '../components/QRCodeModal'
import Tabs from '../components/Tabs'
import Footer from '../components/Footer'
import Upload from '../components/Upload'

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
      minHeight: '100vh',
    },
    rootWithBottomNav: {
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

  const [file, setFile] = useState<File | null>(null)
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const { upload } = useContext(Context)
  const { enqueueSnackbar } = useSnackbar()

  const uploadFile = () => {
    if (!file) return

    setIsUploadingFile(true)
    upload(file)
      .then(hash => {
        setUploadReference(hash)
      })
      .catch(e => enqueueSnackbar(`Error uploading: ${e?.message}`, { variant: 'error' }))
      .finally(() => {
        setIsUploadingFile(false)
      })
  }

  useEffect(() => {
    setPreview(null)

    if (!file || !file.type.startsWith('image')) return

    const reader = new FileReader()
    reader.addEventListener('load', () => setPreview(reader.result?.toString() || null), false)
    reader.readAsDataURL(file)
  }, [file])

  if (!file) return <Upload setFile={setFile} />

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
                  <Paper square style={{ overflowWrap: 'break-word', textAlign: 'left', padding: 16, margin: 4 }}>
                    {`${GATEWAY_URL}${ROUTES.ACCESS_HASH(uploadReference)}`}
                  </Paper>
                ),
              },
              {
                label: 'Swarm hash',
                component: (
                  <Paper square style={{ overflowWrap: 'break-word', textAlign: 'left', padding: 16, margin: 4 }}>
                    {uploadReference}
                  </Paper>
                ),
              },
            ]}
          />
          <QRCodeModal value={`${GATEWAY_URL}${ROUTES.ACCESS_HASH(uploadReference)}`} label="Gateway Share Link" />
          <small>
            Thundercats post-ironic messenger bag chartreuse, fam neutra cloud bread cray fingerstache microdosing
            mlkshk iceland.
          </small>
        </div>
        <div className={classes.fullWidth}>
          <Button className={classes.button} onClick={uploadFile} size="large">
            <Clipboard color="primary" />
            Copy
            {/* Needed to properly align icon to the right and label to center */}
            <Clipboard style={{ opacity: 0 }} />
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className={`${classes.root} ${classes.rootWithBottomNav}`}>
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
