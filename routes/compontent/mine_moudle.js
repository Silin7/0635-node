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

// 获取个人信息详情
const mine_info = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`personnel_information\` WHERE \`id\` = '${data.id}'`
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
  })
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
      return
    } else {
      res.json({
        code: 0,
        msg: 'success'
      })
    }
  })
}

// 我关注的人列表
const concerns_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`personnel_relations\` WHERE \`followers_id\` = '${data.followers_id}'`
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

// 是否关注此用户
const is_follow_users = (req, res, next) => {
  let data = req.body
  let sql = `SELECT * FROM \`personnel_relations\` WHERE \`followers_id\` = '${data.followers_id}' AND \`watched_id\` = '${data.watched_id}'`
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

// 关注此用户
const follow_users = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `personnel_relations` (`id`, `followers_id`, `watched_id`, `watched_nickName`, `watched_avatarUrl`, `watched_signature`) VALUES (NULL, ?, ?, ?, ?, ?)'
  let sqlParams = [data.followers_id, data.watched_id, data.watched_nickName, data.watched_avatarUrl, data.watched_signature]
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

// 取消关注此用户
const cancel_users = (req, res, next) => {
  let data = req.body
  let sql = `DELETE FROM \`personnel_relations\` WHERE \`followers_id\` = '${data.followers_id}' AND \`watched_id\` = '${data.watched_id}'`
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
  mine_info, update_mineInfo, concerns_list, is_follow_users, follow_users, cancel_users
}