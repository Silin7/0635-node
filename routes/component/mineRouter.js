/*
 * @Description: 个人中心模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const mineModule = require('../../controller/mineModule');

let mineRouter = express.Router();

mineRouter
  .get('/mine/mine_info', mineModule.mine_info)
  .post('/mine/update_mineInfo', mineModule.update_mineInfo)
  .get('/mine/concerns_count', mineModule.concerns_count)
  .get('/mine/concerns_list', mineModule.concerns_list)
  .post('/mine/follow_users', mineModule.follow_users)
  .get('/mine/cancel_users', mineModule.cancel_users)
  .get('/mine/collection_count', mineModule.collection_count)
  .get('/mine/collection_list', mineModule.collection_list)
  .post('/mine/follow_collection', mineModule.follow_collection)
  .get('/mine/cancel_collection', mineModule.cancel_collection)
  .get('/mine/my_dynamic_list', mineModule.my_dynamic_list)




module.exports = mineRouter;

