/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
   let sidebar = document.querySelector('.sidebar-toggle')
    let body = document.querySelector('body')
    sidebar.addEventListener('click', ()=> {
      body.classList.toggle('sidebar-open')
      body.classList.toggle('sidebar-collapse')

    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
      let loginButton = document.querySelector('.menu-item_login');
      loginButton.onclick = () => {App.getModal('login').open()};
      let registerButton = document.querySelector('.menu-item_register');
      registerButton.onclick = () => (App.getModal('register').open());
      let quitButton = document.querySelector('.menu-item_logout');
      quitButton.onclick = () => (User.logout( JSON.stringify(User.current()),(err, response) => {
          if (err === null) {
              App.setState( 'init' );
          } else {
              alert('Лягушка')
          }
      }))

  }
}
