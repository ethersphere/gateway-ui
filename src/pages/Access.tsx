import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'
import { Code, ArrowLeft } from 'react-feather'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import QrReader from 'react-qr-reader'

import Header from '../components/Header'
import QRCodeModal from '../components/QRCodeModal'
import Tabs from '../components/Tabs'
import Footer from '../components/Footer'
import Upload from '../components/Upload'

import * as ROUTES from '../Routes'
import { Context } from '../providers/bee'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
    },
    rootWithBottomNav: {
      minHeight: `calc(100vh - ${theme.spacing(10)}px)`,
    },
    topNavigation: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      alignItems: 'center',
    },
    fullWidth: {
      width: '100%',
    },
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    imageWrapper: {
      padding: theme.spacing(2),
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
)

export default function AccessPage(): ReactElement {
  const classes = useStyles()
  const history = useHistory()

  const [isReadQR, setIsReadQR] = useState<boolean>(false)

  const handleScan = (data: string | null) => {
    if (data) {
      console.log(data) //eslint-disable-line
    }
  }
  const handleError = (err: Error) => {
    console.error(err) //eslint-disable-line
  }

  if (isReadQR) {
    return (
      <Container className={classes.root}>
        <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
      </Container>
    )
  }

  return (
    <Container className={classes.root}>
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
        <div>
          You can access files on the Swarm network by pasting a Swarm hash (or ‘bzzhash’) below. You can also scan a QR
          code.
        </div>
      </div>
      <div className={classes.fullWidth}>
        <Button className={classes.button} size="large">
          <Code />
          Paste Swarm Hash Here
          <Code style={{ opacity: 0 }} />
        </Button>
        <Button className={classes.button} size="small" style={{ marginTop: 2 }} onClick={() => setIsReadQR(true)}>
          Scan QR code
        </Button>
      </div>
      <div className={classes.fullWidth}>
        <small>Please note that we can’t guarantee availability or access to a specific file.</small>
      </div>
    </Container>
  )
}
