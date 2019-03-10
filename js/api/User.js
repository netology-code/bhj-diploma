class User extends Entity {

  static onLogin( user ) {
    localStorage[ 'user' ] = JSON.stringify( user );
  }

  static onLogout() {
    delete localStorage[ 'user' ];
  }

  static current() {
    const data = localStorage[ 'user' ];
    return data && JSON.parse( data );
  }

  static fetch( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/current',
      method: 'POST',
      responseType: 'json',
      data,
      callback: ( err, response ) => {
        if ( response && response.user ) {
          this.onLogin( response.user );
        }
        else {
          this.onLogout();
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
          this.onLogin( response.user );
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
          this.onLogin( response.user );
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
          this.onLogout();
        }
        callback.call( this, err, response );
      }
    });
  }
}

User.URL = '/user';
