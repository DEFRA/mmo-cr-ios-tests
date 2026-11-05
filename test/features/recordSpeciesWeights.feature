@recordSpeciesWeights
Feature: Record species weights
  As a fisher creating a catch record
  I want to record the weight of each species I caught
  So that my catch is declared accurately

  Background:
    Given I am signed in
    And I have started a catch record for vessel ACHILLES with a trip ending today
    And I have added "Peel" as both the departure and return port
    And I have added the gear "Gillnets (drift)" with a mesh size of "12"
    And I have recorded the following details for gear "gnd":
      | netLengthHauled | 2 |
      | netLengthLeft   | 1 |
    And I have selected the catch area "37E52"
    And I have added the species "European lobster (LBE)"
    And I am on the record species weights page

  Scenario: Record species weights controls are displayed
    Then I should see the weights description and the species "European lobster (LBE)"
    And I should see the save and continue button on the record species weights page

  Scenario: A weight above minimum size can be recorded
    When I enter a weight of "500" for "European lobster (LBE)"
    Then the weight above minimum size for "European lobster (LBE)" should be "500"

  Scenario: Recording a weight continues to landing storage
    When I enter a weight of "500" for "European lobster (LBE)"
    And I save and continue on the record species weights page
    Then I should be on the landing storage page

  Scenario: A weight below minimum size can be recorded
    When I enter a weight of "500" for "European lobster (LBE)"
    And I enter a weight below minimum size of "10" for "European lobster (LBE)"
    Then the weight below minimum size for "European lobster (LBE)" should be "10"

  Scenario: A legally discarded weight can be recorded
    When I enter a weight of "500" for "European lobster (LBE)"
    And I enter a legally discarded weight of "20" for "European lobster (LBE)"
    Then the legally discarded weight for "European lobster (LBE)" should be "20"

  Scenario: Adding another species returns to add species
    When I enter a weight of "500" for "European lobster (LBE)"
    And I choose to add another species
    Then I should be on the add species page

  Scenario: Weights can be recorded for multiple species
    When I enter a weight of "500" for "European lobster (LBE)"
    And I choose to add another species
    Then I should be on the add species page
    When I add the species "Atlantic salmon (SAL)"
    Then I should be on the record species weights page
    When I enter a weight of "250" for "Atlantic salmon (SAL)"
    Then the weight above minimum size for "Atlantic salmon (SAL)" should be "250"

  Scenario: Previously entered weights can be edited (AC3)
    When I enter a weight of "100" for "European lobster (LBE)"
    Then the weight above minimum size for "European lobster (LBE)" should be "100"
    When I enter a weight of "200" for "European lobster (LBE)"
    Then the weight above minimum size for "European lobster (LBE)" should be "200"

  Scenario: Removing a species opens the remove species page (AC5)
    When I choose to remove the species
    Then I should see the remove species page

  Scenario: A blank weight above minimum size shows an error (AC6)
    When I tap the species "European lobster (LBE)"
    And I save and continue on the record species weights page
    Then I should see the "blank weight" weight error

  Scenario: A discarded weight higher than the retained weight shows an error (AC7)
    When I enter a weight of "5" for "European lobster (LBE)"
    And I enter a legally discarded weight of "10" for "European lobster (LBE)"
    And I save and continue on the record species weights page
    Then I should see the "discarded higher than retained" weight error

  Scenario Outline: An invalid weight of "<weight>" shows an error (<rule>)
    When I enter a weight of "<weight>" for "European lobster (LBE)"
    And I save and continue on the record species weights page
    Then I should see the "<error>" weight error

    Examples:
      | rule | weight | error          |
      | AC8  | 10.55  | decimal places |
      | AC9  | 0      | more than 0kg  |
      | AC10 | 10001  | over 10,000kg  |
      | AC11 | -5     | more than 0kg  |
      | AC11 | abc    | not a number   |
