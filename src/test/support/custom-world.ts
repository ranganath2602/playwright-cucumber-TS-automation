import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { AllPagesObject } from "../pages/all-pages-object";
import { BrowserContext, Locator, Page } from "@playwright/test";

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
    page?: Page;
    pagesObj?: AllPagesObject;
    entry?: string;
    totp?: string;
    context?: BrowserContext;
    closedBoards?: Locator
}

export class CustomWorld extends World implements ICustomWorld {
    constructor(options: IWorldOptions) {
        super(options);
    }
    entry?: string | undefined;
    totp?: string | undefined;
    context?: BrowserContext | undefined;
    page?: Page | undefined;
    pagesObj?: AllPagesObject | undefined;
    closedBoards?: Locator | undefined;
}

setWorldConstructor(CustomWorld);