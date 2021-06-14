import type { ReactElement } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

export const LANDING_PAGE = '/'
export const ACCESS = '/access'
export const SHARE = '/share'

// pages
import { LandingPage, Share, Page404 } from './pages'

const BaseRouter = (): ReactElement => (
  <BrowserRouter>
    <Switch>
      <Route exact path={LANDING_PAGE} component={LandingPage} />
      <Route exact path={SHARE} component={Share} />
      <Route path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
)

export default BaseRouter
