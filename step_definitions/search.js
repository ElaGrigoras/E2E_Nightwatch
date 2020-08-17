const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')
const helpers = require('../utils/helpers')
const navPage = require('../pages/navigation')
const homePage = require('../pages/home')
const articleDetailsPage = require('../pages/article_details')
const articleDetails = require('../pages/article_details_object')
const home = require('../pages/home')

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

Then(/^I should see the "(.*)" page of the search results$/, async (page) => {
  switch (page) {
    case 'first':
      await client.assert.visible(homePage.section.searchResultsSection)
      await homePage.verifyCurrentPageNumber('1')
      break
    case 'next':
      await client.assert.visible(homePage.section.searchResultsSection)
      await homePage.verifyCurrentPageNumber('2')
      break
    default:
      throw new Error(` ${page} page not available.`)
  }
})

Then(
  /^The number of results should be at most "(.*)"$/,
  async (maxNumberOfResults) => {
    // verify if at most 10 articles boxes are displayed
    let maxNumberOfResultsAllowed = parseInt(maxNumberOfResults)
    let searchResultsArticlesCount = await homePage.getNumberOfArticlesDisplayed()
    client.assert.ok(searchResultsArticlesCount <= maxNumberOfResultsAllowed)

    // verify if the counter of the page is correct
    /* const maxResultsPerPageTextDisplayed = await helpers.asyncGetText.call(
      client,
      homePage.section.searchResultsSection.elements.maxResultsPerPage
    )
    let maxResultsPerPageCounter = parseInt(maxResultsPerPageTextDisplayed)
    client.assert.ok(maxResultsPerPageCounter <= maxNumberOfResultsAllowed)*/
  }
)

When(/^I click on Next button$/, async () => {
  await homePage.acceptCookiePolicy()
  return await homePage.goToNextPage()
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
