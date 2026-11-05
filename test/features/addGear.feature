@addGear
Feature: Add gear
  As a fisher creating a catch record
  I want to record the gear I used
  So that my catch is recorded against the right gear

  Background:
    Given I am signed in
    And I have started a catch record for vessel ACHILLES with a trip ending today
    And I have added "Peel" as both the departure and return port
    And I am on the add gear page

  Scenario: Add gear controls and empty state are displayed
    Then I should see the add gear empty state
    And I should see the add gear example text and search field
    And I should see the save and continue button on the add gear page

  Scenario: A gear search value is accepted
    When I search for the gear "Gillnets"
    Then the gear search field should contain "Gillnets"

  Scenario: Gear results are shown after two characters and can be selected
    When I search for the gear "S"
    Then the gear result "Gillnets (drift)" should not be displayed
    When I search for the gear "Se"
    Then the gear result "Gillnets (drift)" should be displayed
    And the gear result "Gillnets (drift)" should match the search "Se"
    When I select the gear result "Gillnets (drift)"
    Then the gear search field should contain "Gillnets (drift)"
    When I save and continue on the add gear page
    Then I should be on the gear measurements page

  Scenario: Continuing with only one character shows a validation error
    When I search for the gear "S"
    And I save and continue on the add gear page
    Then I should see a validation error on the add gear page
    And I should be on the add gear page

  Scenario: Continuing without adding gear stays on add gear
    When I save and continue on the add gear page
    Then I should be on the add gear page
    And I should see the add gear empty state
