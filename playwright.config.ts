// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    
  // ... other configurations
  use: {
    headless: false,
    launchOptions: {    args: ["--start-maximized"],},
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  
});