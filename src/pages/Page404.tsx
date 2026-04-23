import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import type { ReactElement } from 'react'
import { AlertOctagon, ArrowLeft } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Logo from '../components/Logo'
import * as ROUTES from '../Routes'
import text from '../translations'

const Page404 = (): ReactElement => {
  const navigate = useNavigate()

  return (
    <Layout
      top={[
        <Header key="top1">
          <Logo />
        </Header>,
      ]}
      center={[
        <Paper
          key="center"
          square
          elevation={0}
          sx={theme => ({
            width: '100%',
            p: 2,
            pt: 6,
            pb: 6,
            display: 'flex',
            flexDirection: 'column',
            rowGap: theme.spacing(2),
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'space-between',
          })}
        >
          <AlertOctagon size={48} strokeWidth={0.5} />
          <Typography variant="subtitle1">{text.page404.header}</Typography>
          <Typography variant="body2">{text.page404.description}</Typography>
        </Paper>,
      ]}
      bottom={[
        <Footer key="bottom">
          <Button
            variant="contained"
            sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
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
