@catchLocationManualEntry
Feature: Catch location manual entry
  As a fisher creating a catch record
  I want to enter a statistical sub area manually
  So that I can record a catch location that is not shown on the map

  Background:
    Given I am signed in
    And I have started a catch record for vessel ACHILLES with a trip ending today
    And I have added "Peel" as both the departure and return port
    And I have added the gear "Gillnets (drift)" with a mesh size of "12"
    And I have recorded the following details for gear "gnd":
      | netLengthHauled | 2 |
      | netLengthLeft   | 1 |
    And I am on the catch location page

  Scenario: Type-ahead field is displayed after selecting Other
    When I scroll to the Other button
    And I choose to enter the catch area manually
    Then I should be on the catch location manual entry page
    And I should see the area search field

  Scenario: A matching result can be selected
    When I choose to enter the catch area manually
    And I search for the area "44E8"
    Then the area result "37E52" should be displayed
    When I select the area result "37E52"
    Then the area search field should contain "37E52"

  Scenario: A matching area can be selected from a two character search
    When I choose to enter the catch area manually
    And I select the area "37E52" by searching for "44"
    Then the area search field should contain "37E52"

  Scenario: A new search replaces the previous search term
    When I choose to enter the catch area manually
    And I search for the area "44E81"
    Then the area search field should contain "44E81"
    When I search for the area "37E52"
    Then the area search field should contain "37E52"

  Scenario: Selecting a suggested area continues to add species
    When I choose to enter the catch area manually
    And I select the area "37E52" from the suggestions
    Then the area search field should contain "37E52"
    When I save and continue on the catch location manual entry page
    Then I should be on the add species page

  Scenario: A code not in the reference dataset shows a validation error
    When I choose to enter the catch area manually
    And I search for the area "99Z99"
    And I save and continue on the catch location manual entry page
    Then I should see a validation error on the catch location manual entry page
    And I should be on the catch location manual entry page
