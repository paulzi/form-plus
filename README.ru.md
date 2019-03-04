# form-plus

[![NPM version](http://img.shields.io/npm/v/form-plus.svg?style=flat)](https://www.npmjs.org/package/form-plus)
[![Build Status](https://img.shields.io/travis/paulzi/form-plus/master.svg)](https://travis-ci.org/paulzi/form-plus)
[![Downloads](https://img.shields.io/npm/dt/form-plus.svg)](https://www.npmjs.org/package/form-plus)
![License](https://img.shields.io/npm/l/form-plus.svg)

Предоставляет дополнительную функциональность для форм, такую как отправка форм чере AJAX, пропуск пустых значений и блокировка от повторных отправок.

[English readme](https://github.com/paulzi/form-plus/)

## Установка

```sh
npm install form-plus
```

## Возможности

Пройдите по ссылка для получения подробной информации:

- [Пропуск пустых полей](https://github.com/paulzi/form-plus/blob/master/docs/skip-empty.ru.md)
- [Блокировка повторных отправок](https://github.com/paulzi/form-plus/blob/master/docs/submit-lock.ru.md)
- [Детектирование перехода в состояние скачивания](https://github.com/paulzi/form-plus/blob/master/docs/catch-download.ru.md)
- [AJAX отправка форм](https://github.com/paulzi/form-plus/blob/master/docs/ajax-submit.ru.md)
- [Сценарии AJAX-ответов](https://github.com/paulzi/form-plus/blob/master/docs/ajax-response.ru.md)

## Тестирование

Для тестов необходимо установить [selenium-драйверы](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html) для браузеров.
Для запуска тестов используйте:

```sh
npm test
```

## Поддержка браузерами

- Internet Explorer 11+
- Другие современные браузеры

Для старых браузеров используйте пакет [paulzi-form](https://github.com/paulzi/paulzi-form/) с подобным функционалом.