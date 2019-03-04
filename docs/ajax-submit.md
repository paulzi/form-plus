# form-plus

## AJAX form submit

This feature allows you to send forms via AJAX.

## Usage

This form will be transmit via AJAX:

```javascript
import 'form-plus/features/ajax-submit/register-with-shims';
```

```html
<form action="/subscribe" method="post" data-ajax-submit="true">
    <input name="email">
    <button>Subscribe</button>
</form>
```

## Documentation

### The procedure for obtaining settings

submit button -> form -> default settings

For example:

```html
<form action="/subscribe" method="post" data-ajax-submit="true">
    <input name="email">
    <button data-ajax-submit="false">Subscribe</button>
</form>
```

You can also change the settings programmatically in `submitbefore` event handler. Calculated settings store in `e.detail.ajaxSubmit` property.

### Import types

There are several entry points for importing a library:

- `import AjaxSubmit from 'form-plus/features/ajax-submit'` - easy import without polyfills for ie11, register is required;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/with-shims'` - import with shims for ie11, register is required;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/with-polyfills'` - import with polyfill for ie11, register is required;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/register'` - import without polyfills for ie11, auto-register;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/register-with-shims'` - import with shims for ie11, auto-register;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/register-with-polifills'` - import with polyfill for ie11, auto-register.

Differences shims from polyfills you can read in [polyshim](https://github.com/paulzi/polyshim/) package.

When directly include the script from the `dist` folder to the browser, you can get an AjaxSubmit instance via `window.FormPlus.AjaxSubmit`.

### Registration and default settings

When importing a package without register, you need to register it. When registering, you can set default settings:

```javascript
import AjaxSubmit from 'form-plus/features/ajax-submit/with-shims';

AjaxSubmit.register({eventFail: 'submiterror'});
```

### Events

- `submitdone` - triggered after end success AJAX request (HTTP code equal 200), before `submitend` event;
- `submitfail` - triggered after end fail AJAX request (HTTP code not equal 200), before `submitend` event;

### Event params

The event object contains additional parameters:

- `transport {string}` - for ajax forms and events `submitbefore`, `submitstart`, `submitdone`, `submitfail`, `submitend` this param pass `ajax`; 
- `xhr {XMLHttpRequest}` - for ajax forms and events `submitbefore`, `submitstart`, `submitdone`, `submitfail`, `submitend` this param pass `XMLHttpRequest` object. 

### Methods

- `register([settings])` - register library
    - `settings {Object} [{}]` - [settings](#Settings)
    - `@return {Object}` - returns the current settings
- `unregister()` - unregister library
- `getSettings()` - returns the current settings
    - `@return {Object}`
- `setShim([setObjectAssign[, setCustomEvent]])` - sets shims for non-cross-browser methods
    - `setObjectAssign {Function|null}` - shim for `Object.assign`
    - `setCustomEvent {Function|null}` - shim for `new CustomEvent`

### Settings

- `enabled {boolead} [false]` - enable behavior 
- `eventDone {String} ['submitdone']` - name of event `submitdone`
- `eventFail {String} ['submitfail']` - name of event `submitfail`
- `namespace {string} ['ajaxSubmit']` - namespace of settings, see [data-settings](https://github.com/paulzi/data-settings/)
- `shorthands {Object|null} [null]` - list of shorthands for settings, see [data-settings](https://github.com/paulzi/data-settings/)
