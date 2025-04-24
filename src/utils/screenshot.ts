import * as fs from 'fs';
import * as path from 'path';
import { Page } from '@playwright/test';
import { logger } from './logger';

/**
 * Screenshot utility functions
 */
export class ScreenshotManager {
  private screenshotDir: string;

  constructor() {
    // Default screenshots path
    this.screenshotDir = path.resolve(process.cwd(), 'reports/screenshots');
    this.ensureDirectoryExists(this.screenshotDir);
  }

  /**
   * Set custom screenshot directory
   * @param dirPath - Directory path for screenshots
   */
  setScreenshotDir(dirPath: string): void {
    this.screenshotDir = path.resolve(process.cwd(), dirPath);
    this.ensureDirectoryExists(this.screenshotDir);
  }

  /**
   * Take a screenshot
   * @param page - Playwright page object
   * @param name - Screenshot name
   * @returns Path where screenshot was saved
   */
  async takeScreenshot(page: Page, name: string): Promise<string> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${name}_${timestamp}.png`;
      const filePath = path.join(this.screenshotDir, filename);
      
      await page.screenshot({ path: filePath, fullPage: true });
      logger.debug(`Screenshot saved: ${filePath}`);
      return filePath;
    } catch (error) {
      logger.error('Failed to take screenshot', error as Error);
      return '';
    }
  }

  /**
   * Ensure the screenshots directory exists
   * @param dirPath - Directory path
   */
  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      logger.debug(`Created screenshots directory: ${dirPath}`);
    }
  }
}

export const screenshotManager = new ScreenshotManager(); 