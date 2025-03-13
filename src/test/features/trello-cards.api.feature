Feature: Trello Cards

Scenario: Create a new Cards
Given Send Post Request to create a new card in the list as 'Update the Test Suite'
Then the response status code should be 200
Then the response should be in JSON format
Then expect the response to contain id property and name property as 'Update the Test Suite'

Scenario: Get a Card
Given Send Get Request to retrieve the card from the list
Then the response status code should be 200
Then the response should be in JSON format
Then expect the response to contain id property and name property as 'Update the Test Suite'

Scenario: Update a Card
Given Send Put Request to update the name of card from the list as 'Refactor the test cases'
Then the response status code should be 200
Then the response should be in JSON format
Then expect the response to contain id property and name property as 'Refactor the test cases'

Scenario: Delete a Card
Given Send Delete Request to delete the card from the list
Then the response status code should be 200
Then the response should be in JSON format