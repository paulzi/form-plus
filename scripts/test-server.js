const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

function templateFields(form) {
    form = form ? `form=${form}` : '';
    return `
        <input type="hidden" name="hidden" value="1" ${form}>
        <input type="text" name="text" value="1" ${form}>
        <input type="password" name="password" value="1" ${form}>
        <input type="email" name="email" value="none@example.com" ${form}>
        <textarea name="textarea" ${form}>1</textarea>
        <input type="checkbox" name="checkbox[]" value="0" ${form}>
        <input type="checkbox" name="checkbox[]" value="1" checked ${form}>
        <input type="radio" name="radio" value="0" ${form}>
        <input type="radio" name="radio" value="1" checked ${form}>
        <select name="select" ${form}>
            <option value="1">1</option>
            <option value="2" selected>2</option>
        </select>
        <select name="selectMultiple[]" ${form} multiple>
            <option value="1">1</option>
            <option value="2" selected>2</option>
            <option selected>3</option>
        </select>
        <input type="file" name="file" ${form}>
    `;
}

function templateButtons(form) {
    form = form ? `form=${form}` : '';
    return `
        <button type="reset" name="reset" value="1" ${form}>reset</button>
        <button type="button" name="button" value="1" ${form}>No submit</button>
        <button name="default" value="1" ${form}>Submit default</button>
        <button type="submit" name="submit" value="1" ${form}>Submit</button>
        <input type="submit" name="input" value="1" ${form}>
        <input type="image" src="//placehold.it/100x50" alt="" name="image" ${form}>
    `;
}

function templateFormPlus(body) {
    return `<!DOCTYPE html>
        <html lang="ru-RU">
        <head>
            <meta charset="UTF-8">
            <title>form-plus test</title>
            <script src="/form-plus-test.js"></script>
        </head>
        <body>
            ${body}
        </body>
        </html>`;
}

app.get('/', (req, res) => {
    res.send('ok');
});

app.get('/cd-basic', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/cd-response" method="post" data-catch-download="true">
            <button>Submit</button>
        </form>
        <script>
        document.addEventListener('submitend', function() {
            document.title = 'catched';
        });
        </script>
    `));
});

app.get('/cd-attr-form', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/cd-response-req" method="post" data-catch-download='{"enabled": true, "param": "req"}'>
            <button>Submit</button>
        </form>
        <script>
        document.addEventListener('submitend', function() {
            document.title = 'catched';
        });
        </script>
    `));
});

app.get('/cd-attr-btn', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/cd-response-req" method="post" data-catch-download="false">
            <button data-catch-download='{"enabled": true, "param": "req"}'>Submit</button>
        </form>
        <script>
        document.addEventListener('submitend', function() {
            document.title = 'catched';
        });
        </script>
    `));
});

app.get('/cd-event', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/cd-response-req" method="post" data-catch-download="true">
            <button>Submit</button>
        </form>
        <script>
        document.addEventListener('submitbefore', function(e) {
            e.detail.catchDownload.param = 'req';
        });
        document.addEventListener('submitend', function() {
            document.title = 'catched';
        });
        </script>
    `));
});

app.all('/cd-response', (req, res) => {
    let testFile = path.resolve(__dirname, '../test-data/file1.dat');
    let requestId = req.body['_requestId'];
    res.cookie(`_requestId${requestId}`, '1', { maxAge: 1000, path: '/' });
    res.attachment(testFile);
    res.sendFile(testFile, {headers: {'Content-Type': 'application/octet-stream'}});
});

app.all('/cd-response-req', (req, res) => {
    let testFile = path.resolve(__dirname, '../test-data/file1.dat');
    let requestId = req.body['req'];
    res.cookie(`req${requestId}`, '1', { maxAge: 1000, path: '/' });
    res.attachment(testFile);
    res.sendFile(testFile, {headers: {'Content-Type': 'application/octet-stream'}});
});

