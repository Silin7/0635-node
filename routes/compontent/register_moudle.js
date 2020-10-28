var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library' 
});

connection.connect();

// 注册：判断账号是否存在
const is_register = (req, res, next) => {
  var data = req.body
  var sql = `SELECT * FROM \`login_information\` WHERE name='${req.body.name}'`
  connection.query(sql, function (err, result) {
    if (!err) {
      res.end(JSON.stringify({
        code: 500,
        msg: err
      }))
      return;
    } else {
      // state为0：注册，state为1：修改密码
      if (data.state && data.state === '0') {
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
      } else if (data.state && data.state === '1') {
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
const register_inster = (req, res, next) => {
  console.log(req.body)
  var addSql = 'INSERT INTO `login_information` (`id`, `userName`, `password`, `name`, `gender`, `age`, `emotional`, `height`, `weight`, `nation`, `address`, `school`, `hobby`, `occupation`, `personalSignature`) VALUES (NULL, ?, ?, \'\', \'\', \'\', \'\', \'\', \'\', \'\', \'\', \'\', \'\', \'\', \'\')';
  var addSqlParams = [req.body.userName, req.body.password];
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
      return;
    } else {
      res.json({
        code: 0,
        msg: 'success'
      })
    }
  });
}
// 注册：修改密码
const change_password = (req, res, next) => {
  let data = req.body
  console.log(data.newPass)
  console.log(data.id)
  var addSql = `UPDATE \`login_information\` SET \`password\` = '${data.newPass}' WHERE \`login_information\`.\`id\` = ${data.id};`
  connection.query(addSql, function (err, result) {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
      return;
    } else {
      res.json({
        code: 0,
        msg: 'success'
      })
    }
  });
}

module.exports = {
  is_register, register_inster, change_password
}