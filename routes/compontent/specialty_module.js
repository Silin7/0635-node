const conn = require('./mySQL')

// 特产列表
const specialty_list = (req, res, next) => {
  let sql = `SELECT id, name, image FROM \`local_specialty\` WHERE 1`
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