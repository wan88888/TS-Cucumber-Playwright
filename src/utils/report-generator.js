const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Ensure reports directory exists
const reportsDir = path.join(process.cwd(), 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Report options
const options = {
  theme: 'bootstrap',
  jsonFile: path.join(reportsDir, 'cucumber-report.json'),
  output: path.join(reportsDir, 'cucumber-html-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': 'Demo App',
    'Test Environment': process.env.TEST_ENV || 'Development',
    Browser: 'Chrome',
    Platform: process.platform,
    Parallel: 'Scenarios',
    Executed: 'Local'
  },
  failedSummaryReport: true
};

// Generate report
try {
  // Check if JSON report exists
  if (!fs.existsSync(options.jsonFile)) {
    console.error(`JSON report file not found: ${options.jsonFile}`);
    console.error('Run tests first using: npm test');
    process.exit(1);
  }
  
  reporter.generate(options);
  console.log(`HTML report generated at: ${options.output}`);
} catch (error) {
  console.error('Error generating report:', error);
  process.exit(1);
} 