/*
 * @Description: 社交模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const marryModule = require('../../controller/marryModule');

let marryRouter = express.Router();

marryRouter
  .post('/marry/marry_release', marryModule.marry_release)
  .get('/marry/marry_list', marryModule.marry_list)
  .get('/marry/marry_details', marryModule.marry_details)
  .get('/marry/is_marry_sign', marryModule.is_marry_sign)
  .get('/marry/marry_sign', marryModule.marry_sign)



module.exports = marryRouter;

