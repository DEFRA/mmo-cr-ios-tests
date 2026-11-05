@catchLocation
Feature: Catch location
  As a fisher creating a catch record
  I want to select the statistical area where I caught my fish
  So that my catch location is recorded

  Background:
    Given I am signed in
    And I have started a catch record for vessel ACHILLES with a trip ending today
    And I have added "Peel" as both the departure and return port
    And I have added the gear "Gillnets (drift)" with a mesh size of "12"
    And I have recorded the following details for gear "gnd":
      | netLengthHauled | 2 |
      | netLengthLeft   | 1 |
    And I am on the catch location page

  Scenario: Catch location controls are displayed
    Then I should see the catch location controls

  Scenario: Catch record header controls are displayed
    Then I should see the catch record header on the catch location page

  Scenario: Continuing without selecting an area stays on catch location
    When I save and continue on the catch location page
    Then I should be on the catch location page

  Scenario: Back button returns to select gear
    When I tap the back button
    Then I should be on the select gear page

  Scenario: Other button is available for manual entry
    When I scroll to the Other button
    Then the Other button should be displayed

  Scenario: Other button opens manual entry
    When I choose to enter the catch area manually
    Then I should be on the catch location manual entry page
    And I should see the area search field

  Scenario: Back button on manual entry returns to catch location
    When I choose to enter the catch area manually
    Then I should be on the catch location manual entry page
    When I tap the back button
    Then I should see the catch location map

  @skip
  Scenario: Zooming out reveals additional areas
    Then I should see 9 areas on the map
    When I zoom out of the map
    Then I should see more than 9 areas on the map
    And the first area label should be displayed

  @skip
  Scenario: No more than 16 areas are shown at maximum zoom-out
    When I zoom out of the map 5 times
    Then I should see at most 16 areas on the map
    And zooming out further should not change the number of areas

  @skip
  Scenario: Zooming back in returns to the default 9 areas
    When I zoom out of the map
    Then I should see more than 9 areas on the map
    When I zoom in on the map
    Then I should see 9 areas on the map
