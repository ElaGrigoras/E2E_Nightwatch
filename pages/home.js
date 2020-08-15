const { client } = require('nightwatch-api')
const helpers = require('../utils/helpers')

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
    searchResultsSection: {
      name: 'Search Results Section',
      selector: '.section .st-results-container',
      elements: {
        searchResultsBox: 'div.st-results-container > p',
        maxResultsPerPage: 'div.st-results-container > p strong:nth-child(2)',
        nextBtn: '.pagination__btn.hasArrow.arrowRight',
        articleBox: 'div.st-results-container > article',
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
    getNumberOfSearchResults: async function () {
      /*const maxNumberOfResultsDisplayed = await helpers.asyncGetText.call(
        client,
        homePage.sections.searchResultsSection.elements.maxResultsPerPage
      )
      client.assert.equal(maxNumberOfResultsDisplayed, '10')*/
    },
  },
}
module.exports = {
  elements: homePage.elements,
  section: homePage.sections,
  commands: homePage.commands,
  ...homePage.commands,
}
