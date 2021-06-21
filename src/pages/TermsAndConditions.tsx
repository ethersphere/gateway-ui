import { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { useHistory } from 'react-router-dom'

import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Header from '../components/Header'

import text from '../translations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      padding: theme.spacing(3),
      rowGap: theme.spacing(1),
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
      ]}
      center={[
        <Paper key="center1" className={classes.paper} square elevation={0}>
          <Typography key="top2" variant="button">
            {text.termsAndConditionsPage.header}
          </Typography>
          <Typography>
            Welcome to the Swarm Gateway (“<strong>Gateway</strong>”), currently being developed and graciously provided
            by the Swarm Association (“<strong>We</strong>”). Swarm is a peer-to-peer network of nodes that collectively
            provide a decentralized storage and communication service. Gateway is currently provided for testing
            purposes only.
          </Typography>
          <Typography>
            <strong>By testing Gateway, you accept the following terms:</strong>
          </Typography>
          <Typography>
            We make, at our sole discretion, Gateway available to you at no charge. You may choose to try Gateway at
            your sole discretion. Gateway testing is intended for evaluation purposes only and not for production use.
            It is currently <strong>not</strong> supported.
          </Typography>
          <Typography>
            Data storage and transfer through Gateway is <strong>not</strong> encrypted. Data storage through Gateway is
            not guaranteed in time and data may thus disappear, respectively be erased, at any time. Data storage
            through Gateway is decentralized and data can thus be stored in any jurisdiction by any peer user (node
            operator).
          </Typography>
          <Typography>
            In addition, for the testing of Gateway, you agree to <strong>not</strong> upload and transfer personal data
            and data that contain legally protected contents (including professional secrets). You agree to{' '}
            <strong>not</strong> use Gateway in a way that threatens the security, integrity or availability of the
            service. In particular, you shall not use Gateway to (i) store and/or transfer infringing, libelous, or
            otherwise unlawful or tortious material, (ii) store and/or transfer material in violation of third-party
            privacy rights, (iii) store and/or transfer malicious code, (iv) interfere with or disrupt the integrity or
            performance of any third-party service or data. You are solely responsible for the uploaded and downloaded
            files. You may only upload and/or transfer files that belong to you and/or that you are explicitly
            authorized to upload and/or transfer. You agree to defend, indemnify and hold harmless Swarm, as well as any
            and all persons involved in the provision of Gateway with respect to all claims, demands, liabilities, costs
            and/or expenses resulting from an illegal use of Gateway or its content.
          </Typography>
          <Typography>
            You acknowledge that Gateway is <strong>not</strong> free from bugs or errors and that Swarm bears{' '}
            <strong>no</strong> liability for any harm or damage arising out of or in connection with Gateway. We may
            discontinue Gateway at any time at our sole discretion. When testing Gateway, you acknowledge that we
            instantly and remotely collect statistical information about your actions and consent thereto. You grant us
            and our affiliates a worldwide, perpetual, irrevocable, royalty-free license to use and incorporate into our
            services any suggestion, enhancement request, recommendation, correction or other feedback provided by you
            relating to the operation of our services.
          </Typography>
          <Typography>
            We, and our licensors and content providers, reserve all of our rights, titles and interests in and to
            Gateway, including all of our related intellectual property rights. No rights are granted to you under any
            contractual document other than the rights necessary for testing Gateway.
          </Typography>
          <Typography>
            We reserve the right to modify these User Testing Terms and Conditions at any time. These User Testing Terms
            and Conditions are governed by and construed in accordance with Swiss law, without giving effect to its
            conflict of laws provisions. Regular courts and tribunals of the State of Neuchâtel, Switzerland, shall be
            competent to rule on any matters arising out of or relating to these Gateway User Testing Terms and
            Conditions, the competence of the Swiss Federal Tribunal being reserved.{' '}
          </Typography>
        </Paper>,
      ]}
      bottom={[]}
    />
  )
}

export default LandingPage
