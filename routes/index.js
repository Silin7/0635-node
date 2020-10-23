var express = require('express');
var router = express.Router();

// 注册，登录模块
var registerMoudle = require('./compontent/register_login_moudle')

router.post('/register/post_register', registerMoudle.post_register);
router.post('/register/post_register_inster', registerMoudle.post_register_inster);
router.post('/register/post_register_change', registerMoudle.post_register_change);
router.get('/login/get_loginInfo', registerMoudle.get_loginInfo);
router.post('/login/post_login', registerMoudle.post_login);

module.exports = router;
