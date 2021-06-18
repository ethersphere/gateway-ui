import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, ArrowDown } from 'react-feather'

import Header from '../components/Header'
import Preview from '../components/Preview'

import { Context } from '../providers/bee'
import { DOWNLOAD_HOST } from '../constants'

import * as ROUTES from '../Routes'
import Footer from '../components/Footer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
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
      padding: theme.spacing(2),
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

  const { hash } = useParams<{ hash: string }>()
  const { getMetadata, getPreview } = useContext(Context)
  const [metadata, setMetadata] = useState<Metadata | undefined>()
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getMetadata(hash).then(setMetadata).catch(setError)
  }, [hash])

  useEffect(() => {
    if (metadata && metadata.type.startsWith('image')) {
      getPreview(hash).then(dt => {
        setPreview(URL.createObjectURL(new Blob([dt.data.buffer])))
      })
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [metadata, hash])

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
          File
        </Header>
        <div>Use the button below to download this file.</div>
      </div>
      <div className={classes.fullWidth}>
        <Preview file={metadata} preview={preview} />
      </div>
      <div className={classes.fullWidth}>
        <Footer>
          <Button className={classes.button} size="large" href={`${DOWNLOAD_HOST}/bzz/${hash}`} target="_blank">
            <ArrowDown />
            Download
            <ArrowDown style={{ opacity: 0 }} />
          </Button>
        </Footer>
      </div>
    </Container>
  )
}

export default SharePage
