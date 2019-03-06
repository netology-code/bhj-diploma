class User extends Entity {

  static login( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback
    });
  }

  static register( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback
    });
  }

  static logout( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data,
      callback
    });
  }
}

User.URL = '/user';
