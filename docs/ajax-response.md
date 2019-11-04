# form-plus

## AJAX response actions

This feature allows you to process responses from AJAX forms.

## Usage

This form will be transmit via AJAX, and insert response in form output:

```javascript
import 'form-plus/features/ajax-submit/register-with-shims';
import 'form-plus/features/ajax-response/register-with-shims';
```

```html
<form action="/subscribe" method="post" data-ajax-response="true">
    <input name="email">
    <button>Subscribe</button>
    <output></output>
</form>
```

On backend:

```php
function actionSubscribe() {
    // ...
    header('Content-Type: text/form-plus-response');
    echo '<action action="content" target="output">Success</action>';
}
```

## Documentation

### Import types

There are several entry points for importing a library:

- `import AjaxResponse from 'form-plus/features/ajax-response'` - easy import without polyfills for ie11, register is required;
- `import AjaxResponse from 'form-plus/features/ajax-response/with-shims'` - import with shims for ie11, register is required;
- `import AjaxResponse from 'form-plus/features/ajax-response/with-polyfills'` - import with polyfill for ie11, register is required;
- `import AjaxResponse from 'form-plus/features/ajax-response/register'` - import without polyfills for ie11, auto-register;
- `import AjaxResponse from 'form-plus/features/ajax-response/register-with-shims'` - import with shims for ie11, auto-register;
- `import AjaxResponse from 'form-plus/features/ajax-response/register-with-polifills'` - import with polyfill for ie11, auto-register.

Differences shims from polyfills you can read in [polyshim](https://github.com/paulzi/polyshim/) package.

When directly include the script from the `dist` folder to the browser, you can get an AjaxResponse instance via `window.FormPlus.AjaxResponse`.

### Registration and default settings

When importing a package without register, you need to register it. When registering, you can set default settings:

```javascript
import AjaxResponse from 'form-plus/features/ajax-response/with-shims';

AjaxResponse.register({
    contentType: 'text/html',
    actions: {
        alert: function(node, target) { /* ... */ },
    }
});
```

### Scenario

Scenario is HTML-based data type. Top level contains list of tag `<action>`.
Action contains attribute `action`, and optionally, attributes `target` or `targets`.
Script run this list from begin to end, and run registered action handlers.

Example:

```html
<action action="content" target="<< .cart__total">100 $</action>
<action action="removeClass" target="<< .cart" class="cart_empty"></action>
<action action="append" target="<< #top-alerts">
    <div class="alert">Item added to cart</div>
</action>
```

If you specify the attribute `target`, the element will be find using [`ContextSelector.one`](https://github.com/paulzi/context-selector) with context of current AJAX-form.

If you specify the attribute `targets`, the element will be find using [`ContextSelector.all`](https://github.com/paulzi/context-selector) with context of current AJAX-form.
The action handler will be applied for each element found.

### Action handlers

A handler is a function that takes an action node element, target (if they were transferred in attributes `target` or `targets`) and context element:

`function(node, target, context){}`

- `node {Element}` - action element in scenario;
- `target {Element|null}` - target element or null, if target not specified;
- `context {Element|Document}` - context element (current AJAX-form).

### Built-Ins Actions

- `prepend` - insert content of `action` tag in begin of target
- `append` - insert content of `action` tag in end of target
- `before` - insert content of `action` tag before target
- `after` - insert content of `action` tag after target
- `replace` - replace target by content of `action` tag
- `content` - replace content of target by content of `action` tag
- `text` - replace content of target by text content inside `action` tag
- `remove` - remove target element
- `empty` - set empty target content
- `addClass` - add CSS class specified in `class` attribute of `action` tag to target
- `removeClass` - remove CSS class specified in `class` attribute of `action` tag from target
- `toggleClass` - toggle CSS class specified in `class` attribute of `action` tag in target
- `setAttr` - set attribute in target, specified in `attr` attribute of `action` tag, by value in `value` attribute
- `removeAttr` - remove attribute in target, specified in `attr` attribute of `action` tag
- `setProp` - set property of target element, specified in `prop` attribute of `action` tag, and JSON parsed value in `value` attribute
- `event` - dispatch CustomEvent with name specified in `name` attribute of `action` tag, and JSON parsed params in `params` attribute

### Methods

- `register([settings])` - register library
    - `settings {Object} [{}]` - [settings](#settings)
- `unregister()` - unregister library
- `registerAction(action, callback)` - register action
    - `action {String}` - name of action
    - `callback {function(node, target, context)}` - handler
- `registerActions(actions)` - register actions
    - `actions {{}}` - list of actions
- `runScenario(scenario[, context])` - run [scenario](#scenario)
    - `scenario {String|Element}` - string or element with scenario actions
    - `context {Element}` - context element
- `setShim([setObjectAssign])` - sets shims for non-cross-browser methods
    - `setObjectAssign {Function|null}` - shim for `Object.assign`

### Settings

- `contentType {String} ['text/form-plus-response']` - content type of response for detect and run scenario
- `actions {{}} [{}]` - list of custom actions
- `skipBuildIns {boolean} [false]` - do not register [built-ins actions](#built-ins-actions)
 
