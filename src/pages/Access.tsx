import { ReactElement, useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, CornerUpLeft, Search } from 'react-feather'
import TextField from '@material-ui/core/TextField'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'

import * as ROUTES from '../Routes'

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

export default function AccessPage(): ReactElement {
  const classes = useStyles()
  const history = useHistory()

  const [hash, setHash] = useState<string>('')

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
          Access
        </Header>,
        <div key="top2">You can access files on the Swarm network by pasting a Swarm hash (or ‘bzzhash’) below.</div>,
      ]}
      center={[
        <TextField
          key="center1"
          className={classes.button}
          placeholder="Paste Swarm Hash Here"
          variant="filled"
          onChange={event => setHash(event.target.value)}
          value={hash}
          multiline
          style={{ backgroundColor: 'white' }}
        />,
        <Button
          key="center2"
          className={classes.button}
          size="small"
          style={{ marginTop: 2, paddingLeft: 16, paddingRight: 16, opacity: hash ? 1 : 0 }}
          onClick={() => setHash('')}
        >
          <CornerUpLeft />
          back
          <CornerUpLeft style={{ opacity: 0 }} />
        </Button>,
      ]}
      bottom={[
        <div key="bottom1" className={classes.footerReservedSpace}>
          {hash && (
            <Footer>
              <Button className={classes.button} onClick={() => history.push(ROUTES.ACCESS_HASH(hash))} size="large">
                <Search />
                Find
                <Search style={{ opacity: 0 }} />
              </Button>
            </Footer>
          )}
        </div>,
        <small key="bottom2" style={{ opacity: hash ? 0 : 1 }}>
          Please note that we can’t guarantee availability or access to a specific file.
        </small>,
      ]}
    />
  )
}
