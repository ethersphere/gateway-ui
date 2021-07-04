import { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../Routes'

import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Header from '../components/Header'
import { Button } from '../components/Button'

import text from '../translations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spread: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    spreadItems: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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
          {text.landingPage.tagline}
        </Typography>,
      ]}
      center={[
        <Button
          key="center1"
          icon="ArrowUp"
          size="large"
          variant="contained"
          onClick={() => history.push(ROUTES.SHARE)}
        >
          {text.landingPage.shareAction}
        </Button>,
        <Button
          key="center2"
          icon="ArrowDown"
          size="large"
          variant="contained"
          onClick={() => history.push(ROUTES.ACCESS)}
        >
          {text.landingPage.accessAction}
        </Button>,
      ]}
      bottom={[
        <Typography key="bottom1" variant="subtitle2">
          {text.landingPage.disclaimer}
        </Typography>,
        <Divider key="bottom2" variant="middle" />,
        <small key="bottom3" className={classes.spread}>
          {text.landingPage.links.map(({ label, link }) => (
            <Link
              key={label}
              className={classes.spreadItems}
              href={link}
              color="inherit"
              underline="always"
              target="blank"
            >
              {label}
            </Link>
          ))}
        </small>,
      ]}
    />
  )
}

export default LandingPage
