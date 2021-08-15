const conn = require('../model/mySQL')

// 话题分类列表
const topic_class = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`topic_class\` WHERE \`state\` = '${data.state}'`
  let sql2 = `SELECT * FROM \`topic_class\` WHERE \`state\` = '${data.state}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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

// 话题分类详情
const topic_class_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`topic_class\` WHERE \`id\` = '${data.id}'`
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

// 话题列表
const topic_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`topic_list\` WHERE \`topic_class\` = '${data.topic_class}' AND \`is_pass\` = '${data.is_pass}'`
  let sql2 = `SELECT id, topic_title, topic_img, create_time FROM \`topic_list\` WHERE \`topic_class\` = '${data.topic_class}' AND \`is_pass\` = '${data.is_pass}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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

// 话题详情
const topic_list_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`topic_list\` WHERE \`id\` = '${data.id}'`
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

module.exports = {
  topic_class, topic_class_details, topic_list, topic_list_details
}