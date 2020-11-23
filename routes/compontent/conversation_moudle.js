var mysql = require('mysql');

var sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library'
};

var connection = mysql.createConnection(sqlConfig);

connection.connect();

// 话题列表
const conversation_list = (req, res, next) => {
  let data = req.query
  var sql = `SELECT * FROM \`conversation_list\` WHERE \`conversation_type\` = '${data.conversation_type}' AND \`conversation_date\` = '${data.conversation_date}' AND \`conversation_title\` = '${data.conversation_title}'`
  console.log(sql)
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

// 话题详情
const conversation_info = (req, res, next) => {
  let data = req.query
  var sql = `SELECT * FROM \`conversation_list\` WHERE \`id\` = '${data.id}'`
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
  conversation_list, conversation_info
}