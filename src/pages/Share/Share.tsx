import { ReactElement, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useNavigate } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, Clipboard, Check, ExternalLink } from 'react-feather'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Tabs from '../../components/Tabs'
import Layout from '../../components/Layout'

import * as ROUTES from '../../Routes'
import { BZZ_LINK_DOMAIN, GATEWAY_URL } from '../../constants'

import text from '../../translations'
import { encodeManifestReference } from '@ethersphere/swarm-cid'

interface Props {
  uploadReference: string
  metadata?: Metadata
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
)

const SharePage = ({ uploadReference, metadata }: Props): ReactElement => {
  const classes = useStyles()
  const navigate = useNavigate()
  const isWebsite = metadata?.isWebsite

  const bzzLink = `https://${encodeManifestReference(uploadReference)}.${BZZ_LINK_DOMAIN}/`
  const linkHeader = isWebsite ? 'Bzz Link' : 'Web link'
  const linkUrl = isWebsite ? bzzLink : `${GATEWAY_URL}${ROUTES.ACCESS_HASH(uploadReference)}`

  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false)
  const [activeValue, setActiveValue] = useState<string>(uploadReference)

  return (
    <Layout
      top={[
        <Header
          key="top1"
          leftAction={
            <IconButton
              onClick={() => {
                navigate(ROUTES.LANDING_PAGE)
              }}
            >
              <ArrowLeft strokeWidth={1} />
            </IconButton>
          }
        >
          {text.shareHashPage.header}
        </Header>,
        <Typography key="top2" variant="subtitle1">
          {text.shareHashPage.tagline}
        </Typography>,
      ]}
      center={[
        <Tabs
          key="center1"
          onChange={reference => {
            if (reference !== activeValue) {
              setActiveValue(reference)
              setCopiedToClipboard(false)
            }
          }}
          values={[
            {
              label: linkHeader,
              component: (
                <div>
                  <Paper
                    square
                    elevation={0}
                    style={{ overflowWrap: 'break-word', textAlign: 'left', padding: 16, margin: 4 }}
                  >
                    <Typography variant="caption">{linkUrl}</Typography>
                  </Paper>
                  {isWebsite && (
                    <Button
                      variant="contained"
                      style={{ margin: 4, width: 'auto' }}
                      className={classes.button}
                      href={bzzLink}
                      target="blank"
                    >
                      <ExternalLink strokeWidth={1} />
                      {text.accessHashPage.openWebsite}
                      <ExternalLink style={{ opacity: 0 }} />
                    </Button>
                  )}
                </div>
              ),
              value: linkUrl,
            },
            {
              label: 'Swarm hash',
              component: (
                <Paper
                  square
                  elevation={0}
                  style={{ overflowWrap: 'break-word', textAlign: 'left', padding: 16, margin: 4 }}
                >
                  <Typography variant="caption">{uploadReference}</Typography>
                </Paper>
              ),
              value: uploadReference,
            },
          ]}
        />,
      ]}
      bottom={[
        <Typography key="bottom1" variant="body2">
          {text.shareHashPage.disclaimer}
        </Typography>,
        <Footer key="bottom2">
          <CopyToClipboard text={activeValue}>
            <Button
              variant="contained"
              className={classes.button}
              size="large"
              onClick={e => {
                e.stopPropagation()
                setCopiedToClipboard(true)
              }}
            >
              {copiedToClipboard ? <Check strokeWidth={1} /> : <Clipboard strokeWidth={1} />}
              {copiedToClipboard ? text.shareHashPage.copyLinkActionSuccess : text.shareHashPage.copyLinkAction}
              {/* Needed to properly align icon to the right and label to center */}
              <Clipboard style={{ opacity: 0 }} />
            </Button>
          </CopyToClipboard>
        </Footer>,
      ]}
    />
  )
}

export default SharePage
