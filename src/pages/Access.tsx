import { ReactElement, useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useNavigate } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, CornerUpLeft, Search } from 'react-feather'
import Tooltip from '@material-ui/core/Tooltip'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import { Utils } from '@ethersphere/bee-js'
import { decodeCid } from '@ethersphere/swarm-cid'

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
      display: 'flex',
      justifyContent: 'space-between',
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
              className={classes.button}
              placeholder={text.accessPage.textfieldPlaceholder}
              onChange={event => setHash(recognizeSwarmHash(event.target.value))}
              value={hash}
              multiline
              style={{ backgroundColor: 'white' }}
            />
          </Tooltip>
          <Button
            variant="contained"
            key="center2"
            className={classes.button}
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
                variant="contained"
                className={classes.button}
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
