require('dotenv').load()

const fs = require('fs')
const {By, Key, Builder, until} = require('selenium-webdriver')

const capabilities = [{
  browserName: 'chrome',
  version: '68.0',
  platform: 'WINDOWS',
  resolution: '1280x1024',
  'browserstack.user': process.env.BROWSERSTACK_USER,
  'browserstack.key': process.env.BROWSERSTACK_KEY
}, {
  browserName: 'firefox',
  version: '61.0',
  platform: 'WINDOWS',
  resolution: '1280x1024',
  'browserstack.user': process.env.BROWSERSTACK_USER,
  'browserstack.key': process.env.BROWSERSTACK_KEY
}, {
  browserName: 'iPhone',
  'browserstack.user': process.env.BROWSERSTACK_USER,
  'browserstack.key': process.env.BROWSERSTACK_KEY
}]

const drivers = capabilities.map(capabilities => new Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities(capabilities)
  .build())

drivers.forEach(driver => driver.get("https://buidlheroes.com/"))

const driver = drivers.forEach(async (driver, index) => {
  await driver.wait(
    until.elementsLocated(By.className('chart')),
    20000
  )
  await driver.findElements(By.className('chart'))
  const data = await driver.takeScreenshot()
  fs.writeFile(`screenshot_${index}.png`, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
    if(err) throw err;
  });
})

//drivers.forEach(driver => driver.quit())
