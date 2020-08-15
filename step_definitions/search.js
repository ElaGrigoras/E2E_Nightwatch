const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')
const helpers = require('../utils/helpers')
const navPage = require('../pages/navigation')
const homePage = require('../pages/home')

Given(/^I go to pearson.com main page$/, async () => {
  return await client.url('https://www.pearson.com/')
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
    const maxNumberOfResultsDisplayed = await helpers.asyncGetText.call(
      client,
      homePage.section.searchResultsSection.elements.maxResultsPerPage
    )
    return client.assert.equal(maxNumberOfResultsDisplayed, maxNumberOfResults)
  }
)

When(/^I click on Next button$/, async () => {
  await homePage.accesptCookiePolicy()
  return await homePage.goToNextPage()
})

When(/^I should see the next page displayed$/, async () => {
  return await homePage.verifyCurrentPageNumber('2')
})
