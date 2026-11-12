@signIn
Feature: Sign in
  As a registered vessel owner, skipper, or agent
  I want to sign in to the application using my email address and password
  So that I can securely access my account and use the application's features

  Background:
    Given I have opened the app

  Scenario: Display Sign In screen
    Then I should be on the sign-in page
    And I should see the sign-in controls

  Scenario: Email address entry
    When I enter the email "test@example.com" and password "Password123!"
    Then the entered email and password should be retained

  Scenario: Leading and trailing spaces in the email address are removed
    When I sign in with the valid email surrounded by spaces
    Then I should be on the home page

  Scenario: Email address is not case-sensitive
    When I sign in with the valid email in upper case
    Then I should be on the home page

  Scenario: Password entry is masked
    When I enter the email "test@example.com" and password "Password123!"
    Then the password should be masked

  Scenario: Successful sign in
    When I sign in with valid credentials
    Then I should be on the home page

  Scenario: Invalid credentials
    When I enter the email "invalid.user@example.com" and password "WrongPassword1!"
    And I tap the sign in button
    Then I should see the sign-in error message
    And I should be on the sign-in page

  Scenario: Expand Create Account information
    When I tap the create an account link
    Then I should see the create an account guidance

  Scenario: Collapse Create Account information
    When I tap the create an account link
    And I tap the create an account link again
    Then I should not see the create an account guidance

  Scenario: Display informational message only
    When I tap the create an account link
    Then I should see the create an account guidance
    And I should be on the sign-in page
    And I should see the sign-in controls


  Scenario: User rapidly taps Sign In multiple times
    When I enter valid credentials
    And I tap the sign in button 3 times
    Then I should be on the home page

  Scenario Outline: User expands and collapses Create Account quickly
    When I tap the create an account link <taps> times
    Then I should <visibility> the create an account guidance

    Examples:
      | taps | visibility |
      | 4    | not see    |
      | 5    | see        |

  @rotation
  Scenario: Device rotation
    When I enter the email "test@example.com" and password "Password123!"
    And I tap the create an account link
    And I rotate the device to landscape
    Then the entered email and password should be retained
    And I should see the create an account guidance

  Scenario: Empty email address
    When I enter the password "Password123!"
    And I tap the sign in button
    Then I should see the email validation error
    And I should not see the password validation error

  Scenario: Empty password
    When I enter the email "test@example.com"
    And I tap the sign in button
    Then I should see the password validation error
    And I should not see the email validation error

  Scenario: Empty fields
    When I tap the sign in button
    Then I should see the email validation error
    And I should see the password validation error
    And I should not see the sign-in error message
    And I should be on the sign-in page

  Scenario: Invalid email format
    When I enter the email "not-an-email" and password "Password123!"
    And I tap the sign in button
    Then I should see the email validation error
    And I should be on the sign-in page
