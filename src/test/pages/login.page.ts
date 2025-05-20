// pages/login.page.ts
import { BrowserContext, ElementHandle, Locator, Page } from '@playwright/test';
import { trelloLoginEmail, trelloLoginPassword, trelloUIHost } from '../utils/constants';
import { BasePage } from './base.page';
import { trello2FASetupKey } from '../utils/constants';
import { authenticator } from 'otplib';

export class LoginPage extends BasePage {
    private homePageLoginBtn: string;
    private usernameInput: string;
    private passwordInput: string;
    private submitLoginBtn: string;
    private viewCloseBoardsBtn: Locator;
    private deleteBoardBtn: Locator;
    private confirmDeleteBoardBtn: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.homePageLoginBtn = ".Buttonsstyles__Button-sc-1jwidxo-0.kTwZBr";
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.submitLoginBtn = '#login-submit';
        this.viewCloseBoardsBtn = this.page.getByRole('button', { name: 'View all closed boards' });
        this.deleteBoardBtn = this.page.getByTestId('close-board-delete-board-button');
        this.confirmDeleteBoardBtn = this.page.getByTestId('close-board-delete-board-confirm-button');
    }

    public async loginToTrelloAccount() {
        // Navigate to Trello and click the login button
        await this.page.goto(trelloUIHost);
        await this.page.click(this.homePageLoginBtn);

        // Enter email and proceed
        await this.page.fill(this.usernameInput, trelloLoginEmail);
        await this.page.click(this.submitLoginBtn);

        // Enter password and click login
        await this.page.fill(this.passwordInput, trelloLoginPassword);
        await this.page.click(this.submitLoginBtn);

        await this.page?.waitForTimeout(1500);
        await this.page?.getByRole('textbox', { name: '-digit verification code' }).click();
        // Wait for a short period to ensure TOTP is valid for the current window
        await this.page.waitForTimeout(1500);
        const totp = authenticator.generate(trello2FASetupKey);
        //console.log('TOTP:', totp);
        await this.page?.getByRole('textbox', { name: '-digit verification code' }).fill(totp);
    }

    public async clearClosedBoards() {
        await this.viewCloseBoardsBtn.click();
        await this.page?.waitForTimeout(2000);
        for (const deleteElement of await this.deleteBoardBtn.all()) {
            await deleteElement.click();
            await this.confirmDeleteBoardBtn.click();
        }
    }
}