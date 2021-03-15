# Отображение транзакций при выборе счёта

## Общее описание

Необходимо разработать страницу *TransactionsPage* 
(файл *public/js/ui/pages/TransactionsPage.js*)

## TransactionsPage

Класс *TransactionsPage* отвечает за единственную страницу 
приложения, которая:

1. Отображает список транзакций счёта
2. Позволяет удалить счёт или транзакцию

Содержимое страницы представлено HTML-кодом:

```html
<div class="content-wrapper">
    <section class="content-header">
        <h1>
            <!-- название счёта -->
            <span class="content-title">Название счёта</span>
            <small class="content-description">Счёт</small>
            <!-- кнопка удаления счёта -->
            <button class="btn btn-danger remove-account">
                <span class="fa fa-trash"></span>
                Удалить счёт
            </button>
        </h1>
    </section>
    <section class="content">
        <!-- содержимое -->
    </section>
</div>
```

## Структура

Класс состоит из следующих методов:

1. Конструктор
2. *registerEvents* устанавливает обработчики событий для удаления
транзакций и счетов
3. *removeAccount* удаляет счёт
4. *removeTransaction* удаляет конкретную транзакцию
5. *render* отрисовывает все транзакции конкретного счета
6. *renderTitle* отрисовывает заголовок
6. *update* перерисовывает страницу в случае, если была добавлена
новая транзакция или удалена имеющаяся
7. *clear* очищает страницу
8. *formatDate* - преобразует дату 
9. *getTransactionHTML* формирует HTML-код транзакции 
10. *renderTransactions* отрисовывает список транзакций

### constructor

Важные детали:

1. Если передан пустой элемент в конструктор, должна быть выброшена ошибка.
2. Сохраните переданный элемент в свойство *element*
3. Вызовите метод *registerEvents()*

### registerEvents

Рассмотрим код для удаления счёта:

```html
<button class="btn btn-danger remove-account">
    <span class="fa fa-trash"></span>
    Удалить счёт
</button>
```

И код для удаления транзакции:

```html
<button class="btn btn-danger transaction__remove" data-id="41">
    <i class="fa fa-trash"></i>  
</button>
```

1. При нажатии на кнопку удаления счёта *.remove-account*,
необходимо вызвать метод *removeAccount*
2. При нажатии на кнопку удаления транзакции 
*.transaction__remove*, необходимо вызвать метод 
*removeTransaction* и передать туда идентификатор транзакции

### render

Принимает один аргумент *options* - объект с настройками вида, где *account_id* - идентификатор счёта:

```json
{
  "account_id": "23"
}
```

Если объект *options* не передан, метод не должен работать.

Для работы метода *update* следует сохранить *options* в 
свойство *lastOptions*.

Важные особенности:

1. Метод получает данные о счёте через *Account.get()* и в 
случае успеха вызывает *renderTitle* для отрисовки названия счёта
2. Метод получает список доходов и расходов пользователя через
*Transaction.list* и отрисовывает данные через
*TransactionsPage.renderTransactions*

### removeAccount

Если свойство *lastOptions* (см. метод *render*) не задано,
метод не должен ничего делать.

Вызывает *Account.remove()* для удаления счёта. При успехе
вызывает *App.updateWidgets()* для обновления виджетов. Либо можно обновлять только виджет со счетами

Перед удалением метод должен показать диалоговое окно
с текстом «Вы действительно хотите удалить счёт?»

### removeTransaction

Удаляет конкретную транзакцию

Для этого вызывает *Transaction.remove* и в случае успеха
вызывает *App.update()* для обновления приложения. Либо используйте обновление текущей страницы (метод *update*) и обновления виджета со счетами

Перед удалением метод должен показать диалоговое окно
с текстом «Вы действительно хотите удалить эту транзакцию?»

### update

1. Вызывает метод *render()*
2. В случае, если метод *render()* был ранее вызван с
какими-то опциями, при вызове *update()* эти опции 
необходимо передать повторно

### clear

1. Очищает транзакции. Вызывает *renderTransactions* с
пустым массивом
2. Вызывает метод *renderTitle*. Задаёт заголовок счёта: «Название счёта»
3. Удаляет содержимое из *lastOptions*

### renderTitle

```html
<span class="content-title">Название счёта</span>
<small class="content-description">Счёт</small>
```

Устанавливает заголовок в элемент *.content-title*

### formatDate

Форматирует дату в формате 2019-03-10 03:20:41 (строка)
в формат «10 марта 2019 г. в 03:20»:

```javascript
const page = new TransactionsPage( document.getElementById( '#content' ));
page.formatDate( '2019-03-10 03:20:41' ); // 10 марта 2019 г. в 03:20

```

### getTransactionHTML

Формирует HTML-код транзакции (дохода или расхода).

В метод передаётся объект *item* следующего формата, где *type* равно *expense* или *income* (доход или расход) :

```json
{
  "account_id": "1",
  "created_at": "2019-09-19 20:12:02",
  "id": "3",
  "name": "Копилка",
  "sum": 1500,
  "type": "income",
  "user_id": "1"
}
```

Метод обращается к *formatDate* для получения форматированной даты.
Для таких данных метод должен выдать HTML-код вида:

```html
<!-- либо transaction_expense, либо transaction_income -->
<div class="transaction transaction_expense row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">Новый будильник</h4>
          <!-- дата -->
          <div class="transaction__date">10 марта 2019 г. в 03:20</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          200 <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="12">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>
```

### renderTransactions

По массиву данных вида:

```json
[
  {
    "account_id": "1",
    "created_at": "2019-09-19 20:12:02",
    "id": "3",
    "name": "Копилка",
    "sum": 1500,
    "type": "income",
    "user_id": "1"
  },
  {
    "account_id": "1",
    "created_at": "2019-09-17 15:53:02",
    "id": "2",
    "name": "Баланс на дебетовке",
    "sum": 3200,
    "type": "INCOME",
    "user_id": "1"
  }
]
```

необходимо сформировать HTML-код всех транзакций на счету
с помощью метода *getTransactionHTML*
и отобразить их в элементе *.content*:

```html
<div class="content-wrapper">
    <section class="content-header">
        <h1>
            <!-- ... -->
        </h1>
    </section>
    <section class="content">
        <!-- вот сюда! -->
    </section>
</div>
```
