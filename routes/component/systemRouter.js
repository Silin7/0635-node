/*
 * @Description: 系统模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const wxloginModule = require('../../controller/systemModule/wxloginModule');

let systemRouter = express.Router();

systemRouter
  .get('/system/wx_login', wxloginModule.wx_login);


module.exports = systemRouter;

