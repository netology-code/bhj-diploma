class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const toggle = document.querySelector( '.sidebar-toggle' ),
      sidebar = document.querySelector( '.sidebar-mini' );
    toggle.addEventListener( 'click', () => {
      sidebar.classList.toggle( 'sidebar-open' );
      sidebar.classList.toggle( 'sidebar-collapse' );
    });
  }

  static initAuthLinks() {
    const loginLink = document.querySelector( '.menu-item_login a' ),
      registerLink = document.querySelector( '.menu-item_register a' ),
      logoutLink = document.querySelector( '.menu-item_logout a' ),

      loginModal = App.getModal( 'login' ),
      registerModal = App.getModal( 'register' );

    loginLink.addEventListener( 'click', () => loginModal.open());
    registerLink.addEventListener( 'click', () => registerModal.open());
    logoutLink.addEventListener( 'click', () =>
      User.logout({}, ( err, response ) => {
        if ( response && response.success ) {
          App.setState( 'init' );
        }
      })
    );
  }

}
