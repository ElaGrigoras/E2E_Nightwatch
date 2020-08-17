var SELENIUM_CONFIGURATION = {
  start_process: true,
  server_path: 'node_modules/.bin/chromedriver',
  port: 9515,
}

var CHROME_CONFIGURATION = {
  browserName: 'chrome',
  loggingPrefs: { browser: 'ALL' },
  chromeOptions: {
    args: ['start-maximized'],
  },
}
var DEFAULT_CONFIGURATION = {
  launch_url: 'https://www.pearson.com/',
  desiredCapabilities: CHROME_CONFIGURATION,
}
var STAGING_CONFIGURATION = Object.assign({}, DEFAULT_CONFIGURATION, {
  launch_url: 'https://www.pearson.com/',
})

var ENVIRONMENTS = {
  default: DEFAULT_CONFIGURATION,
  staging: STAGING_CONFIGURATION,
}

module.exports = {
  src_folders: ['tests'],
  page_objects_path: 'pages',
  custom_commands_path: 'custom_commands',
  custom_assertions_path: 'custom_assertions',
  globals_path: 'globals.js',
  webdriver: SELENIUM_CONFIGURATION,
  test_settings: ENVIRONMENTS,
  screenshots: {
    enabled: true,
    path: 'screenshots'
  }
}
