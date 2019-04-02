# Диплом курса «Базовый JavaScript в браузере»

Наше веб-приложение предполагает такие функции

1. Создание/удаление счетов, аккаунтов или транзакций
2. Вход/выход/регистрация пользователя

Для этого необходимо разработать:

1. Функцию *createRequest*, которая будет отправлять асинхронные запросы
серверу
2. Класс *Entity*, позволяющий за счёт *createRequest* 
создавать/редактировать/удалять и читать данные с сервера
3. Класс *Account* для управления счетами пользователя (наследуется от *Entity*).
4. Класс *Transaction* для управления доходами и расходами пользователя (наследуется от *Entity*).
5. Класс *User* для управления пользователями.

Все классы и функция должны находиться и быть доработаны в папке *js/api*.

## createRequest

Функция является основным связующим звеном между клиентом и сервером.

Пример вызова:

```javascript
// здесь перечислены все возможные параметры для функции
const xhr = createRequest({
    url: 'https://example.com', // адрес
    headers: { // произвольные заголовки, могут отсутствовать
      'Content-type': 'application/json' 
    },
    data: { // произвольные данные, могут отсутствовать
      username: 'ivan@poselok.ru',
      password: 'odinodin'
    },
    responseType: 'json', // формат, в котором необходимо выдать результат
    method: 'GET', // метод запроса
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    */
    callback: (err, response) => {
      console.log( 'Ошибка, если есть', err );
      console.log( 'Данные, если нет ошибки', response );
    }
  });
```

### 1. Возвращает XHR

Константа *xhr* в данном примере содержит объект *XHMLHttpRequest*, 
который возвращает функция *createRequest*.

### 2. Параметр data

    1. При параметре *method* = GET, данные из объекта *data* должны передаваться
    в строке адреса. Например листинг:

```javascript
const xhr = createRequest({
    url: 'https://example.com',
    data: {
      mail: 'ivan@biz.pro',
      password: 'odinodin'
    },
    method: 'GET',
  });
```

аналогичен коду:

```javascript
const xhr = new XMLHttpRequest;

xhr.open( 'GET', 'https://example.com?mail=ivan@biz.pro&password=odinodin' );
xhr.send();
```

    2. При параметре *method* *отличном от GET*, данные из объекта 
    *data* должны передаваться в строке адреса. Например листинг 

```javascript
const xhr = createRequest({
    url: 'https://example.com',
    data: {
      mail: 'ivan@biz.pro',
      password: 'odinodin'
    },
    method: 'GET',
  });
```

аналогичен коду:

```javascript
const xhr = new XMLHttpRequest,
  formData = new FormData;

formData.append( 'mail', 'ivan@biz.pro' );
formData.append( 'password', 'odinodin' );

xhr.open( 'GET', 'https://example.com' );
xhr.send( formData );
```

### 3. callback

В случае успешного выполнения кода, необходимо вызвать функцию, заданную
в *callback* и передать туда данные:

```javascript
// при успешном выполнении
const xhr = createRequest({
    url: 'https://example.com',
    method: 'GET',
    callback: ( err, response ) => {
      /*
        при успешном выполнении err = null, response содержит данные ответа
      */
      console.log( err ); // null
      console.log( response ); // ответ
    }
  });
```

В случае, если в процессе выполнения функции возникают ошибки, вам
необходимо передать эту ошибку в параметр *err*:

```javascript
// при ошибке
const xhr = createRequest({
    url: 'https://example.com',
    method: 'GET',
    callback: ( err, response ) => {
      console.log( err ); // объект ошибки
    }
  });
```

4. withCredentials

У возвращаемого объекта всегда свойство *withCredentials* задано в *true*

## Entity

Это базовый класс, от которого будут наследоваться классы 
*Account* и *Transaction*.

Содержит 5 статических методов: *list*, *get*, *update*, *remove*, *create*.
Каждый из методов возвращает результат работы функции *createRequest*.

Также *Entity* содержит 2 свойства

### Свойства HOST и URL

Параметр *HOST* содержит адрес приложения: 
*https://bhj-diploma.u-w.me*

Свойство *URL* содержит пустую строку.

```javascript
console.log( Entity.URL ); // ''
console.log( Entity.HOST ); // 'https://bhj-diploma.u-w.me'
```

### list

Метод *list* принимает 2 аргумента:

```javascript
const data = {
  mail: 'ivan@biz.pro',
  password: 'odinodin'
};

Entity.list( data, function( err, response ) {
  // эта функция работает аналогично callback в createRequest
});
```

*data* в данном случае - объект с параметрами, второй параметр - 
*callback*-функция (функция обратного вызова), которая будет 

Метод посылает *GET* запрос на адрес, заданный по формату *HOST + URL*.
Метод возвращает объект *XMLHttpRequest* (результат вызова *createRequest*)
Параметр *responseType* в вызываемой внутри функции *createRequest* задан
как *json*.

### create

Метод *create* принимает 2 аргумента, как и *list*: *data* и *callback*.

К данным, передаваемых в параметре *data*, необходимо добавить 
свойство *_method* со значением *PUT*:

