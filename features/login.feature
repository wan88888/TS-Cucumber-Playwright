Feature: Login Functionality
  As a user
  I want to be able to login to the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "tomsmith"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should be logged in successfully
    And I should see a success message 