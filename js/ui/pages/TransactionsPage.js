class TransactionsPage {

  constructor( element ) {
    this.element = element;

    this.registerEvents();
  }

  update() {
    this.render( this.lastOptions );
  }

  registerEvents() {
    this.element.addEventListener( 'click', e => {
      const transactionButton = e.target.closest( '.transaction__remove' );
      if ( transactionButton ) {
        const { id } = transactionButton.dataset;

        this.removeTransaction( id );
      }
      const accountButton = e.target.closest( '.remove-account' );
      if ( accountButton ) {
        this.removeAccount()
      }
    });
  }

  removeAccount() {
    if ( !this.lastOptions ) {
      return;
    }
    if (!confirm( 'Вы действительно хотите удалить счёт?' )) {
      return;
    }
    const id = this.lastOptions.account_id;
    this.renderTransactions([]);
    Account.remove( id, {}, () => App.update());
  }

  removeTransaction( id ) {
    if (!confirm( 'Вы действительно хотите удалить эту транзакцию?' )) {
      return;
    }
    Transaction.remove( id, {}, () => App.update());
  }

  render( options ) {
    if ( !options ) {
      return;
    }
    this.lastOptions = options;
    Account.get( options.account_id, {}, ( err, response ) => {
      this.renderTitle( response.account );
    });
    Transaction.list( options, ( err, response ) => {
      if ( err ) {
        return;
      }
      if ( !response ) {
        return;
      }
      if ( !response.data ) {
        return;
      }
      this.renderTransactions( response.data );
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle({ name: 'Название счёта' });
    this.lastOptions = null;
  }

  renderTitle( account ) {
    const title = this.element.querySelector( '.content-title' );

    title.textContent = account.name;
  }

  formatDate( date ) {
    const d = new Date( date.replace( ' ', 'T' )),
      day = d.getDate(),
      months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
      ],
      month = months[ d.getMonth() ],
      year = d.getFullYear(),
      hours = d.getHours(),
      minutes = d.getMinutes(),
      formatTime = x => x < 10 ? '0' + x : x;

    return `${day} ${month} ${year} г. в ${formatTime(hours)}:${formatTime(minutes)}`;
  }

  getTransactionHTML( item ) {
    const { type, name, id } = item,
      date = this.formatDate( item.created_at ),
      sum = item.sum.toLocaleString( 'en' );

    return `
      <div class="transaction transaction_${type.toLowerCase()} row">
          <div class="col-md-7 transaction__details">
              <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
              </div>
              <div class="transaction__info">
                  <h4 class="transaction__title">${name}</h4>
                  <div class="transaction__date">${date}</div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="transaction__summ">
                  ${sum} <span class="currency">₽</span>
              </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${id}">
                <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>
    `;
  }

  renderTransactions( data ) {
    const container = document.querySelector( '.content' ),
      itemsHTML = data.reverse()
        .map( this.getTransactionHTML.bind( this ))
        .join( '' );

    container.innerHTML = `<div class="transactions-content">${itemsHTML}</div>`
  }
}
