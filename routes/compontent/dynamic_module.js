const conn = require('./mySQL')

// 动态列表
const dynamic_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`local_dynamic\` WHERE \`is_pass\` = '02'`
  let sql2 = `SELECT * FROM \`local_dynamic\` WHERE \`is_pass\` = '02' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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

// 动态详情
const dynamic_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_dynamic\` WHERE \`id\` = '${data.id}'`
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

// 删除动态
const cancel_dynamic = (req, res, next) => {
  let data = req.query
  let sql = `DELETE FROM \`local_dynamic\` WHERE \`id\` = '${data.id}' AND \`author_id\` = '${data.author_id}'`
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

// 写评论
const write_comment = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `local_comment` (`id`, `dynamic_id`, `comment_content`, `reviewer_id`, `reviewer_name`, `reviewer_image`) VALUES (NULL, ?, ?, ?, ?, ?)'
  let sqlParams = [data.dynamic_id, data.comment_content, data.reviewer_id, data.reviewer_name, data.reviewer_image]
  conn().query(sql, sqlParams, function (err, result) {
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
// 动态评论的列表
const comment_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`local_comment\` WHERE \`dynamic_id\` = '${data.dynamic_id}' AND \`is_pass\` = '02'`
  let sql2 = `SELECT * FROM \`local_comment\` WHERE \`dynamic_id\` = '${data.dynamic_id}' AND \`is_pass\` = '02' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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
  dynamic_list, dynamic_details, cancel_dynamic, write_comment, comment_list
}