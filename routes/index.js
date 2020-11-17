var express = require('express');
var router = express.Router();

// 注册，登录模块
var loginMoudle = require('./compontent/login_moudle')
router.post('/login/is_register', loginMoudle.is_register);
router.post('/login/register_inster', loginMoudle.register_inster);
router.post('/login/change_password', loginMoudle.change_password);
router.post('/login/sign_in', loginMoudle.sign_in);

module.exports = router;
