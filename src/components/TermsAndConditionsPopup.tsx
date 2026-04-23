import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import type { ReactElement } from 'react'
import { ArrowRight, Check, CornerUpLeft, X } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Routes'

import Footer from './Footer'
import Header from './Header'
import Layout from './Layout'

import text from '../translations'

const buttonStyle = { width: '100%', display: 'flex', justifyContent: 'space-between' }

interface Props {
  handleAgree: () => void
}

export default function TermsAndConditionsPopup({ handleAgree }: Props): ReactElement | null {
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
          <Paper square elevation={0} sx={theme => ({ padding: theme.spacing(3) })}>
            <div
              style={{
                display: 'grid',
                gridAutoRows: 'auto',
                gridTemplateColumns: '1rem 1fr',
                gridTemplateRows: 'min-content',
                paddingTop: 24,
                paddingBottom: 24,
                rowGap: 8,
                columnGap: 16,
                textAlign: 'left',
              }}
            >
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
            sx={buttonStyle}
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
            <Button data-testid="agree-button" variant="contained" sx={buttonStyle} size="large" onClick={handleAgree}>
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
