/*
 * @Description: 新闻模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const journalismModule = require('../../controller/journalismModule');

let journalismRouter = express.Router();

journalismRouter
  .get('/journalism/journalism_list', journalismModule.journalism_list)
  .get('/journalism/journalism_details', journalismModule.journalism_details)


module.exports = journalismRouter;

