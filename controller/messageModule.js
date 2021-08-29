/*
 * @Description: 消息模块控制器层
 * @Author: silin7
 * @Date: 2021-08-29
 */

const checkToken = require('./systemModule/checkToken')
const messageDao = require('../model/dao/messageDao')
const db = require('../model/mySQL')

/**
 * 私信消息列表
 * @token true
 * @method GET
 * @param page, limit
 */
const permessage_list = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let isNext = true
  let totalCount = 0
  let data = []
  await messageDao.permessage_total(author_id).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await messageDao.permessage_list(page, limit, author_id).then(result => {
    data = result
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  if (isNext) {
    res.json({
      code: 0,
      msg: 'success',
      page: page,
      limit: limit,
      totalCount: totalCount,
      data: data
    })
  }
}

/**
 * 私信消息详情
 * @token true
 * @method GET
 * @param id
 */
const permessage_details = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  await messageDao.permessage_details(parameter.id).then(result => {
    res.json({
      code: 0,
      msg: 'success',
      data: result[0]
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 发私信（0：发送成功；1：已经发送过了）
 * @token true
 * @method POST
 * @param receiver_id, sender_name, sender_img, message_title, message_content, message_type
 */
const permessage_send = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  let author_id = req.headers.author_id
  let isNext = true
  await messageDao.is_permessage_send(parameter.receiver_id, author_id, parameter.message_type).then(result => {
    if (result[0][`COUNT(*)`] > 0) {
      res.json({
        code: 0,
        msg: 'success',
        type: '1'
      })
      isNext = false
    }
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
  if (isNext) {
    await messageDao.permessage_send(parameter, author_id).then(result => {
      res.json({
        code: 0,
        msg: 'success',
        type: '0'
      })
    }).catch(error => {
      res.json({
        code: 500,
        msg: JSON.stringify(error)
      })
    })
  }
}

/**
 * 活动私信（0：发送成功；1：已经发送过了）
 * @token true
 * @method POST
 * @param receiver_id, sender_name, sender_img, message_title, message_content, message_type
 */
const permessage_active = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  let author_id = req.headers.author_id
  let isNext = true
  await messageDao.is_permessage_send(parameter.receiver_id, author_id, parameter.message_type).then(result => {
    if (result[0][`COUNT(*)`] > 0) {
      res.json({
        code: 0,
        msg: 'success',
        type: '1'
      })
      isNext = false
    }
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
  if (isNext) {
    await messageDao.permessage_active(parameter, author_id).then(result => {
      res.json({
        code: 0,
        msg: 'success',
        type: '0'
      })
    }).catch(error => {
      res.json({
        code: 500,
        msg: JSON.stringify(error)
      })
    })
  }
}

/**
 * 删除私信
 * @token true
 * @method GET
 * @param id
 */
const permessage_delete = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  await messageDao.permessage_delete(parameter.id).then(result => {
    res.json({
      code: 0,
      msg: 'success'
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 系统消息列表
 * @token true
 * @method GET
 * @param page, limit
 */
const sysmessage_list = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let isNext = true
  let totalCount = 0
  let data = []
  await messageDao.sysmessage_total(author_id).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await messageDao.sysmessage_list(page, limit, author_id).then(result => {
    data = result
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  if (isNext) {
    res.json({
      code: 0,
      msg: 'success',
      page: page,
      limit: limit,
      totalCount: totalCount,
      data: data
    })
  }
}

/**
 * 系统消息详情
 * @token true
 * @method GET
 * @param id
 */
 const sysmessage_details = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  await messageDao.sysmessage_details(parameter.id).then(result => {
    res.json({
      code: 0,
      msg: 'success',
      data: result[0]
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

module.exports = {
  permessage_list,
  permessage_details,
  permessage_send,
  permessage_active,
  permessage_delete,
  sysmessage_list,
  sysmessage_details
}