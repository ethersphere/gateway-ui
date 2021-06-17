import type { ReactElement } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

export const LANDING_PAGE = '/'
export const ACCESS = '/access'
export const ACCESS_HASH = (hash = ':hash') => `/access/${hash}`
export const SHARE = '/share'

// pages
import { Access, AccessHash, LandingPage, Share, Page404 } from './pages'

const BaseRouter = (): ReactElement => (
  <BrowserRouter>
    <Switch>
      <Route exact path={LANDING_PAGE} component={LandingPage} />
      <Route exact path={SHARE} component={Share} />
      <Route exact path={ACCESS} component={Access} />
      <Route exact path={ACCESS_HASH()} component={AccessHash} />
      <Route path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
)

export default BaseRouter
