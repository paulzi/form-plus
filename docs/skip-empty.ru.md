# form-plus

## Пропуск пустых полей

Данная возможность позволяет не включать пустые поля в передаваемые данные формы. Это особо полезно для GET форм для избежания попадания пустых значений в URL.

## Использование

Форма фильтрации товара:

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

Если вы заполните только поле `price_max`, в результате поиска в URL будет только один параметр:

`/results?price_max=50`

## Документация

### Процесс получения настроек

элемент -> кнопка отправки -> форма -> настройки по-умолчанию

Например:

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

В результате для поля `price_min` будут следующие настройки:

```json
{
  "enabled": true,
  "mode": "disabled",
  "value": "0"
}
```

Также вы можете поменять настройки программно в обработчике события `submitbefore`. Вычисленные настройки хранятся в свойстве `e.detail.skipEmpty`.

### Варианты импорта

Есть несколько входных точек для импорта библиотеки:

- `import SkipEmpty from 'form-plus/features/skip-empty'` - простой импорт без полифилов для ie11, требуется регистрация;
- `import SkipEmpty from 'form-plus/features/skip-empty/with-shims'` - импорт с прокладками для ie11, требуется регистрация;
- `import SkipEmpty from 'form-plus/features/skip-empty/with-polyfills'` - импорт с полифилами для ie11, требуется регистрация;
- `import SkipEmpty from 'form-plus/features/skip-empty/register'` - импорт без полифилов для ie11, авто-регистрация;
- `import SkipEmpty from 'form-plus/features/skip-empty/register-with-shims'` - импорт с прокладками для ie11, авто-регистрация;
- `import SkipEmpty from 'form-plus/features/skip-empty/register-with-polifills'` - импорт с полифилами для ie11, авто-регистрация.

Отличия прокладок от полифилов можете прочитать в [polyshim](https://github.com/paulzi/polyshim/).

При прямом подключении скрипта из папки `dist` в браузер, получить экземпляр SkipEmpty можно через `window.FormPlus.SkipEmpty`.

### Регистрация и настройки по-умолчанию

При импорте пакета без регистрации, требуется зарегистрировать его. При регистрации можно задать настройки по-умолчанию:

```javascript
import SkipEmpty from 'form-plus/features/skip-empty/with-shims';

SkipEmpty.register({mode: 'form'});
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
- `value {string} ['']` - пустое значение для пропуска 
- `mode {string} ['name']` - метод пропуска:
    - `name` - удаляет атрибут `name` перед отправкой 
    - `disabled` - задаёт `disabled = true` перед отправкой 
    - `form` - задаёт атрибут `form` перед отправкой (не работает в ie11) 
- `namespace {string} ['skipEmpty']` - пространство имён, смотрите [data-settings](https://github.com/paulzi/data-settings/)
- `shorthands {Object|null} [null]` - список ярлыков для настроек, смотрите [data-settings](https://github.com/paulzi/data-settings/)
