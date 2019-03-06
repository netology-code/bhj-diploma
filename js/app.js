class App {

  static init() {
    Sidebar.init();

    this.initForms();
  }

  static initForms() {
    this.loginForm = new LoginForm( document.querySelector( '#login-form' ));
    this.registerForm = new RegisterForm( document.querySelector( '#register-form' ));
  }
}

App.init();
