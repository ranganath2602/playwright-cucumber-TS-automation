// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    launchOptions: {
      headless: process.env.CI ? true : false,
      args: ["--start-maximized"]
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});