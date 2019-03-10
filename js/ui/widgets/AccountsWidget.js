class AccountsWidget {
  constructor( element ) {
    this.element = element;
    this.currentAccount = null;

    this.registerEvents();
    this.update();
  }

  registerEvents() {
    this.element.addEventListener( 'click', e => {
      e.preventDefault();
      const createAccount = e.target.closest( '.create-account' );

      if ( createAccount ) {
        const modal = new Modal( document.querySelector( '#modal-new-account' ));
        return modal.open();
      }

      const selectedAccount = e.target.closest( '.account' );

      if ( selectedAccount ) {
        this.selectAccount( selectedAccount );
      }
    });
  }

  update() {
    if ( !User.current()) {
      return;
    }
    Account.list({}, ( err, response ) => {
      if ( err ) {
        return;
      }
      if ( !response.data ) {
        return;
      }
      this.clear();
      response.data.forEach( item => this.renderItem( item ));
    });
  }

  clear() {
    [...this.element.querySelectorAll( '.account' )].forEach( item => item.remove());
  }

  selectAccount( element ) {
    if ( this.currentAccountId ) {
      this.element
        .querySelector( `.account[data-id="${this.currentAccountId}"]` )
        .classList.remove( 'active' );
    }

    element.classList.add( 'active' );

    const { id } = element.dataset;

    this.currentAccountId = id;

    App.showPage( 'transactions', {
      account_id: id
    });
  }

  renderItem( item ) {
    const { name, id } = item,
      sum = item.sum.toLocaleString( 'en' ),
      html = `
        <li class="account" data-id="${ id }">
            <a href="#">
                ${ name } / ${ sum } ₽
            </a>
        </li>
      `;
    this.element.insertAdjacentHTML( 'beforeend', html );
  }
}
