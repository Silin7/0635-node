/*
 * @Description: 同城服务模块
 * @Author: silin7
 * @Date: 2020-08-09
 */


const express = require('express');
const locationModule = require('../../controller/locationModule');

let locationRouter = express.Router();

locationRouter
  .post('/location_work/work_add', locationModule.work_add)
  .get('/location_work/work_list', locationModule.work_list)
  .get('/location_work/work_details', locationModule.work_details)
  .post('/location_work/room_add', locationModule.room_add)
  .get('/location_work/room_list', locationModule.room_list)
  .get('/location_work/room_details', locationModule.room_details)


module.exports = locationRouter;

