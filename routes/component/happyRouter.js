/*
 * @Description: 拯救不开心模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */

const express = require('express');
const happyModule = require('../../controller/happyModule');

let happyRouter = express.Router();

happyRouter
  .get('/entertainment/entertainment_list', happyModule.entertainment_list)


module.exports = happyRouter;
