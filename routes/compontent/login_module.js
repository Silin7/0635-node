const conn = require('./mySQL')

const is_register = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`personnel_information\` WHERE user_name = '${data.user_name}'`
  conn().query(sql, function (err, result) {
    if (err) {
      res.end(JSON.stringify({
        code: 500,
        msg: err
      }))
    } else {
      // state为0：注册，state为1：修改密码
      if (data.state && data.state === '0') {
        if (result.length > 0) {
          res.end(JSON.stringify({
            code: 500,
            msg: '账号已被注册'
          }))
        } else {
          res.end(JSON.stringify({
            code: 0,
            msg: 'success'
          }))
        }
      } else if (data.state && data.state === '1') {
        if (result.length > 0) {
          if (result[0].password === data.password) {
            if (result[0].password === data.newPassword) {
              res.end(JSON.stringify({
                code: 500,
                msg: '新旧密码相同'
              }))
            } else {
              res.end(JSON.stringify({
                code: 0,
                msg: 'success',
                data: result[0]
              }))
            }
          } else {
            res.end(JSON.stringify({
              code: 500,
              msg: '密码错误'
            }))
          }
        } else {
          res.end(JSON.stringify({
            code: 500,
            msg: '账号错误'
          }))
        }
      } else {
        res.end(JSON.stringify({
          code: 500,
          msg: '未知异常，请联系管理员'
        }))
      }
    }
  })
}

// 将注册信息写入数据库（
const register_inster = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `personnel_information` (`id`, `user_name`, `password`, `nick_name`, `avatar_url`, `gender`) VALUES (NULL, ?, ?, ?, ?, ?)'
  let sqlParams = [data.user_name, data.password, data.nick_name, data.avatar_url, data.gender]
  conn().query(sql, sqlParams, function (err, result) {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
    } else {
      res.json({
        code: 0,
        msg: 'success'
      })
    }
  })
}

// 修改密码
const change_password = (req, res, next) => {
  let data = req.body
  let sql = `UPDATE \`personnel_information\` SET \`password\` = '${data.newPassword}' WHERE \`personnel_information\`.\`id\` = '${data.id}'`
  conn().query(sql, function (err, result) {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
    } else {
      res.json({
        code: 0,
        msg: 'success'
      })
    }
  })
}

// 判断账号密码是否正确
const sign_in = (req, res, next) => {
  let data = req.body
  let sql = `SELECT * FROM \`personnel_information\` WHERE \`user_name\` = '${data.user_name}'`
  conn().query(sql, function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: err
      }))
    } else {
      if (result.length > 0) {
        if (result[0].password === req.body.password) {
          res.end(JSON.stringify({
            code: 0,
            msg: 'success',
            data: result[0]
          }))
        } else {
          res.end(JSON.stringify({
            code: 500,
            msg: '密码错误'
          }))
        }
      } else {
        res.end(JSON.stringify({
          code: 500,
          msg: '账号错误'
        }))
      }
    }
  })
}

module.exports = {
  is_register, register_inster, change_password, sign_in
}