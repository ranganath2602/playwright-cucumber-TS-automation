// steps/playwright.steps.ts

import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Page, Browser } from '@playwright/test';

setDefaultTimeout(60 * 1000); // Set default timeout to 60 seconds

let browser: Browser;
let page: Page;

Given('I navigate to the Playwright website', async () => {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    await page.goto('https://playwright.dev/')
});

Then('the title should contain "Playwright"', async () => {
    await expect(page).toHaveTitle(/Playwright/);
});

When('I click the "Get started" link', async () => {
    await page.getByRole('link', { name: 'Get started' }).click();
});

Then('the "Installation" heading should be visible', async () => {
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});