```javascript
const data = {
  mail: 'ivan@biz.pro'
};

class Entity {
// ... внутри метода create
  static create( data, callback ) {
    console.log( data ); // { mail: 'ivan@biz.pro' }
    // ... добавляем _method к data
    console.log( data ); // { mail: 'ivan@biz.pro', _method: 'PUT' }
    // ...
    /* 
      Желательно оригинальный объект data не менять.
      Пользуйтесь принципом иммутабельности
    */
  }
}
```

Метод посылает *POST* запрос на адрес, заданный по формату *HOST + URL*.
Метод возвращает объект *XMLHttpRequest* (результат вызова *createRequest*).
Параметр *responseType* в вызываемой внутри функции *createRequest* задан
как *json*.

### get

Метод *get* принимает __3__ аргумента: *id* и знакомые *data* и *callback*.
*id* задаёт индентификатор записи 
(например, идентификатор счёта или дохода/расхода; это станет актуально
для классов *Account* и *Transaction*)

Пример вызова:

```javascript
Entity.get( 21, { hello: 'kitty' }, function ( err, response ) {
  // ... получили ответ
});
```

Метод посылает *GET* запрос на адрес, заданный по формату *HOST + URL + '/' + id*.
Метод возвращает объект *XMLHttpRequest* (результат вызова *createRequest*).
Параметр *responseType* в вызываемой внутри функции *createRequest* задан
как *json*.

### remove

Метод *remove* принимает __3__ аргумента: *id*, *data* и *callback*.
К данным, передаваемых в параметре *data*, необходимо добавить 
свойство *_method* со значением *DELETE*:

```javascript
const data = {
  mail: 'ivan@biz.pro'
};

class Entity {
// ... внутри метода create
  static remove( id, data, callback ) {
    console.log( data ); // { mail: 'ivan@biz.pro' }
    // ... добавляем _method к data
    console.log( data ); // { mail: 'ivan@biz.pro', _method: 'DELETE' }
    // ...
    /* 
      Желательно оригинальный объект data не менять.
      Пользуйтесь принципом иммутабельности
    */
  }
}
```

Метод посылает *POST* запрос на адрес, заданный по формату *HOST + URL + '/' + id*.
Метод возвращает объект *XMLHttpRequest* (результат вызова *createRequest*).
Параметр *responseType* в вызываемой внутри функции *createRequest* задан
как *json*.

## Account

Наследует все свойства и методы от *Entity*. Параметр *URL* равен */account*

## Transaction

Наследует все свойства и методы от *Entity*. Параметр *URL* равен */transaction*

## User

В отличиче от *Account* и *Transaction*, __не наследуется__ от *Entity*.
Параметр *URL* равен */user*. Параметр *HOST* совпадает с *Entity.HOST*.

### User.setCurrent

Устанавливает в приложении авторизованного (который зарегистрировался) 
пользователя. Устанавливает в локальном хранилище с ключом *user* 
данные пользователя.

```javascript
const user = {
  id: 12,
  name: 'Vlad'
};

user.setCurrent( user );

console.log( localStorage[ 'user' ]); // строка "{\"id\":12,\"name\":\"Vlad\"}
```
### User.current

Возвращает объект текущего авторизованного пользователя. 
Если его нет, возвращает *undefined*.

```javascript
const user = {
  id: 12,
  name: 'Vlad'
};

user.setCurrent( user );
const current = User.current();

console.log( current ); // объект { id: 12, name: 'Vlad' }
```

### User.unsetCurrent

Удаляет из локального хранилища авторизованного пользователя.

```javascript
const user = {
  id: 12,
  name: 'Vlad'
};

User.setCurrent( user );
const current = User.current();

console.log( current ); // объект { id: 12, name: 'Vlad' }

User.unsetCurrent();

console.log( current ); // undefined
```

### User.fetch

Извлекает данные о текущем авторизованном пользователе. Пользуется
функцией *createRequest*.

Метод *fetch* принимает 2 аргумента: *data* и *callback*.
В качестве ответа в *callback* будет объект вида:

```json
{
    "success": true,
    "user": {
        "id": 2,
        "name": "Vlad",
        "email": "l@l.one",
        "created_at": "2019-03-06 18:46:41",
        "updated_at": "2019-03-06 18:46:41"
    }
}
```

Например:

```javascript
User.current({}, ( err, response ) => {
  console.log( response.user.id ); // 2
});
```

Если пользователь не авторизован, то будет возвращён объект вида:

```json
{
    "success": false,
    "error": "Необходима авторизация"
}
```

Если в результате есть данные об авторизованном пользователе, необходимо
обновить данные текущего пользователя (для этого вызывайте метод *setCurrent*):

```javascript
console.log( User.current()); // undefined
User.current({}, ( err, response ) => {
  console.log( response.user.name ); // Vlad
  console.log( User.current().name ); // Vlad
});
```

Если данных о пользователе нет (а *success* = *false*), необходимо удалить
запись об авторизации (для этого вызывайте метод *unsetCurrent*):

