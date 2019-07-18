const path = require('path');
const {By, until, Browser} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const test = require('selenium-webdriver/testing');
const chai   = require('chai');
const assert = chai.assert;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

test.suite(env => {
    describe('submit-ajax tests', function() {
        let driver, cap;

        before(async function() {
            let chromeOptions = new chrome.Options().headless().addArguments('no-sandbox');
            let firefoxOptions = new firefox.Options().headless();
            driver = await env.builder()
                .setChromeOptions(chromeOptions)
                .setFirefoxOptions(firefoxOptions)
                .build();
            cap = await driver.getCapabilities();
        });

        after(() => driver.quit());

        it('Check submit ajax field types', async function() {
            await driver.get('http://localhost:3003/sa-fields');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.elementLocated(By.css('code')), 3000);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.query.query, '1');
            assert.strictEqual(json.body.hidden, '1');
            assert.strictEqual(json.body.text, '1');
            assert.strictEqual(json.body.password, '1');
            assert.strictEqual(json.body.email, 'none@example.com');
            assert.strictEqual(json.body.textarea, '1');
            assert.deepEqual(json.body.checkbox, ['1']);
            assert.strictEqual(json.body.radio, '1');
            assert.strictEqual(json.body.select, '2');
            assert.deepEqual(json.body.selectMultiple, ['2', '3']);
        });

        it('Check submit ajax submit buttons', async function() {
            await driver.get('http://localhost:3003/sa-buttons');
            let list = [
                {sel: 'button[name="default"]', field: 'default'},
                {sel: 'button[type="submit"]',  field: 'submit'},
                {sel: 'input[type="submit"]',   field: 'input'},
                {sel: 'input[type="image"]',    field: 'image'},
            ];
            await asyncForEach(list, async data => {
                await driver.findElement(By.css(data.sel)).click();
                await driver.wait(until.elementLocated(By.css('code')), 3000);
                let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
                json = JSON.parse(json);
                assert.strictEqual(json.query.query, '1');
                assert.strictEqual(json.body.hidden, '1');
                if (data.field === 'image') {
                    assert.exists(json.body['image.x']);
                    assert.exists(json.body['image.y']);
                } else {
                    assert.strictEqual(json.body[data.field], '1');
                    await driver.get('http://localhost:3003/sa-buttons');
                }
            });
        });

        it('Check submit ajax get', async function() {
            await driver.get('http://localhost:3003/sa-get');
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.elementLocated(By.css('code')), 3000);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.isUndefined(json.query.query);
            assert.strictEqual(json.query.hidden, '1');
            assert.strictEqual(json.query.text, '1');
            assert.strictEqual(json.query.password, '1');
            assert.strictEqual(json.query.email, 'none@example.com');
            assert.strictEqual(json.query.textarea, '1');
            assert.deepEqual(json.query.checkbox, ['1']);
            assert.strictEqual(json.query.radio, '1');
            assert.strictEqual(json.query.select, '2');
            assert.deepEqual(json.query.selectMultiple, ['2', '3']);
            assert.deepEqual(json.query.submit, '1');
        });

        it('Check multipart enctype', async function() {
            let testFile = path.resolve(__dirname, '../test-data/file1.dat');
            await driver.get('http://localhost:3003/sa-multipart');
            await driver.findElement(By.css('input[type="file"]')).sendKeys(testFile);
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.elementLocated(By.css('code')), 3000);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.query.query, '1');
            assert.strictEqual(json.body.hidden, '1');
            assert.strictEqual(json.body.text, '1');
            assert.strictEqual(json.body.password, '1');
            assert.strictEqual(json.body.email, 'none@example.com');
            assert.strictEqual(json.body.textarea, '1');
            assert.deepEqual(json.body.checkbox, ['1']);
            assert.strictEqual(json.body.radio, '1');
            assert.strictEqual(json.body.select, '2');
            assert.deepEqual(json.body.selectMultiple, ['2', '3']);
            assert.strictEqual(json.body.submit, '1');
            if (cap.getBrowserName() !== Browser.SAFARI) { // selenium for safari not support file upload
                assert.strictEqual(json.files[0].originalname, 'file1.dat');
                assert.strictEqual(json.files[0].size, 5);
            }
        });

        it('Check form_ attributes', async function() {
            let testFile = path.resolve(__dirname, '../test-data/file1.dat');
            await driver.get('http://localhost:3003/sa-formattr');
            await driver.findElement(By.css('input[type="file"]')).sendKeys(testFile);
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.elementLocated(By.css('code')), 3000);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.query.query, '1');
            assert.strictEqual(json.body.text, '1');
            if (cap.getBrowserName() !== Browser.SAFARI) { // selenium for safari not support file upload
                assert.strictEqual(json.files[0].originalname, 'file1.dat');
                assert.strictEqual(json.files[0].size, 5);
            }
        });

        it('Check form attribute', async function() {
            await driver.get('http://localhost:3003/sa-form');
            await driver.findElement(By.css('button[value="s01"]')).click();
            await driver.wait(until.elementLocated(By.css('code')), 3000);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.deepEqual(json.body.items, ['i11', 'i21', 'i01', 's01']);
        });

        it('Check events', async function() {
            await driver.get('http://localhost:3003/sa-events');
            await driver.findElement(By.css('#submit-done')).click();
            await driver.wait(until.elementLocated(By.css('code')), 3000);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.deepEqual(json, {
                evt: ['before', 'start', 'done', 'end'],
                btnBefore:   'submit-done',
                xhrBefore:   true,
                xhrStart:    true,
                xhrDone:     true,
                xhrEnd:      true,
                tranBefore: 'ajax',
                tranStart:  'ajax',
                tranDone:   'ajax',
                tranEnd:    'ajax',
            });
            await driver.get('http://localhost:3003/sa-events');
            await driver.findElement(By.css('#submit-fail')).click();
            await driver.wait(until.elementLocated(By.css('code')), 3000);
            json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.deepEqual(json, {
                evt: ['before', 'start', 'fail', 'end'],
                btnBefore:   'submit-fail',
                xhrBefore:   true,
                xhrStart:    true,
                xhrFail:     true,
                xhrEnd:      true,
                tranBefore: 'ajax',
                tranStart:  'ajax',
                tranFail:   'ajax',
                tranEnd:    'ajax',
            });
        });

        it('Check skip empty', async function() {
            await driver.get('http://localhost:3003/sa-skip-empty');
            await driver.findElement(By.css('button')).click();

            await driver.wait(until.elementLocated(By.css('code')), 3000);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.isUndefined(json.body.text);
        });
    });
});