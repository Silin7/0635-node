const express = require('express');
const router = express.Router();


// 注册，登录模块
const loginModule = require('./compontent/login_module')
router.get('/login/is_register', loginModule.is_register);
router.post('/login/register_inster', loginModule.register_inster);
router.post('/login/change_password', loginModule.change_password);
router.post('/login/sign_in', loginModule.sign_in);


/*                   首页                  */


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

// 特产模块
const specialtyModule = require('./compontent/specialty_module')
router.get('/specialty/specialty_list', specialtyModule.specialty_list);
router.get('/specialty/specialty_details', specialtyModule.specialty_details);

// 相亲模块
const marryModule = require('./compontent/marry_module')
router.get('/marry/marry_list', marryModule.marry_list);
router.get('/marry/marry_details', marryModule.marry_details);
router.get('/marry/marry_issign', marryModule.marry_issign);
router.get('/marry/marry_sign', marryModule.marry_sign);

// 线下活动模块
const appointmentModule = require('./compontent/appointment_module')
router.get('/appointment/appointment_list', appointmentModule.appointment_list);
router.get('/appointment/appointment_details', appointmentModule.appointment_details);
router.get('/appointment/appointment_issign', appointmentModule.appointment_issign);
router.get('/appointment/appointment_sign', appointmentModule.appointment_sign);

// 图片模块
const pictureModule = require('./compontent/picture_module')
router.get('/picture/wallportrait_series', pictureModule.wallportrait_series);
router.get('/picture/wallportrait_list', pictureModule.wallportrait_list);
router.get('/picture/wallpaper_series', pictureModule.wallpaper_series);
router.get('/picture/wallpaper_list', pictureModule.wallpaper_list);
router.get('/picture/wallwriting_series', pictureModule.wallwriting_series);
router.get('/picture/wallwriting_list', pictureModule.wallwriting_list);

// 拯救不开心模块
const happyModule = require('./compontent/happy_module')
router.get('/happy/story_list', happyModule.story_list);

// 菜谱模块
const recipeModule = require('./compontent/recipe_module')
router.get('/recipe/recipe_catalogs', recipeModule.recipe_catalogs);
router.get('/recipe/recipe_list', recipeModule.recipe_list);
router.get('/recipe/recipe_detail', recipeModule.recipe_detail);

// 新闻模块
const journalismModules = require('./compontent/journalism_module')
router.get('/journalism/journalism_list', journalismModules.journalism_list);
router.get('/journalism/journalism_details', journalismModules.journalism_details);


/*                   发现                  */


// 动态模块
const dynamicModules = require('./compontent/dynamic_module')
router.post('/dynamic/dynamic_release_img', dynamicModules.dynamic_release_img);
router.post('/dynamic/dynamic_release_txt', dynamicModules.dynamic_release_txt);
router.get('/dynamic/dynamic_list', dynamicModules.dynamic_list);
router.get('/dynamic/dynamic_details', dynamicModules.dynamic_details);
router.get('/dynamic/cancel_dynamic', dynamicModules.cancel_dynamic);
router.post('/dynamic/write_comment', dynamicModules.write_comment);
router.get('/dynamic/comment_list', dynamicModules.comment_list);


/*                   消息                  */


// 消息模块
const messageModules = require('./compontent/message_module')
router.get('/message/permessage_list', messageModules.permessage_list);
router.get('/message/permessage_details', messageModules.permessage_details);
router.post('/message/permessage_send', messageModules.permessage_send);
router.post('/message/permessage_active', messageModules.permessage_active);
router.get('/message/permessage_delete', messageModules.permessage_delete);
router.get('/message/sysmessage_list', messageModules.sysmessage_list);
router.get('/message/sysmessage_details', messageModules.sysmessage_details);


/*                   我的                  */


// 个人中心模块
const mineModule = require('./compontent/mine_module')
router.get('/mine/mine_info', mineModule.mine_info);
router.post('/mine/update_mineInfo', mineModule.update_mineInfo);
router.get('/mine/concerns_count', mineModule.concerns_count);
router.get('/mine/concerns_list', mineModule.concerns_list);
router.post('/mine/follow_users', mineModule.follow_users);
router.get('/mine/cancel_users', mineModule.cancel_users);
router.get('/mine/collection_count', mineModule.collection_count);
router.get('/mine/collection_list', mineModule.collection_list);
router.post('/mine/follow_collection', mineModule.follow_collection);
router.get('/mine/cancel_collection', mineModule.cancel_collection);
router.get('/mine/my_dynamic_list', mineModule.my_dynamic_list);


/*                   删除以下功能                  */


// 类别模块
const classificationModule = require('./compontent/classification_module.js')
router.get('/classification/classification_news', classificationModule.classification_news);
router.get('/classification/classification_city', classificationModule.classification_city);

// 日记模块
const recordModule = require('./compontent/record_module')
router.get('/record/record_diary', recordModule.record_diary);
router.get('/record/diary_details', recordModule.diary_details);
router.post('/record/keep_diary', recordModule.keep_diary);
router.get('/record/delete_diary', recordModule.delete_diary);

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
router.get('/other/jsxh_quotations', otherModules.jsxh_quotations);

module.exports = router;
