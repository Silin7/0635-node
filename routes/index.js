/*
 * @Description: 汇总模块子路由
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const Router = express.Router();

const appointmentRouter = require('./compontent/appointmentRouter')
const dynamicRouter = require('./compontent/dynamicRouter')
const happyRouter = require('./compontent/happyRouter')
const historyRouter = require('./compontent/historyRouter')
const journalismRouter = require('./compontent/journalismRouter')
const locationRouter = require('./compontent/locationRouter')
const loginRouter = require('./compontent/loginRouter')
const marryRouter = require('./compontent/marryRouter')
const messageRouter = require('./compontent/messageRouter')
const mineRouter = require('./compontent/mineRouter')
const otherRouter = require('./compontent/otherRouter')
const pictureRouter = require('./compontent/pictureRouter')
const recipeRouter = require('./compontent/recipeRouter')
const scenicspotRouter = require('./compontent/scenicspotRouter')
const specialtyRouter = require('./compontent/specialtyRouter')
const topicRouter = require('./compontent/topicRouter')

Router
  .use(appointmentRouter)
  .use(dynamicRouter)
  .use(happyRouter)
  .use(historyRouter)
  .use(journalismRouter)
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
  .use(topicRouter)
  
module.exports = Router;
