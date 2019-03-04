# form-plus

## Catch download state

With standard form submission and when browser goes into the download state, there is no way to programmatically determine the end of form submission.
Because of this, some of the functions tied to this event stop working as intended, for example, `submit-lock` feature does not unlock form.
With this library and additional improvements on the backend, you can overcome this.

## Usage

```javascript
import 'form-plus/features/catch-download/register-with-shims';
```

```html
<form action="/download" method="post" data-submit-lock="true" data-catch-download="true">
    <select name="file">
        <option value="1">Create file 1 (~10s)</option>
        <option value="2">Create file 2 (~10s)</option>
    </select>
    <button>Download</button>
</form>
```

The script will add a hidden field `_requestId` into form.
On backend you must add cookie `_requestId{requestId}` with value `1`, where `{requestId}` is the passed value in the `_requestId` parameter.

## Documentation

### The procedure for obtaining settings

submit button -> form -> default settings

For example:

```html
<form action="/download" method="post" data-submit-lock="true" data-catch-download='{"enabled": true, "timeout": 10000}'>
    <select name="file">
        <option value="1">Create file 1 (~10s)</option>
        <option value="2">Create file 2 (~10s)</option>
    </select>
    <button data-catch-download='{"param": "_req"}'>Download</button>
</form>
```

You can also change the settings programmatically in `submitbefore` event handler. Calculated settings store in `e.detail.catchDownload` property.

### Import types

There are several entry points for importing a library:

- `import CatchDownload from 'form-plus/features/catch-download'` - easy import without polyfills for ie11, register is required;
- `import CatchDownload from 'form-plus/features/catch-download/with-shims'` - import with shims for ie11, register is required;
- `import CatchDownload from 'form-plus/features/catch-download/with-polyfills'` - import with polyfill for ie11, register is required;
- `import CatchDownload from 'form-plus/features/catch-download/register'` - import without polyfills for ie11, auto-register;
- `import CatchDownload from 'form-plus/features/catch-download/register-with-shims'` - import with shims for ie11, auto-register;
- `import CatchDownload from 'form-plus/features/catch-download/register-with-polifills'` - import with polyfill for ie11, auto-register.

Differences shims from polyfills you can read in [polyshim](https://github.com/paulzi/polyshim/) package.

When directly include the script from the `dist` folder to the browser, you can get an CatchDownload instance via `window.FormPlus.CatchDownload`.

### Registration and default settings

When importing a package without register, you need to register it. When registering, you can set default settings:

```javascript
import CatchDownload from 'form-plus/features/catch-download/with-shims';

CatchDownload.register({timeout: 15000});
```

### Methods

- `register([settings])` - register library
    - `settings {Object} [{}]` - [settings](#Settings)
    - `@return {Object}` - returns the current settings
- `unregister()` - unregister library
- `getRequestId()` - return current request id
    - `@return {Number}`
- `setShim([setObjectAssign])` - sets shims for non-cross-browser methods
    - `setObjectAssign {Function|null}` - shim for `Object.assign`

### Settings

- `enabled {boolead} [false]` - enable behavior
- `param {String} ['_requestId']` - name of parameter to add form before request 
- `interval {Number} [100]` - cookie check interval 
- `timeout {Number} [30000]` - waiting timeout. If a timeout occurs, event `submitend` is generated with parameter `e.datail.timeout = true`;
- `namespace {string} ['catchDownload']` - namespace of settings, see [data-settings](https://github.com/paulzi/data-settings/)
- `shorthands {Object|null} [null]` - list of shorthands for settings, see [data-settings](https://github.com/paulzi/data-settings/)
