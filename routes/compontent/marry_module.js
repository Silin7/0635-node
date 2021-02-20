const conn = require('./mySQL')

// 相亲列表
const marry_list = (req, res, next) => {
  let sql1, sql2 = ''
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = (data.page) * data.limit
  if (data.is_top) {
    sql1 = `SELECT COUNT(*) FROM \`blind_date_list\` WHERE \`is_top\` = '${data.is_top}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`blind_date_list\` WHERE \`is_top\` = '${data.is_top}' AND \`is_pass\` = '02' LIMIT ${slimit},${elimit}`
  }
  if (data.gender) {
    sql1 = `SELECT COUNT(*) FROM \`blind_date_list\` WHERE \`gender\` = '${data.gender}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`blind_date_list\` WHERE \`gender\` = '${data.gender}' AND \`is_pass\` = '02' LIMIT ${slimit},${elimit}`
  }
  if (data.marry) {
    sql1 = `SELECT COUNT(*) FROM \`blind_date_list\` WHERE \`marry\` = '${data.marry}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`blind_date_list\` WHERE \`marry\` = '${data.marry}' AND \`is_pass\` = '02' LIMIT ${slimit},${elimit}`
  }
  if (data.friends) {
    sql1 = `SELECT COUNT(*) FROM \`blind_date_list\` WHERE \`friends\` = '${data.friends}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`blind_date_list\` WHERE \`friends\` = '${data.friends}' AND \`is_pass\` = '02' LIMIT ${slimit},${elimit}`
  }
  // let sql1 = `SELECT COUNT(*) FROM \`blind_date_list\` WHERE \`gender\` = '${data.gender}' OR \`marry\` = '${data.marry}' OR \`friends\` = '${data.friends}' OR \`is_top\` = '${data.is_top}'`
  // let sql2 = `SELECT * FROM \`blind_date_list\` WHERE \`gender\` = '${data.gender}' OR \`marry\` = '${data.marry}' OR \`friends\` = '${data.friends}' OR \`is_top\` = '${data.is_top}' LIMIT ${slimit},${elimit}`
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