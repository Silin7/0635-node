var express = require('express');
var router = express.Router();

// 注册，登录模块
var registerMoudle = require('./compontent/register_moudle')
router.post('/register/is_register', registerMoudle.is_register);
router.post('/register/register_inster', registerMoudle.register_inster);
router.post('/register/change_password', registerMoudle.change_password);

var loginMoudle = require('./compontent/login_moudle')
router.get('/login/is_loginInfo', loginMoudle.is_loginInfo);
router.post('/login/sign_in', loginMoudle.sign_in);
router.post('/login/write_information', loginMoudle.write_information);

module.exports = router;
