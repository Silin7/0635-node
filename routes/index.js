/*
 * @Description: 汇总模块子路由
 * @Author: silin7
 * @Date: 2021-08-09
 */

const express = require('express');
const Router = express.Router();

const appointmentRouter = require('./component/appointmentRouter')
const dynamicRouter = require('./component/dynamicRouter')
const happyRouter = require('./component/happyRouter')
const historyRouter = require('./component/historyRouter')
const locationRouter = require('./component/locationRouter')
const loginRouter = require('./component/loginRouter')
const marryRouter = require('./component/marryRouter')
const messageRouter = require('./component/messageRouter')
const mineRouter = require('./component/mineRouter')
const otherRouter = require('./component/otherRouter')
const pictureRouter = require('./component/pictureRouter')
const recipeRouter = require('./component/recipeRouter')
const scenicspotRouter = require('./component/scenicspotRouter')
const specialtyRouter = require('./component/specialtyRouter')
const systemRouter = require('./component/systemRouter')
const topicRouter = require('./component/topicRouter')

Router
  .use(appointmentRouter)
  .use(dynamicRouter)
  .use(happyRouter)
  .use(historyRouter)
  .use(locationRouter)
  .use(loginRouter)
  .use(marryRouter)
  .use(messageRouter)
  .use(mineRouter)
  .use(otherRouter)
  .use(pictureRouter)
  .use(recipeRouter)
  .use(scenicspotRouter)
  .use(specialtyRouter)
  .use(systemRouter)
  .use(topicRouter)
  
module.exports = Router;
