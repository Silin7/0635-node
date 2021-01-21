const conn = require('./mySQL')

// 相亲列表
const marry_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`blind_date_list\` WHERE \`gender\` = '${data.gender}' OR \`marry\` = '${data.marry}' OR \`is_top\` = '${data.is_top}'`
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

// 相亲详情
const marry_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`blind_date_bank\` WHERE \`user_id\` = ${data.user_id}`
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
  marry_list, marry_details
}