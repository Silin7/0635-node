var mysql = require('mysql');

var sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library'
};

var connection = mysql.createConnection(sqlConfig);

connection.connect();

// 获取个人信息详情
const mine_info = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`personnel_information\` WHERE \`id\` = '${data.id}'`;
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

// 修改保存个人信息
const update_mineInfo = (req, res, next) => {
  let data = req.body
  let sql = `UPDATE \`personnel_information\` SET \`userPhone\` = '${data.userPhone}', \`birthday\` = '${data.birthday}', \`age\` = '${data.age}', \`constellation\` = '${data.constellation}', \`address\` = '${data.address}', \`personalSignature\` = '${data.personalSignature}' WHERE \`personnel_information\`.\`id\` = '${data.id}'`
  connection.query(sql, function (err, result) {
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

// 我关注的人列表
const concerns_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`personnel_relations\` WHERE \`followers_id\` = '${data.followers_id}'`;
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
        data: result
      })
    }
  });
}

// 我关注的话题列表
const conversation_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`conversation_relations\` WHERE \`followers_id\` = '${data.followers_id}'`;
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
        data: result
      })
    }
  });
}

connection.on('error',err => {
  connection = mysql.createConnection(sqlConfig)
})

module.exports = {
  mine_info, update_mineInfo, concerns_list, conversation_list
}