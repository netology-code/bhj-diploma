/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;

    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', e => {
      const transactionButton = e.target.closest('.transaction__remove');
      if (transactionButton) {
        const { id } = transactionButton.dataset;

        this.removeTransaction(id);
      }
      const accountButton = e.target.closest('.remove-account');
      if (accountButton) {
        this.removeAccount()
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {
      return;
    }
    if (!confirm('Вы действительно хотите удалить счёт?')) {
      return;
    }
    const id = this.lastOptions.account_id;
    this.clear();
    Account.remove(id, {}, () => App.update());
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    if (!confirm('Вы действительно хотите удалить эту транзакцию?')) {
      return;
    }
    Transaction.remove(id, {}, () => App.update());
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (!options) {
      return;
    }
    this.lastOptions = options;
    Account.get(options.account_id, {}, (err, response) => {
      this.renderTitle(response.account.name);
    });
    Transaction.list(options, (err, response) => {
      if (err) {
        return;
      }
      if (!response) {
        return;
      }
      if (!response.data) {
        return;
      }
      this.renderTransactions(response.data);
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = this.element.querySelector('.content-title');

    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const d = new Date(date.replace(' ', 'T')),
      day = d.getDate(),
      months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
      ],
      month = months[ d.getMonth() ],
      year = d.getFullYear(),
      hours = d.getHours(),
      minutes = d.getMinutes(),
      formatTime = x => x < 10 ? '0' + x : x;

    return `${day} ${month} ${year} г. в ${formatTime(hours)}:${formatTime(minutes)}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const { type, name, id } = item,
      date = this.formatDate(item.created_at),
      sum = item.sum.toLocaleString('en');

    return `
      <div class="transaction transaction_${type.toLowerCase()} row">
          <div class="col-md-7 transaction__details">
              <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
              </div>
              <div class="transaction__info">
                  <h4 class="transaction__title">${name}</h4>
                  <div class="transaction__date">${date}</div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="transaction__summ">
                  ${sum} <span class="currency">₽</span>
              </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${id}">
                <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const container = document.querySelector('.content'),
      itemsHTML = data.reverse()
        .map(this.getTransactionHTML.bind(this))
        .join('');

    container.innerHTML = `<div class="transactions-content">${itemsHTML}</div>`
  }
}