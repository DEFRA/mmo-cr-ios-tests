@addPort
Feature: Add port
  As a fisher creating a catch record
  I want to record the ports I departed from and returned to
  So that my trip is recorded accurately

  Background:
    Given I am signed in
    And I have started a catch record for vessel ACHILLES with a trip ending today
    And I am on the add port page

  Scenario: Add port controls are displayed
    Then I should see the port search field
    And I should see the save and continue button on the add port page

  Scenario: Continuing without adding a port shows a validation error
    When I save and continue on the add port page
    Then I should be on the add port page
    And I should see the port search field
    And I should see a validation error on the add port page

  Scenario: Port results are only shown after two characters
    When I search for the port "h"
    Then the port result "Harwich" should not be displayed
    When I search for the port "ha"
    Then the port result "Harwich" should be displayed
    When I select the port result "Harwich"
    Then the port search field should contain "Harwich"

  Scenario: Continuing with only one character shows a validation error
    When I search for the port "F"
    And I save and continue on the add port page
    Then I should see a validation error on the add port page
    And I should be on the add port page

  Scenario: Answering yes to the same port continues to add gear
    When I add the port "Peel"
    And I answer yes to departing from and returning to "Peel"
    Then I should be on the add gear page

  Scenario: Answering no to the same port asks for departure and return ports
    When I add the port "Peel"
    And I answer no to departing from and returning to "Peel"
    Then I should be on the select departure port page
    When I choose "Peel" as the departure port
    Then I should be on the select return port page
    When I choose "Peel" as the return port
    Then I should be on the add gear page

  Rule: Departure and return ports are selected when the trip used different ports

    Background:
      Given I add the port "Peel"
      And I answer no to departing from and returning to "Peel"

    Scenario: A departure port must be selected and another port can be added
      Then I should be on the select departure port page
      And the departure port option "Peel" should be displayed
      And the departure port option "Peel" should not be selected
      When I save and continue on the select departure port page
      Then I should see a validation error on the select departure port page
      And I should see the add another port button on the departure port page
      When I choose to add another departure port
      Then I should be on the add port page

    Scenario: Multiple ports can be added
      When I choose to add another departure port
      Then I should be on the add port page
      When I add the port "Fraserburgh"
      Then I should be on the select departure port page
      And the departure port option "Peel" should be displayed
      And the departure port option "Fraserburgh" should be displayed

    Scenario: Choosing a departure port continues to return port selection
      When I choose "Peel" as the departure port
      Then I should be on the select return port page

    Scenario: A return port can be selected
      When I choose "Peel" as the departure port
      Then I should be on the select return port page
      And the return port option "Peel" should be displayed
      And the return port option "Peel" should not be selected
      When I tap the return port option "Peel"
      Then the return port option "Peel" should be selected

    Scenario: A return port must be selected
      When I choose "Peel" as the departure port
      Then I should be on the select return port page
      And the return port option "Peel" should be displayed
      When I save and continue on the select return port page
      Then I should see a validation error on the select return port page
      And I should see the add another port button on the return port page
