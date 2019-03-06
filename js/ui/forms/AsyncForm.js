class AsyncForm {
  constructor( element ) {
    if ( !element ) {
      throw new Error( 'Элемент не существует' );
    }
    this.element = element;

    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener( 'submit', e => {
      if ( !this.element.checkValidity()) {
        return;
      }
      e.preventDefault();
      this.submit();
    });
  }

  getData() {
    return [... ( new FormData( this.element )).entries()]
      .reduce(( target, [ key, value ]) => {
        target[ key ] = value;
        return target;
      }, {});
  }

  onSubmit( options ) {

  }

  submit() {
    const data = this.getData();

    this.onSubmit({
      url: this.element.action,
      method: this.element.method,
      data
    });
  }
}
