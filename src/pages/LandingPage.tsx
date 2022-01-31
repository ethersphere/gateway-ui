import { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import { ArrowDown, ArrowUp } from 'react-feather'
import Link from '@material-ui/core/Link'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Routes'

import { Typography, Button } from '../components/swarm-ui'

import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Header from '../components/Header'

import text from '../translations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
        <Typography key="top2" variant="body">
          {text.landingPage.tagline}
        </Typography>,
      ]}
      center={[
        <div key="center1" style={{ display: 'flex', flexFlow: 'row' }}>
          <Button
            style={{ flexBasis: 100, flexGrow: 1 }}
            variant="primary"
            onClick={() => navigate(ROUTES.SHARE)}
            icon={<ArrowUp strokeWidth={1} size={10} />}
          >
            {text.landingPage.shareAction}
          </Button>
          <Button
            style={{ flexBasis: 100, flexGrow: 1 }}
            variant="primary"
            onClick={() => navigate(ROUTES.ACCESS)}
            icon={<ArrowDown strokeWidth={1} size={10} />}
          >
            {text.landingPage.accessAction}
          </Button>
        </div>,
      ]}
      bottom={[
        <Typography key="bottom1" variant="caption">
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
