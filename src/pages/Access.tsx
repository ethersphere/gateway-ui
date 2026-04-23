import { Reference } from '@ethersphere/bee-js'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { ReactElement, useEffect, useState } from 'react'
import { ArrowLeft, CornerUpLeft, Search } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import { BZZ_LINK_DOMAIN } from '../constants'
import * as ROUTES from '../Routes'
import text from '../translations'

const buttonStyle = { width: '100%', display: 'flex', justifyContent: 'space-between' }

function extractSwarmHash(string: string): string | undefined {
  const matches = string.match(/[a-f0-9]{64,128}/i)

  return (matches && matches[0]) || undefined
}

function extractSwarmCid(s: string): string | undefined {
  const regexp = new RegExp(`https://(.*)\\.${BZZ_LINK_DOMAIN}`)
  const matches = s.match(regexp)

  if (!matches || !matches[1]) {
    return
  }

  const cid = matches[1]
  try {
    const decodeResult = new Reference(cid)

    return decodeResult.toHex()
  } catch (e) {
    return
  }
}

function recognizeSwarmHash(value: string): string {
  return extractSwarmHash(value) || extractSwarmCid(value) || value
}

export default function AccessPage(): ReactElement {
  const navigate = useNavigate()

  const [hash, setHash] = useState<string>('')
  const [hashError, setHashError] = useState<boolean>(false)

  useEffect(() => {
    if (!hash || Reference.isValid(hash)) {
      setHashError(false)
    } else {
      setHashError(true)
    }
  }, [hash, setHashError])

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
          {text.accessPage.header}
        </Header>,
        <Typography key="top2" variant="subtitle1">
          {text.accessPage.tagline}
        </Typography>,
      ]}
      center={[
        <div key="center1">
          <Tooltip
            title={text.accessPage.hashLengthWarning}
            placement="top"
            open={hashError}
            arrow
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <InputBase
              inputProps={{ 'data-testid': 'hash-input' }}
              sx={buttonStyle}
              placeholder="Paste Swarm Hash Here"
              onChange={event => setHash(recognizeSwarmHash(event.target.value))}
              value={hash}
              multiline
              style={{ backgroundColor: 'white' }}
            />
          </Tooltip>
          <Button
            variant="contained"
            key="center2"
            sx={buttonStyle}
            size="small"
            style={{ marginTop: 2, paddingLeft: 16, paddingRight: 16, opacity: hash ? 1 : 0 }}
            onClick={() => setHash('')}
          >
            <CornerUpLeft />
            {text.accessPage.backAction}
            <CornerUpLeft style={{ opacity: 0 }} />
          </Button>
        </div>,
      ]}
      bottom={[
        <Footer key="bottom1">
          <div>
            {hash && (
              <Button
                data-testid="find-button"
                variant="contained"
                sx={buttonStyle}
                disabled={hashError}
                onClick={() => navigate(ROUTES.ACCESS_HASH(hash))}
                size="large"
              >
                <Search strokeWidth={1} />
                {text.accessPage.findAction}
                <Search style={{ opacity: 0 }} />
              </Button>
            )}
          </div>
        </Footer>,
        <Typography key="bottom2" variant="body2" style={{ opacity: hash ? 0 : 1 }}>
          {text.accessPage.disclaimer}
        </Typography>,
      ]}
    />
  )
}
