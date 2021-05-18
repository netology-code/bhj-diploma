/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element === undefined) {
      throw new Error('Element is empty');
    } else {
      this.element = element;
      this.registerEvents();
  }}


    /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents(){
    const createIncome = this.element.querySelector('.create-income-button');
    createIncome.onclick = () => {App.getModal('newIncome').open()}
    const createExpense = this.element.querySelector('.create-expense-button')
      createExpense.onclick = () => {App.getModal('newExpense').open()}
    }
  }



