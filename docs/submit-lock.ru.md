# form-plus

## Блокировка повторных отправок

Данный функционал позволяет блокировать повторные отправки формы, пока форма в процессе отправки.

## Использование

```javascript
import 'form-plus/features/submit-lock/register-with-shims';
```

```html
<form action="/long-action" method="post" data-submit-lock="true">
    <button>Run long action</button>
</form>
```

## Документация

### Процесс получения настроек

кнопка отправки -> форма -> настройки по-умолчанию

Например:

```html
<form action="/results" method="get" data-submit-lock="true">
    <button data-submit-lock="false">Submit</button>
</form>
```

Также вы можете поменять настройки программно в обработчике события `submitbefore`. Вычисленные настройки хранятся в свойстве `e.detail.submitLock`.

### Варианты импорта

Есть несколько входных точек для импорта библиотеки:

- `import SubmitLock from 'form-plus/features/submit-lock'` - простой импорт без полифилов для ie11, требуется регистрация;
- `import SubmitLock from 'form-plus/features/submit-lock/with-shims'` - импорт с прокладками для ie11, требуется регистрация;
- `import SubmitLock from 'form-plus/features/submit-lock/with-polyfills'` - импорт с полифилами для ie11, требуется регистрация;
- `import SubmitLock from 'form-plus/features/submit-lock/register'` - импорт без полифилов для ie11, авто-регистрация;
- `import SubmitLock from 'form-plus/features/submit-lock/register-with-shims'` - импорт с прокладками для ie11, авто-регистрация;
- `import SubmitLock from 'form-plus/features/submit-lock/register-with-polifills'` - импорт с полифилами для ie11, авто-регистрация.

Отличия прокладок от полифилов можете прочитать в [polyshim](https://github.com/paulzi/polyshim/).

При прямом подключении скрипта из папки `dist` в браузер, получить экземпляр SubmitLock можно через `window.FormPlus.SubmitLock`.

### Регистрация и настройки по-умолчанию

При импорте пакета без регистрации, требуется зарегистрировать его. При регистрации можно задать настройки по-умолчанию:

```javascript
import SubmitLock from 'form-plus/features/submit-lock/with-shims';

SubmitLock.register({enabled: true});
```

### Методы

- `register([settings])` - регистрирует библиотеку
    - `settings {Object} [{}]` - задать [параметры](#Параметры)
    - `@return {Object}` - возвращает действующие настройки
- `unregister()` - отменяет регистрацию библиотеки
- `setShim([setObjectAssign])` - задаёт прокладки для некроссбраузерных методов
    - `setObjectAssign {Function|null}` - прокладка для `Object.assign`

### Параметры

- `enabled {boolead} [false]` - включает поведение
- `namespace {string} ['submitLock']` - пространство имён, смотрите [data-settings](https://github.com/paulzi/data-settings/)
- `shorthands {Object|null} [null]` - список ярлыков для настроек, смотрите [data-settings](https://github.com/paulzi/data-settings/)
