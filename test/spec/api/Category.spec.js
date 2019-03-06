describe("Класс Category", function() {

  it("Определён", function() {
    expect(Category).to.be.a('function');
  });

  it("Создаёт экземпляр Category", function() {
    expect(new Category).to.be.an.instanceof(Category);
  });

  it('Наследуется от Entity', () => {
    expect(new Category).to.be.an.instanceof(Entity);
  });

  it('Свойство HOST имеет значение Entity.HOST', () => {
    expect(Category.HOST).to.be.equals( Entity.HOST );
  });

  it('Свойство URL имеет значение /category', () => {
    expect(Category.URL).to.be.equals( '/category' );
  });
});
