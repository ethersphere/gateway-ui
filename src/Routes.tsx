import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Access, AccessHash, LandingPage, Page404, RedirectToDownload, Share, TermsAndConditions } from './pages'

export const LANDING_PAGE = '/'
export const ACCESS = '/access'
export const ACCESS_HASH = (hash = ':hash'): string => `/access/${hash}`
export const SHARE = '/share'
export const TERMS_AND_CONDITIONS = '/termsandconditions'

// ENS compatibility
export const BZZ = '/bzz/:hash'

const BaseRouter = (): ReactElement => (
  <BrowserRouter>
    <Routes>
      <Route path={LANDING_PAGE} element={<LandingPage />} />
      <Route path={SHARE} element={<Share />} />
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
