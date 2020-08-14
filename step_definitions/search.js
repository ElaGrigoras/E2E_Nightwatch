const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')
const homePage = require('../pages/home_page')

Given(/^I go to pearson.com main page$/, () => {
  siteNavigationPage.navToMainPage()
  return client
})
