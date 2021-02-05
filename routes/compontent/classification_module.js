const conn = require('./mySQL')

// 新闻类型列表
const classification_news = (req, res, next) => {
  let sql = `SELECT * FROM \`classification_news\` WHERE 1`
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
const classification_city = (req, res, next) => {
  let sql = `SELECT * FROM \`classification_city\` WHERE 1`
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
  classification_news, classification_city
}