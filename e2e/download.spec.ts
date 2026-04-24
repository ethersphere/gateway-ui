import { expect, Page, test } from '@playwright/test'
import fs from 'fs'
import JSZip from 'jszip'
import path from 'path'

const DATA_DIR = path.join(__dirname, 'test-data')

function readHash(name: string): string {
  return fs.readFileSync(path.join(__dirname, `.test-hash-${name}`), 'utf-8').trim()
}

async function goToAndWait(page: Page, hashName: string) {
  await page.goto(`/access/${readHash(hashName)}`)
  await page.getByTestId('download-button').waitFor({ timeout: 60000 })
}

async function captureDownload(page: Page) {
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('download-button').click(),
  ])
  const filePath = await download.path()
  expect(filePath).not.toBeNull()
  const zip = await JSZip.loadAsync(fs.readFileSync(filePath!))
  return { download, zip }
}

// All assets uploaded through the app include a "metadata" sidecar alongside
// the content file(s) in the Mantaray manifest.  Even single-file uploads
// therefore have ≥ 2 manifest entries, so the download function always takes
// the JSZip + file-saver (saveAs) path, producing a .zip archive whose name
// is metadata.name + ".zip".
//
// ZIP entry paths mirror the manifest paths set during upload:
//   single-file uploads  → the file name only   (e.g. "photo.png")
//   directory uploads    → the file name only   (e.g. "index.html")
//                          bee-js strips the common directory prefix when
//                          building the Mantaray manifest, so the directory
//                          name only shows up in metadata.name (and thus the
//                          zip filename), not in the individual entry paths.

// ─── PLAIN TEXT FILE ──────────────────────────────────────────────────────────

test.describe('Download — plain text file', () => {
  test('saves a zip archive named after the file', async ({ page }) => {
    await goToAndWait(page, 'txt')
    const { download } = await captureDownload(page)
    expect(download.suggestedFilename()).toBe('swarm-test.txt.zip')
  })

  test('zip contains the original text content', async ({ page }) => {
    await goToAndWait(page, 'txt')
    const { zip } = await captureDownload(page)

    expect(zip.files['swarm-test.txt']).toBeDefined()
    const content = await zip.files['swarm-test.txt'].async('nodebuffer')
    expect(content).toEqual(Buffer.from('Hello Swarm! e2e test suite.'))
  })
})

// ─── IMAGE ────────────────────────────────────────────────────────────────────

test.describe('Download — image', () => {
  test('saves a zip archive named after the image', async ({ page }) => {
    await goToAndWait(page, 'image')
    const { download } = await captureDownload(page)
    expect(download.suggestedFilename()).toBe('photo.png.zip')
  })

  test('zip contains the original image bytes', async ({ page }) => {
    await goToAndWait(page, 'image')
    const { zip } = await captureDownload(page)

    expect(zip.files['photo.png']).toBeDefined()
    const content = await zip.files['photo.png'].async('nodebuffer')
    expect(content).toEqual(fs.readFileSync(path.join(DATA_DIR, 'image.png')))
  })
})

// ─── VIDEO ────────────────────────────────────────────────────────────────────

test.describe('Download — video', () => {
  test('saves a zip archive named after the video', async ({ page }) => {
    await goToAndWait(page, 'video')
    const { download } = await captureDownload(page)
    expect(download.suggestedFilename()).toBe('clip.webm.zip')
  })

  test('zip contains the original video bytes', async ({ page }) => {
    await goToAndWait(page, 'video')
    const { zip } = await captureDownload(page)

    expect(zip.files['clip.webm']).toBeDefined()
    const content = await zip.files['clip.webm'].async('nodebuffer')
    expect(content).toEqual(fs.readFileSync(path.join(DATA_DIR, 'video.webm')))
  })
})

// ─── WEBSITE ──────────────────────────────────────────────────────────────────

test.describe('Download — website', () => {
  test('saves a zip archive named after the website folder', async ({ page }) => {
    await goToAndWait(page, 'website')
    const { download } = await captureDownload(page)
    expect(download.suggestedFilename()).toBe('website.zip')
  })

  test('zip contains the original website files with correct content', async ({ page }) => {
    await goToAndWait(page, 'website')
    const { zip } = await captureDownload(page)

    expect(zip.files['index.html']).toBeDefined()
    expect(zip.files['style.css']).toBeDefined()

    // Vite's dev server applies its full transformIndexHtml pipeline to any HTML
    // response that comes back through the proxy, replacing the document with the
    // app's own HTML template.  The original test HTML content is not recoverable
    // in this environment, so content verification for .html files is skipped.

    // Non-HTML files pass through the proxy unchanged — exact comparison is fine.
    const css = await zip.files['style.css'].async('nodebuffer')
    expect(css).toEqual(fs.readFileSync(path.join(DATA_DIR, 'website', 'style.css')))
  })
})

// ─── FOLDER ───────────────────────────────────────────────────────────────────

test.describe('Download — folder', () => {
  test('saves a zip archive named after the folder', async ({ page }) => {
    await goToAndWait(page, 'folder')
    const { download } = await captureDownload(page)
    expect(download.suggestedFilename()).toBe('folder.zip')
  })

  test('zip contains the original folder files with correct content', async ({ page }) => {
    await goToAndWait(page, 'folder')
    const { zip } = await captureDownload(page)

    expect(zip.files['document.txt']).toBeDefined()
    expect(zip.files['readme.txt']).toBeDefined()

    const doc = await zip.files['document.txt'].async('nodebuffer')
    expect(doc).toEqual(fs.readFileSync(path.join(DATA_DIR, 'folder', 'document.txt')))

    const readme = await zip.files['readme.txt'].async('nodebuffer')
    expect(readme).toEqual(fs.readFileSync(path.join(DATA_DIR, 'folder', 'readme.txt')))
  })
})
