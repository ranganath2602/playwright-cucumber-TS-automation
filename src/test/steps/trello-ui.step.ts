import { AfterAll, Given, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { trelloLoginEmail, trelloLoginPassword } from '../utils/constants';
import { expect } from '@playwright/test';
import { getUserInput } from '../utils/helpers';

//setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;


Given('Visit the URL', async () => {
    // Launch the browser (headless false for debugging)
    browser = await chromium.launch();
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
    /*
    // Use these lines of code only when you are facing OTP issue
    // Once otp is verfied comment it back as you no longer have to do it again
    await page.waitForTimeout(2000);
    const otp = await getUserInput();
    console.log(`The OTP input value is: ${otp}`);
    await page.locator('div[data-testid="otp-input-index-0-container"] input').click();
    await page.keyboard.type(otp)
    await page.locator('div.css-17nf42q').getByTestId('otp-input-index-0-container').type(otp);
    */
});

Then('Close the {string} board', async (boardName) => {
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'failure.png' });
    await page.locator('div.LinesEllipsis').getByText(boardName).click();
    await page.locator("span[class='nch-icon A3PtEe1rGIm_yL J2CpPoHYfZ2U6i fAvkXZrzkeHLoc']").click();
    await page.locator("div.S1YMKJFPn9WNGk").getByText('Close board').click();
    await page.getByTestId("popover-close-board-confirm").click();
    await page.getByTestId("close-board-delete-board-button").click();
    await page.getByTestId("close-board-delete-board-confirm-button").click();
    await expect(
        page.locator('div.LinesEllipsis').filter({ hasText: boardName })
    ).toHaveCount(0);
})

AfterAll(async () => {
    // Clean up: close the browser after the test
    await browser.close();
})
