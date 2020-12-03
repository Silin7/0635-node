const conn = require('./mySQL')

// 私信消息列表
const permessage_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`personal_message_list\` WHERE \`receiver_id\` = '${data.receiver_id}' OR \`receiver_id\` is NULL`
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

// 私信消息详情
const permessage_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`personal_message_list\` WHERE \`id\` = '${data.id}'`
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

// 系统消息列表
const sysmessage_list = (req, res, next) => {
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

// 系统消息详情
const sysmessage_details = (req, res, next) => {
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
  permessage_list, permessage_details, sysmessage_list, sysmessage_details
}