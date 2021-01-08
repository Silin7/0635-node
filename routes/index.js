const express = require('express');
const router = express.Router();

// 权限模块
const adminMoudle = require('./compontent/admin_module')
router.get('/admin/admin_news_type', adminMoudle.admin_news_type);
router.get('/admin/admin_city_type', adminMoudle.admin_city_type);


// 注册，登录模块
const loginMoudle = require('./compontent/login_module')
router.get('/login/is_register', loginMoudle.is_register);
router.post('/login/register_inster', loginMoudle.register_inster);
router.post('/login/change_password', loginMoudle.change_password);
router.post('/login/sign_in', loginMoudle.sign_in);

// 个人中心模块
const mineMoudle = require('./compontent/mine_module')
router.get('/mine/mine_info', mineMoudle.mine_info);
router.post('/mine/update_mineInfo', mineMoudle.update_mineInfo);
router.get('/mine/concerns_list', mineMoudle.concerns_list);
router.post('/mine/is_follow_users', mineMoudle.is_follow_users);
router.post('/mine/follow_users', mineMoudle.follow_users);
router.post('/mine/cancel_users', mineMoudle.cancel_users);

// 话题模块
const conversationMoudle = require('./compontent/conversation_module')
router.get('/conversation/conversation_list', conversationMoudle.conversation_list);
router.get('/conversation/conversation_info', conversationMoudle.conversation_info);
router.get('/conversation/mine_conversation_list', conversationMoudle.mine_conversation_list);
router.post('/conversation/is_follow_conversation', conversationMoudle.is_follow_conversation);
router.post('/conversation/follow_conversation', conversationMoudle.follow_conversation);
router.post('/conversation/cancel_conversation', conversationMoudle.cancel_conversation);

// 景点模块
const scenicspotMoudle = require('./compontent/scenicspot_module')
router.get('/scenicspot/scenicspot_list', scenicspotMoudle.scenicspot_list);
router.get('/scenicspot/scenicspot_info', scenicspotMoudle.scenicspot_info);
router.get('/scenicspot/mine_scenicspot_list', scenicspotMoudle.mine_scenicspot_list);
router.post('/scenicspot/is_follow_scenicspot', scenicspotMoudle.is_follow_scenicspot);
router.post('/scenicspot/follow_scenicspot', scenicspotMoudle.follow_scenicspot);
router.post('/scenicspot/cancel_scenicspot', scenicspotMoudle.cancel_scenicspot);

// 历史模块
const historyModule = require('./compontent/history_module')
router.get('/history/historical_evolution', historyModule.historical_evolution);

// 菜单模块
const recipeMoudle = require('./compontent/recipe_module')
router.get('/recipe/recipe_catalogs', recipeMoudle.recipe_catalogs);
router.get('/recipe/recipe_list', recipeMoudle.recipe_list);
router.get('/recipe/recipe_detail', recipeMoudle.recipe_detail);

// 消息模块
const messageModules = require('./compontent/message_module')
router.get('/message/permessage_list', messageModules.permessage_list);
router.get('/message/permessage_details', messageModules.permessage_details);
router.get('/message/sysmessage_list', messageModules.sysmessage_list);
router.get('/message/sysmessage_details', messageModules.sysmessage_details);

// 动态模块
const dynamicModules = require('./compontent/dynamic_module')
router.get('/dynamic/dynamic_news_list', dynamicModules.dynamic_news_list);
router.get('/dynamic/dynamic_news_details', dynamicModules.dynamic_news_details);
router.get('/dynamic/dynamic_list', dynamicModules.dynamic_list);
router.get('/dynamic/dynamic_details', dynamicModules.dynamic_details);

// 其他模块
const otherModules = require('./compontent/other_modules')
router.get('/other/history_today', otherModules.history_today);
router.get('/other/weather_current', otherModules.weather_current);
router.get('/other/weather_forecast', otherModules.weather_forecast);
router.get('/other/jokes_random', otherModules.jokes_random);
router.get('/other/news_types', otherModules.news_types);
router.get('/other/news_list', otherModules.news_list);
router.get('/other/news_details', otherModules.news_details);
router.get('/other/girl_random', otherModules.girl_random);
router.get('/other/translate', otherModules.translate);
router.get('/other/rubbish', otherModules.rubbish);
router.get('/other/aim_mobile', otherModules.aim_mobile);

module.exports = router;
