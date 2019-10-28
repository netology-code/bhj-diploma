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
    error = {};
    if(name === "")
        error.name = [ 'Поле Имя обязательно для заполнения.' ];

    if(email === "")
        error.email = [ 'Поле E-Mail адрес для заполнения.' ];

    if(password === "")
        error.password = [ 'Поле Пароль обязательно для заполнения.' ];
    
    //если ошибка сформирована...
    if(JSON.stringify(error) !== "{}")
        response.json({ success: false, error});//отправляем ошибку

    //нахождение такого же пользователя по email
    let user = db.get("users").find({email}).value();
    if(!user){//если существующий пользователь не найден...
        //создаётся пользователя
        user = { name, email, password, id:uniqid(), isAuthorized:true };
        //записывается в БД
        db.get("users").push(user).write();
        //удаляются лишние поля, которые не нужны для Front-end'a
        delete user.password;
        delete user.isAuthorized;
        //отправляется созданный пользователь
        response.json({ success: true, user});
    }
    else{//если существующий пользователь найден...
        //Отправляется ошибка о том, что пользователь такой уже существует
        response.json({ success: false, error: { email:`E-Mail адрес ${email} уже существует.`}});
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
        user.assign({isAuthorized: true}).write();//записывается в БД флаг его авторизованности
        //удаляются лишние поля, которые не нужны для Front-end'a
        delete foundedUser.password;
        delete foundedUser.isAuthorized;
        //отправляется авторизованный пользователь
        response.json({ success: true, user: foundedUser});
    }
    else//если пользователь не существует, то отправляется ответ с ошибкой о ненахождении пользователя
        response.json({ success: false, error:`Пользователь c email ${email} и паролем ${password} не найден`});
})

//запрос разлогина пользователя
router.post("/logout", function(request, response) {
    const db = low(new FileSync('db.json'));// получение БД
    //находится первый авторизованный пользователь, ему присваивается флаг авторизации и записывается в БД
    db.get("users").find({isAuthorized: true}).assign({isAuthorized: false}).write();
    //отправляется ответ успешности
    response.json({ success: true});
})

//запрос получения текущего пользователя
router.get("/current", function(request, response) {
    const db = low(new FileSync('db.json'));// получение БД
    let { id } = request.query; // получение id пользователя из запроса
    //получение из БД пользователя с переданным id
    let user = db.get("users").find({id});
    let userValue = user.value();//получение значения из БД
    if(userValue && userValue.isAuthorized){//если пользователь найден и он авторизован...
        //удаляются лишние поля, которые не нужны для Front-end'a
        delete userValue.password;
        delete userValue.isAuthorized;
        //отправка ответа пользователем
        response.json({ success: true, user: userValue });
    }
    else{
        //отправка ответа с отсутствием пользователя
        response.json({ success: false, user: null, error: 'Необходимо передать id, name и email пользователя' });
    }
})


module.exports = router;