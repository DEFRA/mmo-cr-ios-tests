@signIn
Feature: Sign in
  As a fisher
  I want to sign in to the Record your catch app
  So that I can record and submit my catch

  Background:
    Given I have opened the app

  Scenario: Sign-in controls are displayed
    Then I should see the sign-in controls

  Scenario: Email and password are accepted
    When I enter the email "test@example.com" and password "Password123!"
    Then the entered email and password should be retained

  Scenario: Empty credentials keep the sign-in controls
    When I enter the email "" and password ""
    Then the email and password fields should be empty
    And the sign-in button should be displayed

  Scenario: Whitespace and special characters in credentials are retained
    When I enter the email "  test+tag@example.com  " and password " P@ss w0rd!#$  "
    Then the entered email and password should be retained

  Scenario: Long credential values are retained
    When I enter an email with a 64 character local part and a 128 character password
    Then the entered email and password should be retained

  Scenario: Password visibility can be toggled
    When I enter the password "Password123!"
    And I toggle the password visibility
    Then the password visibility toggle should be displayed
    When I toggle the password visibility
    Then the password visibility toggle should be displayed

  Scenario: Create an account guidance is displayed
    When I tap the create an account link
    Then I should see the create an account guidance
