const conn = require('./mySQL')

// 特产列表
const specialty_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = (data.page) * data.limit
  let sql1 = 'SELECT COUNT(*) FROM `local_specialty`'
  let sql2 = `SELECT id, specialty_name, specialty_cover, specialty_position FROM \`local_specialty\` WHERE \`specialty_show\` = '01'`
  let specialty_position = ` AND \`specialty_position\` = '${data.specialty_position}'`
  let scenicspot_limit = ` LIMIT ${slimit},${elimit}`
  if (data.specialty_position && data.specialty_position !== '') {
    sql2 = sql2 + specialty_position + scenicspot_limit
  } else {
    sql2 = sql2 + scenicspot_limit
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

// 特产详情
const specialty_details = (req, res, next) => {
	let data = req.query
  let sql = `SELECT * FROM \`local_specialty\` WHERE \`id\` = '${data.id}'`
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
  specialty_list, specialty_details
}