app.get('/se-basic', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response" method="post" data-skip-empty="true">
            <input type="hidden" name="hiddenEmpty" value="">
            <input type="hidden" name="hiddenFill" value="1">
            <input name="textEmpty" value="">
            <input name="textFill" value="1">
            <input type="password" name="passwordEmpty" value="">
            <input type="password" name="passwordFill" value="1">
            <input type="email" name="emailEmpty" value="">
            <input type="email" name="emailFill" value="none@example.com">
            <textarea name="textareaEmpty"></textarea>
            <textarea name="textareaFill">1</textarea>
            <input type="checkbox" name="checkbox[]" value="1">
            <input type="checkbox" name="checkbox[]" value="" checked>
            <input type="radio" name="radio" value="1">
            <input type="radio" name="radio" value="" checked>
            <select name="select">
                <option value="1">1</option>
                <option value="" selected>2</option>
            </select>
            <button>Submit</button>
        </form>
    `));
});

app.get('/se-settings', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response" method="post" data-skip-empty="false">
            <input name="field1" value="1">
            <input name="field2" value="">
            <input name="field3" value="" data-skip-empty="false">
            <button data-skip-empty="true">Submit</button>
        </form>
    `));
});

app.get('/se-settings-inv', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response" method="post" data-skip-empty="true">
            <input name="field1" value="1">
            <input name="field2" value="">
            <input name="field3" value="" data-skip-empty="true">
            <button data-skip-empty="false">Submit</button>
        </form>
    `));
});

app.get('/se-value', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response" method="post" data-skip-empty="true">
            <input name="text" value="no" data-skip-empty='{"value":"no"}'>
            <input type="radio" name="radio" value="0" checked data-skip-empty='{"value":"0"}'>
            <input type="radio" name="radio" value="1">
            <input type="checkbox" name="checkbox" value="true" checked  data-skip-empty='{"value":"true"}'>
            <button>Submit</button>
        </form>
    `));
});

app.get('/se-mode', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response" method="post" data-skip-empty="true">
            <input name="name" value="" data-skip-empty='{"mode":"name"}'>
            <input name="disabled" value="" data-skip-empty='{"mode":"disabled"}'>
            <input name="form" value="" data-skip-empty='{"mode":"form"}'>
            <button>Submit</button>
        </form>
    `));
});

app.get('/se-on-before-settings', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response" method="post">
            <input name="zero" value="0">
            <input name="empty" value="">
            <button>Submit</button>
        </form>
        <script>
        document.addEventListener('submitbefore', function(e) {
            e.detail.skipEmpty.enabled = true;
            e.detail.skipEmpty.value   = '0';
        });
        </script>
    `));
});

app.get('/sl-basic', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response?wait=500" method="post" data-submit-lock="true">
            <input type="hidden" name="counter" value="0">
            <button>Submit</button>
        </form>
        <script>
        document.querySelector('button').addEventListener('click', function() {
            var input = document.querySelector('input');
            input.value = parseInt(input.value, 10) + 1; 
        });
        </script>
    `));
});

app.get('/sl-on-btn', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response?wait=500" method="post">
            <input type="hidden" name="counter" value="0">
            <button data-submit-lock="true">Submit</button>
        </form>
        <script>
        document.querySelector('button').addEventListener('click', function() {
            var input = document.querySelector('input');
            input.value = parseInt(input.value, 10) + 1; 
        });
        </script>
    `));
});

app.get('/sa-fields', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response-json?query=1" method="post" data-ajax-submit="true">
            ${templateFields()}
            <button>Submit</button>
        </form>
        <script>
        document.addEventListener('submitdone', function(e) {
            var code = document.createElement('code');
            code.textContent = e.detail.xhr.responseText;
            document.body.appendChild(code);
        });
        </script>
    `));
});

app.get('/sa-buttons', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response-json?query=1" method="post" data-ajax-submit="true">
            <input type="hidden" name="hidden" value="1">
            ${templateButtons()}
        </form>
        <script>
        document.addEventListener('submitdone', function(e) {
            var code = document.createElement('code');
            code.textContent = e.detail.xhr.responseText;
            document.body.appendChild(code);
        });
        </script>
    `));
});

app.get('/sa-get', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response-json?query=1" data-ajax-submit="true">
            ${templateFields()}
            <button name="submit" value="1">Submit</button>
        </form>
        <script>
        document.addEventListener('submitdone', function(e) {
            var code = document.createElement('code');
            code.textContent = e.detail.xhr.responseText;
            document.body.appendChild(code);
        });
        </script>
    `));
});

app.get('/sa-multipart', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response-json?query=1" method="post" enctype="multipart/form-data" data-ajax-submit="true">
            ${templateFields()}
            <button name="submit" value="1">Submit</button>
        </form>
        <script>
        document.addEventListener('submitdone', function(e) {
            var code = document.createElement('code');
            code.textContent = e.detail.xhr.responseText;
            document.body.appendChild(code);
        });
        </script>
    `));
});

