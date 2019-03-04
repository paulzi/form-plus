# form-plus

## Skip empty fields

This feature allows you to not include empty fields in form data. Which is especially useful for GET forms, as there will be no unnecessary query-parameters in the result URL.

## Usage

Product filter form:

```javascript
import 'form-plus/features/skip-empty/register-with-shims';
```

```html
<form action="/results" method="get" data-skip-empty="true">
    <input name="price_min">
    <input name="price_max">
    <select name="category">
        <option>- any -</option>
        <option value="1">Category 1</option>
        <option value="2">Category 2</option>
    </select>
    <button>Submit</button>
</form>
```

If you filled only `price_max` field, the search will result in an URL with only one parameter:

`/results?price_max=50`

## Documentation

### The procedure for obtaining settings

input -> submit button -> form -> default settings

For example:

```html
<form action="/results" method="get" data-skip-empty='{"mode": "disabled"}'>
    <input name="price_min" value="0" data-skip-empty='{"value": "0"}'>
    <input name="price_max" value="1000">
    <select name="category">
        <option>- any -</option>
        <option value="1">Category 1</option>
        <option value="2">Category 2</option>
    </select>
    <button data-skip-empty='{"enabled": true}'>Submit</button>
</form>
```

Result settings for `price_min` field:

```json
{
  "enabled": true,
  "mode": "disabled",
  "value": "0"
}
```

You can also change the settings programmatically in `submitbefore` event handler. Calculated settings store in `e.detail.skipEmpty` property.

### Import types

There are several entry points for importing a library:

- `import SkipEmpty from 'form-plus/features/skip-empty'` - easy import without polyfills for ie11, register is required;
- `import SkipEmpty from 'form-plus/features/skip-empty/with-shims'` - import with shims for ie11, register is required;
- `import SkipEmpty from 'form-plus/features/skip-empty/with-polyfills'` - import with polyfill for ie11, register is required;
- `import SkipEmpty from 'form-plus/features/skip-empty/register'` - import without polyfills for ie11, auto-register;
- `import SkipEmpty from 'form-plus/features/skip-empty/register-with-shims'` - import with shims for ie11, auto-register;
- `import SkipEmpty from 'form-plus/features/skip-empty/register-with-polifills'` - import with polyfill for ie11, auto-register.

Differences shims from polyfills you can read in [polyshim](https://github.com/paulzi/polyshim/) package.

When directly include the script from the `dist` folder to the browser, you can get an SkipEmpty instance via `window.FormPlus.SkipEmpty`.

### Registration and default settings

When importing a package without register, you need to register it. When registering, you can set default settings:

```javascript
import SkipEmpty from 'form-plus/features/skip-empty/with-shims';

SkipEmpty.register({mode: 'form'});
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
- `value {string} ['']` - input empty value for skip 
- `mode {string} ['name']` - skip method:
    - `name` - remove `name` attribute before submit 
    - `disabled` - set `disabled = true` before submit 
    - `form` - set `form` attribute before submit (not work in ie11) 
- `namespace {string} ['skipEmpty']` - namespace of settings, see [data-settings](https://github.com/paulzi/data-settings/)
- `shorthands {Object|null} [null]` - list of shorthands for settings, see [data-settings](https://github.com/paulzi/data-settings/)
