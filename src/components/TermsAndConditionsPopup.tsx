import { ReactElement, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import { X, ArrowUp, Check, CornerUpLeft } from 'react-feather'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../Routes'

import Layout from './Layout'
import Logo from './Logo'
import Header from './Header'
import Footer from './Footer'

import text from '../translations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      minHeight: '100vh',
      zIndex: 1000,
      backgroundColor: theme.palette.background.default,
    },
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    ul: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      rowGap: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(3),
    },
    li: {
      textAlign: 'left',
      paddingLeft: '1.3rem',
      textIndent: '-1.2rem',
      '&::before': {
        content: '"🐝"',
      },
    },
  }),
)

export default function TermsAndConditionsPopup(): ReactElement | null {
  const classes = useStyles()
  const history = useHistory()

  const [agreedToTerms, setAgreedToTerms] = useState(Boolean(window.localStorage.getItem('agreedToTerms')))

  const handleAgree = () => {
    setAgreedToTerms(true)
    window.localStorage.setItem('agreedToTerms', Date.now().toString())
  }

  if (agreedToTerms) return null

  return (
    <div className={classes.root}>
      <Layout
        top={[
          <Header
            key="top1"
            rightAction={
              <IconButton
                onClick={() => {
                  history.push(ROUTES.LANDING_PAGE)
                }}
              >
                <X />
              </IconButton>
            }
          >
            {text.termsAndConditions.header}
          </Header>,
          <Typography key="top2" variant="subtitle1">
            {text.termsAndConditions.tagline1}{' '}
            <Link href={ROUTES.TERMS_AND_CONDITIONS}>{text.termsAndConditions.termsAndConditions}</Link>{' '}
            {text.termsAndConditions.tagline2}
          </Typography>,
        ]}
        center={[
          <div key="center">
            <Paper square elevation={0} className={classes.paper}>
              <Typography variant="subtitle1">{text.termsAndConditions.featuresAndLimitationsHeader}</Typography>
              <div className={classes.ul}>
                {text.termsAndConditions.featuresAndLimitations.map(t => (
                  <Typography key={t} className={classes.li} variant="body2">
                    {t}
                  </Typography>
                ))}
              </div>
              <small>
                {text.termsAndConditions.disclaimer1}{' '}
                <Link href={ROUTES.TERMS_AND_CONDITIONS}>{text.termsAndConditions.disclaimer2}</Link>
              </small>
            </Paper>
            <Button
              className={classes.button}
              size="small"
              style={{ marginTop: 2, paddingLeft: 16, paddingRight: 16 }}
              onClick={() => history.push(ROUTES.LANDING_PAGE)}
            >
              <CornerUpLeft />
              {text.accessPage.backAction}
              <CornerUpLeft style={{ opacity: 0 }} />
            </Button>
          </div>,
        ]}
        bottom={[
          <div key="bottom1" style={{ zIndex: 1000 }}>
            <Footer>
              <Button className={classes.button} size="large" onClick={handleAgree}>
                <Check />
                {text.termsAndConditions.agreeAction}
                <Check style={{ opacity: 0 }} />
              </Button>
            </Footer>
          </div>,
        ]}
      />
    </div>
  )
}
