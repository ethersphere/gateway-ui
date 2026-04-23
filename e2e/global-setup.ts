import { BrowserContext, chromium } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { imageFile, videoFile } from './test-data'

const UPLOAD_TIMEOUT = 90_000
const DATA_DIR = path.join(__dirname, 'test-data')

type FilePayload = { name: string; mimeType: string; buffer: Buffer }

async function uploadSingleFile(context: BrowserContext, file: FilePayload): Promise<string> {
  return uploadViaInput(context, 'file-input', file)
}

async function uploadDirectory(context: BrowserContext, dirName: 'website' | 'folder'): Promise<string> {
  return uploadViaInput(context, 'folder-input', path.join(DATA_DIR, dirName))
}

async function uploadViaInput(
  context: BrowserContext,
  inputTestId: 'file-input' | 'folder-input',
  payload: FilePayload | string,
): Promise<string> {
  const page = await context.newPage()
  try {
    await page.goto('http://localhost:3030/share')

    const input = page.getByTestId(inputTestId)
    // Playwright requires a directory path for webkitdirectory inputs, and
    // accepts a file object or array for regular inputs.
    if (typeof payload === 'string') {
      await input.setInputFiles(payload)
    } else {
      await input.setInputFiles(payload)
    }

    await page.getByTestId('upload-button').click()

    const swarmHashTab = page.getByRole('tab', { name: 'Swarm hash' })
    await swarmHashTab.waitFor({ timeout: UPLOAD_TIMEOUT })
    await swarmHashTab.click()

    const hashEl = page.getByTestId('swarm-hash')
    await hashEl.waitFor({ timeout: 10_000 })
    return ((await hashEl.textContent()) ?? '').trim()
  } catch (err) {
    await page.screenshot({ path: path.join(__dirname, `global-setup-failure-${inputTestId}.png`) })
    throw err
  } finally {
    await page.close()
  }
}

function saveHash(name: string, hash: string) {
  fs.writeFileSync(path.join(__dirname, `.test-hash-${name}`), hash)
  console.log(`Global setup [${name}]: ${hash}`)
}

export default async function globalSetup() {
  const browser = await chromium.launch()
  const context = await browser.newContext()

  await context.addInitScript(() => {
    localStorage.setItem('agreedToTerms', Date.now().toString())
  })

  try {
    const txtHash = await uploadSingleFile(context, {
      name: 'swarm-test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Hello Swarm! e2e test suite.'),
    })
    saveHash('txt', txtHash)
    fs.writeFileSync(path.join(__dirname, '.test-hash'), txtHash)

    const imgHash = await uploadSingleFile(context, imageFile())
    saveHash('image', imgHash)

    const vidHash = await uploadSingleFile(context, videoFile())
    saveHash('video', vidHash)

    const siteHash = await uploadDirectory(context, 'website')
    saveHash('website', siteHash)

    const folderHash = await uploadDirectory(context, 'folder')
    saveHash('folder', folderHash)
  } finally {
    await browser.close()
  }
}
