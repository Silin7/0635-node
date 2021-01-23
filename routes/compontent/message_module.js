const conn = require('./mySQL')

// 私信消息列表
const permessage_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`message_personal\` WHERE \`receiver_id\` = '${data.receiver_id}' OR \`receiver_id\` is NULL`
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
  let sql = `SELECT * FROM \`message_personal\` WHERE \`id\` = '${data.id}'`
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

// 发私信（0：发送成功；1：已经发送过了）
const permessage_send = (req, res, next) => {
  let data = req.body
  let sql1 = `SELECT COUNT(*) FROM \`message_personal\` WHERE \`receiver_id\` = '${data.receiver_id}' AND \`sender_id\` = '${data.sender_id}' AND \`message_type\` = '${data.message_type}'`
  let sql2 = 'INSERT INTO `message_personal` (`id`, `receiver_id`, `sender_id`, `sender_name`, `sender_img`, `message_title`, `message_content`, `message_type`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)'
  let sqlParams = [data.receiver_id, data.sender_id, data.sender_name, data.sender_img, data.message_title, data.message_content, data.message_type]
  conn().query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let count = result1[0][`COUNT(*)`]
      if (Number(count) > 0) {
        res.json({
          code: 0,
          msg: 'success',
          type: '1'
        })
      } else {
        conn().query(sql2, sqlParams, function (err2, result2) {
          if(err2){
            res.json({
              code: 500,
              msg: err2
            })
          } else {
            res.json({
              code: 0,
              msg: 'success',
              type: '0'
            })
          }
        })
      }
    }
  })
}

// 系统消息列表
const sysmessage_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`message_system\` WHERE \`receiver_id\` = '${data.receiver_id}' OR \`receiver_id\` is NULL`
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
  let sql = `SELECT * FROM \`message_system\` WHERE \`id\` = '${data.id}'`
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
  permessage_list, permessage_details, permessage_send, sysmessage_list, sysmessage_details
}