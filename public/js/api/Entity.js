/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = ''
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static listTransaction(data, callback){
    createRequest({
      url: this.URL + data,
      method: 'GET',
      responseType: 'json',
      callback: (err, response) => {
        callback(err, response);
      }
    })
  }

  static list(data, callback){
    createRequest({
      url: this.URL,
      method: 'GET',
      responseType: 'json',
      data,
      callback: (err, response) => {
        callback(err, response);
      }
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      url: this.URL,
      method: 'PUT',
      responseType: 'json',
      data,
      callback: (err, response) => {
        callback(err, response);
      }
    })

  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    createRequest({
      url: this.URL,
      method: 'DELETE',
      responseType: 'json',
      data,
      callback: (err, response) => {
        callback(err, response);
      }
    })
  }
  static removeAccount(data, callback ) {
    const formData = new FormData();
    formData.append(data)
    createRequest({
      url: this.URL,
      method: 'DELETE',
      responseType: 'json',
      formData,
      callback: (err, response) => {
        callback(err, response);
      }
    })
  }
}
