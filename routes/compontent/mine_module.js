const conn = require('./mySQL')

// 获取个人信息详情
const mine_info = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`personnel_information\` WHERE \`id\` = '${data.id}'`
  conn().query(sql, function (err, result) {
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
  conn().query(sql, function (err, result) {
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

// 我关注的人数量
const concerns_count = (req, res, next) => {
  let data = req.query
  let sql = `SELECT COUNT(*) FROM \`relations_personnel\` WHERE \`followers_id\` = '${data.followers_id}'`
  conn().query(sql, function (err, result) {
    if(err){
      res.json({
        code: 500,
        msg: err
      })
    } else {
      res.json({
        code: 0,
        msg: 'success',
        data: result[0][`COUNT(*)`]
      })
    }
  })
}

// 我关注的人列表
const concerns_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`relations_personnel\` WHERE \`followers_id\` = '${data.followers_id}'`
  conn().query(sql, function (err, result) {
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

// 关注此用户（0：关注成功；1：已经关注过了）
const follow_users = (req, res, next) => {
  let data = req.body
  let sql1 = `SELECT COUNT(*) FROM \`relations_personnel\` WHERE \`followers_id\` = '${data.followers_id}' AND \`watched_id\` = '${data.watched_id}'`
  let sql2 = 'INSERT INTO `relations_personnel` (`id`, `followers_id`, `watched_id`, `nick_name`, `photo`, `introduce`) VALUES (NULL, ?, ?, ?, ?, ?)'
  let sqlParams = [data.followers_id, data.watched_id, data.nick_name, data.photo, data.introduce]
  conn().query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let count = result1[0][`COUNT(*)`]
      if (Number(count) > 0) {
        res.json({
          code: 0,
          msg: 'success',
          type: '1'
        })
      } else {
        conn().query(sql2, sqlParams, function (err2, result2) {
          if(err2){
            res.json({
              code: 500,
              msg: err2
            })
          } else {
            res.json({
              code: 0,
              msg: 'success',
              type: '0'
            })
          }
        })
      }
    }
  })
}

// 取消关注此用户
const cancel_users = (req, res, next) => {
  let data = req.query
  let sql = `DELETE FROM \`relations_personnel\` WHERE \`followers_id\` = '${data.followers_id}' AND \`watched_id\` = '${data.watched_id}'`
  conn().query(sql, function (err, result) {
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
  mine_info, update_mineInfo, concerns_count, concerns_list, follow_users, cancel_users
}