app.get('/sa-formattr', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response?query=1" method="get" data-ajax-submit="true">
            <input type="text" name="text" value="1">
            <input type="file" name="file">
            <button formaction="/response-json?query=1" formmethod="post" formenctype="multipart/form-data">Submit</button>
        </form>
        <script>
        document.addEventListener('submitdone', function(e) {
            var code = document.createElement('code');
            code.textContent = e.detail.xhr.responseText;
            document.body.appendChild(code);
        });
        </script>
    `));
});

app.get('/sa-form', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response-json" method="post" data-ajax-submit="true" id="form1">
            <input type="hidden" name="items[]" value="i11">
            <input type="hidden" name="items[]" value="i12" form="form2">
            <input type="hidden" name="items[]" value="i10" form="form0">
            <button name="items[]" value="s11">Submit</button>
        </form>
        <form action="/response-json" method="post" data-ajax-submit="true" id="form2">
            <input type="hidden" name="items[]" value="i22">
            <input type="hidden" name="items[]" value="i21" form="form1">
            <input type="hidden" name="items[]" value="i20" form="form0">
            <button name="items[]" value="s22">Submit</button>
        </form>
        <input type="hidden" name="items[]" value="i01" form="form1">
        <input type="hidden" name="items[]" value="i02" form="form2">
        <input type="hidden" name="items[]" value="i00">
        <button name="items[]" value="s01" form="form1">Submit</button>
        <script>
        document.addEventListener('submitdone', function(e) {
            var code = document.createElement('code');
            code.textContent = e.detail.xhr.responseText;
            document.body.appendChild(code);
        });
        </script>
    `));
});

app.get('/sa-events', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response-json" method="post" data-ajax-submit="true">
            <input type="hidden" name="hidden" value="1">
            <button id="submit-done">Submit done</button>
        </form>
        <form action="/404" method="post" data-ajax-submit="true">
            <input type="hidden" name="hidden" value="1">
            <button id="submit-fail">Submit fail</button>
        </form>
        <script>
        var testResult = {evt: []};
        document.addEventListener('submitbefore', function(e) {
            testResult['evt'].push('before');
            testResult['tranBefore'] = e.detail.transport;
            testResult['xhrBefore']  = !!e.detail.xhr;
            testResult['btnBefore']  = e.detail.activeButton.id;
        });
        document.addEventListener('submitstart', function(e) {
            testResult['evt'].push('start');
            testResult['xhrStart']  = !!e.detail.xhr;
            testResult['tranStart'] = e.detail.transport;
        });
        document.addEventListener('submitdone', function(e) {
            testResult['evt'].push('done');
            testResult['xhrDone']  = !!e.detail.xhr;
            testResult['tranDone'] = e.detail.transport;
        });
        document.addEventListener('submitfail', function(e) {
            testResult['evt'].push('fail');
            testResult['xhrFail']  = !!e.detail.xhr;
            testResult['tranFail'] = e.detail.transport;
        });
        document.addEventListener('submitend', function(e) {
            testResult['evt'].push('end');
            testResult['xhrEnd']  = !!e.detail.xhr;
            testResult['tranEnd'] = e.detail.transport;
            var code = document.createElement('code');
            code.textContent = JSON.stringify(testResult);
            document.body.appendChild(code);
        });
        </script>
    `));
});

app.get('/sa-skip-empty', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/response-json" method="post" data-ajax-submit="true" data-skip-empty="true">
            <input type="text" name="text" value="">
            <button>Submit</button>
        </form>
        <script>
        document.addEventListener('submitdone', function(e) {
            var code = document.createElement('code');
            code.textContent = e.detail.xhr.responseText;
            document.body.appendChild(code);
        });
        </script>
    `));
});

