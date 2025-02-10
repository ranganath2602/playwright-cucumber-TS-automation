// pages/PlaywrightHomePage.ts

import { Page } from '@playwright/test';

export class PlaywrightHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto('https://playwright.dev/');
  }

  async getTitle() {
    return await this.page.title(); 
  }

  async clickGetStarted() {
    await this.page.getByRole('link', { name: 'Get started' }).click();
  }

  async isInstallationHeadingVisible() {
    return await this.page.getByRole('heading', { name: 'Installation' }).isVisible();
  }
}