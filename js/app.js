class App {

  static init() {
    this.element = document.querySelector( '.app' );
    this.content = document.querySelector( '.content-wrapper' );

    Sidebar.init();

    this.initPages();
    this.initForms();
    this.initWidgets();

    this.initUser();
  }

  static initUser() {
    User.fetch({}, () =>
      this.setState( User.current() ? 'user-logged' : 'init' )
    );
  }

  static initPages() {
    this.pages = {
      'transactions' : new TransactionsPage( this.content )
    }
  }

  static showPage( pageName, options ) {
    const page = this.pages[ pageName ];
    page.render( options );
  }

  static setState( state ) {
    if (this.state) {
      this.element.classList.remove( `app_${this.state}` );
    }
    this.element.classList.add( `app_${state}` );
    this.state = state;

    if ( state === 'user-logged' ) {
      this.update();
    }
  }

  static update() {
    this.updateAccounts();
    this.updateWidgets();
    this.pages.transactions.update();
  }

  static updateAccounts() {
    this.accountsWidget.update();
  }

  static initWidgets() {
    this.accountsWidget = new AccountsWidget( document.querySelector( '.accounts-panel' ));
    this.transactionsWidget = new TransactionsWidget( document.querySelector( '.transactions-panel' ));
    this.userWidget = new UserWidget( document.querySelector( '.user-panel' ));
  }

  static updateWidgets() {
    this.accountsWidget.update();
    this.userWidget.update();
  }

  static initForms() {
    this.loginForm = new LoginForm( document.querySelector( '#login-form' ));
    this.registerForm = new RegisterForm( document.querySelector( '#register-form' ));
    this.createAccountForm = new CreateAccountForm( document.querySelector( '#new-account-form' ));
    this.createIncomeForm = new CreateTransactionForm( document.querySelector( '#new-income-form' ));
    this.createExpenseForm = new CreateTransactionForm( document.querySelector( '#new-expense-form' ));
  }
}

App.init();
