class CreateAccountForm extends AsyncForm {
  onSubmit( options ) {
    Account.create( options.data, ( err, response ) => {
      if ( !response.success ) {
        return
      }
      App.updateAccounts();
      this.element.reset();

      const modal = new Modal( this.element.closest( '.modal' ));
      modal.close();

      App.update();
    });
  }
}
