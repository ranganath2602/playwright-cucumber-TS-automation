import { setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";
import { expect, Locator } from "@playwright/test";
import { generateRandomTemplate } from "../utils/helpers";
setDefaultTimeout(60 * 1000);

Then('Clear the closed boards', async function (this: ICustomWorld) {
    await this.pagesObj?.loginPage.clearClosedBoards();
})

Then('Close the {string} board', async function (boardName: string) {
    await this.page?.waitForTimeout(5000);
    //await this.page?.screenshot({ path: 'failure.png' });
    await this.page?.locator('div.LinesEllipsis').getByText(boardName).click();
    await this.page?.locator("span[class='nch-icon A3PtEe1rGIm_yL J2CpPoHYfZ2U6i fAvkXZrzkeHLoc']").click();
    await this.page?.locator("div.S1YMKJFPn9WNGk").getByText('Close board').click();
    await this.page?.getByTestId("popover-close-board-confirm").click();
    await this.page?.getByTestId("close-board-delete-board-button").click();
    await this.page?.getByTestId("close-board-delete-board-confirm-button").click();
    await expect(
        this.page?.locator('div.LinesEllipsis').filter({ hasText: boardName })
    ).toHaveCount(0);
});

Then('Create a new board', async function (this: ICustomWorld) {
    await this.page?.locator('span').getByText('Create new board').click();
    await this.page?.click('.nch-icon.A3PtEe1rGIm_yL.neoUEAwI0GETBQ.LCBkZyEuShKn0r');
    await this.page?.locator('header').filter({ hasText: 'PhotosSee more' }).getByRole('button').click();
    const templateIdea = await generateRandomTemplate();
    await this.page?.click('input.jhR9pta4kgYESQ');
    await this.page?.keyboard.type(templateIdea, { delay: 100 });
    await this.page?.locator('div.hy7T0kL4IW58ix').nth(3).click();
    await this.page?.locator('header').filter({ hasText: 'Photos by Unsplash' }).getByTestId('popover-close').click();
    await this.page?.getByTestId('create-board-title-input').fill('NUS WayGate');
    await this.page?.getByTestId('create-board-submit-button').click();
})

Then('Create the lists', async function (this: ICustomWorld) {
    const ListNames = ['To-Do', 'In Progress', 'Waiting for review', 'Done'];
    await this.page?.getByTestId('list-composer-button').click();
    for (const listName of ListNames) {
        await this.page?.getByPlaceholder('Enter list name…').fill(listName);
        await this.page?.waitForTimeout(500);
        await this.page?.getByTestId('list-composer-add-list-button').click();
        await this.page?.waitForTimeout(500);
    }
})

When('Switch to Project Workspace', async function (this: ICustomWorld) {
    await this.page?.getByTestId('workspace-switcher').click();
    await this.page?.getByTestId('workspace-switcher-popover-tile').click();
    await this.page?.locator('div.LinesEllipsis').getByText("NUS WayGate").click();
})

Then('Create the cards for respective lists', async function (this: ICustomWorld) {
    const ListNames = ['To-Do', 'In Progress', 'Waiting for review', 'Done'];
    const cardPrefixes = ['[DEV]', '[QA]', '[DEVOPS]'];
    for (const listName of ListNames) {
        await this.page?.locator('li').filter({ hasText: listName }).getByTestId('list-add-card-button').click();
        const randomPrefix = cardPrefixes[Math.floor(Math.random() * cardPrefixes.length)];
        const taskNumber = Math.floor(Math.random() * 100) + 1; // Generate a random task number
        await this.page?.getByPlaceholder('Enter a title or paste a link').fill(`${randomPrefix} Task ${taskNumber}`);
        await this.page?.getByTestId('list-card-composer-add-card-button').click();
    }
    await this.page?.waitForTimeout(500);
})

Then('Mark The Card as complete and incomplete', async function (this: ICustomWorld) {
    await this.page?.locator('span').filter({ hasText: '[QA]' }).hover();
    await this.page?.getByTestId('lists').locator('ol').filter({ hasText: '[QA] Task' }).getByTestId('card-done-state-completion-button').click();
    await this.page?.getByTestId('lists').locator('ol').filter({ hasText: '[QA] Task' }).getByTestId('card-done-state-completion-button').click();
    await this.page?.locator('span').filter({ hasText: '[QA]' }).click();
})

Then('Drag n Drop the card to another list', async function (this: ICustomWorld) {
    const dragSelector = '[data-testid="card-name"]:has-text("[DEVOPS] Task 60")';
    const dropSelector = 'li:has-text("Done")';
    await this.page?.dragAndDrop(dragSelector, dropSelector);
})

Then('Create a checklist with task description', async function (this: ICustomWorld) {
    await this.page?.getByRole('link', { name: '[DEVOPS] Task 60' }).click();
    await this.page?.getByTestId('description-button').click();
    await this.page?.getByLabel('Main content area, start').fill('Trello Task Description');
    await this.page?.getByTestId('description-save-button').click();
    await this.page?.getByTestId('card-back-checklist-button').click();
    await this.page?.getByLabel('Title').fill('Checklist');
    await this.page?.getByRole('button', { name: 'Add', exact: true }).click();
    const checklistItems = [
        'Are Integration tests are passing',
        'Are Unit tests are passing?',
        'Verify PR checks',
        'Updated deps to latest versions?'
    ];
    for (const item of checklistItems) {
        await this.page?.getByTestId('check-item-name-input').fill(item);
        await this.page?.getByTestId('check-item-add-button').click();
        await this.page?.waitForTimeout(250);
    }
    await this.page?.getByRole('button', { name: 'Cancel' }).click();
})

Then('Complete the checklist items', async function (this: ICustomWorld) {
    const checklistItems = [
        'Are Integration tests are passing',
        'Are Unit tests are passing?',
        'Verify PR checks',
        'Updated deps to latest versions?'
    ];
    await this.page?.getByRole('link', { name: '[DEVOPS] Task 60' }).click();
    for (const item of checklistItems) {
        const checklistLocator = this.page?.locator('li').filter({ hasText: item }).getByTestId('clickable-checkbox');
        if (checklistLocator) {
            await checklistLocator.click();
        }
    }
    expect(await this.page?.getByTestId('checklist-progress-percentage').innerText()).toBe('100%');
    await this.page?.getByTestId('card-back-header').getByTestId('card-done-state-completion-button').click();
})

Then('Upload attachments to task', async function (this: ICustomWorld) {
    await this.page?.getByRole('link', { name: '[DEVOPS] Task 60' }).click();
    await this.page?.getByTestId('card-back-header').getByTestId('card-done-state-completion-button').click();
    await this.page?.getByTestId('card-back-attachment-button').click();
    await this.page?.getByText('Choose a file').click();
    await this.page?.getByText('Choose a file').setInputFiles('failure.png');
    await this.page?.getByText('Success').click();
    expect(await this.page?.locator('span.QMKgZFIlTLiEJN').innerText()).toBe('Success');
})

Then('Delete the attachment from task', async function (this: ICustomWorld) {
    await this.page?.getByRole('link', { name: '[DEVOPS] Task 60' }).click();
    await this.page?.getByTestId('attachment-thumbnail').click();
    await this.page?.getByTestId('delete-attachment').click();
    await this.page?.getByTestId('popover-confirm-button').click();
    await this.page?.waitForTimeout(500);
})

Then('Move task to the list of another board', async function (this: ICustomWorld) {
    //const taskSelector = this.page?.locator('li').filter({ hasText: sourceList }).locator('[data-testid="card-name"]');
    //const dropSelector = this.page?.locator('li').filter({ hasText: targetList });
    await this.page?.getByLabel('my-trello-qa-test-board').click();
    await this.page?.getByRole('link', { name: '[QA] ' }).click();
    await this.page?.locator('button.WTF5k9ZC8MHUNi').click();
    await this.page?.getByTestId('move-card-popover-select-board-destination-select--dropdown-indicator').click();
    await this.page?.getByTestId('move-card-popover-select-board-destination-select--option-0-2').getByText('NUS WayGate').click();
    await this.page?.getByTestId('move-card-popover-select-list-destination-select--dropdown-indicator').click();
    await this.page?.getByText('In Progress').click();
    await this.page?.getByTestId('move-card-popover-move-button').click();
    await this.page?.getByLabel('NUS WayGate').click();
    expect(await this.page?.getByTestId('card-name').innerText()).toBe('[QA] Task moved successfully');
});