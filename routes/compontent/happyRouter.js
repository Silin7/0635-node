/*
 * @Description: 拯救不开心模块
 * @Author: silin7
 * @Date: 2020-08-09
 */


const express = require('express');
const happyModule = require('../../controller/happyModule');

let happyRouter = express.Router();

happyRouter
  .get('/entertainment/entertainment_list', happyModule.entertainment_list)


module.exports = happyRouter;
