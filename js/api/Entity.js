class Entity {

  static get HOST() {
    // return 'https://netology-bhj-diploma.herokuapp.com';
    return 'http://localhost:8000';
  }

  constructor( attributes = {}) {
    this.attributes = attributes;
  }

  static list( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL,
      method: 'GET',
      responseType: 'json',
      data,
      callback
    });
  }

  static create( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL,
      method: 'POST',
      responseType: 'json',
      data: Object.assign({ _method: 'PUT' }, data ),
      callback
    });
  }

  static get( id = '', data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/' + id,
      method: 'GET',
      responseType: 'json',
      data,
      callback
    });
  }

  static update( id = '', data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/' + id,
      method: 'POST',
      responseType: 'json',
      data,
      callback
    });
  }

  static remove( id = '', data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL + '/' + id,
      method: 'DELETE',
      responseType: 'json',
      data,
      callback
    });
  }

  isNewRecord() {
    return !this.hasOwnProperty( 'id' );
  }

  save( callback = f => f ) {
    return this.isNewRecord() ? this.create( callback ) : this.update( callback );
  }

  create( callback = f => f ) {
    return this.constructor.create( this.attributes, callback );
  }

  update( callback = f => f ) {
    return this.constructor.update( this.attributes.id, this.attributes, callback );
  }

  remove( callback = f => f ) {
    return this.constructor.remove( this.attributes.id, this.attributes, callback );
  }
}

Entity.URL = '';
