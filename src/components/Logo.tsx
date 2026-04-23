import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/gatewayLogo.svg'
import * as ROUTES from '../Routes'

export default function LogoComponent(): ReactElement {
  return (
    <Link to={ROUTES.LANDING_PAGE}>
      <img src={logo} alt="logo" />
    </Link>
  )
}
