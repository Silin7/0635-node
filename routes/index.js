const express = require('express');
const router = express.Router();

// 注册，登录模块
const loginMoudle = require('./compontent/login_moudle')
router.get('/login/is_register', loginMoudle.is_register);
router.post('/login/register_inster', loginMoudle.register_inster);
router.post('/login/change_password', loginMoudle.change_password);
router.post('/login/sign_in', loginMoudle.sign_in);

// 个人中心模块
const mineMoudle = require('./compontent/mine_moudle')
router.get('/mine/mine_info', mineMoudle.mine_info);
router.post('/mine/update_mineInfo', mineMoudle.update_mineInfo);
router.get('/mine/concerns_list', mineMoudle.concerns_list);
router.post('/mine/is_follow_users', mineMoudle.is_follow_users);
router.post('/mine/follow_users', mineMoudle.follow_users);
router.post('/mine/cancel_users', mineMoudle.cancel_users);

// 话题模块
const conversationMoudle = require('./compontent/conversation_moudle')
router.get('/conversation/conversation_list', conversationMoudle.conversation_list);
router.get('/conversation/conversation_info', conversationMoudle.conversation_info);
router.get('/conversation/mine_conversation_list', conversationMoudle.mine_conversation_list);
router.post('/conversation/is_follow_conversation', conversationMoudle.is_follow_conversation);
router.post('/conversation/follow_conversation', conversationMoudle.follow_conversation);
router.post('/conversation/cancel_conversation', conversationMoudle.cancel_conversation);

// 景点模块
const scenicspotMoudle = require('./compontent/scenicspot_moudle')
router.get('/scenicspot/scenicspot_list', scenicspotMoudle.scenicspot_list);
router.get('/scenicspot/scenicspot_info', scenicspotMoudle.scenicspot_info);
router.get('/scenicspot/mine_scenicspot_list', scenicspotMoudle.mine_scenicspot_list);
router.post('/scenicspot/is_follow_scenicspot', scenicspotMoudle.is_follow_scenicspot);
router.post('/scenicspot/follow_scenicspot', scenicspotMoudle.follow_scenicspot);
router.post('/scenicspot/cancel_scenicspot', scenicspotMoudle.cancel_scenicspot);

// 菜单模块
const recipeMoudle = require('./compontent/recipe_moudle')
router.get('/recipe/recipe_catalogs', recipeMoudle.recipe_catalogs);
router.get('/recipe/recipe_list', recipeMoudle.recipe_list);
router.get('/recipe/recipe_detail', recipeMoudle.recipe_detail);

// 其他模块
const otherModules = require('./compontent/other_modules')
router.get('/other/history_today', otherModules.history_today);


module.exports = router;
