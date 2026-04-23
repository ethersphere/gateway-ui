import { defineConfig, devices } from '@playwright/test'
import { config } from 'dotenv'

config() // loads .env if present

const beeNodeUrl = process.env.BEE_NODE_URL
if (!beeNodeUrl) {
  throw new Error('BEE_NODE_URL is not set. Copy .env.example to .env and set the value.')
}

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 1,
  timeout: 90000,
  globalSetup: './e2e/global-setup',
  use: {
    baseURL: 'http://localhost:3030',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // BEE_PROXY_TARGET enables vite.config.ts to proxy Bee API requests, avoiding CORS.
    // VITE_BEE_HOSTS must match the dev server origin so proxying works.
    command: `BEE_PROXY_TARGET=${beeNodeUrl} VITE_BEE_HOSTS=http://localhost:3030 npm run start -- --port 3030`,
    url: 'http://localhost:3030',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
})
