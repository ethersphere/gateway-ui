import { ReactElement, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, CornerUpLeft, Search } from 'react-feather'
import TextField from '@material-ui/core/TextField'

import Header from '../components/Header'
import Footer from '../components/Footer'

import * as ROUTES from '../Routes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      paddingTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
    },
    fullWidth: {
      padding: theme.spacing(2),
      width: '100%',
    },
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
)

export default function AccessPage(): ReactElement {
  const classes = useStyles()
  const history = useHistory()

  const [hash, setHash] = useState<string>('')

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.fullWidth}>
        <Header
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
        </Header>
        <div>You can access files on the Swarm network by pasting a Swarm hash (or ‘bzzhash’) below.</div>
      </div>
      <div className={classes.fullWidth}>
        <TextField
          className={classes.button}
          placeholder="Paste Swarm Hash Here"
          variant="filled"
          onChange={event => setHash(event.target.value)}
          value={hash}
          multiline
          style={{ backgroundColor: 'white' }}
        />
        <Button
          className={classes.button}
          size="small"
          style={{ marginTop: 2, paddingLeft: 16, paddingRight: 16, opacity: hash ? 1 : 0 }}
          onClick={() => setHash('')}
        >
          <CornerUpLeft />
          back
          <CornerUpLeft style={{ opacity: 0 }} />
        </Button>
      </div>
      <div className={classes.fullWidth}>
        {hash && (
          <Footer>
            <Button className={classes.button} onClick={() => history.push(ROUTES.ACCESS_HASH(hash))} size="large">
              <Search />
              Find
              <Search style={{ opacity: 0 }} />
            </Button>
          </Footer>
        )}
        <small style={{ opacity: hash ? 0 : 1 }}>
          Please note that we can’t guarantee availability or access to a specific file.
        </small>
      </div>
    </Container>
  )
}
