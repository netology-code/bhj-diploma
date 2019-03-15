# Создание новых счетов

## Общее описание

Необходимо разработать виджет *AccountsWidget* 
(js/ui/widgets/AccountsWidget.js). Он отвечает за следующие функции:

1. Отображает список счетов пользователя с суммами
2. Позволяет создать новый счёт
3. При выборе конкретного счёта отображает страницу 
со списком доходов и расходов по этому счёту

Этот виджет находится в боковой колонке.

Пример того, как выглядит боковая панель с несколькими заведёнными счетами:

```html
<ul class="sidebar-menu accounts-panel" data-widget="tree">
    <li class="header">
        Счета
        <div class="pull-right">
            <span class="create-account label label-success">
                <span class="fa fa-plus"></span>
                Новый счёт
            </span>
        </div>
    </li>
    <li class="active account">
        <a href="#">
            <span>Сбербанк</span> /
            <span>2,396.30 ₽</span>
        </a>
    </li>
    <li class="account">
        <a href="#">
            <span>Альфа-банк</span> /
            <span>740.82 ₽</span>
        </a>
    </li>
    <li class="account">
        <a href="#">
            <span>QIWI</span> /
            <span>20.31 ₽</span>
        </a>
    </li>
</ul>
```

Панель счетов состоит из основного контейнера:

```html
<ul class="sidebar-menu accounts-panel" data-widget="tree">
    <!-- ... -->
</ul>
```

и списка счетов, каждый из которых представляет вид:

```html
<li class="account">
    <a href="#">
        <span>QIWI</span> /
        <span>20.31 ₽</span>
    </a>
</li>
```

## Структура 

Класс *AccountsWidget* состоит из следующих частей:

1. Конструктор
2. *registerEvents* устанавливает обработчики событий: выбор счёта, нажатие на
кнопку «Создать счёт»

3. *update* обновляет информацию о счетах пользователя
4. *clear* очищает боковую колонку от ранее отрисованных счетов
5. *onSelectAccount* выполняет код для отображения конкретного
счёта, который был выбран в боковой колонке
6. *getAccountHTML* на заданный объект данных
возвращает HTML-код, который будет отрисован в боковой колонке
7. *renderItem* отрисовывает элемент счёта в боковой колонке.

### constructor

### registerEvents

### update

### clear

### onSelectAccount

### getAccountHTML

### renderItem
