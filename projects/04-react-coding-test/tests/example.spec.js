// @ts-check
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const fact = await page.locator('.fact')
  const textContent = await fact.textContent()

  await expect(textContent?.length).toBeGreaterThan(0)
})
