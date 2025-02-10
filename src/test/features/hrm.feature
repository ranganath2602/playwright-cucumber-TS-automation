Feature: Fill the timesheet in HRM

  Scenario: weekly sheet fill
    Given Visit HRM url
    When Enter valid "<username>" and "<password>"
    Then Click on Login btn
    Then Click on My Timesheet

    Examples:
      | username   | password   |
      | ranganathl | 1q2w3e4r5tR$R$ |
