describe("Класс Transaction", function() {

  it("Определён", function() {
    expect(Transaction).to.be.a('function');
  });

  it("Создаёт экземпляр Transaction", function() {
    expect(new Transaction).to.be.an.instanceof(Transaction);
  });

  it('Наследуется от Entity', () => {
    expect(new Transaction).to.be.an.instanceof(Entity);
  });

  it('Свойство URL имеет значение /transaction', () => {
    expect(Transaction.URL).to.be.equals( '/transaction' );
  });
});
