var express = require('express');
var router = express.Router();

// 注册，登录模块
var loginMoudle = require('./compontent/login_moudle')
router.get('/login/is_register', loginMoudle.is_register);
router.post('/login/register_inster', loginMoudle.register_inster);
router.post('/login/change_password', loginMoudle.change_password);
router.post('/login/sign_in', loginMoudle.sign_in);

// 个人中心模块
var mineMoudle = require('./compontent/mine_moudle')
router.get('/mine/mine_info', mineMoudle.mine_info);
router.post('/mine/update_mineInfo', mineMoudle.update_mineInfo);
router.get('/mine/concerns_list', mineMoudle.concerns_list);
router.post('/mine/follow_users', mineMoudle.follow_users);
router.post('/mine/cancel_users', mineMoudle.cancel_users);

// 话题模块
var conversationMoudle = require('./compontent/conversation_moudle')
router.get('/conversation/conversation_list', conversationMoudle.conversation_list);
router.get('/conversation/conversation_info', conversationMoudle.conversation_info);
router.get('/conversation/mine_conversation_list', conversationMoudle.mine_conversation_list);
router.post('/conversation/follow_conversation', conversationMoudle.follow_conversation);
router.post('/conversation/cancel_conversation', conversationMoudle.cancel_conversation);

// 景点模块
var scenicspotMoudle = require('./compontent/scenicspot_moudle')
router.get('/scenicspot/scenicspot_list', scenicspotMoudle.scenicspot_list);
router.get('/scenicspot/scenicspot_info', scenicspotMoudle.scenicspot_info);
router.get('/scenicspot/mine_scenicspot_list', scenicspotMoudle.mine_scenicspot_list);
router.post('/scenicspot/follow_scenicspot', scenicspotMoudle.follow_scenicspot);
router.post('/scenicspot/cancel_scenicspot', scenicspotMoudle.cancel_scenicspot);

module.exports = router;
