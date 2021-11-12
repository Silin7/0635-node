/*
 * @Description: 动态模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */

const express = require('express');
const dynamicModule = require('../../controller/dynamicModule');

let dynamicRouter = express.Router();

dynamicRouter
  .post('/dynamic/dynamic_release', dynamicModule.dynamic_release)
  .get('/dynamic/dynamic_list', dynamicModule.dynamic_list)
  .get('/dynamic/author_info', dynamicModule.author_info)
  .get('/dynamic/author_dynamic_list', dynamicModule.author_dynamic_list)
  .get('/dynamic/dynamic_details', dynamicModule.dynamic_details)
  .get('/dynamic/cancel_dynamic', dynamicModule.cancel_dynamic)
  .post('/dynamic/write_comment', dynamicModule.write_comment)
  .get('/dynamic/comment_list', dynamicModule.comment_list)


module.exports = dynamicRouter;
