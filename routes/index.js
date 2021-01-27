const express = require('express');
const router = express.Router();

// 权限模块
const adminModule = require('./compontent/admin_module')
router.get('/admin/admin_news_type', adminModule.admin_news_type);
router.get('/admin/admin_city_type', adminModule.admin_city_type);

// 相亲模块
const marryModule = require('./compontent/marry_module')
router.get('/marry/marry_list', marryModule.marry_list);
router.get('/marry/marry_details', marryModule.marry_details);

// 注册，登录模块
const loginModule = require('./compontent/login_module')
router.get('/login/is_register', loginModule.is_register);
router.post('/login/register_inster', loginModule.register_inster);
router.post('/login/change_password', loginModule.change_password);
router.post('/login/sign_in', loginModule.sign_in);

// 个人中心模块
const mineModule = require('./compontent/mine_module')
router.get('/mine/mine_info', mineModule.mine_info);
router.post('/mine/update_mineInfo', mineModule.update_mineInfo);
router.get('/mine/concerns_list', mineModule.concerns_list);
router.post('/mine/follow_users', mineModule.follow_users);
router.get('/mine/cancel_users', mineModule.cancel_users);

// 话题模块
const conversationModule = require('./compontent/conversation_module')
router.get('/conversation/conversation_list', conversationModule.conversation_list);
router.get('/conversation/conversation_info', conversationModule.conversation_info);
router.get('/conversation/mine_conversation_list', conversationModule.mine_conversation_list);
router.post('/conversation/is_follow_conversation', conversationModule.is_follow_conversation);
router.post('/conversation/follow_conversation', conversationModule.follow_conversation);
router.post('/conversation/cancel_conversation', conversationModule.cancel_conversation);

// 记录模块
const recordModule = require('./compontent/record_module')
router.get('/record/record_diary', recordModule.record_diary);
router.get('/record/diary_details', recordModule.diary_details);
router.post('/record/keep_diary', recordModule.keep_diary);
router.get('/record/delete_diary', recordModule.delete_diary);

// 景点模块
const scenicspotModule = require('./compontent/scenicspot_module')
router.get('/scenicspot/scenicspot_list', scenicspotModule.scenicspot_list);
router.get('/scenicspot/scenicspot_info', scenicspotModule.scenicspot_info);
router.get('/scenicspot/mine_scenicspot_list', scenicspotModule.mine_scenicspot_list);
router.post('/scenicspot/is_follow_scenicspot', scenicspotModule.is_follow_scenicspot);
router.post('/scenicspot/follow_scenicspot', scenicspotModule.follow_scenicspot);
router.post('/scenicspot/cancel_scenicspot', scenicspotModule.cancel_scenicspot);

// 历史模块
const historyModule = require('./compontent/history_module')
router.get('/history/local_historical', historyModule.local_historical);

// 壁纸模块
const wallpaperModule = require('./compontent/wallpaper_module')
router.get('/wallpaper/wallpaper_type', wallpaperModule.wallpaper_type);
router.get('/wallpaper/wallpaper_list', wallpaperModule.wallpaper_list);

// 菜单模块
const recipeModule = require('./compontent/recipe_module')
router.get('/recipe/recipe_catalogs', recipeModule.recipe_catalogs);
router.get('/recipe/recipe_list', recipeModule.recipe_list);
router.get('/recipe/recipe_detail', recipeModule.recipe_detail);

// 消息模块
const messageModules = require('./compontent/message_module')
router.get('/message/permessage_list', messageModules.permessage_list);
router.get('/message/permessage_details', messageModules.permessage_details);
router.post('/message/permessage_send', messageModules.permessage_send);
router.get('/message/permessage_delete', messageModules.permessage_delete);
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
