# Обработка нажатий на кнопки бокового меню

![sidebar toggle](../img/sidebar-menu.png)

## Общее описание

Вам необходимо реализовать 4 функции:

1. *App.setState* - меняет состояние приложения. Нужен для отслеживания,
вошёл ли пользователь или нет.
2. *App.initModals* - инициализирует все всплывающие окна приложения 
через класс *Modal*
3. *App.getModal* - возвращает ранее созданный экземпляр всплыващего окна
4. *Sidebar.initAuthLinks* - регистрирует обработчики событий для
ссылок в боковом меню авторизации 

## App.setState( state )

Задаёт состояние приложения. У элемента с классом *app*

```html
<body class="skin-blue sidebar-mini app">
    <!-- ... -->
</body>
```

устанавливает класс app_${state}.

Сохраните состояние в свойстве *App.state*. 
Если у приложения уже есть состояние, удалите его (вместе с классом) 
и поставьте новое.

Пример:

```html
<body class="skin-blue sidebar-mini app">
    <!-- ... -->
</body>
```

```javascript
App.setState( 'user-logged' );
```

будет

```html
<body class="skin-blue sidebar-mini app app_user-logged">
    <!-- ... -->
</body>
```

если после этого вызвать

```javascript
App.setState( 'init' );
```

```html
<body class="skin-blue sidebar-mini app app_init">
    <!-- ... -->
</body>
```

То есть класс *app_user-logged* удаляется

Также:

1. Если состояние равно 'user-logged', вызовите метод *App.update()*
2. Если состояние равно 'init', вызовите метод *App.clear()*


## App.initModals

Инициализирует всплывающие окна через класс *Modal*.

Создаёт свойство *App.modals*, которое является объектом со свойствами:

1. modals.register - экземпляр *Modal( #modal-register )*
2. modals.login - экземпляр *Modal( #modal-login )*
3. modals.newAccount - экземпляр *Modal( #modal-new-account )*
4. modals.newIncome - экземпляр *Modal( #modal-new-income )*
5. modals.newExpense - экземпляр *Modal( #modal-new-expense )*

```javascript
console.log( typeof App.modals ); // undefined

App.initModals();

console.log( typeof App.modals ); // object
console.log( App.modals.login ); // Modal( #modal-login )
```

## App.getModal

Возвращает экземпляр всплывающего окна, определённого в свойстве *App.modals*

```javascript
const loginModal = App.getModal( 'login' );
console.log( loginModal ); // Modal( #modal-login )
```

Для чего нужно сохранять и возвращать 

## Sidebar.initAuthLinks

Функция находится в классе *Sidebar* (файл *js/ui/Sidebar.js*).

1. При нажатии на кнопку «Регистрация» необходимо открыть окно #modal-register
(предварительно найдя его через *App.getModal*)
с помощью метода *Modal.open()*
2. При нажатии на кнопку «Войти» необходимо открыть окно #modal-login 
(предварительно найдя его через *App.getModal*)
с помощью метода *Modal.open()*
3. При нажатии на кнопку «Выйти» необходимо вызвать метод *User.logout*
и после успешного выхода (*response.success* = *true*), нужно вызвать
*App.setState( 'init' )*
