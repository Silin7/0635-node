const conn = require('./mySQL')

// 县市新闻列表
const dynamic_news_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT B.* FROM admin_city_type A INNER JOIN news_module B ON A.type_id = B.type_id WHERE A.type_id = '${data.type_id}'`
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

// 县市新闻详情
const dynamic_news_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`news_module\` WHERE \`id\` = '${data.id}'`
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

// 动态列表
const dynamic_list = (req, res, next) => {
  let sql = `SELECT * FROM \`square_dynamic_list\` WHERE 1`
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

// 动态详情
const dynamic_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`square_dynamic_list\` WHERE \`id\` = '${data.id}'`
  conn().query(sql, function (err, result) {
    if(err){
      res.json({
        code: 500,
        msg: err
      })
    } else {
      if (result.length > 0) {
        res.json({
          code: 0,
          msg: 'success',
          data: result[0]
        })
      } else {
        res.json({
          code: 404,
          msg: '消息为空'
        })
      }
      
    }
  })
}

module.exports = {
  dynamic_news_list, dynamic_news_details, dynamic_list, dynamic_details
}