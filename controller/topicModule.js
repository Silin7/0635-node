
/*
 * @Description: 话题模块控制器层
 * @Author: silin7
 * @Date: 2021-08-31
 */

const topicDao = require('../model/dao/topicDao')

/**
 * 话题分类列表
 * @token false
 * @method GET
 * @param page, limit, state
 */
const topic_class = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let state = parameter.state ? parameter.state : ''
  let isNext = true
  let totalCount = 0
  let data = []
  await topicDao.topic_class_total(state).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await topicDao.topic_class(page, limit, state).then(result => {
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
 * 话题分类详情
 * @token false
 * @method GET
 * @param id
 */
const topic_class_details = async (req, res, next) => {
  let parameter = req.query
  await topicDao.topic_class_details(parameter.id).then(result => {
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
 * 话题列表
 * @token false
 * @method GET
 * @param page, limit, topic_class, is_pass
 */
const topic_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let topic_class = parameter.topic_class ? parameter.topic_class : ''
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await topicDao.topic_list_total(topic_class, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await topicDao.topic_list(page, limit, topic_class, is_pass).then(result => {
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
 * 话题详情
 * @token false
 * @method GET
 * @param id
 */
const topic_list_details = async (req, res, next) => {
  let parameter = req.query
  await topicDao.topic_list_details(parameter.id).then(result => {
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
  topic_class,
  topic_class_details,
  topic_list,
  topic_list_details
}