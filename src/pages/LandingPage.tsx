import { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { ArrowDown, ArrowUp } from 'react-feather'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../Routes'

import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Header from '../components/Header'

import text from '../translations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    spread: {
      display: 'flex',
      justifyContent: 'center',
      columnGap: theme.spacing(2),
      flexWrap: 'wrap',
      textDecoration: 'underline',
    },
  }),
)

const LandingPage = (): ReactElement => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Layout
      top={[
        <Header key="top1">
          <Logo />
        </Header>,
        <Typography key="top2" variant="subtitle1">
          {text.langingPage.tagline}
        </Typography>,
      ]}
      center={[
        <Button key="center1" className={classes.button} size="large" onClick={() => history.push(ROUTES.SHARE)}>
          <ArrowUp />
          {text.langingPage.shareAction}
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowUp style={{ opacity: 0 }} />
        </Button>,
        <Button key="center2" className={classes.button} size="large" onClick={() => history.push(ROUTES.ACCESS)}>
          <ArrowDown />
          {text.langingPage.accessAction}
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowDown style={{ opacity: 0 }} />
        </Button>,
      ]}
      bottom={[
        <Typography key="bottom1" variant="subtitle2">
          {text.langingPage.disclaimer}
        </Typography>,
        <Divider key="bottom2" variant="middle" />,
        <small key="bottom3" className={classes.spread}>
          <Link href="#" color="inherit">
            Swarm Website
          </Link>
          <Link href="#" color="inherit">
            FAQ
          </Link>
          <Link href="#" color="inherit">
            Discord
          </Link>
          <Link href="#" color="inherit">
            Github
          </Link>
          <Link href="#" color="inherit">
            Terms & Conditions
          </Link>
        </small>,
      ]}
    />
  )
}

export default LandingPage