app.get('/ar-basic', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/ar-basic-response" method="post" data-ajax-submit="true">
            <output></output>
            <button>Submit</button>
        </form>
    `));
});

app.post('/ar-basic-response', (req, res) => {
    res.set('Content-Type', 'application/form-plus-response');
    res.send(`
        <action action="content" target="output">
            <div>response</div>
        </action>
    `);
});

app.get('/ar-target', (req, res) => {
    res.send(templateFormPlus(`
        <section id="section1">
            <form action="/ar-target-response" method="post" data-ajax-submit="true">
                <output id="output1"></output>
                <button>Submit</button>
            </form>
            <output id="output2"></output>
        </section>
        <section id="section2">
            <output id="output3"></output>
            <output id="output4"></output>
        </section>
        <section id="section3">
            <output id="output5"></output>
            <output id="output6"></output>
        </section>
    `));
});

app.post('/ar-target-response', (req, res) => {
    res.set('Content-Type', 'application/form-plus-response');
    res.send(`
        <action action="content" target="<< #section2 > output">out3</action>
        <action action="content" target="section << #output2">out2</action>
        <action action="content" target="$context << output">out1</action>
        <action action="content" targets="$document << #section3 output">out56</action>
    `);
});

app.get('/ar-run-scenario', (req, res) => {
    res.send(templateFormPlus(`
        <section>
            <div>
                <button id="button1">Button 1</button>
            </div>
            <output id="output1"></output>
        </section>
        <section>
            <div>
                <button id="button2">Button 2</button>
            </div>
            <output id="output2"></output>
        </section>
        <div id="scenario">
            <action action="content" target="section << output">processed</action>
        </div>
        <script>
        document.getElementById('button1').addEventListener('click', function(e) {
            var scenario = document.getElementById('scenario');
            FormPlus.AjaxResponse.runScenario(scenario.innerHTML, e.target);
        });
        document.getElementById('button2').addEventListener('click', function(e) {
            var scenario = document.getElementById('scenario');
            FormPlus.AjaxResponse.runScenario(scenario, e.target);
        });
        </script>
    `));
});

app.get('/ar-register-action', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/ar-register-action-response" method="post" data-ajax-submit="true" data-value="!">
            <output>Hello </output>
            <button>Submit</button>
        </form>
        <script>
        FormPlus.AjaxResponse.registerAction('add', function(node, target, context) {
            target.innerHTML = target.innerHTML + node.innerHTML + context.getAttribute('data-value');
        });
        </script>
    `));
});

app.post('/ar-register-action-response', (req, res) => {
    res.set('Content-Type', 'application/form-plus-response');
    res.send(`<action action="add" target="output">world</action>`);
});

app.get('/ar-builtins', (req, res) => {
    res.send(templateFormPlus(`
        <form action="/ar-builtins-response" method="post" data-ajax-submit="true">
            <output></output>
            <button>Submit</button>
        </form>
    `));
});

app.post('/ar-builtins-response', (req, res) => {
    res.set('Content-Type', 'application/form-plus-response');
    res.send(`
        <action action="content" target="output"><section id="section2" class="section2"></section></action>
        <action action="prepend" target="output"><section id="section1"></section></action>
        <action action="append" target="#section1"><article id="article3" class="article3"></article></action>
        <action action="before" target="#article3"><article id="article0"></article></action>
        <action action="after" target="#article0"><article id="article2"></article></action>
        <action action="replace" target="#article0"><article id="article1"></article></action>
        <action action="content" target="#section2"><p></p></action>
        <action action="remove" target="#article1"></action>
        <action action="after" target="#section2 p"><div>test</div></action>
        <action action="empty" target="#section2 div"></action>
        <action action="addClass" target="#article2" class="article2"></action>
        <action action="removeClass" target="#article3" class="article3"></action>
        <action action="toggleClass" target="#section2" class="section2"></action>
        <action action="toggleClass" target="#section1" class="section1"></action>
        <action action="append" target="output"><input type="radio" disabled></action>
        <action action="setAttr" target="output input" attr="type" value="checkbox"></action>
        <action action="removeAttr" target="output input" attr="disabled"></action>
        <action action="setProp" target="output input" prop="checked" value="true"></action>
        <action action="text" target="#section2 p">text</action>
    `);
});

app.all('/response', upload.any(), (req, res) => {
    let json = {
        query: req.query,
        body: req.body,
        files: req.files,
        cookies: req.cookies,
    };
    let sendResponse = () => {
        res.send(`<!DOCTYPE html>
        <html lang="ru-RU">
        <head>
            <meta charset="UTF-8">
            <title>response</title>
        </head>
        <body>
            <code>${JSON.stringify(json)}</code>
        </body>
        </html>`);
    };
    if (req.query.wait) {
        setTimeout(sendResponse, req.query.wait);
    } else {
        sendResponse();
    }
});

app.all('/response-json', upload.any(), (req, res) => {
    let json = {
        query: req.query,
        body: req.body,
        files: req.files,
        cookies: req.cookies,
    };
    let sendResponse = () => {
        res.send(json);
    };
    if (req.query.wait) {
        setTimeout(sendResponse, req.query.wait);
    } else {
        sendResponse();
    }
});

app.listen(3003, () => console.log('Test server listening on port 3003!'));

