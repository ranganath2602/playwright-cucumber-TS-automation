Feature: Login Feature

Scenario: Log in to Trello account
Given Login to your Trello Account
Then Close the 'trello-qa-board' board
Then Close the 'playwright-auto-qa-board' board

Scenario: Clear the boards
Given Login to your Trello Account
Then Clear the closed boards
