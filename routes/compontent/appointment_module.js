const conn = require('./mySQL')

// 约会列表
const appointment_list = (req, res, next) => {
  let sql1, sql2 = ''
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = (data.page) * data.limit
  if (data.sponsor_gender) {
    sql1 = `SELECT COUNT(*) FROM \`appointment\` WHERE \`sponsor_gender\` = '${data.sponsor_gender}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`appointment\` WHERE \`sponsor_gender\` = '${data.sponsor_gender}' AND \`is_pass\` = '02' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  }
  if (data.appointment_type) {
    sql1 = `SELECT COUNT(*) FROM \`appointment\` WHERE \`appointment_type\` = '${data.appointment_type}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`appointment\` WHERE \`appointment_type\` = '${data.appointment_type}' AND \`is_pass\` = '02' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  }
  if (data.appointment_pay) {
    sql1 = `SELECT COUNT(*) FROM \`appointment\` WHERE \`appointment_pay\` = '${data.appointment_pay}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`appointment\` WHERE \`appointment_pay\` = '${data.appointment_pay}' AND \`is_pass\` = '02' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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

// 约会详情
const appointment_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`appointment\` WHERE \`id\` = '${data.id}'`
  console.log(sql)
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
  appointment_list, appointment_details
}