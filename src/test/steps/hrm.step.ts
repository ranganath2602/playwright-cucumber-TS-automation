import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Page, Browser } from '@playwright/test';

setDefaultTimeout(60 * 1000); // Set default timeout to 60 seconds

let browser: Browser;
let page: Page;

Given('Visit HRM url', async () => {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    await page.goto('http://hrm.sti.com/symfony/web/index.php/auth/login')
});

When('Enter valid {string} and {string}', async (un: string, pwd: string) => {
    await page.locator('#txtUsername').fill(un)
    await page.locator('#txtPassword').fill(pwd)
})

Then('Click on Login btn', async () => {
    await page.locator('.button').click()
})

Then('Click on My Timesheet', async () => {
await page.locator("//span[contains(text(),'My Timesheet')]").click()
})