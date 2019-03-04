# form-plus

## Block re-submitting

This function allows you to block resubmission of form while it is being sent.

## Usage

```javascript
import 'form-plus/features/submit-lock/register-with-shims';
```

```html
<form action="/long-action" method="post" data-submit-lock="true">
    <button>Run long action</button>
</form>
```

## Documentation

### The procedure for obtaining settings

submit button -> form -> default settings

For example:

```html
<form action="/results" method="get" data-submit-lock="true">
    <button data-submit-lock="false">Submit</button>
</form>
```

You can also change the settings programmatically in `submitbefore` event handler. Calculated settings store in `e.detail.submitLock` property.

### Import types

There are several entry points for importing a library:

- `import SubmitLock from 'form-plus/features/submit-lock'` - easy import without polyfills for ie11, register is required;
- `import SubmitLock from 'form-plus/features/submit-lock/with-shims'` - import with shims for ie11, register is required;
- `import SubmitLock from 'form-plus/features/submit-lock/with-polyfills'` - import with polyfill for ie11, register is required;
- `import SubmitLock from 'form-plus/features/submit-lock/register'` - import without polyfills for ie11, auto-register;
- `import SubmitLock from 'form-plus/features/submit-lock/register-with-shims'` - import with shims for ie11, auto-register;
- `import SubmitLock from 'form-plus/features/submit-lock/register-with-polifills'` - import with polyfill for ie11, auto-register.

Differences shims from polyfills you can read in [polyshim](https://github.com/paulzi/polyshim/) package.

When directly include the script from the `dist` folder to the browser, you can get an SubmitLock instance via `window.FormPlus.SubmitLock`.

### Registration and default settings

When importing a package without register, you need to register it. When registering, you can set default settings:

```javascript
import SubmitLock from 'form-plus/features/submit-lock/with-shims';

SubmitLock.register({enabled: true});
```

### Methods

- `register([settings])` - register library
    - `settings {Object} [{}]` - [settings](#Settings)
    - `@return {Object}` - returns the current settings
- `unregister()` - unregister library
- `setShim([setObjectAssign])` - sets shims for non-cross-browser methods
    - `setObjectAssign {Function|null}` - shim for `Object.assign`

### Settings

- `enabled {boolead} [false]` - enable behavior 
- `namespace {string} ['submitLock']` - namespace of settings, see [data-settings](https://github.com/paulzi/data-settings/)
- `shorthands {Object|null} [null]` - list of shorthands for settings, see [data-settings](https://github.com/paulzi/data-settings/)
