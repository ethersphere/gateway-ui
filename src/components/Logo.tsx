import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import logo from '../assets/gatewayLogo.svg'
import * as ROUTES from '../Routes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      color: theme.palette.text.primary,
    },
  }),
)

export default function LogoComponent(): ReactElement {
  const classes = useStyles()

  return (
    <Link to={ROUTES.LANDING_PAGE}>
      <img className={classes.img} src={logo} alt="logo" />
    </Link>
  )
}
