class Sidebar {
  static init() {
    this.initAuth()
  }

  static initToggleButton() {
    const toggle = document.querySelector( '.sidebar-toggle' );
    toggle.addEventListener( 'click', () => {

    });
  }

  static initAuth() {
    const loginLink = document.querySelector( '.menu-item_login a' ),
      registerLink = document.querySelector( '.menu-item_register a' ),

      loginModal = new Modal( document.querySelector( '#modal-login' )),
      registerModal = new Modal( document.querySelector( '#modal-register' ));

    loginLink.addEventListener( 'click', () => loginModal.open());
    registerLink.addEventListener( 'click', () => registerModal.open());
  }

}
