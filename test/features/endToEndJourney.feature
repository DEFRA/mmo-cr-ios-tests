@endToEnd
Feature: End-to-end catch record journey
  As a fisher
  I want to complete and submit a catch record
  So that my catch is reported

  Background:
    Given I am signed in
    And I should see the create record button

  Scenario: A catch record for a trip ending today is submitted
    When I start a new catch record
    Then I should be on the select vessel page
    When I select the vessel ACHILLES
    Then I should be on the trip today page
    When I answer yes to whether the trip ended today
    Then I should be on the add port page
    When I add the port "Peel"
    And I answer yes to departing from and returning to "Peel"
    Then I should be on the add gear page
    When I add the gear "Gillnets (drift)"
    Then I should be on the gear measurements page
    When I enter a mesh size of "12"
    And I save and continue on the gear measurements page
    Then I should be on the select gear page
    When I tap the gear option "gnd"
    And I enter "2" for the "netLengthHauled" of gear "gnd"
    And I enter "1" for the "netLengthLeft" of gear "gnd"
    And I save and continue on the select gear page
    Then I should be on the catch location page
    When I select the catch area "37E52" on the map
    And I save and continue on the catch location page
    Then I should be on the add species page
    When I add the species "Atlantic salmon (SAL)"
    Then I should be on the record species weights page
    When I enter a weight of "500" for "Atlantic salmon (SAL)"
    And I enter a weight below minimum size of "10" for "Atlantic salmon (SAL)"
    And I enter a legally discarded weight of "20" for "Atlantic salmon (SAL)"
    And I save and continue on the record species weights page
    Then I should be on the landing storage page
    When I answer no to the landing storage question
    And I save and continue on the landing storage page
    Then I should be on the check your answers page
    When I accept and submit the catch record
    Then I should see the submission success message

  Scenario: A catch record for a trip that did not end today is submitted
    When I start a new catch record
    Then I should be on the select vessel page
    When I select the vessel ACHILLES
    Then I should be on the trip today page
    When I answer no to whether the trip ended today
    And I enter a departure date 1 day ago
    And I save and continue on the trip departure date page
    Then I should be on the trip return date page
    When I enter today as the return date
    And I save and continue on the trip return date page
    Then I should be on the add port page
    When I add the port "Peel"
    And I answer yes to departing from and returning to "Peel"
    Then I should be on the add gear page
    When I add the gear "Gillnets (drift)"
    Then I should be on the gear measurements page
    When I enter a mesh size of "12"
    And I save and continue on the gear measurements page
    Then I should be on the select gear page
    When I tap the gear option "gnd"
    And I enter "2" for the "netLengthHauled" of gear "gnd"
    And I enter "1" for the "netLengthLeft" of gear "gnd"
    And I save and continue on the select gear page
    Then I should be on the catch location page
    When I select the catch area "37E52" on the map
    And I save and continue on the catch location page
    Then I should be on the add species page
    When I add the species "Atlantic salmon (SAL)"
    Then I should be on the record species weights page
    When I enter a weight of "500" for "Atlantic salmon (SAL)"
    And I enter a weight below minimum size of "10" for "Atlantic salmon (SAL)"
    And I enter a legally discarded weight of "20" for "Atlantic salmon (SAL)"
    And I save and continue on the record species weights page
    Then I should be on the landing storage page
    When I answer no to the landing storage question
    And I save and continue on the landing storage page
    Then I should be on the check your answers page
    When I accept and submit the catch record
    Then I should see the submission success message
