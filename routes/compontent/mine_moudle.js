var mysql = require('mysql');

var sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library'
};

var connection = mysql.createConnection(sqlConfig);

connection.connect();

// 获取个人信息（参数：id）
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

// 修改保存个人信息（参数：userPhone，age，birthday，gender，constellation，address，personalSignature）
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


connection.on('error',err=>{
  connection = mysql.createConnection(sqlConfig)
})

module.exports = {
  mine_info, update_mineInfo
}