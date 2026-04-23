import { expect, test } from '@playwright/test'
import fs from 'fs'
import path from 'path'

function readHash(name: string): string {
  return fs.readFileSync(path.join(__dirname, `.test-hash-${name}`), 'utf-8').trim()
}

test.describe('Access hash page — image', () => {
  test('shows an <img> preview element', async ({ page }) => {
    await page.goto(`/access/${readHash('image')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    // FitImage renders <img alt="Upload Preview"> when metadata.isImage is true
    await expect(page.locator('img[alt="Upload Preview"]')).toBeVisible()
  })

  test('shows the filename in the metadata panel', async ({ page }) => {
    await page.goto(`/access/${readHash('image')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    await expect(page.getByText('photo.png')).toBeVisible()
  })

  test('does not show a video element', async ({ page }) => {
    await page.goto(`/access/${readHash('image')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    await expect(page.locator('video')).not.toBeAttached()
  })
})

test.describe('Access hash page — video', () => {
  test('shows a <video> player element', async ({ page }) => {
    await page.goto(`/access/${readHash('video')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    // FitVideo renders <video controls> when metadata.isVideo is true
    await expect(page.locator('video')).toBeVisible()
  })

  test('shows the filename in the metadata panel', async ({ page }) => {
    await page.goto(`/access/${readHash('video')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    await expect(page.getByText('clip.webm')).toBeVisible()
  })

  test('does not show an image element', async ({ page }) => {
    await page.goto(`/access/${readHash('video')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    await expect(page.locator('img[alt="Upload Preview"]')).not.toBeAttached()
  })
})

test.describe('Access hash page — website', () => {
  test('shows the "open bzz link" button for a website', async ({ page }) => {
    await page.goto(`/access/${readHash('website')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    await expect(page.getByText('open bzz link')).toBeVisible()
  })

  test('type field in the metadata panel shows "Website"', async ({ page }) => {
    await page.goto(`/access/${readHash('website')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    await expect(page.getByText(/Type:.*Website/)).toBeVisible()
  })

  test('does not show an <img> or <video> element', async ({ page }) => {
    await page.goto(`/access/${readHash('website')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    await expect(page.locator('img[alt="Upload Preview"]')).not.toBeAttached()
    await expect(page.locator('video')).not.toBeAttached()
  })
})

test.describe('Access hash page — folder', () => {
  test('shows the download button for a folder', async ({ page }) => {
    await page.goto(`/access/${readHash('folder')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    await expect(page.getByTestId('download-button')).toBeVisible()
  })

  test('metadata panel shows the item count', async ({ page }) => {
    await page.goto(`/access/${readHash('folder')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    // The folder has 2 content files + 1 metadata file = 3 entries; the app
    // displays the count from the stored metadata which was 2 at upload time
    await expect(page.getByText('2 items')).toBeVisible()
  })

  test('does not show an <img> or <video> element', async ({ page }) => {
    await page.goto(`/access/${readHash('folder')}`)
    await page.getByTestId('download-button').waitFor({ timeout: 60000 })
    await expect(page.locator('img[alt="Upload Preview"]')).not.toBeAttached()
    await expect(page.locator('video')).not.toBeAttached()
  })
})
