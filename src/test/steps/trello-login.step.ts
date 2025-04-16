import { AfterAll, BeforeAll, Before, After, Given, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';
import { cleanupBrowsers } from '../utils/helpers';
import { trello2FASetupKey } from '../utils/constants';
import { AllPagesObject } from '../pages/all-pages-object';
import { authenticator } from 'otplib';

setDefaultTimeout(60 * 1000);

// Global array to hold all browser instances launched during the tests
const browserInstances: Browser[] = [];

Before(async function (this: ICustomWorld) {
  // Launch a new browser and store it in our global array
  const newBrowser = await chromium.launch({ headless: true });
  browserInstances.push(newBrowser);

  this.context = await newBrowser.newContext();
  this.page = await newBrowser.newPage();
  this.pagesObj = new AllPagesObject(this.page, this.page.context());
});

Then('Click on login btn', async function (this: ICustomWorld) {
    // Use the world page reference
    await this.page?.click('#login-submit');

    // Uncomment the following if OTP is required
    /*
    await this.page.waitForTimeout(2000);
    const otp = await getUserInput();
    console.log(`The OTP input value is: ${otp}`);
    await this.page.locator('div[data-testid="otp-input-index-0-container"] input').click();
    await this.page.keyboard.type(otp);
    await this.page.locator('div.css-17nf42q').getByTestId('otp-input-index-0-container').type(otp);
    */
});

Then('Verify the OTP via 2FA authentication', async function(this: ICustomWorld){
    await this.page?.waitForTimeout(2000);
    await this.page?.getByRole('textbox', { name: '-digit verification code' }).click();
    const totp = authenticator.generate(trello2FASetupKey);
    await this.page?.getByRole('textbox', { name: '-digit verification code' }).fill(totp);
    
    // await this.page?.locator('div[data-testid="otp-input-index-0-container"] input').click();
    // await this.page?.keyboard.type(otp);
    // await this.page?.locator('div.css-17nf42q').getByTestId('otp-input-index-0-container').type(otp);
})

// Then('Close the {string} board', async function (boardName: string) {
//     await this.page?.waitForTimeout(5000);
//     await this.page?.screenshot({ path: 'failure.png' });
//     await this.page?.locator('div.LinesEllipsis').getByText(boardName).click();
//     await this.page?.locator("span[class='nch-icon A3PtEe1rGIm_yL J2CpPoHYfZ2U6i fAvkXZrzkeHLoc']").click();
//     await this.page?.locator("div.S1YMKJFPn9WNGk").getByText('Close board').click();
//     await this.page?.getByTestId("popover-close-board-confirm").click();
//     await this.page?.getByTestId("close-board-delete-board-button").click();
//     await this.page?.getByTestId("close-board-delete-board-confirm-button").click();
//     await expect(
//         this.page?.locator('div.LinesEllipsis').filter({ hasText: boardName })
//     ).toHaveCount(0);
// });

Given('Login to your Trello Account', async function (this: ICustomWorld) {
    // Call the login method from your page object
    await this.pagesObj?.loginPage.loginToTrelloAccount();
});

AfterAll(async () => {
    await cleanupBrowsers(browserInstances);
});
