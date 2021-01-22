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

// 确认是否发过私信
const is_permessage = (req, res, next) => {
	let data = req.query
	let sql = `SELECT * FROM \`message_personal\` WHERE \`receiver_id\` = '${data.receiver_id}' AND \`sender_id\` = '${data.sender_id}' AND \`message_type\` = '${data.message_type}'`
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
			    type: '1'
			  })
			} else {
			  res.json({
			    code: 0,
			    msg: 'success',
			    type: '0'
			  })
			}
	  }
	})
}

// 发私信
const permessage_send =  (req, res, next) => {
  let data = req.body
	let sql = 'INSERT INTO `message_personal` (`id`, `receiver_id`, `sender_id`, `sender_name`, `sender_img`, `message_title`, `message_content`, `message_type`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)'
	let sqlParams = [data.receiver_id, data.sender_id, data.sender_name, data.sender_img, data.message_title, data.message_content, data.message_type]
	conn().query(sql, sqlParams, function (err, result) {
    if(err){
      res.json({
        code: 500,
        msg: err
      })
    } else {
      res.json({
        code: 0,
        msg: 'success'
      })
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
  permessage_list, permessage_details, is_permessage, permessage_send, sysmessage_list, sysmessage_details
}