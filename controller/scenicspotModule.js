/*
 * @Description: 景点模块控制器层
 * @Author: silin7
 * @Date: 2021-08-17
 */

const checkToken = require('./systemModule/checkToken')
const scenicspotDao = require('../model/dao/scenicspotDao')

/**
 * 景点列表
 * @token false
 * @method GET
 * @param page, limit, scenicspot_position, scenicspot_name
 */
const scenicspot_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let scenicspot_position = parameter.scenicspot_position ? parameter.scenicspot_position : ''
  let scenicspot_name = parameter.scenicspot_name ? parameter.scenicspot_name : ''
  let isNext = true
  let totalCount = 0
  let data = []
  await scenicspotDao.scenicspot_total(scenicspot_position, scenicspot_name).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await scenicspotDao.scenicspot_list(page, limit, scenicspot_position, scenicspot_name).then(result => {
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
 * 景点详情
 * @token false
 * @method GET
 * @param id
 */
const scenicspot_info = async (req, res, next) => {
  let parameter = req.query
  await scenicspotDao.scenicspot_info(parameter.id).then(result => {
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
 * 我打卡的景点列表
 * @token false
 * @method GET
 */
const mine_scenicspot_list = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let author_id = req.headers.author_id
  await scenicspotDao.mine_scenicspot_list(author_id).then(result => {
    res.json({
      code: 0,
      msg: 'success',
      data: result
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 是否打卡此景点
 * @token false
 * @method GET
 * @param scenicspot_id
 * @remark 01: 未打卡； 02: 已打卡
 */
const is_follow_scenicspot = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 0,
      msg: 'success',
      type: '01'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await scenicspotDao.is_follow_scenicspot(parameter.scenicspot_id, author_id).then(result => {
    if (result[0]["COUNT(*)"] > 0) {
      res.json({
        code: 0,
        msg: 'success',
        type: '02'
      })
    } else {
      res.json({
        code: 0,
        msg: 'success',
        type: '01'
      })
    }
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 打卡此景点
 * @token true
 * @method POST
 * @param scenicspot_id, scenicspot_name, scenicspot_img
 */
const follow_scenicspot = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  let author_id = req.headers.author_id
  await scenicspotDao.follow_scenicspot(parameter, author_id).then(result => {
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
 * 取消打卡此景点
 * @token false
 * @method GET
 * @param scenicspot_id
 */
const cancel_scenicspot = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await scenicspotDao.cancel_scenicspot(parameter.scenicspot_id, author_id).then(result => {
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

module.exports = {
  scenicspot_list,
  scenicspot_info,
  mine_scenicspot_list,
  is_follow_scenicspot,
  follow_scenicspot,
  cancel_scenicspot
}
