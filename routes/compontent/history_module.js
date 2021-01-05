const conn = require('./mySQL')

// 动态列表
const historical_evolution = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`historical_evolution\` WHERE \`id\` = ${data.id}`
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
  historical_evolution
}