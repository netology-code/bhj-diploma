/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
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
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    let submit = Array.from(this.element.querySelectorAll('[type="submit"]'));
    submit.forEach(elem => elem.addEventListener('click', () => {
        Event.preventDefault();
        this.submit();}))
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const form = this.element.getElementById('modal-register');
    const formData = new FormData(form);
    const entries = formData.entries();
    let formObject = {}
    for (let item of entries) {
      const key = item[0];
      const value = item[1];
      formObject[key] = value;
    }
    console.log(formObject);
    return formObject;

  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
  this.onSubmit(this.element.getData());


  }
}