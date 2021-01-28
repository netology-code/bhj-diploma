/**
 * Класс App управляет всем приложением
 * */
class App {
  /**
   * С вызова этого метода начинается работа всего приложения
   * Он производит перваоначальную настройку всех
   * страниц, форм, виджетов, всплывающих окон, а также
   * боковой колонки
   * */
  static init() {
    this.element = document.querySelector(".app");
    this.content = document.querySelector(".content-wrapper");

    this.initPages();
    this.initForms();
    this.initModals();
    this.initWidgets();

    Sidebar.init();

    this.initUser();
  }

  /**
   * Извлекает информацию о текущем пользователе
   * используя User.fetch(). В случае, если пользователь
   * авторизован, необходимо установить состояние
   * App.setState( 'user-logged' ).
   * Если пользователь не авторизован, необходимо установить
   * состояние 'init'
   * */
  static initUser() {
    User.fetch(() => this.setState(User.current() ? "user-logged" : "init"));
  }

  /**
   * Инициализирует единственную динамическую
   * страницу (для отображения доходов/расходов по счёту)
   * */
  static initPages() {
    this.pages = {
      transactions: new TransactionsPage(this.content),
    };
  }

  /**
   * Инициализирует всплывающие окна
   * */
  static initModals() {
    this.modals = {
      register: new Modal(document.querySelector("#modal-register")),
      login: new Modal(document.querySelector("#modal-login")),
      createAccount: new Modal(document.querySelector("#modal-new-account")),
      newIncome: new Modal(document.querySelector("#modal-new-income")),
      newExpense: new Modal(document.querySelector("#modal-new-expense")),
    };
  }

  /**
   * Инициализирует виджеты
   * */
  static initWidgets() {
    this.widgets = {
      accounts: new AccountsWidget(document.querySelector(".accounts-panel")),
      transactions: new TransactionsWidget(
        document.querySelector(".transactions-panel")
      ),
      user: new UserWidget(document.querySelector(".user-panel")),
    };
  }

  /**
   * Инициализирует формы
   * */
  static initForms() {
    this.forms = {
      login: new LoginForm(document.querySelector("#login-form")),
      register: new RegisterForm(document.querySelector("#register-form")),
      createAccount: new CreateAccountForm(
        document.querySelector("#new-account-form")
      ),
      createIncome: new CreateTransactionForm(
        document.querySelector("#new-income-form")
      ),
      createExpense: new CreateTransactionForm(
        document.querySelector("#new-expense-form")
      ),
    };
  }

  /**
   * Возвращает всплывающее окно
   * Обращается к объекту App.modals и извлекает
   * из него свойство modalName:
   * App.getModal( 'login' ); // извелекает App.modals.login
   * */
  static getModal(modalName) {
    return this.modals[modalName];
  }

  /**
   * Возвращает страницу
   * Обращается к объекту App.pages и извлекает
   * из него свойство pageName:
   * App.getPage( 'transactions' ); // извелекает App.pages.transactions
   * */
  static getPage(pageName) {
    return this.pages[pageName];
  }

  /**
   * Возвращает виджет по названию
   * Обращается к объекту App.widgets и извлекает
   * из него свойство widgetName:
   * App.getWidget( 'transactions' ); // извелекает App.widgets.transactions
   * */
  static getWidget(widgetName) {
    return this.widgets[widgetName];
  }

  /**
   * Возвращает форму по названию
   * Обращается к объекту App.forms и извлекает
   * из него свойство formName:
   * App.getWidget( 'transactions' ); // извелекает App.forms.transactions
   * */
  static getForm(formName) {
    return this.forms[formName];
  }

  /**
   * Получает страницу с помощью App.getPage
   * Вызывает у полученной страницы метод render()
   * и передаёт туда объект options
   * */
  static showPage(pageName, options) {
    const page = this.getPage(pageName);
    page.render(options);
  }

  /**
   * Устанавливает состояние приложения
   * Для свойства App.element устанавливает класс
   * app_${state}. Если у приложения есть
   * состояние, то старый класс должен быть удалён
   * Если состояние state равно 'user-logged', необходимо
   * вызвать метод App.update()
   * Если состояние state равно 'init', необходимо
   * вызвать метод clear()
   * */
  static setState(state) {
    if (this.state) {
      this.element.classList.remove(`app_${this.state}`);
    }
    this.element.classList.add(`app_${state}`);
    this.state = state;

    if (state === "user-logged") {
      this.update();
    }
    if (state === "init") {
      this.clear();
    }
  }

  /**
   * Очищает страницы
   * Обращается к единственной странице transactions
   * через getPage и вызывает у этой страницы
   * метод clear()
   * */
  static clear() {
    this.getPage("transactions").clear();
  }

  /**
   * Обновляет виджеты и содержимое страниц
   * Вызывает методы updateWidgets и updatePages()
   * */
  static update() {
    this.updateWidgets();
    this.updatePages();
    this.updateForms();
  }

  /**
   * Обновляет страницы
   * Обращается к единственной странице transactions
   * через getPage и вызывает у этой страницы
   * метод update()
   * */
  static updatePages() {
    this.getPage("transactions").update();
  }

  /**
   * Вызвает метод update() у виджетов
   * accounts и user
   * */
  static updateWidgets() {
    this.getWidget("accounts").update();
    this.getWidget("user").update();
  }

  static updateForms() {
    this.getForm("createIncome").renderAccountsList();
    this.getForm("createExpense").renderAccountsList();
  }
}
