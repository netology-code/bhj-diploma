/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
  if (element === undefined) {
    throw new Error('Element is empty');
  } else  {
    this.element = element;
    this.registerEvents();
  }

  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let dataDismiss = Array.from(this.element.querySelectorAll('[data-dismiss="modal"]'));
    dataDismiss.forEach(elem => elem.addEventListener('click', ()=> this.onClose(elem)));
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
  this.close(e)
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {


  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = "block";

  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = "none";

  }
}