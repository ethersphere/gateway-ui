import { Reference } from '@ethersphere/bee-js'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ReactElement, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ArrowLeft, Check, Clipboard, ExternalLink } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Tabs from '../../components/Tabs'
import { BZZ_LINK_DOMAIN, GATEWAY_URL } from '../../constants'
import * as ROUTES from '../../Routes'
import text from '../../translations'

interface Props {
  uploadReference: string
  metadata?: Metadata
}

const buttonStyle = { width: '100%', display: 'flex', justifyContent: 'space-between' }

const SharePage = ({ uploadReference, metadata }: Props): ReactElement => {
  const navigate = useNavigate()
  const isWebsite = metadata?.isWebsite

  const bzzLink = `https://${new Reference(uploadReference).toCid('manifest')}.${BZZ_LINK_DOMAIN}/`
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
                      sx={buttonStyle}
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
                  <Typography data-testid="swarm-hash" variant="caption">{uploadReference}</Typography>
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
              data-testid="copy-button"
              variant="contained"
              sx={buttonStyle}
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
