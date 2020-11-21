var mysql = require('mysql');

var sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library'
};

var connection = mysql.createConnection(sqlConfig);

connection.connect();

// 判断账号是否存在（参数：userName，state）
const is_register = (req, res, next) => {
  let data = req.body
  var sql = `SELECT * FROM \`login_information\` WHERE userName='${data.userName}'`
  connection.query(sql, function (err, result) {
    if (err) {
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
  });
}
// 将注册信息写入数据库（参数：userName，password，nickName，avatarUrl，gender）
const register_inster = (req, res, next) => {
  let data = req.body
  var addSql = 'INSERT INTO `login_information` (`id`, `userName`, `password`, `nickName`, `avatarUrl`, `gender`) VALUES (NULL, ?, ?, ?, ?, ?)';
  var addSqlParams = [data.userName, data.password, data.nickName, data.avatarUrl, data.gender];
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
// 修改密码（参数：newPassword，id）
const change_password = (req, res, next) => {
  let data = req.body
  var addSql = `UPDATE \`login_information\` SET \`password\` = '${data.newPassword}' WHERE \`login_information\`.\`id\` = ${data.id};`
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
// 判断账号密码是否正确（参数：userName，password）
const sign_in = (req, res, next) => {
  let data = req.body
  var sql = `SELECT * FROM \`login_information\` WHERE \`userName\` = '${data.userName}'`;
  connection.query(sql, function (err, result) {
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
          msg: '账号错误'
        }))
      }
    }
  });
}

connection.on('error',err=>{
  console.log('Re-connecting lost connection: ');
  connection = mysql.createConnection(sqlConfig)
})

module.exports = {
  is_register, register_inster, change_password, sign_in
}