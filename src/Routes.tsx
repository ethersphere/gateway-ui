import type { ReactElement } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

// pages
import { Access, AccessHash, LandingPage, Share, Page404, TermsAndConditions, RedirectToDownload } from './pages'

export const LANDING_PAGE = '/'
export const ACCESS = '/access'
export const ACCESS_HASH = (hash = ':hash'): string => `/access/${hash}`
export const SHARE = '/share'
export const TERMS_AND_CONDITIONS = '/termsandconditions'

// ENS compatibility
export const BZZ = '/bzz/:hash'

const BaseRouter = (): ReactElement => (
  <BrowserRouter>
    <Switch>
      <Route exact path={LANDING_PAGE} component={LandingPage} />
      <Route exact path={SHARE} component={Share} />
      <Route exact path={ACCESS} component={Access} />
      <Route exact path={ACCESS_HASH()} component={AccessHash} />
      <Route exact path={TERMS_AND_CONDITIONS} component={TermsAndConditions} />

      {/* ENS compatibility, redirect to download directly*/}
      <Route exact path={BZZ} component={RedirectToDownload} />
      <Route path="*" component={Page404} />
    </Switch>
  </BrowserRouter>
)

export default BaseRouter
