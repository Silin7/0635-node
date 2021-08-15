const conn = require('../model/mySQL')

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
  let sql = `UPDATE \`personnel_information\` SET \`nick_name\` = '${data.nick_name}', \`gender\` = '${data.gender}', \`user_phone\` = '${data.user_phone}', \`birthday\` = '${data.birthday}', \`age\` = '${data.age}', \`constellation\` = '${data.constellation}', \`address\` = '${data.address}', \`personal_signature\` = '${data.personal_signature}' WHERE \`personnel_information\`.\`id\` = '${data.id}'`
  conn().query(sql, function (err, result) {
    if (err) {
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

// 我关注（marry）的人数量
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

// 我关注（marry）的人列表
const concerns_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`relations_personnel\` WHERE \`followers_id\` = '${data.followers_id}'`
  let sql2 = `SELECT * FROM \`relations_personnel\` WHERE \`followers_id\` = '${data.followers_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  conn().query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      conn().query(sql2, function (err2, result2) {
        if(err2){
          res.json({
            code: 500,
            msg: err2
          })
        } else {
          res.json({
            code: 0,
            msg: 'success',
            page: data.page,
            limit: data.limit,
            totalCount: totalCount,
            data: result2
          })
        }
      })
    }
  })
}

// 关注（marry）此用户（0：关注成功；1：已经关注过了）
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

// 取消关注（marry）此用户
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

// 我关注(user)的人数量
const collection_count = (req, res, next) => {
  let data = req.query
  let sql = `SELECT COUNT(*) FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}'`
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

// 我的关注(user)列表
const collection_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}'`
  let sql2 = `SELECT * FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  conn().query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      conn().query(sql2, function (err2, result2) {
        if(err2){
          res.json({
            code: 500,
            msg: err2
          })
        } else {
          res.json({
            code: 0,
            msg: 'success',
            page: data.page,
            limit: data.limit,
            totalCount: totalCount,
            data: result2
          })
        }
      })
    }
  })
}

// 关注此(user)用户（0：收藏成功；1：已经关注收藏）
const follow_collection = (req, res, next) => {
  let data = req.body
  let sql1 = `SELECT COUNT(*) FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}' AND \`user_id\` = '${data.user_id}'`
  let sql2 = 'INSERT INTO `relations_user` (`id`, `followers_id`, `user_id`, `user_name`, `user_info`, `user_image`) VALUES (NULL, ?, ?, ?, ?, ?)'
  let sqlParams = [data.followers_id, data.user_id, data.user_name, data.user_info, data.user_image]
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

// 取消关注(user)
const cancel_collection = (req, res, next) => {
  let data = req.query
  let sql = `DELETE FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}' AND \`user_id\` = '${data.user_id}'`
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

// 我的动态列表
const my_dynamic_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`local_dynamic\` WHERE \`author_id\` = '${data.author_id}' AND \`is_pass\` = '${data.is_pass}'`
  let sql2 = `SELECT * FROM \`local_dynamic\` WHERE \`author_id\` = '${data.author_id}' AND \`is_pass\` = '${data.is_pass}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  conn().query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      conn().query(sql2, function (err2, result2) {
        if(err2){
          res.json({
            code: 500,
            msg: err2
          })
        } else {
          res.json({
            code: 0,
            msg: 'success',
            page: data.page,
            limit: data.limit,
            totalCount: totalCount,
            data: result2
          })
        }
      })
    }
  })
}

module.exports = {
  mine_info, update_mineInfo, concerns_count, concerns_list, follow_users, cancel_users, collection_count, collection_list, follow_collection, cancel_collection, my_dynamic_list
}