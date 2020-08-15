const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')
const navPage = require('../pages/navigation')
const homePage = require('../pages/home')

Given(/^I go to pearson.com main page$/, async () => {
  return await client.url('https://www.pearson.com/')
})

Then(/^The search input exists$/, async () => {
  return await client.assert.visible(homePage.elements.searchInput)
})

Given(/^I search by "(.*)"$/, async (searchTerm) => {
  return await homePage.searchBy(searchTerm)
})
