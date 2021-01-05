const conn = require('./mySQL')

// 新闻类型列表
const admin_news_type = (req, res, next) => {
  let sql = `SELECT * FROM \`admin_news_type\` WHERE 1`
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
// 县市类型列表
const admin_city_type = (req, res, next) => {
  let sql = `SELECT * FROM \`admin_city_type\` WHERE 1`
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
  admin_news_type, admin_city_type
}