```javascript
console.log( User.current()); // { id: 47, name: 'Vlad' }
User.current({}, ( err, response ) => {
  // Оказалось, что пользователь уже больше не авторизован (истекла сессия)
  console.log( response.user ); // undefined
  console.log( response.success ); // false
  console.log( User.current() ); // undefined
});
```

Метод посылает *GET* запрос на адрес, заданный по формату *HOST + URL + '/current'*.
Метод возвращает объект *XMLHttpRequest* (результат вызова *createRequest*).
Параметр *responseType* в вызываемой внутри функции *createRequest* задан
как *json*.

### User.register

Метод производит регистрацию пользователя.
Метод *register* принимает 2 аргумента: *data* и *callback*.

Обязательные свойства *data*:

```javascript
const data = {
  name: 'Vlad',
  email: 'test@test.ru',
  password: 'abracadabra'
}
```

```javascript
// производим регистрацию
User.register( data, ( err, response ) => {
  console.log( response );
});
```

В случае ошибки вы получите возможный ответ вида:

```json
{
    "success": false,
    "error": {
        "email": [
            "Поле E-Mail адрес должно быть действительным электронным адресом."
        ],
        "password": [
            "Количество символов в поле Пароль должно быть не менее 8."
        ]
    }
}
```

В случае успеха:

```json
{
    "success": true,
    "user": {
        "name": "Lol",
        "email": "lol@lol.ru",
        "updated_at": "2019-03-11 14:18:28",
        "created_at": "2019-03-11 14:18:28",
        "id": 3
    }
}
```

После регистрации установите в случае успешного ответа полученного пользователя 
с помощью метода *User.setCurrent*.

Метод посылает *POST* запрос на адрес, заданный по формату *HOST + URL + '/register'*.
Метод возвращает объект *XMLHttpRequest* (результат вызова *createRequest*).
Параметр *responseType* в вызываемой внутри функции *createRequest* задан
как *json*.

### User.login

Метод позволяет авторизовать ранее зарегистрированного пользователя.
Метод *login* принимает 2 аргумента: *data* и *callback*.

Обязательные свойства *data*:

```javascript
const data = {
  email: 'test@test.ru',
  password: 'abracadabra'
}
```

```javascript
User.login( data, ( err, response ) => {
  console.log( response ); // Ответ
});
```

В случае ошибки (неверные E-mail или пароль) ответ будет:

```json
{
    "success": false,
    "user": null
}
```

В качестве успешного ответа придёт:

```json
{
    "success": true,
    "user": {
        "name": "Lol",
        "email": "lol@lol.ru",
        "updated_at": "2019-03-11 14:18:28",
        "created_at": "2019-03-11 14:18:28",
        "id": 3
    }
}
```

После авторизации установите в случае успешного ответа полученного пользователя 
с помощью метода *User.setCurrent*.

Метод посылает *POST* запрос на адрес, заданный по формату *HOST + URL + '/register'*.
Метод возвращает объект *XMLHttpRequest* (результат вызова *createRequest*).
Параметр *responseType* в вызываемой внутри функции *createRequest* задан
как *json*.

### User.logout

Метод позволяет выйти из системы.
Метод *logout* принимает 2 аргумента: *data* и *callback*.

В качестве успешного ответа вы получите

```json
{
    "success": true
}
```

Метод посылает *POST* запрос на адрес, заданный по формату *HOST + URL + '/logout'*.
Метод возвращает объект *XMLHttpRequest* (результат вызова *createRequest*).
Параметр *responseType* в вызываемой внутри функции *createRequest* задан
как *json*.

## Подсказки и советы

<details>

<summary>Показать</summary>

### Дополнительные свойства. Иммутабельность

Для добавления дополнительных свойств к объекту *data* в методах
*Entity.create* и *Entity.remove* используйте метод 
[Object.assign](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/assign):

```javascript
const data = {
      hello: 'kitty'
    },
    modifiedData = Object.assign({ _method: 'PUT' }, data );
console.log( modifiedData ); // { hello: 'kitty', _method: 'PUT' }
```

### Ошибки в createRequest

Иногда сетевой запрос, сформированный с помощью *XMLHttpRequest* 
может выбросить критическую ошибку, которая остановит выполнение 
вашего приложения. Пользуйтесь в этом случае конструкцией *try/catch*:

```javascript
const createRequest = options => {
  // ...
  const xhr = new XMLHttpRequest;
  // ...
  try {
    xhr.open( method, url );
    xhr.send( data );
  }
  catch ( e ) {
    // перехват сетевой ошибки
    callback( e );
  }
}
```

### callback в методах класса User

Учитывая то, что вам необходимо выполнять дополнительные действия в
классе *User*, такие как сохранение или удаление данных авторизованного
пользователя в локальном хранилище (localStorage), *callback*-параметр
нельзя напрямую передавать в *createRequest*:

```javascript
class User {
  static fetch( data, callback ) {
    // ...
    const xhr = createRequest({
      // ...
      // задаём функцию обратного вызова
      callback( err, response ) {
        if ( response && response.user ) {
          User.setCurrent( response.user );
        }
        // ...
        // вызываем параметр, переданный в метод fetch
        callback( err, response );
      }
      // ...
    });
  }
}
```

</details>
