import { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { ArrowDown, ArrowUp } from 'react-feather'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useNavigate } from 'react-router-dom'
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
      flexWrap: 'wrap',
    },
    spreadItems: {
      cursor: 'pointer',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
)

const LandingPage = (): ReactElement => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <Layout
      top={[
        <Header key="top1">
          <Logo />
        </Header>,
        <Typography key="top2" variant="subtitle1">
          {text.landingPage.tagline}
        </Typography>,
      ]}
      center={[
        <Button
          key="center1"
          className={classes.button}
          size="large"
          variant="contained"
          onClick={() => navigate(ROUTES.SHARE)}
        >
          <ArrowUp strokeWidth={1} />
          {text.landingPage.shareAction}
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowUp style={{ opacity: 0 }} />
        </Button>,
        <Button
          key="center2"
          className={classes.button}
          size="large"
          variant="contained"
          onClick={() => navigate(ROUTES.BROWSE)}
        >
          <ArrowDown strokeWidth={1} />
          {text.landingPage.browseAction}
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowDown style={{ opacity: 0 }} />
        </Button>,
        <Button
          key="center2"
          className={classes.button}
          size="large"
          variant="contained"
          onClick={() => navigate(ROUTES.ACCESS)}
        >
          <ArrowDown strokeWidth={1} />
          {text.landingPage.accessAction}
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowDown style={{ opacity: 0 }} />
        </Button>,
      ]}
      bottom={[
        <Typography key="bottom1" variant="subtitle2">
          {text.landingPage.disclaimer}
        </Typography>,
        <Divider key="bottom2" variant="middle" />,
        <small key="bottom3" className={classes.spread}>
          {text.landingPage.links.map(({ label, link, internal }) => {
            let action: { href: string } | { onClick: () => void } = { href: link }

            if (internal) action = { onClick: () => navigate(link) }

            return (
              <Link
                key={label}
                className={classes.spreadItems}
                color="inherit"
                underline="always"
                target="blank"
                {...action}
              >
                {label}
              </Link>
            )
          })}
        </small>,
      ]}
    />
  )
}

export default LandingPage
