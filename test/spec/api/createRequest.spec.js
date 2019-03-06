describe("Функция createRequest", function() {
  const open = XMLHttpRequest.prototype.open,
    send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function( method, url, async ) {
    this.requestMethod = method;
    this.requestURL = url;
    open.call( this, method, url, async );
  };

  XMLHttpRequest.prototype.send = function( data ) {
    this.data = data;
    send.call( this, data );
  };

  it("Определена", function() {
    expect(createRequest).to.be.a('function');
  });

  it("Создаёт объект XMLHttpRequest", function() {
    const xhr = createRequest();
    expect(xhr).to.an.instanceof(XMLHttpRequest);
  });

  it("Передаёт параметр responseType", function() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1',
      xhr = createRequest({
        url,
        responseType: 'json',
        method: 'POST'
      });
    expect(xhr.responseType).to.equal('json');
  });

  it("Передаёт параметр url", function() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1',
      xhr = createRequest({
        url,
        method: 'POST'
      });

    expect(xhr.requestURL).to.equal(url);
  });

  it("Передаёт параметр method", function() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1',
      xhr = createRequest({
        url,
        method: 'POST'
      });
    expect(xhr.requestMethod).to.equal('POST');
  });

  it("Вызывает callback и передаёт данные при успешном запросе", function( done ) {
    const url = 'https://jsonplaceholder.typicode.com/todos/1',
      xhr = createRequest({
        url,
        responseType: 'json',
        method: 'GET',
        callback: (err, data) => {
          expect(data).to.be.a('object');
          done();
        }
      });
  });

  it("Передаёт FormData из свойства data (для методов кроме GET)", function() {
    const dummy = f => f,
      url = 'https://jsonplaceholder.typicode.com/todos/1',
      data =  {
        hello: 'world',
        iron: 'maiden'
      },
      xhr = createRequest({
        url,
        method: 'POST',
        data
      }),
      sentData = [...xhr.data].reduce(( target, [ key, value ]) => {
        target[ key ] = value;
        return target;
      }, {});
    expect(data).to.eql( sentData );
  });
});
