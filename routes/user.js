const router = require("express").Router();
const multer  = require('multer');
const upload = multer();
const uniqid = require('uniqid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync', {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
  });

//Запрос регистрации пользователя
router.post("/register",upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));// получение БД
    //получение параметров из тела запроса
    const { name, email, password } = request.body;
    //формирование ошибки (не обязательна, но желательна т.к. валидация есть на UI)
    error = "";
    if(name === "")
        error += 'Поле Имя обязательно для заполнения. ';

    if(email === "")
        error += 'Поле E-Mail адрес для заполнения. ' ;

    if(password === "")
        error += 'Поле Пароль обязательно для заполнения.';
    
    //если ошибка сформирована...
    if(error !== "")
        response.json({success: false, error});//отправляем ошибку

    //нахождение такого же пользователя по email
    let user = db.get("users").find({email}).value();
    if(!user){//если существующий пользователь не найден...
        //создаётся пользователя
        user = { name, email, password, id:uniqid() };
        //записывается в БД
        db.get("users").push(user).write();
        request.session.id = user.id;
        //отправляется созданный пользователь
        response.json({success: true, user});
    }
    else{//если существующий пользователь найден...
        //Отправляется ошибка о том, что пользователь такой уже существует
        response.json({success: false, error: `E-Mail адрес ${email} уже существует.`});
    }
})

//запрос авторизации пользователя
router.post("/login",upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));// получение БД
    //получение параметров из запроса
    const { email, password } = request.body;
    //нахождение пользователя по почте и паролю
    let user = db.get("users").find({email, password});
    let foundedUser = user.value();//получение из БД значения пользователя
    if(!!foundedUser){//если пользователь существует...
        request.session.id = foundedUser.id;
        //отправляется авторизованный пользователь
        response.json({success: true, user: foundedUser});
    }
    else//если пользователь не существует, то отправляется ответ с ошибкой о ненахождении пользователя
        response.json({success: false, error:`Пользователь c email ${email} и паролем ${password} не найден`});
})

//запрос разлогина пользователя
router.post("/logout", function(request, response) {
    if (request.session.id) {
        delete request.session.id;
        response.json({success: true});
    } else {
        //отправляется ответ успешности
        response.json({success: false, error: 'Пользователь не авторизован'});
    }
})

//запрос получения текущего пользователя
router.get("/current", function(request, response) {
    const db = low(new FileSync('db.json'));// получение БД
    let { id } = request.session; // получение id пользователя из запроса
    //получение из БД пользователя с переданным id
    let user = db.get("users").find({id});
    let userValue = user.value();//получение значения из БД
    if(userValue){//если пользователь найден и он авторизован...
        //удаляется пароль, который не нужен для Front-end'a
        delete userValue.password;
        //отправка ответа пользователем
        response.json({success: true, user: userValue});
    }
    else{
        //отправка ответа с отсутствием пользователя
        response.json({success: false, user: null, error: 'Пользователь не авторизован'});
    }
})


module.exports = router;