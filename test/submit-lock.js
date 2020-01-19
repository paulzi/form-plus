const {By, until, Browser} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const test = require('selenium-webdriver/testing');
const chai   = require('chai');
const assert = chai.assert;

test.suite(env => {
    describe('submit-lock tests', function() {
        let driver, cap;

        before(async function() {
            let chromeOptions = new chrome.Options().headless().addArguments('no-sandbox');
            let firefoxOptions = new firefox.Options().headless();
            driver = await env.builder()
                .setChromeOptions(chromeOptions)
                .setFirefoxOptions(firefoxOptions)
                .build();
            cap = await driver.getCapabilities();
            if (cap.getBrowserName() === Browser.IE || cap.getBrowserName() === Browser.EDGE) {
                this.skip(); // IE & Edge 17 has CustomEvent bug after page navigate
                /** @see: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/19861977/ **/
            }
        });

        after(() => driver.quit());

        it('Check submit lock basic', async function() {
            await driver.get('http://localhost:3003/sl-basic');
            await driver.executeScript(function() {
                document.querySelector('button').click();
                document.querySelector('button').click();
            });
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 3000);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.body.counter, '1');
        });

        it('Check settings on button', async function() {
            await driver.get('http://localhost:3003/sl-on-btn');
            await driver.executeScript(function() {
                document.querySelector('button').click();
                document.querySelector('button').click();
            });
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 3000);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.body.counter, '1');
        });
    });
});