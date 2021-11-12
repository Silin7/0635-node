/*
 * @Description: 系统模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */

const express = require('express');
const wxLogin = require('../../controller/systemModule/wxLogin');
const uploadFiles = require('../../controller/systemModule/uploadFiles');

let systemRouter = express.Router();

systemRouter
  .get('/system/wx_login', wxLogin.wx_login)
  .post('/system/upload_files', uploadFiles.upload_files);


module.exports = systemRouter;
