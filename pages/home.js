const { client } = require('nightwatch-api')
const helpers = require('../utils/helpers')
const articleDetails = require('../pages/article_details_object')

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
        currentPage: '.pagination__page.isActive',
        nextBtn: '.pagination__btn.hasArrow.arrowRight',
        articleBox: 'div.st-results-container > article',
        thirdArticle: 'div.st-results-container > article:nth-child(5)',
      },
    },
    footer: {
      name: 'Footer',
      selector: '',
      elements: {
        accesptCookiePolicyBtn: '#cookie-notification-policy-accept-continue',
      },
    },
  },
  commands: {
    searchBy: async function (searchTerm) {
      client.waitForElementVisible(
        homePage.sections.searchSection.elements.searchInput
      )
      client.click(homePage.sections.searchSection.elements.searchInput)
      client.setValue(
        homePage.sections.searchSection.elements.searchInput,
        searchTerm
      )
      return await client.click(
        homePage.sections.searchSection.elements.searchIcon
      )
    },

    verifyCurrentPageNumber: async function (currentPageNumber) {
      const currentPageNumberDisplayed = await helpers.asyncGetText.call(
        client,
        homePage.sections.searchResultsSection.elements.currentPage
      )
      await client.assert.equal(currentPageNumberDisplayed, currentPageNumber)
    },

    verifyNumberOfSearchResults: async function () {
      const maxNumberOfResultsDisplayed = await helpers.asyncGetText.call(
        client,
        homePage.sections.searchResultsSection.elements.maxResultsPerPage
      )
      await client.assert.equal(maxNumberOfResultsDisplayed, '10')
    },

    goToNextPage: async function () {
      await client.click(
        homePage.sections.searchResultsSection.elements.nextBtn
      )
    },

    acceptCookiePolicy: async function () {
      await client.click(
        homePage.sections.footer.elements.accesptCookiePolicyBtn
      )
      client.pause(500)
    },

    /*getNumberOfSearchResultsArticles: async function () {
      const articles = []
      await client.elements(
        'css selector',
        homePage.sections.searchResultsSection.elements.articleBox,
        function (result) {
          for (var i in result.value) {
            this.elementIdAttribute(result.value[i].ELEMENT, 'id', function (
              result
            ) {
              articles.push(result.value)
            })
          }
          console.log(articles.lenght)
        }
      )
    },*/

    getArticleInfo: async function (articleNumber) {
      const articleItem = `div.st-results-container > article:nth-child(${articleNumber}) a`
      articleDetails.completeTitle = await helpers.asyncGetText.call(
        client,
        articleItem
      )
      const titleArray = articleDetails.completeTitle.split('|')
      const mainTitleRough = titleArray[0]
      articleDetails.mainTitle = mainTitleRough.trim()
      articleDetails.link = await helpers.asyncGetAttribute.call(
        client,
        articleItem,
        'href'
      )
      /*console.log(articleDetails.link)
      console.log(articleDetails.mainTitle)
      console.log(articleDetails.completeTitle)*/
    },

    getFileNameFromUrl: function (url) {
      const pathname = url
      const index = pathname.lastIndexOf('/')
      articleDetails.fileName = pathname.substring(index + 1)
      const splitURL = articleDetails.fileName.split('.')
      articleDetails.fileExtension = splitURL[1]
      // console.log(articleDetails.fileName)
      // console.log(articleDetails.fileExtension)
      return -1 !== index ? pathname.substring(index + 1) : pathname
    },

    clickArticleLink: async function (articleNumber) {
      const article = `div.st-results-container > article:nth-child(${articleNumber}) a`
      await client.waitForElementVisible(article)
      await client.click(article)
    },

    openArticle: async function (articleNr) {
      switch (articleNr) {
        case 'second':
          await this.getArticleInfo('4')
          await this.getFileNameFromUrl(articleDetails.link)
          await this.clickArticleLink('4')
          break
        case 'third':
          await this.getArticleInfo('5')
          await this.getFileNameFromUrl(articleDetails.link)
          await this.clickArticleLink('5')
          break
        case 'fourth':
          await this.getArticleInfo('6')
          await this.getFileNameFromUrl(articleDetails.link)
          await this.clickArticleLink('6')
          break
        default:
          throw new Error(`Article ${articleNr} not available.`)
      }
    },
  },
}
module.exports = {
  elements: homePage.elements,
  section: homePage.sections,
  commands: homePage.commands,
  ...homePage.commands,
}
