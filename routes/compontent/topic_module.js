const conn = require('./mySQL')

// 话题分类列表
const topic_class = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`topic_class\` WHERE \`state\` = '${data.state}' ORDER BY \`create_time\` DESC`
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

module.exports = {
  topic_class, topic_class_details
}