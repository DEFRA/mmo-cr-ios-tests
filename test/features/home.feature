@home
Feature: Home page
  As a signed-in fisher
  I want to see my catch records and guidance
  So that I know what I need to do

  Background:
    Given I am signed in
    And I am on the home page

  Scenario: Home page content is displayed
    Then I should see the home page content

  Scenario: How to record guidance can be opened and closed
    When I toggle the how to record guidance
    Then I should see the what you need to do guidance
    When I toggle the how to record guidance
    Then I should not see the what you need to do guidance

  Scenario: Trip table and pagination are displayed
    Then I should see the trip table headers
    And the first trip should show vessel "ACHILLES", status "Unsent" and created by "You"
    And I should see the trip table pagination

  Scenario: Authenticated navigation tabs are displayed
    Then I should see the home, notifications and settings tabs

  Scenario: Catch record status help can be opened and closed
    When I toggle the catch record status help
    Then I should see the unsent status description
    When I toggle the catch record status help
    Then I should not see the unsent status description
