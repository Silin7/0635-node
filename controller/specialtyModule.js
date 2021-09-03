/*
 * @Description: 特产模块控制器层
 * @Author: silin7
 * @Date: 2021-08-31
 */

const specialtyDao = require('../model/dao/specialtyDao')

/**
 * 特产列表
 * @token false
 * @method GET
 * @param page, limit, specialty_position
 */
const specialty_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let specialty_position = parameter.specialty_position ? parameter.specialty_position : ''
  let isNext = true
  let totalCount = 0
  let data = []
  await specialtyDao.specialty_total(specialty_position).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await specialtyDao.specialty_list(page, limit, specialty_position).then(result => {
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
 * 特产详情
 * @token false
 * @method GET
 * @param id
 */
const specialty_details = async (req, res, next) => {
  let parameter = req.query
  await specialtyDao.specialty_details(parameter.id).then(result => {
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


module.exports = {
  specialty_list,
  specialty_details
}