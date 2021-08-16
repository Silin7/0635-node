/*
 * @Description: 景点模块
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const scenicspotModule = require('../../controller/scenicspotModule');

let scenicspotRouter = express.Router();

scenicspotRouter
  .get('/scenicspot/scenicspot_list', scenicspotModule.scenicspot_list)
  .get('/scenicspot/scenicspot_info', scenicspotModule.scenicspot_info)
  .get('/scenicspot/mine_scenicspot_list', scenicspotModule.mine_scenicspot_list)
  .post('/scenicspot/is_follow_scenicspot', scenicspotModule.is_follow_scenicspot)
  .post('/scenicspot/follow_scenicspot', scenicspotModule.follow_scenicspot)
  .post('/scenicspot/cancel_scenicspot', scenicspotModule.cancel_scenicspot)


module.exports = scenicspotRouter;

