import { expect, Page, test } from '@playwright/test'
import path from 'path'
import { imageFile, videoFile } from './test-data'

const DATA_DIR = path.join(__dirname, 'test-data')

type FilePayload = { name: string; mimeType: string; buffer: Buffer }

async function goToUploadPreviewSingle(page: Page, file: FilePayload) {
  await page.addInitScript(() => localStorage.setItem('agreedToTerms', Date.now().toString()))
  await page.goto('/share')
  await page.getByTestId('file-input').setInputFiles(file)
  await expect(page.getByTestId('upload-button')).toBeVisible()
}

async function goToUploadPreviewDirectory(page: Page, dirName: 'website' | 'folder') {
  await page.addInitScript(() => localStorage.setItem('agreedToTerms', Date.now().toString()))
  await page.goto('/share')
  // webkitdirectory inputs require a real directory path in Playwright
  await page.getByTestId('folder-input').setInputFiles(path.join(DATA_DIR, dirName))
  await expect(page.getByTestId('upload-button')).toBeVisible()
}

async function completeUploadAndGetHash(page: Page): Promise<string> {
  await page.getByTestId('upload-button').click()
  await page.getByRole('tab', { name: 'Swarm hash' }).click()
  const hashEl = page.getByTestId('swarm-hash')
  await hashEl.waitFor({ timeout: 60000 })
  return ((await hashEl.textContent()) ?? '').trim()
}

// ─── IMAGE ───────────────────────────────────────────────────────────────────

test.describe('Upload preview — image', () => {
  test('shows an <img> preview element', async ({ page }) => {
    await goToUploadPreviewSingle(page, imageFile())
    // FitImage renders <img alt="Upload Preview">
    await expect(page.locator('img[alt="Upload Preview"]')).toBeAttached()
  })

  test('shows the filename in the metadata panel', async ({ page }) => {
    await goToUploadPreviewSingle(page, imageFile())
    await expect(page.getByText('photo.png')).toBeVisible()
  })

  test('shows the image MIME type label in the metadata panel', async ({ page }) => {
    await goToUploadPreviewSingle(page, imageFile())
    await expect(page.getByText('Portable Network Graphics')).toBeVisible()
  })

  test('upload succeeds and returns a Swarm hash', async ({ page }) => {
    await goToUploadPreviewSingle(page, imageFile())
    const hash = await completeUploadAndGetHash(page)
    expect(hash).toMatch(/^[a-f0-9]{64}$/i)
  })
})

// ─── VIDEO ───────────────────────────────────────────────────────────────────

test.describe('Upload preview — video', () => {
  test('shows a <video> player element', async ({ page }) => {
    await goToUploadPreviewSingle(page, videoFile())
    // FitVideo renders <video controls>
    await expect(page.locator('video')).toBeVisible()
  })

  test('shows the filename in the metadata panel', async ({ page }) => {
    await goToUploadPreviewSingle(page, videoFile())
    await expect(page.getByText('clip.webm')).toBeVisible()
  })

  test('does not show an image element', async ({ page }) => {
    await goToUploadPreviewSingle(page, videoFile())
    await expect(page.locator('img[alt="Upload Preview"]')).not.toBeAttached()
  })

  test('upload succeeds and returns a Swarm hash', async ({ page }) => {
    await goToUploadPreviewSingle(page, videoFile())
    const hash = await completeUploadAndGetHash(page)
    expect(hash).toMatch(/^[a-f0-9]{64}$/i)
  })
})

// ─── WEBSITE ─────────────────────────────────────────────────────────────────

test.describe('Upload preview — website', () => {
  test('header shows "Website" for a folder containing index.html', async ({ page }) => {
    await goToUploadPreviewDirectory(page, 'website')
    await expect(page.getByText('Website', { exact: true }).first()).toBeVisible()
  })

  test('type field in the metadata panel shows "Website"', async ({ page }) => {
    await goToUploadPreviewDirectory(page, 'website')
    await expect(page.getByText(/Type:.*Website/)).toBeVisible()
  })

  test('does not show an <img> or <video> element', async ({ page }) => {
    await goToUploadPreviewDirectory(page, 'website')
    await expect(page.locator('img[alt="Upload Preview"]')).not.toBeAttached()
    await expect(page.locator('video')).not.toBeAttached()
  })

  test('upload succeeds and returns a Swarm hash', async ({ page }) => {
    await goToUploadPreviewDirectory(page, 'website')
    const hash = await completeUploadAndGetHash(page)
    expect(hash).toMatch(/^[a-f0-9]{64}$/i)
  })
})

// ─── FOLDER ──────────────────────────────────────────────────────────────────

test.describe('Upload preview — folder', () => {
  test('header shows "Folder" for multiple files without index.html', async ({ page }) => {
    await goToUploadPreviewDirectory(page, 'folder')
    await expect(page.getByText('Folder', { exact: true }).first()).toBeVisible()
  })

  test('metadata panel shows the item count', async ({ page }) => {
    await goToUploadPreviewDirectory(page, 'folder')
    await expect(page.getByText('2 items')).toBeVisible()
  })

  test('metadata panel shows the folder name (directory base name)', async ({ page }) => {
    await goToUploadPreviewDirectory(page, 'folder')
    // Playwright passes files with the directory base name as the path prefix,
    // so getAssetNameFromFiles returns the directory name "folder"
    await expect(page.getByText('folder').first()).toBeVisible()
  })

  test('does not show an <img> or <video> element', async ({ page }) => {
    await goToUploadPreviewDirectory(page, 'folder')
    await expect(page.locator('img[alt="Upload Preview"]')).not.toBeAttached()
    await expect(page.locator('video')).not.toBeAttached()
  })

  test('upload succeeds and returns a Swarm hash', async ({ page }) => {
    await goToUploadPreviewDirectory(page, 'folder')
    const hash = await completeUploadAndGetHash(page)
    expect(hash).toMatch(/^[a-f0-9]{64}$/i)
  })
})
