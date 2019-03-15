# Диплом курса «Базовый JavaScript в браузере»

## Описание

## С чего начать

### Процесс выполнения

### Как понять, что вы идёте правильно

## Основные задачи

Выполняйте данные задачи по порядку:

1. [Разработка API для взаимодействия с Backend](./md/api.md)
2. Разработка пользовательского интерфейса
    1. [Кнопка управления боковой колонкой](./md/sidebar-toggle.md) 
    2. [Управление окнами](./md/modals.md)
    3. [Управление формами](./md/async-forms.md)
    4. [Обработка нажатий на кнопки бокового меню](./md/sidebar-links.md)
3. Взаимодействие API с пользовательским интерфейсом
    1. [Подготовительный этап](./md/init-ui.md)
    2. [Регистрация](./md/register.md)
    3. [Авторизация](./md/login.md)
    4. [Создание новых счетов](./md/create-accounts.md)
    5. [Создание новых транзкций (доход/расход)](./md/create-transactions.md)
    6. [Отображение транзакций при выборе счёта](./md/display-transactions.md)
    7. [Удаление транзакций](./md/delete-transactions.md)
    8. [Удаление счетов](./md/delete-accounts.md)
4. [Управление приложением. Класс App](./md/app.md)

## Файловая структура

Для удобства работы весь проект разбит на файлы,
каждый из которых в конченом счете будет 
занимать от 5 до 100 строк

- js/
    - api/
        - Account.js
        - Category.js
        - createRequest.js
        - Entity.js
        - Transaction.js
        - User.js
    - ui/
        - forms/
            - AsyncForm.js
            - CreateAccountForm.js
            - CreateTransactionForm.js
            - LoginForm.js
            - RegisterForm.js
        - pages/
            TransactionPage.js
        - widgets/
            - AccountsWidget.js
            - TransactionsWidget.js
            - UserWidget.js
        - Modal.js
        - Sidebar.js
    - App.js
    

## Критерии сдачи
