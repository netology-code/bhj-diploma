

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
  constructor( element ) {
    if (element === undefined) {
      throw new Error('Element is empty');
    } else {
      this.element = element;
      this.registerEvents();

    }

  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions !== undefined){
      this.render(this.lastOptions)
    } else {
      this.render()
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAccount = this.element.querySelector('.remove-account');
    removeAccount.onclick = () => {this.removeAccount()}
    const transactionRemove = this.element.querySelector('.transaction__remove');
    // const dataId = transactionRemove.getAttribute('data-id')
    // transactionRemove.onclick = () =>{this.removeTransaction(dataId)}


  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions !== undefined){
      let warning = confirm('Вы действительно хотите удалить счёт?')
      alert(warning);
      if (this.lastOptions !== undefined) {
        Account.removeAccount(JSON.stringify({"id": this.lastOptions.account_id}), (err, response) => {
          if (err === null) {
            App.updateWidgets()
          }
      })
    }
  }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    let warning = confirm('Вы действительно хотите удалить эту транзакцию?')
    alert(warning)
    Transaction.remove(id, (err, response) => {
      if(err === null) {
        App.update()
      }
    })
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    console.log(options)
    if (options !== null) {
      Account.get("sktwi10o3kou4i8me", (err, response) => {
        console.log(response)

        if(err === null) {
          this.renderTitle(response.data.name)
        }
      })
      const forList = '?account_id=' + options
      Transaction.listTransaction(forList, (err, response) => {
        if (err === null) {
          this.renderTransactions(response.data);
        }
      }



    )}
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    const data = [];
    this.renderTransactions(data);
    this.renderTitle('Название счёта');
    this.lastOptions = undefined;
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
    let dateToFormat = new Date(date);
    let localDate = dateToFormat.toLocaleString("ru");
    return localDate;

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const frmDate = this.formatDate(item.created_at);
    return `<div class="transaction transaction_` + item.type + ` row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">` + item.name + `</h4>
            <!-- дата -->
            <div class="transaction__date">` + frmDate + ` </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">` + item.sum + `
        <!--  сумма -->
         <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <!-- в data-id нужно поместить id -->
          <button class="btn btn-danger transaction__remove" data-id=` + item.id + `>
              <i class="fa fa-trash"></i>  
          </button>
      </div>
  </div>`  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = document.querySelector('.content')
    data.forEach(item => {const html = this.getTransactionHTML(item)
      content.insertAdjacentHTML('beforeend', html)
    }
  )
  }
}