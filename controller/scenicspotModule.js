/*
 * @Description: 景点模块控制器层
 * @Author: silin7
 * @Date: 2021-08-17
 */

const scenicspotDao = require('../model/dao/scenicspotDao');

// 景点列表
const scenicspot_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let scenicspot_name = parameter.scenicspot_name ? parameter.scenicspot_name : ''
  let scenicspot_position = parameter.scenicspot_position ? parameter.scenicspot_position : ''
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

// 景点详情
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

// 我关注的景点列表
const mine_scenicspot_list = async (req, res, next) => {
  let parameter = req.query
  await scenicspotDao.mine_scenicspot_list(parameter.followers_id).then(result => {
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

// 是否关注此景点
const is_follow_scenicspot = async (req, res, next) => {
  let parameter = req.body
  await scenicspotDao.is_follow_scenicspot(parameter.followers_id, parameter.scenicspot_id).then(result => {
    if (result[0]["COUNT(*)"] > 0) {
      res.json({
        code: 0,
        msg: 'success',
        type: '1'
      })
    } else {
      res.json({
        code: 0,
        msg: 'success',
        type: '0'
      })
    }
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

// 关注此景点
const follow_scenicspot = async (req, res, next) => {
  let parameter = req.body
  await scenicspotDao.follow_scenicspot(parameter).then(result => {
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

// 取消关注此景点
const cancel_scenicspot = async (req, res, next) => {
  let parameter = req.body
  await scenicspotDao.cancel_scenicspot(parameter.followers_id, parameter.scenicspot_id).then(result => {
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
