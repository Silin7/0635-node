/*
 * @Description: 线下活动模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */

const express = require('express');
const appointmentModule = require('../../controller/appointmentModule');

let appointmentRouter = express.Router();

appointmentRouter
  .post('/appointment/appointment_release_img', appointmentModule.appointment_release_img)
  .post('/appointment/appointment_release_txt', appointmentModule.appointment_release_txt)
  .get('/appointment/appointment_list', appointmentModule.appointment_list)
  .get('/appointment/appointment_details', appointmentModule.appointment_details)
  .get('/appointment/is_appointment_sign', appointmentModule.is_appointment_sign)
  .get('/appointment/appointment_sign', appointmentModule.appointment_sign)


module.exports = appointmentRouter;
