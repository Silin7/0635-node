/*
 * @Description: 活动模块控制器层
 * @Author: silin7
 * @Date: 2021-08-17
 */

const checkToken = require('./systemModule/checkToken')
const appointmentDao = require('../model/dao/appointmentDao')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

/**
 * 发起活动（海报）
 * @token true
 * @method POST
 * @param sponsor_name, sponsor_gender, sponsor_age, sponsor_img, appointment_title, appointment_info, appointment_time, appointment_place, appointment_wx, area_type, appointment_type, appointment_pay, appointment_gander, appointment_details
 */
const appointment_release_img = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let author_id = req.headers.author_id
  let form = new formidable.IncomingForm();
  let uploadDir = path.join(__dirname, '../../birch-forest-media/appointmentModule', author_id);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdir(uploadDir, (error) => {
      if (error) {
        res.json({
          code: 500,
          data: error
        })
      }
    })
  }
  form.uploadDir = uploadDir;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
    } else {
      let oldPath = files.file.path;
      let newPath = path.join(path.dirname(oldPath), files.file.name);
      fs.rename(oldPath, newPath, () => { //fs.rename重命名图片名称
        let parameter = fields
        appointmentDao.appointment_release_img(parameter, author_id, newPath).then(result => {
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
      })
    }
  })
}

/**
 * 发起活动（文字）
 * @token true
 * @method POST
 * @param sponsor_name, sponsor_gender, sponsor_age, sponsor_img, appointment_title, appointment_info, appointment_time, appointment_place, appointment_wx, area_type, appointment_type, appointment_pay, appointment_gander, appointment_details
 */
const appointment_release_txt = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  let author_id = req.headers.author_id
  await appointmentDao.appointment_release_txt(parameter, author_id).then(result => {
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
 * 线下活动列表
 * @token false
 * @method GET
 * @param page, limit, sponsor_gender, appointment_type, area_type, is_pass
 */
const appointment_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let sponsor_gender = parameter.sponsor_gender ? parameter.sponsor_gender : ''
  let appointment_type = parameter.appointment_type ? parameter.appointment_type : ''
  let area_type = parameter.area_type ? parameter.area_type : ''
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await appointmentDao.appointment_total(sponsor_gender, appointment_type, area_type, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await appointmentDao.appointment_list(page, limit, sponsor_gender, appointment_type, area_type, is_pass).then(result => {
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
 * 线下活动详情
 * @token false
 * @method GET
 * @param id
 */
const appointment_details = async (req, res, next) => {
  let parameter = req.query
  await appointmentDao.appointment_details(parameter.id).then(result => {
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
 * 是否报名参加活动
 * @token true
 * @method GET
 * @param active_id
 */
const is_appointment_sign = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await appointmentDao.is_appointment_sign(parameter.active_id, author_id).then(result => {
    let flag = result[0]["COUNT(*)"] === 0 ? false : true
    res.json({
      code: 0,
      msg: '操作成功',
      data: flag
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 报名参加活动
 * @token true
 * @method GET
 * @param active_id
 */
const appointment_sign = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await appointmentDao.appointment_sign(parameter.active_id, author_id).then(result => {
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
  appointment_release_img,
  appointment_release_txt,
  appointment_list,
  appointment_details,
  is_appointment_sign,
  appointment_sign
}