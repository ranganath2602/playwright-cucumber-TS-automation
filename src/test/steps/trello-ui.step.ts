import { Given, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { trelloLoginEmail, trelloLoginPassword } from '../utils/constants';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;

Given('Visit the URL', async () => {
  // Launch the browser (headless false for debugging)
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();

  // Navigate to Trello and click the login button
  await page.goto('https://trello.com/');
  await page.click('.Buttonsstyles__Button-sc-1jwidxo-0.kTwZBr');
});

Then('Enter the credentials', async () => {
  // Fill in the email and click continue
  await page.fill('#username', trelloLoginEmail);
  await page.click('#login-submit');
  
  // Fill in the password
  await page.fill('#password', trelloLoginPassword);
});

Then('Click on login btn', async () => {
  // Click the final login button
  await page.click('#login-submit');

  // Clean up: close the browser after the test
  await browser.close();
});
