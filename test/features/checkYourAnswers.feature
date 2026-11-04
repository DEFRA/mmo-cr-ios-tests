@checkYourAnswers
Feature: Check your answers
  As a fisher creating a catch record
  I want to review my answers before submitting
  So that I can correct any mistakes

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
    And I have recorded a weight of "500" for "European lobster (LBE)"
    And I have answered no to the landing storage question
    And I am on the check your answers page

  Scenario: Trip, gear and species sections are displayed
    Then I should see the trip, gear and species caught sections

  Scenario: Captured trip answers are shown
    Then I should see the following answers:
      | vessel           | ACHILLES |
      | departure port   | Peel     |
      | return port      | Peel     |
      | statistical area | 37E52    |

  Scenario: Captured gear answers are shown
    Then I should see the following answers:
      | gear name     | Gillnets (drift) |
      | mesh size     | 12               |
      | gear variable | 2                |
      | gear variable | 1                |

  Scenario: Captured species answers and submission declaration are shown
    Then I should see the following answers:
      | species name | European lobster (LBE) |
    And I should see the weight above, below and discarded labels
    And I should see the following answers:
      | weight above | 500 |
    And I should see the submission declaration and accept and submit button

  Scenario Outline: Changing the <answer> opens the <page> page
    When I change the "<answer>" answer
    Then I should be on the <page> page

    Examples:
      | answer           | page           |
      | vessel           | select vessel  |
      | statistical area | catch location |
      | gear name        | add gear       |
      | species name     | add species    |
