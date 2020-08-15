const { client } = require('nightwatch-api')
// const helpers = require('../../utils/helpers')

const searchResultsListPage = {
  elements: {
    searchResultsBox: 'div.st-results-container > p',
    maxResults: 'div.st-results-container p strong:nth-child(2)',
    nextBtn: '.pagination__btn.hasArrow.arrowRight',
    articles: 'div.st-results-container > article',
  },
  commands: {},
}
module.exports = {
  elements: searchResultsListPage.elements,
  // section: searchResultsListPage.sections,
  commands: searchResultsListPage.commands,
  ...searchResultsListPage.commands,
}
