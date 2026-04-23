import { expect, test } from '@playwright/test'
import fs from 'fs'
import path from 'path'

function getTestHash(): string {
  const hashFile = path.join(__dirname, '.test-hash')
  return fs.readFileSync(hashFile, 'utf-8').trim()
}

test.describe('Access page — hash search', () => {
  test('shows hash input field', async ({ page }) => {
    await page.goto('/access')
    await expect(page.getByTestId('hash-input')).toBeVisible()
  })

  test('find button appears after typing a valid hash', async ({ page }) => {
    const hash = getTestHash()
    await page.goto('/access')

    await page.getByTestId('hash-input').fill(hash)
    await expect(page.getByTestId('find-button')).toBeVisible()
  })

  test('clicking find navigates to the access hash page', async ({ page }) => {
    const hash = getTestHash()
    await page.goto('/access')

    await page.getByTestId('hash-input').fill(hash)
    await page.getByTestId('find-button').click()

    await expect(page).toHaveURL(new RegExp(`/access/${hash}`))
  })

  test('shows error tooltip for an invalid hash', async ({ page }) => {
    await page.goto('/access')

    // Type something that is clearly not a valid hash (too short, wrong chars)
    await page.getByTestId('hash-input').fill('not-valid')

    // MUI controlled Tooltip renders a [role="tooltip"] element when open={true}
    await expect(page.locator('[role="tooltip"]')).toBeVisible()
    await expect(page.locator('[role="tooltip"]')).toContainText('Should be 64 or 128 hex characters')
  })
})

test.describe('Access hash page', () => {
  test('shows download button for a valid uploaded hash', async ({ page }) => {
    const hash = getTestHash()
    await page.goto(`/access/${hash}`)

    const downloadBtn = page.getByTestId('download-button')
    await downloadBtn.waitFor({ timeout: 60000 })
    await expect(downloadBtn).toBeVisible()
    await expect(downloadBtn).toContainText('download')
  })

  test('shows invalid hash message for a malformed hash', async ({ page }) => {
    // 32-char hex string — too short to be a valid Swarm reference (needs 64 or 128)
    await page.goto('/access/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    // Wait for loading to finish; the app should show the not-found page since this hash does not exist
    await expect(
      page.getByText('Sorry, the file was not found.').or(page.getByText('Invalid Swarm Hash')),
    ).toBeVisible({ timeout: 60000 })
  })

  test('shows file not found for a non-existent hash', async ({ page }) => {
    // Valid hex format but does not exist on the network
    await page.goto('/access/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    await expect(page.getByRole('heading', { name: 'Sorry, the file was not found.' })).toBeVisible({
      timeout: 60000,
    })
  })
})
