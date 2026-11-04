@gearMeasurements
Feature: Gear measurements
  As a fisher creating a catch record
  I want to record the measurements of my gear
  So that my gear details are complete

  Background:
    Given I am signed in
    And I have started a catch record for vessel ACHILLES with a trip ending today
    And I have added "Peel" as both the departure and return port
    And I have added the gear "Gillnets (drift)"
    And I am on the gear measurements page

  Scenario: Gear measurement controls are displayed
    Then I should see the gear measurement controls

  Scenario: A mesh size value is accepted
    When I enter a mesh size of "12"
    Then the mesh size field should contain "12"

  Scenario: Saving a whole mesh size continues to select gear
    When I enter a mesh size of "12"
    Then the mesh size field should contain "12"
    When I save and continue on the gear measurements page
    Then I should be on the select gear page
    And the gear option "gnd" should be displayed
    And the gear option "gnd" should not be selected
    When I tap the gear option "gnd"
    Then the gear option "gnd" should be selected

  @skip
  Scenario: A whole times-shot value is accepted and another gear can be added
    When I enter a mesh size of "12"
    And I save and continue on the gear measurements page
    Then the gear option "gnd" should be displayed
    And the gear option "gnd" should not be selected
    When I tap the gear option "gnd"
    Then the "netLengthHauled" field of gear "gnd" should be displayed
    When I enter "2" for the "netLengthHauled" of gear "gnd"
    And I save and continue on the select gear page
    Then the "netLengthHauled" field of gear "gnd" should contain "2"
    And I should see the add another gear button
    When I choose to add another gear
    Then I should be on the add gear page

  Scenario: Saving the selected gear continues to catch location
    When I enter a mesh size of "12"
    And I save and continue on the gear measurements page
    And I tap the gear option "gnd"
    And I enter "2" for the "netLengthHauled" of gear "gnd"
    Then the "netLengthHauled" field of gear "gnd" should contain "2"
    When I save and continue on the select gear page
    Then I should be on the catch location page

  Scenario: Continuing without a mesh size stays on gear measurements
    When I save and continue on the gear measurements page
    Then I should be on the gear measurements page
    And the mesh size field should be empty

  Scenario: A decimal mesh size is not accepted
    When I enter a mesh size of "12.5"
    And I save and continue on the gear measurements page
    Then I should be on the gear measurements page
    And I should see the whole numbers hint
