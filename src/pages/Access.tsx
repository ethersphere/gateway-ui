import { ReactElement, useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import InputBase from '@material-ui/core/InputBase'
import { Utils } from '@ethersphere/bee-js'
import { decodeCid } from '@ethersphere/swarm-cid'

import { Button, Typography, IconButton } from '../components/swarm-ui'
import { ArrowLeftLine, SearchLine } from '../components/swarm-ui/icons'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'

import * as ROUTES from '../Routes'

import text from '../translations'
import { BZZ_LINK_DOMAIN } from '../constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '100%',
    },
    input: {
      width: '100%',
    },
    footerReservedSpace: {
      height: theme.spacing(10), // Filler space so that the layout of the page does not change as users write text
    },
  }),
)

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
    const decodeResult = decodeCid(cid)

    if (!decodeResult.type) {
      return
    }

    return decodeResult.reference
  } catch (e) {
    return
  }
}

function recognizeSwarmHash(value: string): string {
  return extractSwarmHash(value) || extractSwarmCid(value) || value
}

export default function AccessPage(): ReactElement {
  const classes = useStyles()
  const navigate = useNavigate()

  const [hash, setHash] = useState<string>('')
  const [hashError, setHashError] = useState<boolean>(false)

  useEffect(() => {
    if (!hash || Utils.isHexString(hash, 64) || Utils.isHexString(hash, 128)) setHashError(false)
    else setHashError(true)
  }, [hash])

  return (
    <Layout
      top={[
        <Header
          key="top1"
          leftAction={<IconButton onClick={() => navigate(ROUTES.LANDING_PAGE)} icon={<ArrowLeftLine />} />}
        >
          {text.accessPage.header}
        </Header>,
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
              className={classes.input}
              placeholder="Paste Swarm Hash Here"
              onChange={event => setHash(recognizeSwarmHash(event.target.value))}
              value={hash}
              multiline
              style={{ backgroundColor: 'white' }}
            />
          </Tooltip>
          <div style={{ marginTop: 8 }}>
            <Button
              variant="primary"
              className={classes.button}
              disabled={!hash || hashError}
              onClick={() => navigate(ROUTES.ACCESS_HASH(hash))}
              icon={<SearchLine />}
            >
              {text.accessPage.findAction}
            </Button>
          </div>
        </div>,
      ]}
      bottom={[
        <Typography key="bottom2" variant="caption">
          {text.accessPage.disclaimer}
        </Typography>,
      ]}
    />
  )
}
