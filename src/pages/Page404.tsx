import type { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { ArrowLeft, AlertOctagon } from 'react-feather'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Footer from '../components/Footer'

import * as ROUTES from '../Routes'

import text from '../translations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(2),
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      rowGap: theme.spacing(2),
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
    },
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
)

const Page404 = (): ReactElement => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <Layout
      top={[
        <Header key="top1">
          <Logo />
        </Header>,
      ]}
      center={[
        <Paper key="center" square elevation={0} className={classes.root}>
          <AlertOctagon size={48} strokeWidth={0.5} />
          <Typography variant="subtitle1">{text.page404.header}</Typography>
          <Typography variant="body2">{text.page404.description}</Typography>
        </Paper>,
      ]}
      bottom={[
        <Footer key="bottom">
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              navigate(ROUTES.LANDING_PAGE)
            }}
            size="large"
          >
            <ArrowLeft strokeWidth={1} />
            {text.page404.goBackAction}
            <ArrowLeft style={{ opacity: 0 }} />
          </Button>
        </Footer>,
      ]}
    />
  )
}

export default Page404
