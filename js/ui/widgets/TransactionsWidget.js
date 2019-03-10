class TransactionsWidget {
  constructor( element ) {
    this.element = element;

    this.registerEvents();
  }

  registerEvents() {
    const createIncomeButton = this.element.querySelector( '.create-income-button' ),
      createExpenseButton = this.element.querySelector( '.create-expense-button' ),

      incomeModal = new Modal( document.querySelector( '#modal-new-income' )),
      expenseModal = new Modal( document.querySelector( '#modal-new-expense' ));

    createIncomeButton.addEventListener( 'click', () => incomeModal.open());
    createExpenseButton.addEventListener( 'click', () => expenseModal.open());
  }
}
