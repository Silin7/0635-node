/*
 * @Description: 图文模块控制器层
 * @Author: silin7
 * @Date: 2021-08-29
 */

const pictureDao = require('../model/dao/pictureDao')

const db = require('../model/mySQL')

/**
 * 头像系列列表
 * @token true
 * @method GET
 * @param page, limit, series_id
 */
const wallportrait_series = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let isNext = true
  let totalCount = 0
  let data = []
  await pictureDao.wallportrait_total(parameter.series_id).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await pictureDao.wallportrait_series(page, limit, parameter.series_id).then(result => {
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
 * 头像列表详情
 * @token true
 * @method GET
 * @param id
 */
const wallportrait_list = async (req, res, next) => {
  let parameter = req.query
  await pictureDao.wallportrait_list(parameter.id).then(result => {
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
 * 壁纸系列列表
 * @token true
 * @method GET
 * @param page, limit, series_id
 */
const wallpaper_series = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let isNext = true
  let totalCount = 0
  let data = []
  await pictureDao.wallpaper_total(parameter.series_id).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await pictureDao.wallpaper_series(page, limit, parameter.series_id).then(result => {
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
 * 壁纸列表详情
 * @token true
 * @method GET
 * @param id
 */
const wallpaper_list = async (req, res, next) => {
  let parameter = req.query
  await pictureDao.wallportrait_list(parameter.id).then(result => {
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
 * 文案系列列表
 * @token true
 * @method GET
 * @param page, limit, series_id
 */
const wallwriting_series = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let isNext = true
  let totalCount = 0
  let data = []
  await pictureDao.wallwriting_total(parameter.series_id).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await pictureDao.wallwriting_series(page, limit, parameter.series_id).then(result => {
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
 * 文案列表详情
 * @token true
 * @method GET
 * @param id
 */
const wallwriting_list = async (req, res, next) => {
  let parameter = req.query
  await pictureDao.wallwriting_list(parameter.id).then(result => {
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
  wallportrait_series,
  wallportrait_list,
  wallpaper_series,
  wallpaper_list,
  wallwriting_series,
  wallwriting_list
}