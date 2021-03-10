const conn = require('./mySQL')

// 新闻列表
const journalism_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`local_journalism\` WHERE \`journalism_type\` = '${data.type}'`
  let sql2 = `SELECT id, journalism_title, journalism_img, create_time FROM \`local_journalism\` WHERE \`journalism_type\` = '${data.type}'`
  let journalism_area = ` AND \`journalism_area\` = '${data.area}'`
  let journalism_class = ` AND \`journalism_class\` = '${data.class}'`
  let create_time = ` ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  if (data.area) {
    sql1 = sql1 + journalism_area
    sql2 = sql2 + journalism_area + create_time
  }
  if (data.class) {
    sql1 = sql1 + journalism_class
    sql2 = sql2 + journalism_class + create_time
  }
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

// 新闻详情
const journalism_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_journalism\` WHERE \`id\` = '${data.id}'`
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
  journalism_list, journalism_details
}