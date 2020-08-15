const { client } = require('nightwatch-api')
// const helpers = require('../../utils/helpers')

const siteNavigationPage = {
  url: function () {
    return this.api.launchUrl
  },
  elements: {},
  commands: {},
}
module.exports = {
  elements: siteNavigationPage.elements,
  // section: siteNavigationPage.sections,
  commands: siteNavigationPage.commands,
  ...siteNavigationPage.commands,
}
