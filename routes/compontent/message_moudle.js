const conn = require('./mySQL')

// 消息列表
const message_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`system_message_list\` WHERE \`receiver_id\` = '${data.receiver_id}' OR \`receiver_id\` is NULL`
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

// 消息详情
const message_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`system_message_list\` WHERE \`id\` = '${data.id}'`
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
  message_list, message_details
}