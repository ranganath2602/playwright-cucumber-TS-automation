Feature: Playwright Tests

  Scenario: Verify Playwright Website Title
    Given I navigate to the Playwright website
    Then the title should contain "Playwright"

  Scenario: Click Get Started and Verify Installation Heading
    Given I navigate to the Playwright website
    When I click the "Get started" link
    Then the "Installation" heading should be visible
