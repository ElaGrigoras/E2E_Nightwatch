const { client } = require('nightwatch-api')
// const helpers = require('../../utils/helpers')

const siteNavigationPage = {
  url: function () {
    return this.api.launchUrl
  },
  elements: {},
  commands: {
    navToMainPage: function () {
      return this.navigate()
    },
  },
}
module.exports = {
  url: siteNavigationPage.url,
  elements: siteNavigationPage.elements,
  // section: siteNavigationPage.sections,
  commands: siteNavigationPage.commands,
  ...siteNavigationPage.commands,
}
