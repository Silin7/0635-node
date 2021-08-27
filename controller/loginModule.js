/*
* @Description: 注册登录模块控制器层
* @Author: silin7
* @Date: 2021-08-26
*/
const crypto = require("crypto")
const loginDao = require('../model/dao/loginDao')

/**
 * 注册（将注册信息写入数据库）
 * @method POST
 * @param user_name, password, nick_name, avatar_url, gender
 */
const register_inster = async (req, res, next) => {
  let isNext = true
  let isRegister = true
  let parameter = req.body
  parameter.password = crypto.createHash("md5").update(parameter.password).digest("hex")
  await loginDao.is_register(parameter.user_name).then(result => {
    if (result[0]["COUNT(*)"] !== 0) {
      res.json({
        code: 500,
        msg: '账号已被注册'
      })
      isRegister = false
    }
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  if (isRegister && isNext) {
    await loginDao.register_inster(parameter).then(result => {
      res.json({
        code: 0,
        msg: '操作成功'
      })
    }).catch(error => {
      res.json({
        code: 500,
        msg: JSON.stringify(error)
      })
    })
  }
}

/**
 * 修改密码
 * @method POST
 * @param user_name, password, new_password
 */
const change_password = async (req, res, next) => {
  let isNext = true
  let parameter = req.body
  parameter.password = crypto.createHash("md5").update(parameter.password).digest("hex")
  parameter.new_password = crypto.createHash("md5").update(parameter.new_password).digest("hex")
  if (parameter.password === parameter.new_password) {
    res.json({
      code: 500,
      msg: '新旧密码相同'
    })
    return
  }
  await loginDao.get_password(parameter.user_name).then(result => {
    if (result.length > 0) {
      if (result[0].password !== parameter.password) {
        res.json({
          code: 500,
          msg: '密码错误'
        })
        isNext = false
      }
    } else {
      res.json({
        code: 500,
        msg: '未查询到用户信息'
      })
      isNext = false
    }
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  if (isNext) {
    await loginDao.change_password(parameter.user_name, parameter.new_password).then(result => {
      res.json({
        code: 0,
        msg: '操作成功'
      })
    }).catch(error => {
      res.json({
        code: 500,
        msg: JSON.stringify(error)
      })
    })
  }
}

/**
 * 登录
 * @method POST
 * @param user_name, password
 */
const sign_in = async (req, res, next) => {
  let parameter = req.body
  parameter.password = crypto.createHash("md5").update(parameter.password).digest("hex")
  await loginDao.get_password(parameter.user_name).then(result => {
    if (result.length > 0) {
      if (result[0].password === parameter.password) {
        res.json({
          code: 0,
          msg: '登录成功',
          data: result[0]
        })
      } else {
        res.json({
          code: 500,
          msg: '密码错误'
        })
      }
    } else {
      res.json({
        code: 500,
        msg: '未查询到用户信息'
      })
    }
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

module.exports = {
  register_inster,
  change_password,
  sign_in
}