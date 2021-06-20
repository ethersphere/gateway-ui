import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, ArrowDown } from 'react-feather'
import { Utils } from '@ethersphere/bee-js'

import Header from '../components/Header'
import Preview from '../components/Preview'
import Layout from '../components/Layout'

import { Context } from '../providers/bee'
import { DOWNLOAD_HOST } from '../constants'

import * as ROUTES from '../Routes'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

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
  const { getMetadata, getPreview, getChunk } = useContext(Context)
  const [metadata, setMetadata] = useState<Metadata | undefined>()
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chunkExists, setChunkExists] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!(Utils.Hex.isHexString(hash, 64) || Utils.Hex.isHexString(hash, 128))) {
      setErrorMsg('Not a valid Swarm Reference')

      return
    }

    setErrorMsg(null)
    setIsLoading(true)
    getMetadata(hash)
      .then(mtd => {
        setMetadata(mtd)
        setIsLoading(false)
      })
      .catch(() => {
        // There are no metadata, but maybe there is a retrievable file
        setChunkExists(false)
        getChunk(hash)
          .then(() => setChunkExists(true))
          .finally(() => setIsLoading(false))
      })
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

  if (isLoading) {
    return (
      <Layout
        top={[
          <Header key="top1">
            <Logo />
          </Header>,
        ]}
        center={[<div key="middle1">Loading information about the file....</div>]}
        bottom={[<div key="bottom1" />]}
      />
    )
  }

  // There are some metadata, display them and offer downloading the content
  if (metadata) {
    return (
      <Layout
        top={[
          <Header key="top1">
            <Logo />
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

  // We have no metadata, but there is a chunk at that address. Allow users to download.
  if (chunkExists) {
    return (
      <Layout
        top={[
          <Header key="top1">
            <Logo />
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

  // The hash is wrong, display error message
  if (errorMsg) {
    return (
      <Layout
        top={[
          <Header key="top1">
            <Logo />
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

  // We could not retrieve anything, display generic message
  return (
    <Layout
      top={[
        <Header key="top1">
          <Logo />
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
