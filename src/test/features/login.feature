Feature: login page validation

  Scenario: login with valid user name and password
    Given Provide correct url
    When provide valid UN and pwd
    Then click on login btn
    Then verify login is success
