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
