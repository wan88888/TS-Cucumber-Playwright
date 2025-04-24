# TypeScript-Cucumber-Playwright Test Framework

This project is a web automation testing framework using TypeScript, Cucumber, and Playwright with the Page Object Model design pattern.

## Features

- TypeScript for type safety
- Cucumber for BDD style testing
- Playwright for browser automation
- Page Object Model for maintainable test code
- HTML and JSON reporting
- Screenshot capture for failures
- Configurable logging levels
- Multiple environment support
- Video recording capability

## Project Structure

```
├── features                     # Cucumber feature files
│   ├── login.feature            # Feature file for login functionality
│   ├── step-definitions/        # Step definitions for feature files
│   └── support/                 # Support files for Cucumber
│       ├── hooks.ts             # Before/After hooks
│       └── world.ts             # Cucumber World definition
├── src                          # Source files
│   ├── config/                  # Configuration files
│   │   └── environment.ts       # Environment-specific settings
│   ├── pages/                   # Page Objects
│   │   ├── BasePage.ts          # Base page with common methods
│   │   └── LoginPage.ts         # Login page implementation
│   └── utils/                   # Utility functions
│       ├── logger.ts            # Logging utility
│       ├── screenshot.ts        # Screenshot manager
│       └── report-generator.js  # HTML report generator
├── reports/                     # Test reports
│   ├── screenshots/             # Screenshots from test runs
│   └── videos/                  # Video recordings (optional)
├── cucumber.js                  # Cucumber configuration
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Prerequisites

- Node.js (v14 or later)
- npm

## Installation

1. Clone this repository
2. Install dependencies:

```
npm install
```

## Running Tests

Basic test run:
```
npm test
```

Run with different environments:
```
npm run test:dev
npm run test:staging
npm run test:prod
```

Run with debug logging:
```
npm run test:debug
```

Run with video recording:
```
npm run test:record
```

Run with network logging:
```
npm run test:network
```

## Generating Reports

After running tests, generate HTML reports:
```
npm run report
```

## Environment Configuration

The framework supports multiple environments (dev, staging, prod) configured in `src/config/environment.ts`. Switch environments by setting the `TEST_ENV` environment variable:

```
TEST_ENV=staging npm test
```

## Page Object Model

This framework uses the Page Object Model (POM) design pattern to create an object repository for web UI elements. This helps reduce code duplication and improves test maintenance.

### Base Page

The `BasePage` class provides common methods for all page objects, such as:
- Navigation
- Element interactions (click, fill)
- Waiting for elements
- Taking screenshots
- Assertions

### Login Page

The `LoginPage` class extends `BasePage` and contains methods specific to the login page functionality.

## Logging

The framework includes a configurable logger with different log levels (DEBUG, INFO, WARN, ERROR). Set the log level using the `LOG_LEVEL` environment variable:

```
LOG_LEVEL=DEBUG npm test
```

## Screenshots

Screenshots are automatically captured:
- On test failures
- At specific points in tests
- When requested via the `takeScreenshot` method

## Video Recording

Enable video recording of test runs:

```
npm run test:record
```

## Utilities

The framework includes various utilities:
- Logger for consistent log messages
- Screenshot manager for capturing and organizing screenshots
- HTML report generator for beautiful test reports 