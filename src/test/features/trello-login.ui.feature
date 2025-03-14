@ui
Feature: Login Feature

Scenario: Log in to Trello account
Given Visit the URL
Then Enter the credentials
Then Click on login btn
Then Close the 'trello-qa-board' board
Then Close the 'playwright-auto-qa-board' board