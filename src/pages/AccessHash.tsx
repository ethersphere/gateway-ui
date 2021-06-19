import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, ArrowDown } from 'react-feather'

import Header from '../components/Header'
import Preview from '../components/Preview'
import Layout from '../components/Layout'

import { Context } from '../providers/bee'
import { DOWNLOAD_HOST } from '../constants'

import * as ROUTES from '../Routes'
import Footer from '../components/Footer'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
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
    <Layout
      top={[
        <Header
          key="top1"
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
        </Header>,
        <div key="top2">Use the button below to download this file.</div>,
      ]}
      center={[<Preview key="center1" file={metadata} preview={preview} />]}
      bottom={[
        <Footer key="bottom1">
          <Button className={classes.button} size="large" href={`${DOWNLOAD_HOST}/bzz/${hash}`} target="_blank">
            <ArrowDown />
            Download
            <ArrowDown style={{ opacity: 0 }} />
          </Button>
        </Footer>,
      ]}
    />
  )
}

export default SharePage
