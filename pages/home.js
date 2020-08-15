//const { client } = require('nightwatch-api')
// const helpers = require('../../utils/helpers')

const { client } = require('nightwatch-api')

const homePage = {
  elements: {
    searchInput: '#search-box-input',
  },
  commands: {
    searchBy: function (searchTerm) {
      client.waitForElementVisible(homePage.elements.searchInput)
      client.click(homePage.elements.searchInput)
      // click.setValue(homePage.elements.searchInput, searchTerm)
      return client
    },
  },
}
module.exports = {
  elements: homePage.elements,
  // section: homePage.sections,
  commands: homePage.commands,
  ...homePage.commands,
}
