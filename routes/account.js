const router = require("express").Router();
const multer  = require('multer');
const upload = multer();
const uniqid = require('uniqid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync', {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
});

//запрос изменения счета
router.post("/", upload.none(), function(request, response) {
    //получение метода и названия счёта
    const { _method, name } = request.body;
    if(_method == "PUT")//если метод PUT...
        createAccount(response, name);//создание счёта

    if(_method == "DELETE"){//если метод DELETE...
        removeAccount(response, request.body.id);//удаление счёта
    }
});

//запрос получения списка счетов
router.get("/:id?", upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));// получение БД
    let id = request.query.id; // получение id из запроса
    
    // получение списка счетов, которые пренадлежат указанному пользователю
    let accounts = db.get("accounts").filter({user_id:id}).value();
    for(let i = 0; i < accounts.length; i++){// цикл по всем аккаунтам
        //получение всех транзакций для нужного счёта
        let transactions = db.get("transactions").filter({account_id: accounts[i].id}).value();
        //подсчёт баланса для счёта
        accounts[i].sum = transactions.reduce((sum, a) => a.type === "EXPENSE" ? sum - a.sum : sum + a.sum, 0);
    }
    //отправка ответа со списком счётов и посчитанного баланса для каждого счёта
    response.json({ success: true, data: accounts });
});

//функция создания счёта
function createAccount(response, name){
    const db = low(new FileSync('db.json'));// получение БД
    let user = db.get("users").find({isAuthorized: true});// поиск авторизованного пользователя
    let userValue = user.value();// получение значения авторизованного пользователя
    let createdAccount = { name, user_id:userValue.id, id: uniqid()};//создаваемый аккаунт
    db.get("accounts").push(createdAccount).write();//добавление созданного аккаунта к уже существующим и запись в БД
    response.json({ success: true, account: createdAccount });// отправка ответа с данными
}

//функция удаления счёта
function removeAccount(response, id){
    const db = low(new FileSync('db.json'));// получение БД
    let accounts = db.get("accounts");// получение списка счетов
    let removingAccount = accounts.find({id});// нахождение нужного удаляемого счёта
    if(removingAccount.value()){// если удаляемый аккаунт существует
        accounts.remove({id}).write();// удалить и перезаписать аккаунт
        response.json({ success: true });// отправка ответа успешности
    }else{// если аккаунта нету
        response.json({ success: false });// отправка ответа неуспешности
    }
}

module.exports = router;