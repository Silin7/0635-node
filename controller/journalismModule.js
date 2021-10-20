
/*
 * @Description: 新闻模块控制器层
 * @Author: silin7
 * @Date: 2021-10-19
 */

const journalismDao = require('../model/dao/journalismDao')

/**
 * 新闻分类详情
 * @token false
 * @method GET
 * @param journalism_area, journalism_type
 */
const journalism_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let journalism_area = parameter.journalism_area ? parameter.journalism_area : ''
  let journalism_type = parameter.journalism_type ? parameter.journalism_type : ''
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await journalismDao.journalism_list_total(journalism_area, journalism_type, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await journalismDao.journalism_list(page, limit, journalism_area, journalism_type, is_pass).then(result => {
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
 * 新闻详情
 * @token false
 * @method GET
 * @param id
 */
const journalism_details = async (req, res, next) => {
  let parameter = req.query
  await journalismDao.journalism_details(parameter.id).then(result => {
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
  journalism_list,
  journalism_details
}