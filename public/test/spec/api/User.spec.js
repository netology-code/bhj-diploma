describe("Класс User", function() {

  it("Определён", function() {
    expect(User).to.be.a('function');
  });

  it("Создаёт экземпляр User", function() {
    expect(new User).to.be.an.instanceof(User);
  });

  it('Свойство URL имеет значение /user', () => {
    expect(User.URL).to.be.equals( '/user' );
  });

  describe('Метод User.login()', () => {

    it('Возвращает XHR', () => {
      const xhr = User.login();

      expect(xhr).to.be.an.instanceof(XMLHttpRequest);
    });

    it('Создаёт POST-запрос', () => {
      const xhr = User.login();

      expect(xhr.requestMethod).to.be.equals( 'POST' );
    });

    it('Обращается по адресу, определённому в свойстве URL', () => {
      const xhr = User.login();

      expect(xhr.requestURL).to.be.equals(  User.URL + '/login' );
    });
  });

  describe('Метод User.register()', () => {

    it('Возвращает XHR', () => {
      const xhr = User.register();

      expect(xhr).to.be.an.instanceof(XMLHttpRequest);
    });

    it('Создаёт POST-запрос', () => {
      const xhr = User.register();

      expect(xhr.requestMethod).to.be.equals( 'POST' );
    });

    it('Обращается по адресу, определённому в свойстве URL', () => {
      const xhr = User.register();

      expect(xhr.requestURL).to.be.equals( User.URL + '/register' );
    });
  });

  describe('Метод User.logout()', () => {

    it('Возвращает XHR', () => {
      const xhr = User.logout();

      expect(xhr).to.be.an.instanceof(XMLHttpRequest);
    });

    it('Создаёт POST-запрос', () => {
      const xhr = User.logout();

      expect(xhr.requestMethod).to.be.equals( 'POST' );
    });

    it('Обращается по адресу, определённому в свойстве URL', () => {
      const xhr = User.logout();

      expect(xhr.requestURL).to.be.equals( User.URL + '/logout' );
    });
  });
});
