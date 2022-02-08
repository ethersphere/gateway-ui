import type { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'

import { Button, Typography, colors } from '../../components/swarm-ui'
import { DownloadLine, ClipboardLine, EyeLine, EyeOffLine } from '../../components/swarm-ui/icons'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Layout from '../../components/Layout'
import Logo from '../../components/Logo'
import { AssetPreview } from '../../components/AssetPreview'

import * as ROUTES from '../../Routes'
import { BZZ_LINK_DOMAIN, GATEWAY_URL } from '../../constants'
import { shortenHash, shortenLink } from '../../utils/hash'

import text from '../../translations'
import { encodeManifestReference } from '@ethersphere/swarm-cid'

interface Props {
  uploadReference: string
  metadata?: Metadata
}

const useStyles = createUseStyles({
  button: {
    width: '100%',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    '& > *:not(:last-child)': {
      marginBottom: 2,
    },
  },
})

const SharePage = ({ uploadReference, metadata }: Props): ReactElement => {
  const classes = useStyles()
  const navigate = useNavigate()
  const isWebsite = metadata?.isWebsite

  const bzzLink = `https://${encodeManifestReference(uploadReference)}.${BZZ_LINK_DOMAIN}/`
  const linkUrl = isWebsite ? bzzLink : `${GATEWAY_URL}${ROUTES.ACCESS_HASH(uploadReference)}`

  return (
    <Layout
      top={[
        <Header key="top1">
          <Logo />
        </Header>,
        <Typography key="top2" variant="body">
          {text.landingPage.tagline}
        </Typography>,
      ]}
      center={[
        <div key="c1" className={classes.center}>
          <div
            style={{
              backgroundColor: colors.white,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 6,
            }}
          >
            <Typography variant="button" style={{ padding: 6 }}>
              Share link
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Button variant="light">{shortenLink(linkUrl)}</Button>
              <Button variant="light" icon={<ClipboardLine />} />
            </div>
          </div>
          <div
            style={{
              backgroundColor: colors.white,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 6,
            }}
          >
            <Typography variant="button" style={{ padding: 6 }}>
              Hash
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Button variant="light">{shortenHash(uploadReference)}</Button>
              <Button variant="light" icon={<EyeLine />} />
            </div>
          </div>
          <div>
            <AssetPreview />
          </div>
        </div>,
      ]}
      bottom={[
        <Footer key="bottom1">
          <Button
            variant="primary"
            className={classes.button}
            icon={<DownloadLine />}
            onClick={e => {
              e.stopPropagation()
            }}
          >
            Download
          </Button>
        </Footer>,
      ]}
    />
  )
}

export default SharePage
