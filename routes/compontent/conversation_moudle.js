var mysql = require('mysql');

var sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library'
};

var connection = mysql.createConnection(sqlConfig);

connection.connect();

connection.on('error',err => {
  connection = mysql.createConnection(sqlConfig)
})

// 话题列表
const conversation_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`conversation_list\` WHERE 1`
  let conversation_type = ` AND \`conversation_type\` = '${data.conversation_type}'`
  let conversation_date = ` AND \`conversation_date\` = '${data.conversation_date}'`
  let conversation_title = ` AND \`conversation_title\` Like '%${data.conversation_title}%'`
  if (data.conversation_type) {
    sql = sql + conversation_type
  }
  if (data.conversation_date) {
    sql = sql + conversation_date
  }
  if (data.conversation_title) {
    sql = sql + conversation_title
  }
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
  })
}

// 话题详情
const conversation_info = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`conversation_list\` WHERE \`id\` = '${data.id}'`
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
  })
}

// 我关注的话题列表
const mine_conversation_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`conversation_relations\` WHERE \`followers_id\` = '${data.followers_id}'`
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
  })
}

// 是否关注此话题
const is_follow_conversation = (req, res, next) => {
  let data = req.body
  let sql = `SELECT * FROM \`conversation_relations\` WHERE \`followers_id\` = '${data.followers_id}' AND \`conversation_id\` = '${data.conversation_id}'`
  connection.query(sql, function (err, result) {
    if(err){
      res.json({
        code: 500,
        msg: err
      })
    } else {
      if (result.length > 0) {
        res.json({
          code: 0,
          msg: 'success',
          type: '1'
        })
      } else {
        res.json({
          code: 0,
          msg: 'success',
          type: '0'
        })
      }
    }
  })
}

// 关注此话题
const follow_conversation = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `conversation_relations` (`id`, `followers_id`, `conversation_id`, `conversation_type`, `conversation_title`, `conversation_avatarUrl`, `conversation_date`) VALUES (NULL, ?, ?, ?, ?, ?, ?)'
  let sqlParams = [data.followers_id, data.conversation_id, data.conversation_type, data.conversation_title, data.conversation_avatarUrl, data.conversation_date]
  connection.query(sql, sqlParams, function (err, result) {
    if(err){
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

// 取消关注此话题
const cancel_conversation = (req, res, next) => {
  let data = req.body
  let sql = `DELETE FROM \`conversation_relations\` WHERE \`followers_id\` = '${data.followers_id}' AND \`conversation_id\` = '${data.conversation_id}'`
  connection.query(sql, function (err, result) {
    if(err){
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

module.exports = {
  conversation_list, conversation_info, mine_conversation_list, is_follow_conversation, follow_conversation, cancel_conversation
}