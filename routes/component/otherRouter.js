/*
 * @Description: 其他模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */

const express = require('express');
const otherModule = require('../../controller/otherModule');

let otherRouter = express.Router();

otherRouter
  .get('/other/girl_random', otherModule.girl_random)
  .get('/other/taobao_mjxiu', otherModule.taobao_mjxiu);


module.exports = otherRouter;
