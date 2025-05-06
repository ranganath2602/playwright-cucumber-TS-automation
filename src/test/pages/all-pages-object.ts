import { LoginPage } from "./login.page";
import { BoardPage } from "./board.page";
import { BrowserContext, Page } from "@playwright/test";

export class AllPagesObject{
    loginPage: LoginPage;
    boardPage: BoardPage;

    constructor(public page: Page, public context: BrowserContext){
        this.loginPage = new LoginPage(page, context);
        this.boardPage = new BoardPage(page, context);
    }
}