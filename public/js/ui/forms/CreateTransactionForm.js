/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm{
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList()
  }


  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const expenseList = this.element.querySelector('.accounts-select');
    Array.from(expenseList).forEach(el => el.remove())
    Account.list(JSON.stringify(User.current()), (err, response)=> {
      if (err === null){
        response.data.forEach(elem => {
          const elems = `<option value=` + elem.id + `>`+ elem.name + `</option>`;
          expenseList.insertAdjacentHTML('beforeend', elems)
        })
      }

    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    console.log(data)
    Transaction.create(data, (err, response) => {
      if (err === null) {
        this.element.reset()
        if (this.element.id === 'new-expense-form') {
          App.getModal('newExpense').close();
        } else {
          App.getModal('newIncome').close();
        }
        App.update()
      } else {
        alert(err);
      }
    })
  }
}