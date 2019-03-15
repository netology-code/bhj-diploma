class App {

  static init() {
    this.element = document.querySelector( '.app' );
    this.content = document.querySelector( '.content-wrapper' );

    this.initPages();
    this.initForms();
    this.initWidgets();
    this.initModals();

    Sidebar.init();

    this.initUser();
  }

  static initUser() {
    User.fetch({}, () =>
      this.setState( User.current() ? 'user-logged' : 'init' )
    );
  }

  static initPages() {
    this.pages = {
      transactions : new TransactionsPage( this.content )
    }
  }

  static initModals() {
    this.modals = {
      register: new Modal( document.querySelector( '#modal-register' )),
      login: new Modal( document.querySelector( '#modal-login' )),
    };
  }

  static getModal( modalName ) {
    return this.modals[ modalName ];
  }

  static getPage( pageName ) {
    return this.pages[ pageName ];
  }

  static showPage( pageName, options ) {
    const page = this.getPage( pageName );
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
    if ( state === 'init' ) {
      this.clear();
    }
  }

  static clear() {
    this.getPage( 'transactions' ).clear();
  }

  static update() {
    this.updateAccounts();
    this.updateWidgets();
    this.updatePages();
  }

  static updatePages() {
    this.getPage( 'transactions' ).update();
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
    this.forms = {
      login: new LoginForm(document.querySelector('#login-form')),
      register: new RegisterForm(document.querySelector('#register-form')),
      createAccount: new CreateAccountForm(document.querySelector('#new-account-form')),
      createIncome: new CreateTransactionForm(document.querySelector('#new-income-form')),
      crreateExpense: new CreateTransactionForm(document.querySelector('#new-expense-form'))
    }
  }
}
