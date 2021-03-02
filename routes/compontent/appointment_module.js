const conn = require('./mySQL')

// 线下活动列表
const appointment_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = (data.page) * data.limit
  let sql1 = `SELECT COUNT(*) FROM \`activity_appointment\` WHERE`
  let sql2 = `SELECT * FROM \`activity_appointment\` WHERE`
  let sponsor_gender = ` \`sponsor_gender\` = '${data.sponsor_gender}' AND`
  let appointment_type = ` \`appointment_type\` = '${data.appointment_type}' AND`
  let area_type = ` \`area_type\` = '${data.area_type}' AND`
  let is_pass = ` \`is_pass\` = '02'`
  let create_time = ` ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  if (data.sponsor_gender) {
    sql1 = sql1 + sponsor_gender
    sql2 = sql2 + sponsor_gender
  }
  if (data.appointment_type) {
    sql1 = sql1 + appointment_type
    sql2 = sql2 + appointment_type
  }
  if (data.area_type) {
    sql1 = sql1 + area_type
    sql2 = sql2 + area_type
  }
  sql1 = sql1 + is_pass
  sql2 = sql2 + is_pass + create_time
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
  let sql = `SELECT * FROM \`activity_appointment\` WHERE \`id\` = '${data.id}'`
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