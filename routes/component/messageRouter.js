/*
 * @Description: 消息模块路由层
 * @Author: silin7
 * @Date: 2021-08-09
 */


const express = require('express');
const messageModule = require('../../controller/messageModule');

let messageRouter = express.Router();

messageRouter
  .get('/message/permessage_list', messageModule.permessage_list)
  .get('/message/permessage_details', messageModule.permessage_details)
  .post('/message/permessage_send', messageModule.permessage_send)
  .post('/message/permessage_active', messageModule.permessage_active)
  .get('/message/permessage_delete', messageModule.permessage_delete)
  .get('/message/sysmessage_list', messageModule.sysmessage_list)
  .get('/message/sysmessage_details', messageModule.sysmessage_details)



module.exports = messageRouter;

