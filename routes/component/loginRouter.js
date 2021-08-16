/*
 * @Description: 注册，登录模块
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const loginModule = require('../../controller/loginModule');

let loginRouter = express.Router();

loginRouter
  .get('/login/is_register', loginModule.is_register)
  .post('/login/register_inster', loginModule.register_inster)
  .post('/login/change_password', loginModule.change_password)
  .post('/login/sign_in', loginModule.sign_in)



module.exports = loginRouter;

