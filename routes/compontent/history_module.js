const conn = require('./mySQL')

// 县市历史详情
const local_historical = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_historical\` WHERE \`id\` = ${data.id}`
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
  local_historical
}