class Modal {
  constructor( element ) {
    if ( !element ) {
      throw new Error( 'Элемент не существует' );
    }
    this.element = element;
    this.registerEvents();
  }
  registerEvents() {
    this.element.addEventListener( 'click', e => {
      const target = e.target.closest( '[data-dismiss="modal"]' );
      if ( target ) {
        e.preventDefault();
        return this.close();
      }
    });
  }
  open() {
    this.element.style.display = 'block';
  }
  close(){
    this.element.style.display = '';
  }
}
