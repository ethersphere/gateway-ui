import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { ReactElement } from 'react'
import { ArrowDown, ArrowUp } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Routes'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Logo from '../components/Logo'
import text from '../translations'

const buttonStyle = { width: '100%', display: 'flex', justifyContent: 'space-between' }

const LandingPage = (): ReactElement => {
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
        <Button key="center1" sx={buttonStyle} size="large" variant="contained" onClick={() => navigate(ROUTES.SHARE)}>
          <ArrowUp strokeWidth={1} />
          {text.landingPage.shareAction}
          {/* Needed to properly align icon to the right and label to center */}
          <ArrowUp style={{ opacity: 0 }} />
        </Button>,
        <Button key="center2" sx={buttonStyle} size="large" variant="contained" onClick={() => navigate(ROUTES.ACCESS)}>
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
        <small key="bottom3" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {text.landingPage.links.map(({ label, link, internal }) => {
            let action: { href: string } | { onClick: () => void } = { href: link }

            if (internal) action = { onClick: () => navigate(link) }

            return (
              <Link
                key={label}
                sx={{ mx: 1, cursor: 'pointer' }}
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
