class RegisterForm extends AsyncForm {
  onSubmit( options ) {
    User.register( options.data, response => {
      if ( !response.success ) {
        return;
      }
      this.element.reset();

      App.setState( 'user-logged' );

      const modal = new Modal( this.element.closest( '.modal' ));
      modal.close();
    });
  }
}
