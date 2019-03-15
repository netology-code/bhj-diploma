class CreateTransactionForm extends AsyncForm {

  constructor( element ) {
    super( element );
    this.renderAccountsList();
  }

  renderAccountsList() {
    const select = this.element.querySelector( '.accounts-select' ),
      renderItem = item => select.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    Account.list({}, ( err, response ) => {
      if ( !response.data ) {
        return;
      }
      select.innerHTML = '';
      response.data.forEach( renderItem );
    });
  }

  onSubmit( options ) {
    Transaction.create( options.data, ( err, response ) => {
      if ( !response.success ) {
        return
      }
      App.updateAccounts();
      this.element.reset();

      const modal = new Modal( this.element.closest( '.modal' ));
      modal.close().unregisterEvents();

      App.update();
    });
  }
}
