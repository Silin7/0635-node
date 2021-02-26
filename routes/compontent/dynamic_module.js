const conn = require('./mySQL')

// 动态列表
const dynamic_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = (data.page) * data.limit
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

// 广告详情
const advertisement_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_advertisement\` WHERE \`id\` = '${data.id}'`
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
  dynamic_list, advertisement_details
}