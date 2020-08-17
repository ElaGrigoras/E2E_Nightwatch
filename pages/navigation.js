const { client } = require('nightwatch-api')
// const helpers = require('../../utils/helpers')

const siteNavigationPage = {
  elements: {},
  commands: {
    navigateToMainPage: function () {
      return client.url(client.launch_url)
    },
  },
}
module.exports = {
  elements: siteNavigationPage.elements,
  // section: siteNavigationPage.sections,
  commands: siteNavigationPage.commands,
  ...siteNavigationPage.commands,
}
