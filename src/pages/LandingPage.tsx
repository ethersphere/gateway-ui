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
        <Typography key="top2" variant="subtitle1">
          The easiest way to share & access files on the Swarm network.
        </Typography>,
      ]}
      center={[
        <Button key="center1" className={classes.button} size="large" onClick={() => history.push(ROUTES.SHARE)}>
          <ArrowUp />
          Share
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowUp style={{ opacity: 0 }} />
        </Button>,
        <Button key="center2" className={classes.button} size="large" onClick={() => history.push(ROUTES.ACCESS)}>
          <ArrowDown />
          Access
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowDown style={{ opacity: 0 }} />
        </Button>,
      ]}
      bottom={[
        <Typography key="bottom1" variant="subtitle2">
          The Swarm Gateway is operated by the Swarm Foundation. This service is under development and provided for
          testing purposes only. For unlimited use of the Swarm network consider running your own node.
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
