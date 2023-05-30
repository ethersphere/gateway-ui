import type { ReactElement } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

// pages
import {
  Access,
  AccessHash,
  Browse,
  LandingPage,
  Share,
  Page404,
  TermsAndConditions,
  RedirectToDownload,
} from './pages'

export const LANDING_PAGE = '/'
export const ACCESS = '/access'
export const ACCESS_HASH = (hash = ':hash'): string => `/access/${hash}`
export const BROWSE = '/browse'
export const SHARE = '/share'
export const TERMS_AND_CONDITIONS = '/termsandconditions'

// ENS compatibility
export const BZZ = '/bzz/:hash'

const BaseRouter = (): ReactElement => (
  <BrowserRouter>
    <Routes>
      <Route path={LANDING_PAGE} element={<LandingPage />} />
      <Route path={SHARE} element={<Share />} />
      <Route path={BROWSE} element={<Browse />} />
      <Route path={ACCESS} element={<Access />} />
      <Route path={ACCESS_HASH()} element={<AccessHash />} />
      <Route path={TERMS_AND_CONDITIONS} element={<TermsAndConditions />} />

      {/* ENS compatibility, redirect to download directly*/}
      <Route path={BZZ} element={<RedirectToDownload />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
)

export default BaseRouter
