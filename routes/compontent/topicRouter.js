/*
 * @Description: 话题模块
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const topicModule = require('../../controller/topicModule');

let topicRouter = express.Router();

topicRouter
  .get('/topic/topic_class', topicModule.topic_class)
  .get('/topic/topic_class_details', topicModule.topic_class_details)
  .get('/topic/topic_list', topicModule.topic_list)
  .get('/topic/topic_list_details', topicModule.topic_list_details)


module.exports = topicRouter;

