@tripToday
Feature: Trip today
  As a fisher creating a catch record
  I want to tell the app when my trip took place
  So that my record has the correct trip dates

  Background:
    Given I am signed in
    And I have started a new catch record
    And I have selected the vessel ACHILLES
    And I am on the trip today page

  Scenario: Yes and no options are shown
    Then I should see the yes and no options

  Scenario: Answering yes goes directly to add port
    When I answer yes to whether the trip ended today
    Then I should be on the add port page
    And I should see the port search field
    And I should see the save and continue button on the add port page

  Scenario: Entering valid trip dates continues to add port
    When I answer no to whether the trip ended today
    Then I should see the departure date picker
    When I enter a departure date 1 day ago
    And I save and continue on the trip departure date page
    Then I should be on the trip return date page
    When I enter today as the return date
    And I save and continue on the trip return date page
    Then I should be on the add port page

  Scenario: A trip that ended more than 24 hours ago shows the submission nudge
    When I answer no to whether the trip ended today
    And I enter a departure date 3 days ago
    And I save and continue on the trip departure date page
    And I enter a return date 2 days ago
    And I save and continue on the trip return date page
    Then I should be on the submission nudge page
    And I should see the submission window message and check date link
    And I should see the save and continue button on the submission nudge page
    When I save and continue on the submission nudge page
    Then I should be on the add port page

  Scenario: The trip end date can be corrected from the submission nudge
    When I answer no to whether the trip ended today
    And I enter a departure date 3 days ago
    And I save and continue on the trip departure date page
    And I enter a return date 2 days ago
    And I save and continue on the trip return date page
    Then I should be on the submission nudge page
    When I choose to check the trip end date
    Then I should be on the trip return date page
    When I enter today as the return date
    And I save and continue on the trip return date page
    Then I should be on the add port page
