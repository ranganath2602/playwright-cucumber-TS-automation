Feature: Trello Lists

Scenario: Get Lists on a board
Given Send Get Request with board id to retrieve the Lists
Then the response status code should be 200
Then the response should be in JSON format
Then The response should contain valid lists with id and name

Scenario: Get a List
Given Send Get Request with board id to retrieve the Lists
When Send Get Request with valid list id to get a list
Then the response should contain a list with id and name
Then the response status code should be 200
Then the response should be in JSON format

Scenario: Create a new List
Given Send POST request to Create a new list as 'Waiting Sign-Off'
Then the response status code should be 200
Then the response should be in JSON format
Then the response should contain list id property and name as 'Waiting Sign-Off'

Scenario: Update a List
Given Send PUT request to update the list name to 'Ready For Review'
Then the response status code should be 200
Then the response should be in JSON format
Then the response should contain list id property and name as 'Ready For Review'

Scenario: Archive a list
Given Send PUT request to archive a list
Then the response status code should be 200