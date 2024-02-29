/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : undefined;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url     : this.URL + '/current',
      data    : {},
      method  : 'GET',
      callback: (err, response) => {
        if (response) {
          if (response.success) {
            if (response.user) {
              this.setCurrent(response.user);
            }
          } else {
            this.unsetCurrent();
          }
        }

        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url     : this.URL + '/login',
      data,
      method  : 'POST',
      callback: (err, response) => {
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        }

        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url     : this.URL + '/register',
      data,
      method  : 'POST',
      callback: (err, response) => {
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        }

        callback(err, response);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url     : this.URL + '/logout',
      data    : {},
      method  : 'POST',
      callback: (err, response) => {
        if (response && response.success) {
          this.unsetCurrent();
        }

        callback(err, response);
      }
    });
  }
}
