var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library' 
});

connection.connect();

// 注册：判断账号是否存在
const post_register = (req, res, next) => {
  var data = req.body
  var sql = `SELECT * FROM \`login_information\` WHERE name='${req.body.name}'`
  connection.query(sql, function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: err
      }))
      return;
    } else {
      // state为0：判断账号是否可以注册
      if (data.state && data.state == 0) {
        if (result.length > 0) {
          res.end(JSON.stringify({
            code: 500,
            msg: '此账号已被注册'
          }))
        } else {
          res.end(JSON.stringify({
            code: 0,
            msg: 'success'
          }))
        }
      } else if (data.state && data.state == 1) {
        if (result.length > 0) {
          if (result[0].password === data.password) {
            if (result[0].password === data.newPassword) {
              res.end(JSON.stringify({
                code: 500,
                msg: '新密码不能与旧密码相同'
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
            msg: '用户名输入错误'
          }))
        }
      } else {
        res.end(JSON.stringify({
          code: 500,
          msg: '未知异常，请联系管理员'
        }))
      }
    }
  });
}
// 注册：将注册信息写入数据库
const post_register_inster = (req, res, next) => {
  var addSql = 'INSERT INTO login_information(Id,name,password,number) VALUES(0,?,?,0)';
  var addSqlParams = [req.body.name, req.body.password];
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      res.end(JSON.stringify({
        code: 500,
        msg: err
      }))
      return;
    } else {
      res.end(JSON.stringify({
        code: 0,
        msg: 'success'
      }))
    }
  });
}
// 注册：修改密码
const post_register_change = (req, res, next) => {
  let data = req.body
  console.log(data.newPass)
  console.log(data.id)
  var addSql = `UPDATE \`login_information\` SET \`password\` = '${data.newPass}' WHERE \`login_information\`.\`id\` = ${data.id};`
  connection.query(addSql, function (err, result) {
    if (err) {
      res.end(JSON.stringify({
        code: 500,
        msg: err
      }))
      return;
    } else {
      res.end(JSON.stringify({
        code: 0,
        msg: 'success'
      }))
    }
  });
}
// 登录：判断账号是否存在
const get_loginInfo = (req, res, next) => {
  var sql = 'SELECT * FROM login_information';
  connection.query(sql, function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: err
      }))
    } else {
      res.end(JSON.stringify({
        code: 0,
        msg: 'success',
        data: result
      }))
    }
  });
}
// 登录：验证账号信息，登录
const post_login = (req, res, next) => {
  var sql = `SELECT * FROM \`login_information\` WHERE name='${req.body.name}'`
  connection.query(sql, function (err, result) {
    if(err){
      res.end(JSON.stringify({
        code: 500,
        msg: err
      }))
      return;
    } else {
      if (result.length > 0) {
        if (result[0].password === req.body.password) {
          res.end(JSON.stringify({
            code: 0,
            msg: 'success'
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
          msg: '没有此账号信息'
        }))
      }
    }
  });
}

module.exports = {
  post_register, post_register_inster, post_register_change, post_login, get_loginInfo
}