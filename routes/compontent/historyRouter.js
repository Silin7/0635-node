/*
 * @Description: 历史模块
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const historyModule = require('../../controller/historyModule');

let historyRouter = express.Router();

historyRouter
  .get('/history/local_historical', historyModule.local_historical)


module.exports = historyRouter;
