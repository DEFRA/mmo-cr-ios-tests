@selectVessel
Feature: Select vessel
  As a fisher creating a catch record
  I want to choose the vessel I used
  So that my catch is recorded against the right vessel

  Background:
    Given I am signed in
    And I have started a new catch record
    And I am on the select vessel page

  Scenario: Both vessel options are unselected initially
    Then the vessel option ACHILLES should not be selected
    And the vessel option HERCULES should not be selected

  Scenario Outline: Selecting <vessel> continues to the trip today question
    When I select the vessel <vessel>
    Then I should be on the trip today page

    Examples:
      | vessel   |
      | ACHILLES |
      | HERCULES |

  Scenario: Back link returns to the dashboard
    When I tap the back button
    Then I should be on the home page
