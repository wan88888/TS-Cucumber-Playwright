import { Page } from '@playwright/test';
import BasePage from './BasePage';
import { getUrl } from '../config/environment';
import { logger } from '../utils/logger';

export default class LoginPage extends BasePage {
  // Page URL path
  private readonly urlPath = 'login';
  
  // Page selectors
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = 'button[type="submit"]';
  private readonly flashMessage = '#flash';
  private readonly secureAreaHeader = 'h2';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLoginPage(): Promise<void> {
    logger.info(`Navigating to login page at ${this.urlPath}`);
    await this.navigate(getUrl(this.urlPath));
  }

  /**
   * Enter username in the username field
   * @param username - Username to enter
   */
  async enterUsername(username: string): Promise<void> {
    logger.info(`Entering username: ${username}`);
    await this.fill(this.usernameInput, username);
  }

  /**
   * Enter password in the password field
   * @param password - Password to enter
   */
  async enterPassword(password: string): Promise<void> {
    logger.info(`Entering password: ${'*'.repeat(password.length)}`);
    await this.fill(this.passwordInput, password);
  }

  /**
   * Click on the login button
   */
  async clickLoginButton(): Promise<void> {
    logger.info('Clicking login button');
    await this.click(this.loginButton);
    // Wait for navigation or response after login
    await this.wait(500);
  }

  /**
   * Check if login is successful
   * @returns Promise<boolean> - True if login is successful
   */
  async isLoginSuccessful(): Promise<boolean> {
    logger.info('Checking if login was successful');
    return await this.isElementVisible(this.secureAreaHeader);
  }

  /**
   * Get the flash message text
   * @returns Promise<string> - The flash message text
   */
  async getFlashMessageText(): Promise<string> {
    logger.info('Getting flash message text');
    await this.waitForElementVisible(this.flashMessage);
    return await this.getElementText(this.flashMessage);
  }

  /**
   * Validate login success message
   * @returns Promise<boolean> - True if success message is displayed
   */
  async validateSuccessMessage(): Promise<boolean> {
    const message = await this.getFlashMessageText();
    const isSuccessMessage = message.includes('You logged into a secure area');
    logger.info(`Success message validation: ${isSuccessMessage}`);
    
    if (!isSuccessMessage) {
      await this.takeScreenshot('login_failure');
    }
    
    return isSuccessMessage;
  }

  /**
   * Complete the login process
   * @param username - Username to enter
   * @param password - Password to enter
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
} 