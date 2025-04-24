module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/step-definitions/**/*.ts', 'features/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['html:reports/cucumber-report.html', 'json:reports/cucumber-report.json'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true
  }
}; 