const {By, until, Browser} = require('selenium-webdriver');
const chrome  = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const test    = require('selenium-webdriver/testing');
const chai    = require('chai');
const assert  = chai.assert;

test.suite(env => {
    describe('ajax-response tests', function() {
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

        it('Check basic response', async function() {
            await driver.get('http://localhost:3003/ar-basic');
            await driver.findElement(By.css('button')).click();
            let output = await driver.findElement(By.css('output'));
            await driver.wait(until.elementTextContains(output, 'response'), 1000);
            let html = await output.getAttribute('innerHTML');
            assert.strictEqual(html.trim(), '<div>response</div>');
        });

        it('Check target', async function() {
            await driver.get('http://localhost:3003/ar-target');
            await driver.findElement(By.css('button')).click();
            let output1 = await driver.findElement(By.css('#output1'));
            let output2 = await driver.findElement(By.css('#output2'));
            let output3 = await driver.findElement(By.css('#output3'));
            let output4 = await driver.findElement(By.css('#output4'));
            let output5 = await driver.findElement(By.css('#output5'));
            let output6 = await driver.findElement(By.css('#output6'));
            await driver.wait(until.elementTextContains(output6, 'out56'), 1000);
            assert.strictEqual(await output1.getAttribute('innerHTML'), 'out1');
            assert.strictEqual(await output2.getAttribute('innerHTML'), 'out2');
            assert.strictEqual(await output3.getAttribute('innerHTML'), 'out3');
            assert.strictEqual(await output4.getAttribute('innerHTML'), '');
            assert.strictEqual(await output5.getAttribute('innerHTML'), 'out56');
            assert.strictEqual(await output6.getAttribute('innerHTML'), 'out56');
        });

        it('Check runScenario()', async function() {
            await driver.get('http://localhost:3003/ar-run-scenario');
            await driver.findElement(By.css('#button1')).click();
            await driver.findElement(By.css('#button2')).click();
            let output1 = await driver.findElement(By.css('#output1'));
            let output2 = await driver.findElement(By.css('#output2'));
            await driver.wait(until.elementTextContains(output2, 'processed'), 1000);
            assert.strictEqual(await output1.getAttribute('innerHTML'), 'processed');
            assert.strictEqual(await output2.getAttribute('innerHTML'), 'processed');
        });

        it('Check registerAction()', async function() {
            await driver.get('http://localhost:3003/ar-register-action');
            await driver.findElement(By.css('button')).click();
            let output = await driver.findElement(By.css('output'));
            await driver.wait(until.elementTextContains(output, 'world'), 1000);
            assert.strictEqual(await output.getAttribute('innerHTML'), 'Hello world!');
        });

        it('Check built-in actions', async function() {
            await driver.get('http://localhost:3003/ar-builtins');
            await driver.findElement(By.css('button')).click();
            let output = await driver.findElement(By.css('output'));
            await driver.wait(until.elementTextContains(output, 'text'), 1000);

            let data = await driver.executeScript(function() {
                var section1 = document.querySelector('#section1');
                var section2 = document.querySelector('#section2');
                var article2 = document.querySelector('#article2');
                var article3 = document.querySelector('#article3');
                var checkbox = document.querySelector('input[type="checkbox"]');

                return {
                    sections: !section1.previousSibling && section1.nextSibling === section2 && section2.nextSibling === checkbox,
                    articles: !article2.previousSibling && article2.nextSibling === article3 && !article3.nextSibling,
                    checkbox: checkbox.checked && !checkbox.disabled,
                    section1: section1.className === 'section1',
                    section2: section2.className === '',
                    article2: article2.className === 'article2',
                    article3: article3.className === '',
                    html:     section2.innerHTML === '<p>text</p><div></div>',
                };
            });
            assert.deepEqual(data, {
                sections: true,
                articles: true,
                checkbox: true,
                section1: true,
                section2: true,
                article2: true,
                article3: true,
                html:     true,
            });
        });
    });
});