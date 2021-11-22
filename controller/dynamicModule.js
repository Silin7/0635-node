/*
 * @Description: 动态模块控制器层
 * @Author: silin7
 * @Date: 2021-08-26
 */

const formidable = require('formidable');
const path = require('path')
const fs = require('fs')

const checkToken = require('./systemModule/checkToken')
const dynamicDao = require('../model/dao/dynamicDao')

/**
 * 发动态
 * @token true
 * @method POST
 * @param author_id, author_name, author_avatar, content, images
 */
const dynamic_release = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  let author_id = req.headers.author_id
  await dynamicDao.dynamic_release(parameter, author_id).then(result => {
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
 * 动态列表
 * @token false
 * @method GET
 * @param page, limit, is_pass
 */
const dynamic_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await dynamicDao.dynamic_total(is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await dynamicDao.dynamic_list(page, limit, is_pass).then(result => {
    if (result && result.length > 0) {
      result.forEach(item => {
        if (item.images) {
          item.images = item.images.split(',')
        } else {
          item.images = []
        }
      })
    }
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
 * 作者基本信息
 * @token true
 * @method GET
 * @param author_id
 */
const author_info = async (req, res, next) => {
  let parameter = req.query
  await dynamicDao.author_info(parameter.author_id).then(result => {
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
 * 作者动态列表
 * @token true
 * @method GET
 * @param page, limit, author_id, is_pass
 */
const author_dynamic_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await dynamicDao.author_dynamic_count(parameter.author_id, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await dynamicDao.author_dynamic_list(page, limit, parameter.author_id, is_pass).then(result => {
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
 * 动态详情
 * @token false
 * @method GET
 * @param id
 */
const dynamic_details = async (req, res, next) => {
  let parameter = req.query
  await dynamicDao.dynamic_details(parameter.id).then(result => {
    if (result && result.length > 0) {
      result.forEach(item => {
        if (item.images) {
          item.images = item.images.split(',')
        } else {
          item.images = []
        }
      })
    }
    res.json({
      code: 0,
      msg: 'success',
      data: result[0] ? result[0] : {}
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 删除动态
 * @token true
 * @method GET
 * @param id
 */
const cancel_dynamic = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await dynamicDao.cancel_dynamic(parameter.id, author_id).then(result => {
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
 * 写评论
 * @token true
 * @method POST
 * @param dynamic_id, comment_content, reviewer_id, reviewer_name, reviewer_image
 */
const write_comment = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  let author_id = req.headers.author_id
  await dynamicDao.write_comment(parameter, author_id).then(result => {
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
 * 动态评论的列表
 * @token false
 * @method GET
 * @param page, limit, is_pass
 */
const comment_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await dynamicDao.comment_total(parameter.dynamic_id, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await dynamicDao.comment_list(page, limit, parameter.dynamic_id, is_pass).then(result => {
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

module.exports = {
  dynamic_release,
  dynamic_list,
  author_info,
  author_dynamic_list,
  dynamic_details,
  cancel_dynamic,
  write_comment,
  comment_list
}