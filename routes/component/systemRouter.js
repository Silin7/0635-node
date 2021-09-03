/*
 * @Description: 系统模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */

const express = require('express');
const wxLogin = require('../../controller/systemModule/wxLogin');

let systemRouter = express.Router();

systemRouter
  .get('/system/wx_login', wxLogin.wx_login);


module.exports = systemRouter;
