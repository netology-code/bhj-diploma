class UserWidget {
  constructor( element ) {
    this.element = element;
  }

  update() {
    const user = User.current();
    if ( !user ) {
      return;
    }
    const name = this.element.querySelector( '.user-name' );

    name.textContent = user.name;
  }
}
