var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library' 
});

connection.connect();

// 登录：判断账号是否存在
const mine_info = (req, res, next) => {
  let data = req.query
  var sql = `SELECT * FROM \`login_information\` WHERE \`id\` = ${data.id}`;
  connection.query(sql, function (err, result) {
    if(err){
      res.json({
        code: 500,
        msg: err
      })
    } else {
      res.json({
        code: 0,
        msg: 'success',
        data: result[0]
      })
    }
  });
}

// 个人中心：更新保存个人中心详细信息
const update_mineInfo = (req, res, next) => {
  let data = req.body
  var addSql = `UPDATE \`login_information\` SET \`userPhone\` = '${data.userPhone}', \`age\` = '${data.age}', \`birthday\` = '${data.birthday}', \`gender\` = '${data.gender}', \`constellation\` = '${data.constellation}', \`address\` = '${data.address}', \`personalSignature\` = '${data.personalSignature}' WHERE \`login_information\`.\`id\` = ${data.id};`
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
  mine_info, update_mineInfo
}