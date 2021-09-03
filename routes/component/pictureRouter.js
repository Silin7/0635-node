/*
 * @Description: 图片模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */

const express = require('express');
const pictureModule = require('../../controller/pictureModule');

let pictureRouter = express.Router();

pictureRouter
  .get('/picture/wallportrait_series', pictureModule.wallportrait_series)
  .get('/picture/wallportrait_list', pictureModule.wallportrait_list)
  .get('/picture/wallpaper_series', pictureModule.wallpaper_series)
  .get('/picture/wallpaper_list', pictureModule.wallpaper_list)
  .get('/picture/wallwriting_series', pictureModule.wallwriting_series)
  .get('/picture/wallwriting_list', pictureModule.wallwriting_list)


module.exports = pictureRouter;
