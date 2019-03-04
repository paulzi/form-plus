# form-plus

## AJAX отправка форм

Данная возможность позволяет позволяет отправлять формы используя AJAX.

## Использование

Данная форма будет отправлена используя AJAX:

```javascript
import 'form-plus/features/ajax-submit/register-with-shims';
```

```html
<form action="/subscribe" method="post" data-ajax-submit="true">
    <input name="email">
    <button>Subscribe</button>
</form>
```

## Документация

### Процесс получения настроек

кнопка отправки -> форма -> настройки по-умолчанию

Например:

```html
<form action="/subscribe" method="post" data-ajax-submit="true">
    <input name="email">
    <button data-ajax-submit="false">Subscribe</button>
</form>
```

Также вы можете поменять настройки программно в обработчике события `submitbefore`. Вычисленные настройки хранятся в свойстве `e.detail.ajaxSubmit`.

### Варианты импорта

Есть несколько входных точек для импорта библиотеки:

- `import AjaxSubmit from 'form-plus/features/ajax-submit'` - простой импорт без полифилов для ie11, требуется регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/with-shims'` - импорт с прокладками для ie11, требуется регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/with-polyfills'` - импорт с полифилами для ie11, требуется регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/register'` - импорт без полифилов для ie11, авто-регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/register-with-shims'` - импорт с прокладками для ie11, авто-регистрация;
- `import AjaxSubmit from 'form-plus/features/ajax-submit/register-with-polifills'` - импорт с полифилами для ie11, авто-регистрация.

Отличия прокладок от полифилов можете прочитать в [polyshim](https://github.com/paulzi/polyshim/).

При прямом подключении скрипта из папки `dist` в браузер, получить экземпляр AjaxSubmit можно через `window.FormPlus.AjaxSubmit`.

### Регистрация и настройки по-умолчанию

При импорте пакета без регистрации, требуется зарегистрировать его. При регистрации можно задать настройки по-умолчанию:

```javascript
import AjaxSubmit from 'form-plus/features/ajax-submit/with-shims';

AjaxSubmit.register({eventFail: 'submiterror'});
```

### События

- `submitdone` - срабатывает после успешного завершения AJAX запроса (HTTP код 200), перед событием `submitend`;
- `submitfail` - срабатывает после завершения AJAX запроса с ошибкой (HTTP код отличен от 200), перед событием `submitend`;

### Параметры событий

Объект события содержит дополнительные параметры:

- `transport {string}` - для AJAX форм и событий `submitbefore`, `submitstart`, `submitdone`, `submitfail`, `submitend` данный параметр содержит значение `ajax`; 
- `xhr {XMLHttpRequest}` - для AJAX форм и событий `submitbefore`, `submitstart`, `submitdone`, `submitfail`, `submitend` данный параметр содержит объект `XMLHttpRequest`. 

### Методы

- `register([settings])` - регистрирует библиотеку
    - `settings {Object} [{}]` - задать [параметры](#Параметры)
    - `@return {Object}` - возвращает действующие настройки
- `unregister()` - отменяет регистрацию библиотеки
- `getSettings()` - возвращает действующие настройки
    - `@return {Object}`
- `setShim([setObjectAssign[, setCustomEvent]]])` - задаёт прокладки для некроссбраузерных методов
    - `setObjectAssign {Function|null}` - прокладка для `Object.assign`
    - `setCustomEvent {Function|null}` - прокладка для `new CustomEvent`

### Параметры

- `enabled {boolead} [false]` - включает поведение
- `eventDone {String} ['submitdone']` - наименование события `submitdone`
- `eventFail {String} ['submitfail']` - наименование события `submitfail`
- `namespace {string} ['ajaxSubmit']` - пространство имён, смотрите [data-settings](https://github.com/paulzi/data-settings/)
- `shorthands {Object|null} [null]` - список ярлыков для настроек, смотрите [data-settings](https://github.com/paulzi/data-settings/)
