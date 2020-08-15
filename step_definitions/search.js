const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')
const helpers = require('../utils/helpers')
const navPage = require('../pages/navigation')
const homePage = require('../pages/home')

Given(/^I go to pearson.com main page$/, async () => {
  return await client.url('https://www.pearson.com/')
})

Then(/^The search input exists$/, async () => {
  return await client.assert.visible(
    homePage.section.searchSection.elements.searchInput
  )
})

Given(/^I search by "(.*)"$/, async (searchTerm) => {
  return await homePage.searchBy(searchTerm)
})

Then(/^I should the search results first page$/, () => {})

Then(
  /^The number of results from the first page should at most "(.*)"$/,
  async (maxNumberOfResults) => {
    const maxNumberOfResultsDisplayed = await helpers.asyncGetText.call(
      client,
      homePage.section.searchResultsSection.elements.maxResultsPerPage
    )
    client.assert.equal(maxNumberOfResultsDisplayed, maxNumberOfResults)
    return client
  }
)
