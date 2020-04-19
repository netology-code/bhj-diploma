/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'http://localhost:8000'.
 * */
class Entity {

  static get HOST() {
    return 'http://localhost:8000';
  }

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL,
      method: 'GET',
      responseType: 'json',
      data,
      callback
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL,
      method: 'POST',
      responseType: 'json',
      data: Object.assign({ _method: 'PUT' }, data ),
      callback
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/' + id,
      data: data,
      method: 'GET',
      responseType: 'json',
      callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL,
      data: Object.assign({ _method: 'DELETE' }, { id: id }, data ),
      method: 'POST',
      responseType: 'json',
      callback
    });
  }
}

Entity.URL = '';