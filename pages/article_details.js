const { client } = require('nightwatch-api')
// const helpers = require('../../utils/helpers')

const articleDetailsPage = {
  elements: {
    articleHeadline: 'div.ba-hero__content.container .ba-hero__text__headline',
    articleTitle: '.post-header .post-title',
  },
  commands: {},
}
module.exports = {
  elements: articleDetailsPage.elements,
  // section: articleDetailsPage.sections,
  commands: articleDetailsPage.commands,
  ...articleDetailsPage.commands,
}
