async function asyncGetText(selector) {
  const browser = this
  return new Promise(function (resolve) {
    browser.getText(selector, (result) => resolve(result.value))
  })
}

async function asyncGetValue(selector) {
  const browser = this
  return new Promise(function (resolve) {
    browser.getValue(selector, (result) => resolve(result.value))
  })
}
async function asyncGetAttribute(selector, attribute) {
  const browser = this
  return new Promise(function (resolve) {
    browser.getAttribute(selector, attribute, (result) => resolve(result.value))
  })
}

async function asyncElements(locateStrategy, selector) {
  const browser = this
  return new Promise(function (resolve) {
    browser.elements(locateStrategy, selector, (result) =>
      resolve(result.value)
    )
  })
}

module.exports = {
  asyncGetText,
  asyncGetValue,
  asyncGetAttribute,
  asyncElements,
}
