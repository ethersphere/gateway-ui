import type { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { X, Check, CornerUpLeft, ArrowRight } from 'react-feather'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Routes'

import Layout from './Layout'
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
      display: 'grid',
      gridAutoRows: 'auto',
      gridTemplateColumns: '1rem 1fr',
      gridTemplateRows: 'min-content',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      rowGap: theme.spacing(1),
      columnGap: theme.spacing(2),
      textAlign: 'left',
    },
    paper: {
      padding: theme.spacing(3),
    },
  }),
)

interface Props {
  handleAgree: () => void
}

export default function TermsAndConditionsPopup({ handleAgree }: Props): ReactElement | null {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <Layout
      top={[
        <Header
          key="top1"
          rightAction={
            <IconButton onClick={() => navigate(ROUTES.LANDING_PAGE)}>
              <X strokeWidth={1} />
            </IconButton>
          }
        >
          {text.termsAndConditions.header}
        </Header>,
        <Typography key="top2" variant="subtitle1">
          {text.termsAndConditions.tagline1}{' '}
          <Link href={ROUTES.TERMS_AND_CONDITIONS} color="inherit" underline="always" target="blank">
            {text.termsAndConditions.termsAndConditions}
          </Link>{' '}
          {text.termsAndConditions.tagline2}
        </Typography>,
      ]}
      center={[
        <div key="center">
          <Paper square elevation={0} className={classes.paper}>
            <div className={classes.ul}>
              {text.termsAndConditions.featuresAndLimitations.map(t => [
                <Typography key={`${t}-bee`} variant="body1">
                  <ArrowRight strokeWidth={1} />
                </Typography>,
                <Typography key={`${t}-text`} variant="body1">
                  {t}
                </Typography>,
              ])}
            </div>
            <Typography variant="body2">
              {text.termsAndConditions.disclaimer1}{' '}
              <Link href={ROUTES.TERMS_AND_CONDITIONS} color="inherit" underline="always" target="blank">
                {text.termsAndConditions.disclaimer2}
              </Link>
            </Typography>
          </Paper>
          <Button
            variant="contained"
            className={classes.button}
            size="small"
            style={{ marginTop: 2, paddingLeft: 16, paddingRight: 16 }}
            onClick={() => navigate(ROUTES.LANDING_PAGE)}
          >
            <CornerUpLeft strokeWidth={1} />
            {text.accessPage.backAction}
            <CornerUpLeft style={{ opacity: 0 }} />
          </Button>
        </div>,
      ]}
      bottom={[
        <div key="bottom1" style={{ zIndex: 1000 }}>
          <Footer>
            <Button variant="contained" className={classes.button} size="large" onClick={handleAgree}>
              <Check strokeWidth={1} />
              {text.termsAndConditions.agreeAction}
              <Check style={{ opacity: 0 }} />
            </Button>
          </Footer>
        </div>,
      ]}
    />
  )
}
