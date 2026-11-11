@signIn
Feature: Sign in
  As a fisher
  I want to sign in to the Record your catch app
  So that I can record and submit my catch

  Background:
    Given I have opened the app

  Scenario: Sign in screen is displayed
    Then I should be on the sign-in page
    And I should see the sign-in controls

  Scenario: Entered email address is displayed
    When I enter the email "test@example.com" and password "Password123!"
    Then the entered email and password should be retained

  Scenario: Entered password is masked
    When I enter the email "test@example.com" and password "Password123!"
    Then the password should be masked

  Scenario: Successful sign in navigates to the home page
    When I sign in with valid credentials
    Then I should be on the home page

  Scenario: Email address is not case-sensitive
    When I sign in with the valid email in upper case
    Then I should be on the home page

  Scenario: Leading and trailing spaces in the email address are removed
    When I sign in with the valid email surrounded by spaces
    Then I should be on the home page

  Scenario: Invalid credentials keep the user on the sign in screen
    When I enter the email "invalid.user@example.com" and password "WrongPassword1!"
    And I tap the sign in button
    Then I should see the sign-in error message
    And I should be on the sign-in page

  Scenario: Create an account information can be expanded
    When I tap the create an account link
    Then I should see the create an account guidance

  Scenario: Create an account information can be collapsed
    When I tap the create an account link
    And I tap the create an account link 1 times
    Then I should not see the create an account guidance

  Scenario: Create an account shows information only
    When I tap the create an account link
    Then I should see the create an account guidance
    And I should be on the sign-in page
    And I should see the sign-in controls

  Scenario: Rapidly tapping sign in signs the user in once
    When I enter valid credentials
    And I tap the sign in button 3 times
    Then I should be on the home page

  Scenario Outline: Rapidly toggling create an account reflects the last action
    When I tap the create an account link <taps> times
    Then I should <visibility> the create an account guidance

    Examples:
      | taps | visibility |
      | 4    | not see    |
      | 5    | see        |

  @rotation
  Scenario: Form data and expanded content are retained on rotation
    When I enter the email "test@example.com" and password "Password123!"
    And I tap the create an account link
    And I rotate the device to landscape
    Then the entered email and password should be retained
    And I should see the create an account guidance

  Scenario: Empty email address shows a validation error
    When I enter the password "Password123!"
    And I tap the sign in button
    Then I should see the email validation error
    And I should not see the password validation error

  Scenario: Empty password shows a validation error
    When I enter the email "test@example.com"
    And I tap the sign in button
    Then I should see the password validation error
    And I should not see the email validation error

  Scenario: Empty fields show both validation errors and do not attempt sign in
    When I tap the sign in button
    Then I should see the email validation error
    And I should see the password validation error
    And I should not see the sign-in error message
    And I should be on the sign-in page

  Scenario: Invalid email format shows a validation error
    When I enter the email "not-an-email" and password "Password123!"
    And I tap the sign in button
    Then I should see the email validation error
    And I should be on the sign-in page
