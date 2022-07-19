/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage["user"] = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage["user"];
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const data = localStorage["user"];
    return data && JSON.parse(data);
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
    return createRequest({
      url: this.URL + "/current",
      method: "GET",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback.call(this, err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    return createRequest({
      url: this.URL + "/login",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(this, err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = f => f) {
    return createRequest({
      url: this.URL + "/register",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback.call(this, err, response);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f => f) {
    return createRequest({
      url: this.URL + "/logout",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response && response.success) {
          this.unsetCurrent();
        }
        callback.call(this, err, response);
      }
    });
  }
}

User.URL = "/user";
