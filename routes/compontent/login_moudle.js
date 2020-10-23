var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library' 
});

connection.connect();

// 登录：判断账号是否存在
const is_loginInfo = (req, res, next) => {
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
const sign_in = (req, res, next) => {
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
  is_loginInfo, sign_in
}