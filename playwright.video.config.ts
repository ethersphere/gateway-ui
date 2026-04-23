import { defineConfig, devices } from '@playwright/test'
import base from './playwright.config'

export default defineConfig({
  ...base,
  retries: 0,
  use: {
    ...base.use,
    video: 'on',
    // slowMo adds a delay (ms) between every Playwright action so recordings
    // are watchable at normal playback speed.
    launchOptions: {
      slowMo: 600,
    },
    // Slightly larger viewport so content is easy to read in recordings.
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: 'chromium-video',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Keep video recordings separate from regular test-results.
  outputDir: 'test-results-video',
})
