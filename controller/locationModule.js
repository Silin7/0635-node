/*
* @Description: 同城模块控制器层
* @Author: silin7
* @Date: 2021-08-26
*/

const checkToken = require('./systemModule/checkToken')
const locationDao = require('../model/dao/locationDao')

/**
 * 新增就业岗位信息
 * @token true
 * @method POST
 * @param basic_title, basic_salary, basic_phone, basic_type, basic_education, basic_experience, basic_people, basic_area, basic_address, basic_welfare, basic_info, business_name, business_gsfr, business_zczb, business_xydm, business_clsj, business_zcdz, business_jyfw
 */
const work_add = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  await locationDao.work_add(parameter).then(result => {
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
 * 就业岗位信息列表
 * @token false
 * @method GET
 * @param page, limit, basic_area, basic_type, basic_salary, is_pass
 */
const work_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let basic_area = parameter.basic_area ? parameter.basic_area : ''
  let basic_type = parameter.basic_type ? parameter.basic_type : ''
  let basic_salary = parameter.basic_salary ? parameter.basic_salary : ''
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await locationDao.work_total(basic_area, basic_type, basic_salary, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await locationDao.work_list(page, limit, basic_area, basic_type, basic_salary, is_pass).then(result => {
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
 * 就业岗位信息详情
 * @token false
 * @method GET
 * @param id
 */
const work_details = async (req, res, next) => {
  let parameter = req.query
  await locationDao.work_details(parameter.id).then(result => {
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
 * 新增房屋租赁信息
 * @token true
 * @method POST
 * @param room_name, room_type, lxr_phone, pay_rent, pay_method, room_areas, room_shape, basic_address, room_renovation, room_height, room_elevator, room_refrigerator, room_washing, room_heater, room_broadband, room_toilet, room_bed, room_wardrobe, room_conditioner, room_heating, room_cook, room_info
 */
const room_add = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  await locationDao.room_add(parameter).then(result => {
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
 * 房屋租赁信息列表
 * @token false
 * @method GET
 * @param page, limit, basic_area, room_type, pay_type, is_pass
 */
const room_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let basic_area = parameter.basic_area ? parameter.basic_area : ''
  let room_type = parameter.room_type ? parameter.room_type : ''
  let pay_type = parameter.pay_type ? parameter.pay_type : ''
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await locationDao.room_total(basic_area, room_type, pay_type, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await locationDao.room_list(page, limit, basic_area, room_type, pay_type, is_pass).then(result => {
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
 * 房屋租赁信息详情
 * @token false
 * @method GET
 * @param id
 */
const room_details = async (req, res, next) => {
  let parameter = req.query
  await locationDao.room_details(parameter.id).then(result => {
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
  work_add,
  work_list,
  work_details,
  room_add,
  room_list,
  room_details
}