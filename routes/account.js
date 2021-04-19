const router = require("express").Router();
const multer  = require('multer');
const upload = multer();
const uniqid = require('uniqid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync', {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
});

//запрос создания счета
router.put("/", upload.none(), function(request, response) {
    //получение названия счёта
    const {name} = request.body;
    const db = low(new FileSync('db.json'));// получение БД
    let user = db.get("users").find({id: request.session.id});// поиск авторизованного пользователя
    let userValue = user.value();// получение значения авторизованного пользователя
    if(!userValue){
        response.json({success: false, error: "Пользователь не авторизован"});// отправка ответа с данными
        return;
    }

    const createdAccount = db.get("accounts").find({name}).value();
    if(createdAccount){
        response.json({success: false, error: "Счёт с таким именем уже существует"});
        return;
    }
    
    let creatingAccount = {name, user_id:userValue.id, id: uniqid()};//создаваемый аккаунт
    db.get("accounts").push(creatingAccount).write();//добавление созданного аккаунта к уже существующим и запись в БД
    response.json({success: true, account: creatingAccount});// отправка ответа с данными
});

//запрос изменения счета
router.delete("/", upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));// получение БД
    let accounts = db.get("accounts");// получение списка счетов
    let transactions = db.get("transactions");// получение списка счетов
    let removingAccount = accounts.find({id: request.body.id}).value();// нахождение нужного удаляемого счёта
    if(removingAccount){// если удаляемый аккаунт существует
        accounts.remove({id: request.body.id}).write();// удалить и перезаписать аккаунт
        transactions.remove({account_id: request.body.id}).write(); // удалить связанные транзакции и перезаписать
        response.json({success: true});// отправка ответа успешности
    }else{// если аккаунта нету
        response.json({success: false});// отправка ответа неуспешности
    }
});

//запрос получения списка счетов
router.get("/:id?", upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));
    let { id } = request.session; // получение id пользователя из запроса

    let user = db.get("users").find({id});
    let userValue = user.value();

    if(!userValue){
      response.json({success: false, error:"Пользователь не авторизован"});
      return;
    }

    let accountId = request.params.id;

    if(accountId){
        let currentAccount = db.get("accounts").find({id: accountId}).value();
        if(!currentAccount){
          response.json({success: false, error: `Счёт c идентификатором ${accountId} не найден`});
          return;
        }
        let currentAccountTransactions = db.get("transactions").filter({account_id: currentAccount.id}).value();
        currentAccount.sum = currentAccountTransactions.reduce((sum, a) => a.type === "expense" ? sum - a.sum : sum + a.sum, 0);
        response.json({success: true, data: currentAccount});
    } else {
        let accounts = db.get("accounts").filter({user_id:userValue.id}).value();
        for(let i = 0; i < accounts.length; i++){
            let transactions = db.get("transactions").filter({account_id: accounts[i].id}).value();
            accounts[i].sum = transactions.reduce((sum, a) => a.type === "expense" ? sum - a.sum : sum + a.sum, 0);
        }
        response.json({success: true, data: accounts});
    }
});

module.exports = router;
