/*
 * @Description: 活动模块控制器层
 * @Author: silin7
 * @Date: 2021-08-17
 */

const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

const appointmentModel = require('../model/component/appointmentModel')

// 发起活动(图片)   这个不管用  唉   要重写
const appointment_release_img = async (req, res, next) => {
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
      // let newPath2 = 'https://www.silin7.cn/birch-forest-media/appointmentModule/' + files.file.name
      fs.rename(oldPath, newPath, () => { //fs.rename重命名图片名称
        let parameter = fields
        appointmentModel.appointment_release_img(parameter).then(result => {
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

// 发起活动（文字）
const appointment_release_txt = async (req, res, next) => {
  let parameter = req.body
  await appointmentModel.appointment_release_txt(parameter).then(result => {
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

// 线下活动列表
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
  await appointmentModel.appointment_total(sponsor_gender, appointment_type, area_type, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await appointmentModel.appointment_list(page, limit, sponsor_gender, appointment_type, area_type, is_pass).then(result => {
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

// 线下活动详情
const appointment_details = async (req, res, next) => {
  let parameter = req.query
  await appointmentModel.appointment_details(parameter.id).then(result => {
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

// 是否报名参加活动
const appointment_issign = async (req, res, next) => {
  let parameter = req.query
  await appointmentModel.appointment_issign(parameter.active_id, parameter.followers_id).then(result => {
    if (result.length > 0) {
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

// 报名参加活动
const appointment_sign = async (req, res, next) => {
  let parameter = req.query
  await appointmentModel.appointment_issign(parameter.active_id, parameter.followers_id).then(result => {
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
  appointment_issign,
  appointment_sign
}