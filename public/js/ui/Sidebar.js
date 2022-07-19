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
    const toggle = document.querySelector('.sidebar-toggle'),
    const sidebar = document.querySelector('.sidebar-mini');

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-open');
      sidebar.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState('init')
   * */
  static initAuthLinks() {
    const loginLink = document.querySelector('.menu-item_login a');
    const registerLink = document.querySelector('.menu-item_register a');
    const logoutLink = document.querySelector('.menu-item_logout a');
    const loginModal = App.getModal('login');
    const registerModal = App.getModal('register');

    loginLink.addEventListener('click', () => loginModal.open());

    registerLink.addEventListener('click', () => registerModal.open());
    
    logoutLink.addEventListener('click', () =>
      User.logout({}, (err, response) => {
        if (response && response.success) {
          App.setState('init');
        }
      })
   );
  }

}