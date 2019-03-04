# form-plus

## Сценарии AJAX-ответов

С помощью данной функциональности вы можете выполнять различные действия, с помощью подготовленных сценариев ответа.

## Использование

Данная форма будет отправлена с помощью AJAX, ответ будет вставлен в тег `output`:

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

На стороне бэкенда:

```php
function actionSubscribe() {
    // ...
    header('Content-Type: application/form-plus-response');
    echo '<action action="content" target="output">Success</action>';
}
```

## Документация

### Варианты импорта

Есть несколько входных точек для импорта библиотеки:

- `import AjaxSubmit from 'form-plus/features/ajax-response'` - простой импорт без полифилов для ie11, требуется регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-response/with-shims'` - импорт с прокладками для ie11, требуется регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-response/with-polyfills'` - импорт с полифилами для ie11, требуется регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-response/register'` - импорт без полифилов для ie11, авто-регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-response/register-with-shims'` - импорт с прокладками для ie11, авто-регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-response/register-with-polifills'` - импорт с полифилами для ie11, авто-регистрация.

Отличия прокладок от полифилов можете прочитать в [polyshim](https://github.com/paulzi/polyshim/).

При прямом подключении скрипта из папки `dist` в браузер, получить экземпляр AjaxResponse можно через `window.FormPlus.AjaxResponse`.

### Регистрация и настройки по-умолчанию

При импорте пакета без регистрации, требуется зарегистрировать его. При регистрации можно задать настройки по-умолчанию:

```javascript
import AjaxResponse from 'form-plus/features/ajax-response/with-shims';

AjaxResponse.register({
    contentType: 'text/html',
    actions: {
        alert: function(node, target) { /* ... */ },
    }
});
```

### Сценарий

Сценарий это основанный на HTML тип данных. Верхний уровень содержит список действий в тегах `<action>`.
Действие содержит атрибут `action`, и опционально, атрибуты `target` или `targets`.
Скрипт проходит по списку действий в скрипте и запускает обработчики этих действий.

Например:

```html
<action action="content" target="<< .cart__total">100 $</action>
<action action="removeClass" target="<< .cart" class="cart_empty"></action>
<action action="append" target="<< #top-alerts">
    <div class="alert">Элемент добавлен в корзину</div>
</action>
```

Если вы укажете атрибут `target`, целевой элемент будет найден с помощью [`ContextSelector.one`](https://github.com/paulzi/context-selector) с контекстом в текущей AJAX-form.

Если вы укажете атрибут `targets`, целевой элемент будет найден с помощью [`ContextSelector.all`](https://github.com/paulzi/context-selector) с контекстом в текущей AJAX-form.
Обработчик будет применён для каждого найденного целевого элемента.

### Обработчики действий

Обработчик действия - это функция принимающая узел тэга `action` сценария, целевой элемент (если был переданы атрибуты `target` или `targets`) и контекстный элемент:

`function(node, target, context){}`

- `node {Element}` - элемент тэга `action` сценария;
- `target {Element|null}` - целевой элемент или null, если цель не указана;
- `context {Element|Document}` - контекстный элемент (текущая AJAX-форма).

### Встроенные действия

- `prepend` - вставляет содержимое тэга `action` в начало целевого тэга
- `append` - вставляет содержимое тэга `action` в конец целевого тэга
- `before` - вставляет содержимое тэга `action` перед целевым тэгом
- `after` - вставляет содержимое тэга `action` после целевого тэга
- `replace` - заменяет целевой элемент содержимым тэга `action` 
- `content` - заменяет контент целевого элемента содержимым тэга `action`
- `text` - заменяет контент целевого элемента текстом указанным в тэге `action`
- `remove` - удаляет целевой элемент
- `empty` - очищает целевой элемент
- `addClass` - добавляет CSS класс, указанный в атрибуте `class` тэга `action`, в целевой элемент
- `removeClass` - удаляет CSS класс, указанный в атрибуте `class` тэга `action`, из целевого элемента
- `toggleClass` - переключает CSS класс, указанный в атрибуте `class` тэга `action`, целевого элемента
- `setAttr` - задаёт атрибут в целевом элементе, указанный в атрибуте `attr` тега `action`, значением указанным в атрибуте `value`
- `removeAttr` - удаляет атрибут в целевом элементе, указанный в атрибуте `attr` тега `action`
- `setProp` - задаёт свойство в целевом элементе, указанным в атрибуте `prop` тега `action`, и JSON значением указанным в атрибуте `value`

### Методы

- `register([settings])` - регистрирует библиотеку
    - `settings {Object} [{}]` - задать [параметры](#параметры)
- `unregister()` - отменяет регистрацию библиотеки
- `registerAction(action, callback)` - регистрирует обработчик действия
    - `action {String}` - наименование действия
    - `callback {function(node, target, context)}` - обработчик
- `registerActions(actions)` - регистрирует обработчики действий
    - `actions {{}}` - список обработчиков
- `runScenario(scenario[, context])` - запускает [сценарий](#сценарий)
    - `scenario {String|Element}` - строка или элемент со списком действий
    - `context {Element}` - контекстный элемент
- `setShim([setObjectAssign])` - задаёт прокладки для некроссбраузерных методов
    - `setObjectAssign {Function|null}` - прокладка для `Object.assign`

### Параметры

- `contentType {String} ['application/form-plus-response']` - тип содержимого ответа для определения и запуска сценария
- `actions {{}} [{}]` - список дополнительных действия
- `skipBuildIns {boolean} [false]` - не регистрировать [встроенные действия](#встроенные-действия)
 
