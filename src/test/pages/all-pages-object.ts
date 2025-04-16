import { LoginPage } from "./login.page";
import { BrowserContext, Page } from "@playwright/test";

export class AllPagesObject{
    loginPage: LoginPage;

    constructor(public page: Page, public context: BrowserContext){
        this.loginPage = new LoginPage(page, context);
    }
}