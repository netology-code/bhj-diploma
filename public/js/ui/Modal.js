/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if ( !element ) {
      throw new Error( 'Элемент не существует' );
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    this.onClose = this.onClose.bind( this );
    this.element.addEventListener( 'click', this.onClose );
    return this;
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    const target = e.target.closest( '[data-dismiss="modal"]' );
    if ( target ) {
      e.preventDefault();
      return this.close();
    }
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.element.removeEventListener( 'click', this.onClose );
    return this;
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
    return this;
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = '';
    return this;
  }
}