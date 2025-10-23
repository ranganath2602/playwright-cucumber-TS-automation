Feature: Trello Board (UI)

Scenario: Create a board with custom background
Given Login to your Trello Account
Then Create a new board

Scenario: Create Status Lists
Given Login to your Trello Account
When Switch to Project Workspace
Then Create the lists

Scenario: Create Cards
Given Login to your Trello Account
When Switch to Project Workspace
Then Create the cards for respective lists

Scenario: Mark a Card
Given Login to your Trello Account
When Switch to Project Workspace
Then Mark The Card as complete and incomplete

Scenario: Drag n Drop the cards
Given Login to your Trello Account
When Switch to Project Workspace
Then Drag n Drop the card to another list

Scenario: Create a checklist
Given Login to your Trello Account
When Switch to Project Workspace
Then Create a checklist with task description

Scenario: Complete a checklist
Given Login to your Trello Account
When Switch to Project Workspace
Then Complete the checklist items

@ui
Scenario: Upload an attachment
Given Login to your Trello Account
When Switch to Project Workspace
Then Upload attachments to task

@ui
Scenario: Delete an attachment
Given Login to your Trello Account
When Switch to Project Workspace
Then Delete the attachment from task

Scenario: Move a card to another list
Given Login to your Trello Account
When Switch to Project Workspace
Then Move task to the list of another board