/*
* @Description: 社交模块控制器层
* @Author: silin7
* @Date: 2021-08-17
*/

const checkToken = require('./systemModule/checkToken')
const marryDao = require('../model/dao/marryDao')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')


/**
 * 发起社交
 * @token true
 * @method POST
 * @param type, name, gender, age, constellation, address, height, weight, education, occupation, income, state, car, house, introduce
 */
const marry_release = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let author_id = req.headers.author_id
  let form = new formidable.IncomingForm()
  let uploadDir = path.join(__dirname, '../../../birch-forest-media/marryModule', author_id)
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
  form.uploadDir = uploadDir
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
    } else {
      let oldPath = files.file.path
      let newPath = path.join(path.dirname(oldPath), files.file.name)
      fs.rename(oldPath, newPath, () => {
        let parameter = fields
        marryDao.marry_release(parameter, author_id, newPath).then(result => {
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
 * 社交列表
 * @token false
 * @method POST
 * @param page, limit, gender, type, address, is_pass
 */
const marry_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let gender = parameter.gender ? parameter.gender : ''
  let type = parameter.type ? parameter.type : ''
  let address = parameter.address ? parameter.address : ''
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await marryDao.marry_total(gender, type, address, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await marryDao.marry_list(page, limit, gender, type, address, is_pass).then(result => {
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
 * 社交详情
 * @token false
 * @method GET
 * @param id
 */
const marry_details = async (req, res, next) => {
  let parameter = req.query
  await marryDao.marry_details(parameter.id).then(result => {
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
 * 是否报名参加社交
 * @token true
 * @method GET
 * @param register_id
 */
const is_marry_sign = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await marryDao.is_marry_sign(parameter.register_id, author_id).then(result => {
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
 * 报名参加社交
 * @token true
 * @method GET
 * @param register_id
 */
const marry_sign = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await marryDao.marry_sign(parameter.register_id, author_id).then(result => {
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
  marry_release,
  marry_list,
  marry_details,
  is_marry_sign,
  marry_sign
}