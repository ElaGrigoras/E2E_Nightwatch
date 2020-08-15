//const { client } = require('nightwatch-api')
// const helpers = require('../../utils/helpers')

const { client } = require('nightwatch-api')

const homePage = {
  elements: {},
  sections: {
    searchSection: {
      name: 'Search Section',
      selector: 'div.search-box.onedotcom-page-search.section',
      elements: {
        searchInput: '#search-box-input',
        searchIcon: '.search-box-icon',
      },
    },
  },
  commands: {
    searchBy: function (searchTerm) {
      client.waitForElementVisible(
        homePage.sections.searchSection.elements.searchInput
      )
      client.click(homePage.sections.searchSection.elements.searchInput)
      client.setValue(
        homePage.sections.searchSection.elements.searchInput,
        searchTerm
      )
      return client.click(homePage.sections.searchSection.elements.searchIcon)
    },
  },
}
module.exports = {
  elements: homePage.elements,
  // section: homePage.sections,
  commands: homePage.commands,
  ...homePage.commands,
}
