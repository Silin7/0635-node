const conn = require('./mySQL')

// 头像系列
const wallportrait_series = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`wallportrait_series\` WHERE \`type_id\` = '${data.type_id}'`
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

// 头像列表
const wallportrait_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`wallportrait_list\` WHERE \`wallportrait_series\` = '${data.series_id}'`
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

module.exports = {
  wallportrait_series, wallportrait_list
}