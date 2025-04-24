import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { CustomWorld } from './world';
import { logger } from '../../src/utils/logger';
import { screenshotManager } from '../../src/utils/screenshot';

// Shared browser instance for all tests
let browser: Browser;

// BeforeAll hook - runs once before all tests
BeforeAll(async function() {
  logger.info('Starting test execution');
  // Launch the browser once for all tests
  browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
  });
});

// Before hook - runs before each scenario
Before(async function(this: CustomWorld, scenario) {
  logger.info(`Starting scenario: ${scenario.pickle.name}`);
  
  if (!browser) {
    logger.warn('Browser was not launched in BeforeAll hook, launching now');
    browser = await chromium.launch({ headless: true });
  }
  
  // Create a new context for each scenario - this ensures isolation
  this.context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    acceptDownloads: true,
    recordVideo: process.env.RECORD_VIDEO === 'true' ? {
      dir: 'reports/videos/',
      size: { width: 1280, height: 720 }
    } : undefined
  });
  
  // Create a new page in the context
  this.page = await this.context.newPage();
  
  // Setup request and response event handlers
  if (process.env.LOG_NETWORK === 'true') {
    this.page.on('request', request => {
      logger.debug(`Request: ${request.method()} ${request.url()}`);
    });
    
    this.page.on('response', response => {
      logger.debug(`Response: ${response.status()} ${response.url()}`);
    });
  }
  
  // Store browser for use in other hooks
  this.browser = browser;
});

// After hook - runs after each scenario
After(async function(this: CustomWorld, scenario) {
  // Take screenshot if scenario failed
  if (scenario.result?.status === Status.FAILED) {
    logger.error(`Scenario failed: ${scenario.pickle.name}`);
    
    if (this.page) {
      const screenshot = await screenshotManager.takeScreenshot(
        this.page, 
        `failure_${scenario.pickle.name.replace(/\s+/g, '_')}`
      );
      logger.info(`Failure screenshot taken: ${screenshot}`);
      
      // Attach screenshot to report if using compatible formatter
      try {
        const image = Buffer.from(await this.page.screenshot()).toString('base64');
        this.attach(image, 'image/png');
      } catch (error) {
        logger.error('Failed to attach screenshot to report', error as Error);
      }
    }
  }
  
  // Log scenario result
  logger.info(`Scenario ${scenario.pickle.name} finished with status: ${scenario.result?.status}`);
  
  // Close the context (and all its pages)
  if (this.context) {
    await this.context.close();
  }
});

// AfterAll hook - runs once after all tests
AfterAll(async function() {
  // Close the shared browser instance
  if (browser) {
    await browser.close();
  }
  logger.info('Test execution completed');
}); 