import { defineConfig } from 'vite'

// When BEE_PROXY_TARGET is set, proxy all Bee API endpoints through the dev server
// to avoid CORS issues (used in e2e tests).
const beeProxyTarget = process.env.BEE_PROXY_TARGET

export default defineConfig({
  server: {
    proxy: beeProxyTarget
      ? {
          '/bzz': { target: beeProxyTarget, changeOrigin: true },
          '/bytes': { target: beeProxyTarget, changeOrigin: true },
          '/chunks': { target: beeProxyTarget, changeOrigin: true },
        }
      : {},
  },
})
