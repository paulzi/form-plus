# form-plus

## Детектирование перехода в состояние скачивания

При стандартной отправке формы, когда браузер переходит в состояние скачивание файла, нет возможности программно определить окончание отправки формы.
Из-за этого, некоторый функционал перестаёт работать как задуманно, например `submit-lock` в этом случае не разблокирует форму.
С помощью данной библиотеки и дополнительной доработке на стороне бэкенда, можно побороть это.

## Использование

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

Скрипт автоматически добавит скрытое поле `_requestId` в форму.
На стороне бэкенда необходимо добавить куку `_requestId{requestId}` со значением `1`, где `{requestId}` - переданное значение в параметре `_requestId`.

## Документация

### Процесс получения настроек

кнопка отправки -> форма -> настройки по-умолчанию

Например:

```html
<form action="/download" method="post" data-submit-lock="true" data-catch-download='{"enabled": true, "timeout": 10000}'>
    <select name="file">
        <option value="1">Create file 1 (~10s)</option>
        <option value="2">Create file 2 (~10s)</option>
    </select>
    <button data-catch-download='{"param": "_req"}'>Download</button>
</form>
```

Также вы можете поменять настройки программно в обработчике события `submitbefore`. Вычисленные настройки хранятся в свойстве `e.detail.catchDownload`.

### Варианты импорта

Есть несколько входных точек для импорта библиотеки:

- `import CatchDownload from 'form-plus/features/catch-download'` - простой импорт без полифилов для ie11, требуется регистрация;
- `import CatchDownload from 'form-plus/features/catch-download/with-shims'` - импорт с прокладками для ie11, требуется регистрация;
- `import CatchDownload from 'form-plus/features/catch-download/with-polyfills'` - импорт с полифилами для ie11, требуется регистрация;
- `import CatchDownload from 'form-plus/features/catch-download/register'` - импорт без полифилов для ie11, авто-регистрация;
- `import CatchDownload from 'form-plus/features/catch-download/register-with-shims'` - импорт с прокладками для ie11, авто-регистрация;
- `import CatchDownload from 'form-plus/features/catch-download/register-with-polifills'` - импорт с полифилами для ie11, авто-регистрация.

Отличия прокладок от полифилов можете прочитать в [polyshim](https://github.com/paulzi/polyshim/).

При прямом подключении скрипта из папки `dist` в браузер, получить экземпляр CatchDownload можно через `window.FormPlus.CatchDownload`.

### Регистрация и настройки по-умолчанию

При импорте пакета без регистрации, требуется зарегистрировать его. При регистрации можно задать настройки по-умолчанию:

```javascript
import CatchDownload from 'form-plus/features/catch-download/with-shims';

CatchDownload.register({timeout: 15000});
```

### Методы

- `register([settings])` - регистрирует библиотеку
    - `settings {Object} [{}]` - задать [параметры](#Параметры)
    - `@return {Object}` - возвращает действующие настройки
- `unregister()` - отменяет регистрацию библиотеки
- `getRequestId()` - return current request id
    - `@return {Number}`
- `setShim([setObjectAssign])` - задаёт прокладки для некроссбраузерных методов
    - `setObjectAssign {Function|null}` - прокладка для `Object.assign`

### Параметры

- `enabled {boolead} [false]` - включает поведение
- `param {String} ['_requestId']` - имя параметра для добавления в форму перед отправкой 
- `interval {Number} [100]` - интервал проверки кук 
- `timeout {Number} [30000]` - таймаут ожидания. Если наступает таймаут, генерируется событие `submitend` с параметром `e.datail.timeout = true`;
- `namespace {string} ['catchDownload']` - пространство имён, смотрите [data-settings](https://github.com/paulzi/data-settings/)
- `shorthands {Object|null} [null]` - список ярлыков для настроек, смотрите [data-settings](https://github.com/paulzi/data-settings/)
