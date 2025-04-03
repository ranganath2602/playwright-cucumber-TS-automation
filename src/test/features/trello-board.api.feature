@crud
Feature: Trello Board

Scenario: Create a board
Given Send POST Request to create a new board as 'trello-qa-board'
Then the response status code should be 200
Then the response should be in JSON format
Then the board name should be updated to 'trello-qa-board'

Scenario: Update a board
Given Send POST Request to create a new board as 'trello-qa-board1'
When Send PUT Request to update the board to "playwright-auto-qa-board"
Then the response status code should be 200
Then the response should be in JSON format
Then the board name should be updated to 'playwright-auto-qa-board'

Scenario: Delete a board
Given Send POST Request to create a new board as 'trello-qa-board2'
When Send Delete Request to the board
Then the response status code should be 200

Scenario: Close the boards
Given Visit the URL
Then Enter the credentials
Then Click on login btn
Then Close the 'trello-qa-board' board
Then Close the 'playwright-auto-qa-board' board