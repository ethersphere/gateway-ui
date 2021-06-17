import { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import { ArrowDown, ArrowUp } from 'react-feather'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../Routes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
    },
    buttonContainer: {
      width: '100%',
    },
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    disclaimerItems: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
)

const LandingPage = (): ReactElement => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Container className={classes.root}>
      <Typography variant="subtitle1">The easiest way to share and access files on the Swarm network</Typography>
      <div className={classes.buttonContainer}>
        <Button className={classes.button} size="large" onClick={() => history.push(ROUTES.SHARE)}>
          <ArrowUp />
          Share
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowUp style={{ opacity: 0 }} />
        </Button>
        <Button className={classes.button} size="large" onClick={() => history.push(ROUTES.ACCESS)}>
          <ArrowDown />
          Acccess
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowDown style={{ opacity: 0 }} />
        </Button>
      </div>
      <div>
        <Typography className={classes.disclaimerItems}>
          This service is currently provided for testing purposes only.
        </Typography>
        <Divider variant="middle" className={classes.disclaimerItems} />
        <small className={classes.disclaimerItems}>
          By using the Swarm Gateway, you agree to our <a href="#">Terms & Conditions</a>
        </small>
      </div>
    </Container>
  )
}

export default LandingPage
