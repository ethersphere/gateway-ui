import { expect, test } from '@playwright/test'

test.describe('Landing page navigation', () => {
  test('shows share and access buttons', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('share-button')).toBeVisible()
    await expect(page.getByTestId('access-button')).toBeVisible()
  })

  test('share button navigates to share page', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('share-button').click()
    await expect(page).toHaveURL(/\/share/)
  })

  test('access button navigates to access page', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('access-button').click()
    await expect(page).toHaveURL(/\/access/)
  })
})
