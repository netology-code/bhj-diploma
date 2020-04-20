describe("Класс Entity", function() {

  it("Определён", function() {
    expect(Entity).to.be.a('function');
  });

  it("Создаёт экземпляр Entity", function() {
    expect(new Entity).to.be.an.instanceof(Entity);
  });

  it('Задано свойство URL', () => {
    expect(Entity.URL).to.be.a('string');
  });

  describe('Метод Entity.list()', () => {

    it('Возвращает XHR', () => {
      const xhr = Entity.list();

      expect(xhr).to.be.an.instanceof(XMLHttpRequest);
    });

    it('Создаёт GET-запрос', () => {
      const xhr = Entity.list();

      expect(xhr.requestMethod).to.be.equals( 'GET' );
    });

    it('Обращается по адресу, определённому в свойстве URL', () => {
      const xhr = Entity.list();

      expect(xhr.requestURL).to.be.equals( Entity.URL );
    });
  });

  describe('Метод Entity.create()', () => {

    it('Возвращает XHR', () => {
      const xhr = Entity.create();

      expect(xhr).to.be.an.instanceof(XMLHttpRequest);
    });

    it('Создаёт POST-запрос', () => {
      const xhr = Entity.create();

      expect(xhr.requestMethod).to.be.equals( 'POST' );
    });

    it('Обращается по адресу, определённому в свойстве URL', () => {
      const xhr = Entity.create();

      expect(xhr.requestURL).to.be.equals( Entity.URL );
    });
  });

  describe('Метод Entity.remove()', () => {

    it('Возвращает XHR', () => {
      const xhr = Entity.remove();

      expect(xhr).to.be.an.instanceof(XMLHttpRequest);
    });

    it('Создаёт DELETE-запрос', () => {
      const xhr = Entity.remove();

      expect(xhr.requestMethod).to.be.equals( 'POST' );
    });

    it('Обращается по адресу, определённому в свойстве URL', () => {
      const xhr = Entity.remove();

      expect(xhr.requestURL).to.be.equals( Entity.URL  + '/' );
    });
  });
});
