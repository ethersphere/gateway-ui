import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { RefreshCw, ArrowDown } from 'react-feather'
import { Utils } from '@ethersphere/bee-js'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import { AssetPreview } from '../components/AssetPreview'
import Layout from '../components/Layout'
import FileNotFound from '../components/FileNotFound'
import UnknownFile from '../components/UnknownFile'
import LoadingFile from '../components/LoadingFile'
import InvalidSwarmHash from '../components/InvalidSwarmHash'

import { Context } from '../providers/bee'
import { SwarmFile } from '../utils/SwarmFile'
import { shortenHash } from '../utils/hash'

import text from '../translations'

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

  const { hash } = useParams<{ hash: string }>()
  const { getMetadata, getPreview, getChunk, download } = useContext(Context)
  const [files, setFiles] = useState<SwarmFile[]>([])
  const [entries, setEntries] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [chunkExists, setChunkExists] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!(Utils.isHexString(hash, 64) || Utils.isHexString(hash, 128))) {
      setErrorMsg('Not a valid Swarm Reference')
      setIsLoading(false)

      return
    }

    setErrorMsg(null)
    setFiles([])
    setEntries({})
    setIsLoading(true)
    getMetadata(hash)
      .then(({ files, entries }) => {
        setFiles(files)
        setEntries(entries)
        setIsLoading(false)
      })
      .catch(() => {
        // There are no metadata, but maybe there is a retrievable file
        getChunk(hash)
          .then(d => setChunkExists(Boolean(d.byteLength)))
          .catch(() => setChunkExists(false))
          .finally(() => setIsLoading(false))
      })
  }, [hash, getChunk, getMetadata])

  if (isLoading) {
    return (
      <Layout
        top={[
          <Header key="top1">
            <Logo />
          </Header>,
        ]}
        center={[
          <div key="middle1">
            <LoadingFile />
          </div>,
        ]}
        bottom={[<div key="bottom1" />]}
      />
    )
  }

  // There are some metadata, display them and offer downloading the content
  if (files.length > 0) {
    return (
      <Layout
        top={[
          <Header key="top1">
            <Logo />
          </Header>,
          <Typography key="top2" variant="subtitle1">
            {text.accessHashPage.useButtonToDownload}
          </Typography>,
        ]}
        center={[
          <AssetPreview
            key="center1"
            files={files}
            assetName={shortenHash(hash)}
            previewUri={getPreview(entries, hash)}
          />,
        ]}
        bottom={[
          <Footer key="bottom1">
            <Button variant="contained" className={classes.button} size="large" onClick={() => download(hash, entries)}>
              <ArrowDown />
              {text.accessHashPage.downloadAction}
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
          <Typography key="top2" variant="subtitle1">
            {text.accessHashPage.useButtonToDownload}
          </Typography>,
        ]}
        center={[<UnknownFile key="center1" />]}
        bottom={[
          <Footer key="bottom1">
            <Button variant="contained" className={classes.button} size="large" onClick={() => download(hash, entries)}>
              <ArrowDown />
              {text.accessHashPage.downloadAction}
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
        ]}
        center={[<InvalidSwarmHash key="center" />]}
        bottom={[]}
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
        <Typography key="top2" variant="subtitle1">
          {text.accessHashPage.tagline}
        </Typography>,
      ]}
      center={[<FileNotFound key="center" />]}
      bottom={[
        <Footer key="bottom1">
          <Button variant="contained" className={classes.button} size="large" onClick={() => window.location.reload()}>
            <RefreshCw />
            {text.accessHashPage.retryAction}
            <RefreshCw style={{ opacity: 0 }} />
          </Button>
        </Footer>,
      ]}
    />
  )
}

export default SharePage
