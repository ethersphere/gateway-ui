import { ReactElement, useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useNavigate } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, CornerUpLeft, Search } from 'react-feather'
import Typography from '@material-ui/core/Typography'
import { Utils } from '@ethersphere/bee-js'

import { fetchKVs } from '../providers/fairos'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'

import * as ROUTES from '../Routes'

import text from '../translations'

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

export default function BrowsePage(): ReactElement {
  const classes = useStyles()
  const navigate = useNavigate()

  const [hash, setHash] = useState<string>('')
  const [list, setList] = useState<{ [key: string]: string }>({})
  const [hashError, setHashError] = useState<boolean>(false)

  useEffect(() => {
    if (!hash || Utils.isHexString(hash, 64) || Utils.isHexString(hash, 128)) setHashError(false)
    else setHashError(true)

    fetchKVs().then(res => {
      setList(res)
    })
  }, [hash, list])

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
          {text.browsePage.header}
        </Header>,
        <Typography key="top2" variant="subtitle1">
          {text.browsePage.tagline}
        </Typography>,
      ]}
      center={[
        <div key="center1">
          <ul>
            {Object.keys(list).map(name => (
              <li key={name}>
                <a href={ROUTES.ACCESS_HASH(list[name])}>{name}</a>
              </li>
            ))}
          </ul>

          <Button
            variant="contained"
            key="center2"
            className={classes.button}
            size="small"
            style={{ marginTop: 2, paddingLeft: 16, paddingRight: 16, opacity: hash ? 1 : 0 }}
            onClick={() => setHash('')}
          >
            <CornerUpLeft />
            {text.browsePage.backAction}
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
                {text.browsePage.findAction}
                <Search style={{ opacity: 0 }} />
              </Button>
            )}
          </div>
        </Footer>,
        <Typography key="bottom2" variant="body2" style={{ opacity: hash ? 0 : 1 }}>
          {text.browsePage.disclaimer}
        </Typography>,
      ]}
    />
  )
}
