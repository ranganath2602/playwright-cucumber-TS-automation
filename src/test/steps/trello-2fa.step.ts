import { Before, context, setDefaultTimeout, Then } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";
import { trello2FASetupKey, trelloLoginPassword } from "../utils/constants";
import { authenticator } from "otplib";

setDefaultTimeout(60 * 1000);

// Before(async function(this: ICustomWorld){
    
// })

Then('Enable 2FA for your Trello account', async function (){
    await this.page?.click('div.B1uWdim9Jd0dJ9');
    await this.page?.locator('span.LCeoUSr_PkZrP2').getByText('Manage account').click();
    const [newPage] = await Promise.all([
        this.context?.waitForEvent('page'),
        this.page?.locator('span.LCeoUSr_PkZrP2').getByText('Manage account').click(),
    ]);
    await newPage?.waitForLoadState();
    await this.page?.locator('span.css-178ag6o').getByText('Security').click();
    await this.page?.fill('password-uid27', trelloLoginPassword);
    await this.page?.locator('span.css-178ag6o').getByText('Set up').click();
    await this.page?.locator('h2.css-mbmnab').getByText('Authenticator app').click();
    await this.page?.locator('span.css-19g3t4k').getByText("Can't scan the code?").click();
    const element = await this.page?.$('#mfa.enrollment.configureapp.secret')
    const setupKey = await element.getAttribute('value');
    const totp = authenticator.generate(setupKey);
    await this.page?.fill('input#otpCode-uid1', totp);
    await this.page?.locator('span.css-178ag6o').getByText('Connect phone').click();
})

Then('Log out from your Trello Account', async function (){

})

Then('Disable 2FA for your Trello account', async function (this: ICustomWorld) {
    await this.page?.click('div.B1uWdim9Jd0dJ9');
    await this.page?.locator('span.LCeoUSr_PkZrP2').getByText('Manage account').click();
    const [newPage] = await Promise.all([
        this.context?.waitForEvent('page'),
        this.page?.locator('span.LCeoUSr_PkZrP2').getByText('Manage account').click(),
    ]);
    await newPage?.waitForLoadState();
    await this.page?.locator('span.css-178ag6o').getByText('Security').click();
    await this.page?.locator('a.css-wmj6ze').getByText('Manage two-step verification').click();
    await this.page?.fill('password-uid25', trelloLoginPassword);
    await this.page?.locator('span.css-178ag6o').getByText('Unlock settings').click();
    await this.page?.locator('span.css-178ag6o').getByText('Disable').click();
    await this.page?.locator('span.css-178ag6o').getByText('Confirm').click();
    await this.page?.bringToFront();
})