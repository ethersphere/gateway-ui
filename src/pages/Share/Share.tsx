import type { ReactElement } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import { ArrowLeft, Clipboard } from 'react-feather'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Tabs from '../../components/Tabs'
import Layout from '../../components/Layout'

import * as ROUTES from '../../Routes'
import { GATEWAY_URL } from '../../constants'

interface Props {
  uploadReference: string
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
)

const SharePage = ({ uploadReference }: Props): ReactElement => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Layout
      top={[
        <Header
          key="top1"
          leftAction={
            <IconButton
              onClick={() => {
                history.push(ROUTES.LANDING_PAGE)
              }}
            >
              <ArrowLeft />
            </IconButton>
          }
        >
          Share
        </Header>,
        <small key="top2">Share with a Swarm hash (a.k.a. ‘bzzhash’) or a web link.</small>,
      ]}
      center={[
        <Tabs
          key="center2"
          values={[
            {
              label: 'Web link',
              component: (
                <Paper
                  square
                  elevation={0}
                  style={{ overflowWrap: 'break-word', textAlign: 'left', padding: 16, margin: 4 }}
                >
                  <Typography variant="caption">{`${GATEWAY_URL}${ROUTES.ACCESS_HASH(uploadReference)}`}</Typography>
                </Paper>
              ),
            },
            {
              label: 'Swarm hash',
              component: (
                <Paper
                  square
                  elevation={0}
                  style={{ overflowWrap: 'break-word', textAlign: 'left', padding: 16, margin: 4 }}
                >
                  <Typography variant="caption">{uploadReference}</Typography>
                </Paper>
              ),
            },
          ]}
        />,
        <small key="center2">
          Thundercats post-ironic messenger bag chartreuse, fam neutra cloud bread cray fingerstache microdosing mlkshk
          iceland.
        </small>,
      ]}
      bottom={[
        <Footer key="bottom">
          <Button className={classes.button} size="large">
            <Clipboard />
            Copy
            {/* Needed to properly align icon to the right and label to center */}
            <Clipboard style={{ opacity: 0 }} />
          </Button>
        </Footer>,
      ]}
    />
  )
}

export default SharePage
