import { expect, test } from '@playwright/test'

test.describe('Upload flow', () => {
  test('shows terms popup on first visit and accepts them', async ({ page }) => {
    // Clear localStorage so the terms popup is shown
    await page.addInitScript(() => localStorage.removeItem('agreedToTerms'))
    await page.goto('/share')

    await expect(page.getByTestId('agree-button')).toBeVisible()
    await page.getByTestId('agree-button').click()

    // After agreeing, the file selection screen should appear
    await expect(page.getByTestId('file-input')).toBeAttached()
  })

  test('shows file selection after terms are accepted', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('agreedToTerms', Date.now().toString()))
    await page.goto('/share')

    await expect(page.getByTestId('file-input')).toBeAttached()
  })

  test('selecting a file shows the upload preview', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('agreedToTerms', Date.now().toString()))
    await page.goto('/share')

    await page.getByTestId('file-input').setInputFiles({
      name: 'hello.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Hello Swarm!'),
    })

    await expect(page.getByTestId('upload-button')).toBeVisible()
  })

  test('uploading a file shows the hash on the share page', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('agreedToTerms', Date.now().toString()))
    await page.goto('/share')

    await page.getByTestId('file-input').setInputFiles({
      name: 'upload-test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Hello Swarm! Upload test.'),
    })

    await page.getByTestId('upload-button').click()

    // Switch to Swarm hash tab
    await page.getByRole('tab', { name: 'Swarm hash' }).click()

    const hashEl = page.getByTestId('swarm-hash')
    await hashEl.waitFor({ timeout: 60000 })

    const hash = await hashEl.textContent()
    expect(hash).toMatch(/^[a-f0-9]{64}$/i)
  })

  test('copy button copies the swarm hash to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.addInitScript(() => localStorage.setItem('agreedToTerms', Date.now().toString()))
    await page.goto('/share')

    await page.getByTestId('file-input').setInputFiles({
      name: 'copy-test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Copy test file'),
    })

    await page.getByTestId('upload-button').click()

    // Switch to Swarm hash tab and get the hash
    await page.getByRole('tab', { name: 'Swarm hash' }).click()
    await page.getByTestId('swarm-hash').waitFor({ timeout: 60000 })

    await page.getByTestId('copy-button').click()

    // Button text should change to confirm copy
    await expect(page.getByTestId('copy-button')).toContainText('copied')
  })
})
