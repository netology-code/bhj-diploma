/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element === undefined) {
      throw new Error('Element is empty');
    } else {
      this.element = element;
      this.update();
      this.registerEvents();

    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccount = this.element.querySelector('.create-account');
    createAccount.onclick = () => {
          App.getModal('createAccount').open();
    }
    const accounts = document.querySelectorAll('.account');

    accounts.forEach(elem => {elem.addEventListener('click', event => {
      this.onSelectAccount(elem);
    })})
    }



  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current() === undefined) {
      console.log('ошибка');
    } else {
      Account.list(JSON.stringify(User.current()), (err, response)=> {
        if (err === null) {
          this.clear();
          response.data.forEach(elem => this.renderItem(elem))
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(elem => elem.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element){
    element.classList.add('active');
    const activeElems = this.element.querySelectorAll('.active')
    activeElems.forEach(elem => {
      if (elem !== element) {
        elem.classList.remove('active')
      }
    })

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const elem = `<li class="account" data-id=` + String(item.id) + ` <a href="#">
        <span>` + item.name + `</span> 
        <span>` + item.sum + `₽</span>
      </a>
    </li>`
    return elem;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    const panel = document.querySelector('.accounts-panel');
    const html = this.getAccountHTML(data);
    panel.insertAdjacentHTML('beforeend', html);
    this.registerEvents();
  }
}
