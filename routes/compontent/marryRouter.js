/*
 * @Description: 社交模块
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
  .get('/marry/marry_issign', marryModule.marry_issign)
  .get('/marry/marry_sign', marryModule.marry_sign)



module.exports = marryRouter;

