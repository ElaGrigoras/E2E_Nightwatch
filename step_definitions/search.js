const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')
const helpers = require('../utils/helpers')
const navPage = require('../pages/navigation')
const homePage = require('../pages/home')
const articleDetailsPage = require('../pages/article_details')
const articleDetails = require('../pages/article_details_object')
const home = require('../pages/home')
// const articleIndex = '6'

Given(/^I go to pearson.com main page$/, async () => {
  return await navPage.navigateToMainPage()
})

Then(/^The search input should be visible$/, async () => {
  return await client.assert.visible(
    homePage.section.searchSection.elements.searchInput
  )
})

Given(/^I search by "(.*)"$/, async (searchTerm) => {
  return await homePage.searchBy(searchTerm)
})

Then(/^I should see the first page of the search results$/, async () => {
  await client.assert.visible(homePage.section.searchResultsSection)
  return await homePage.verifyCurrentPageNumber('1')
})

Then(
  /^The number of results should be at most "(.*)"$/,
  async (maxNumberOfResults) => {
    // verify the number of Articles Boxes displayed after search
    let maxNumberOfResultsInt = parseInt(maxNumberOfResults)
    let searchResultsArticlesCount = await homePage.getNumberOfArticles()
    client.assert.ok(searchResultsArticlesCount <= maxNumberOfResultsInt)

    // verify the max number of search results Text displayed
    const maxResultsPerPageTextDisplayed = await helpers.asyncGetText.call(
      client,
      homePage.section.searchResultsSection.elements.maxResultsPerPage
    )
    let maxResultsPerPageDisplayed = parseInt(maxResultsPerPageTextDisplayed)
    let maxNumberOfResultsAllowed = parseInt(maxNumberOfResults)
    client.assert.ok(maxResultsPerPageDisplayed <= maxNumberOfResultsAllowed)
  }
)

When(/^I click on Next button$/, async () => {
  await homePage.acceptCookiePolicy()
  return await homePage.goToNextPage()
})

When(/^I should see the next page displayed$/, async () => {
  return await homePage.verifyCurrentPageNumber('2')
})

When(
  /^I click on "(.*)" article from the search results$/,
  async (articleNr) => {
    await homePage.acceptCookiePolicy()
    await homePage.getNumberOfArticlesDisplayed()
    await homePage.openArticle(articleNr)
    return client
  }
)

Then(/^I should see the proper article$/, async () => {
  await client.assert.urlContains(articleDetails.fileName)
  if (articleDetails.fileExtension === 'html') {
    const displayedArticleTitle = await helpers.asyncGetText.call(
      client,
      articleDetailsPage.elements.articleHeadline
    )
    // console.log(displayedArticleTitle)
    await client.assert.equal(articleDetails.mainTitle, displayedArticleTitle)
  }
  return client
})
