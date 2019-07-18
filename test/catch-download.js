const path = require('path');
const {By, until, Browser} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const test = require('selenium-webdriver/testing');
const chai   = require('chai');
const assert = chai.assert;

test.suite(env => {
    describe('catch-download tests', function() {
        let driver, cap;

        before(async function() {
            let downloadDir = path.resolve(__dirname, '../test-runtime');
            let chromeOptions = new chrome.Options().headless().addArguments('no-sandbox');
            let firefoxOptions = new firefox.Options()
                .setPreference('browser.download.dir', downloadDir)
                .setPreference('browser.download.folderList', 2)
                .setPreference('browser.helperApps.neverAsk.openFile', 'application/octet-stream')
                .setPreference('browser.helperApps.neverAsk.saveToDisk', 'application/octet-stream')
                .headless();
            driver = await env.builder()
                .setChromeOptions(chromeOptions)
                .setFirefoxOptions(firefoxOptions)
                .build();
            cap = await driver.getCapabilities();
            if (cap.getBrowserName() === Browser.IE) {
                this.skip(); // selenium not support download in ie
            }
        });

        after(() => driver.quit());

        it('Check basic catch download', async function() {
            await driver.get('http://localhost:3003/cd-basic');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.titleIs('catched'), 10000); // firefox is slow after download
            let title = await driver.getTitle();
            assert.strictEqual(title, 'catched');
        });

        it('Check change params on form attribute', async function() {
            await driver.get('http://localhost:3003/cd-attr-form');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.titleIs('catched'), 10000);
            let title = await driver.getTitle();
            assert.strictEqual(title, 'catched');
        });

        it('Check change params on btn attribute', async function() {
            await driver.get('http://localhost:3003/cd-attr-btn');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.titleIs('catched'), 10000);
            let title = await driver.getTitle();
            assert.strictEqual(title, 'catched');
        });

        it('Check change params on event', async function() {
            await driver.get('http://localhost:3003/cd-event');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.titleIs('catched'), 10000);
            let title = await driver.getTitle();
            assert.strictEqual(title, 'catched');
        });
    });
});