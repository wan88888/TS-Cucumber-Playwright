import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import LoginPage from '../../src/pages/LoginPage';
import { logger } from '../../src/utils/logger';
import { env } from '../../src/config/environment';

// Step definitions
Given('I am on the login page', async function(this: CustomWorld) {
  logger.step('Navigating to login page');
  const loginPage = new LoginPage(this.page);
  await loginPage.navigateToLoginPage();
  
  // Additional validation that we're on the right page
  const title = await loginPage.getTitle();
  expect(title).toContain('The Internet');
});

When('I enter username {string}', async function(this: CustomWorld, username: string) {
  logger.step(`Entering username: ${username}`);
  const loginPage = new LoginPage(this.page);
  await loginPage.enterUsername(username);
});

When('I enter password {string}', async function(this: CustomWorld, password: string) {
  logger.step(`Entering password: ${'*'.repeat(password.length)}`);
  const loginPage = new LoginPage(this.page);
  await loginPage.enterPassword(password);
});

When('I click the login button', async function(this: CustomWorld) {
  logger.step('Clicking login button');
  const loginPage = new LoginPage(this.page);
  await loginPage.clickLoginButton();
});

Then('I should be logged in successfully', async function(this: CustomWorld) {
  logger.step('Verifying successful login');
  const loginPage = new LoginPage(this.page);
  const isLoggedIn = await loginPage.isLoginSuccessful();
  expect(isLoggedIn).toBeTruthy();
  
  // Take screenshot on successful login for reporting
  await loginPage.takeScreenshot('successful_login');
});

Then('I should see a success message', async function(this: CustomWorld) {
  logger.step('Verifying success message');
  const loginPage = new LoginPage(this.page);
  
  // Use the new validateSuccessMessage method
  const isSuccessMessage = await loginPage.validateSuccessMessage();
  expect(isSuccessMessage).toBeTruthy();
  
  // Additional assertion using the assertElementContainsText method
  await loginPage.assertElementContainsText('#flash', 'You logged into a secure area');
}); 