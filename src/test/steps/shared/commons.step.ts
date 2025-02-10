import { Given, When, Then, setDefaultTimeout, BeforeAll } from '@cucumber/cucumber';
import { expect, request, APIResponse, APIRequestContext } from '@playwright/test';

let response: APIResponse;

Then('the response status code should be {int}', async function (statusCode) {
    expect(response.status()).toBe(statusCode);
});

Then('the response should be in JSON format', async function () {
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
});

Then('the board name should be updated to {string}', async function (expectedName) {
    const data = await response.json();
    expect(data.name).toBe(expectedName);
});