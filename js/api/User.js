class User {

  static setCurrent(user ) {
    localStorage[ 'user' ] = JSON.stringify( user );
  }

  static unsetCurrent() {
    delete localStorage[ 'user' ];
  }

  static current() {
    const data = localStorage[ 'user' ];
    return data && JSON.parse( data );
  }

  static fetch( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/current',
      method: 'GET',
      responseType: 'json',
      data,
      callback: ( err, response ) => {
        if ( response && response.user ) {
          this.setCurrent( response.user );
        }
        else {
          this.unsetCurrent();
        }
        callback.call( this, err, response );
      }
    });
  }

  static login( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: ( err, response ) => {
        if ( response && response.user ) {
          this.setCurrent( response.user );
        }
        callback.call( this, err, response );
      }
    });
  }

  static register( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: ( err, response ) => {
        if ( response && response.user ) {
          this.setCurrent( response.user );
        }
        callback.call( this, err, response );
      }
    });
  }

  static logout( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data,
      callback: ( err, response ) => {
        if ( response && response.success ) {
          this.unsetCurrent();
        }
        callback.call( this, err, response );
      }
    });
  }
}

User.HOST = Entity.HOST;
User.URL = '/user';
