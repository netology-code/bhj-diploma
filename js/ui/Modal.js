class Modal {
  constructor( element ) {
    if ( !element ) {
      throw new Error( 'Элемент не существует' );
    }
    this.element = element;
    this.registerEvents();
  }
  registerEvents() {
    this.onClose = this.onClose.bind( this );
    this.element.addEventListener( 'click', this.onClose );
    return this;
  }
  onClose( e ) {
    const target = e.target.closest( '[data-dismiss="modal"]' );
    if ( target ) {
      e.preventDefault();
      return this.close();
    }
  }
  unregisterEvents() {
    this.element.removeEventListener( 'click', this.onClose );
    return this;
  }
  open() {
    this.element.style.display = 'block';
    return this;
  }
  close(){
    this.element.style.display = '';
    return this;
  }
}
