const {By, until, Browser} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const test = require('selenium-webdriver/testing');
const chai   = require('chai');
const assert = chai.assert;

test.suite(env => {
    describe('skip-empty tests', function() {
        let driver, cap;

        before(async function() {
            let chromeOptions = new chrome.Options().headless();
            let firefoxOptions = new firefox.Options().headless();
            driver = await env.builder()
                .setChromeOptions(chromeOptions)
                .setFirefoxOptions(firefoxOptions)
                .build();
            cap = await driver.getCapabilities();
        });

        after(() => driver.quit());

        it('Check skip empty basic', async function() {
            await driver.get('http://localhost:3003/se-basic');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.isUndefined(json.body.hiddenEmpty);
            assert.isUndefined(json.body.textEmpty);
            assert.isUndefined(json.body.passwordEmpty);
            assert.isUndefined(json.body.emailEmpty);
            assert.isUndefined(json.body.textareaEmpty);
            assert.isUndefined(json.body.checkbox);
            assert.isUndefined(json.body.radio);
            assert.isUndefined(json.body.select);
            assert.strictEqual(json.body.hiddenFill, '1');
            assert.strictEqual(json.body.textFill, '1');
            assert.strictEqual(json.body.passwordFill, '1');
            assert.strictEqual(json.body.emailFill, 'none@example.com');
            assert.strictEqual(json.body.textareaFill, '1');
        });

        it('Check skip empty settings', async function() {
            await driver.get('http://localhost:3003/se-settings');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.body.field1, '1');
            assert.isUndefined(json.body.field2);
            assert.strictEqual(json.body.field3, '');
        });

        it('Check skip empty settings inv', async function() {
            await driver.get('http://localhost:3003/se-settings-inv');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.body.field1, '1');
            assert.strictEqual(json.body.field2, '');
            assert.isUndefined(json.body.field3);
        });

        it('Check skip empty value', async function() {
            await driver.get('http://localhost:3003/se-value');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.isUndefined(json.body.text);
            assert.isUndefined(json.body.radio);
            assert.isUndefined(json.body.checkbox);
        });

        it('Check skip empty mode', async function() {
            await driver.get('http://localhost:3003/se-mode');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.isUndefined(json.body.name);
            assert.isUndefined(json.body.disabled);
            if (cap.getBrowserName() !== Browser.IE) { // ie not support form attributes
                assert.isUndefined(json.body.form);
            }
        });

        it('Check skip empty on before settings', async function() {
            await driver.get('http://localhost:3003/se-on-before-settings');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.isUndefined(json.body.zero);
            assert.strictEqual(json.body.empty, '');
        });
    });
});