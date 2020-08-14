const { client } = require('nightwatch-api')
// const helpers = require('../../utils/helpers')

const homePage = {
  url: function () {
    return this.api.launchUrl
  },
  elements: {},
  commands: {},
}
module.exports = {
  url: homePage.url,
  elements: homePage.elements,
  // section: homePage.sections,
  commands: homePage.commands,
  ...homePage.commands,
}
