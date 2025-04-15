import * as readline from 'readline';
import { Page, Browser } from '@playwright/test';
import { authenticator } from 'otplib';
import { trello2FASetupKey } from './constants';

export async function getUserInput(): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question('Please enter your input: ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

export async function cleanupBrowsers(browserInstances: Browser[]) {
    for (const browser of browserInstances) {
        for (const context of browser.contexts()) {
            for (const page of context.pages()) {
                if (page.url() === 'about:blank') {
                    try {
                        await page.close();
                    } catch (error) {
                        console.error('Error closing about:blank page:', error);
                    }
                }
            }
        }
        try {
            await browser.close();
        } catch (error) {
            console.error('Error closing browser:', error);
        }
    }
}

export async function generateRandomTemplate() {
    const names = ['Coffee', 'Tea', 'Biscuits', 'Chips', 'Sugar', 'Smoothie', 'Dates'];

    const randomtemplateName = names[Math.floor(Math.random() * names.length)];

    return randomtemplateName;
}
