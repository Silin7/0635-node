/*
 * @Description: 特产模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */

const express = require('express');
const specialtyModule = require('../../controller/specialtyModule');

let specialtyRouter = express.Router();

specialtyRouter
  .get('/specialty/specialty_list', specialtyModule.specialty_list)
  .get('/specialty/specialty_details', specialtyModule.specialty_details)


module.exports = specialtyRouter;
