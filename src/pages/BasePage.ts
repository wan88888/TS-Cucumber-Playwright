import { Page, Locator, expect } from '@playwright/test';
import { logger } from '../utils/logger';
import { screenshotManager } from '../utils/screenshot';

export default class BasePage {
  protected page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async navigate(url: string): Promise<void> {
    logger.debug(`Navigating to: ${url}`);
    await this.page.goto(url);
  }
  
  /**
   * Get the current page title
   * @returns Promise<string> - The page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
  
  /**
   * Wait for the specified time
   * @param ms - Time in milliseconds
   */
  async wait(ms: number): Promise<void> {
    logger.debug(`Waiting for: ${ms}ms`);
    await this.page.waitForTimeout(ms);
  }

  /**
   * Get a locator for an element
   * @param selector - Element selector
   * @returns Locator - Playwright locator object
   */
  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Wait for an element to be visible
   * @param selector - Element selector
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForElementVisible(selector: string, timeout = 10000): Promise<void> {
    logger.debug(`Waiting for element to be visible: ${selector}`);
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for an element to be hidden
   * @param selector - Element selector
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForElementHidden(selector: string, timeout = 10000): Promise<void> {
    logger.debug(`Waiting for element to be hidden: ${selector}`);
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Click on an element
   * @param selector - Element selector
   */
  async click(selector: string): Promise<void> {
    logger.debug(`Clicking on element: ${selector}`);
    try {
      await this.page.click(selector);
    } catch (error) {
      logger.error(`Failed to click on element: ${selector}`, error as Error);
      await screenshotManager.takeScreenshot(this.page, `click_error_${selector}`);
      throw error;
    }
  }

  /**
   * Fill an input field
   * @param selector - Element selector
   * @param text - Text to enter
   */
  async fill(selector: string, text: string): Promise<void> {
    logger.debug(`Filling text in element: ${selector}`);
    try {
      await this.page.fill(selector, text);
    } catch (error) {
      logger.error(`Failed to fill text in element: ${selector}`, error as Error);
      await screenshotManager.takeScreenshot(this.page, `fill_error_${selector}`);
      throw error;
    }
  }

  /**
   * Check if an element is visible
   * @param selector - Element selector
   * @returns Promise<boolean> - True if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    logger.debug(`Checking if element is visible: ${selector}`);
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  /**
   * Get text from an element
   * @param selector - Element selector
   * @returns Promise<string> - The text content
   */
  async getElementText(selector: string): Promise<string> {
    logger.debug(`Getting text from element: ${selector}`);
    const element = this.page.locator(selector);
    return await element.innerText();
  }

  /**
   * Take a screenshot with a custom name
   * @param name - Screenshot name
   * @returns Path to the saved screenshot
   */
  async takeScreenshot(name: string): Promise<string> {
    return await screenshotManager.takeScreenshot(this.page, name);
  }

  /**
   * Assert that an element contains text
   * @param selector - Element selector
   * @param text - Text to check for
   */
  async assertElementContainsText(selector: string, text: string): Promise<void> {
    logger.debug(`Asserting element ${selector} contains text: "${text}"`);
    const element = this.page.locator(selector);
    await expect(element).toContainText(text);
  }
} 