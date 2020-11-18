var express = require('express');
var router = express.Router();

// 注册，登录模块
var loginMoudle = require('./compontent/login_moudle')
router.post('/login/is_register', loginMoudle.is_register);
router.post('/login/register_inster', loginMoudle.register_inster);
router.post('/login/change_password', loginMoudle.change_password);
router.post('/login/sign_in', loginMoudle.sign_in);

// 个人中心模块
var mineMoudle = require('./compontent/mine_moudle')
router.get('/mine/mine_info', mineMoudle.mine_info);
router.post('/mine/update_mineInfo', mineMoudle.update_mineInfo);

module.exports = router;
