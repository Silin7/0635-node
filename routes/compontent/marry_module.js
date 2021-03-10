const conn = require('./mySQL')

// 相亲列表
const marry_list = (req, res, next) => {
  let sql1, sql2 = ''
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  if (data.is_top) {
    sql1 = `SELECT COUNT(*) FROM \`marry_register\` WHERE \`is_top\` = '${data.is_top}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`marry_register\` WHERE \`is_top\` = '${data.is_top}' AND \`is_pass\` = '02' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  }
  if (data.gender) {
    sql1 = `SELECT COUNT(*) FROM \`marry_register\` WHERE \`gender\` = '${data.gender}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`marry_register\` WHERE \`gender\` = '${data.gender}' AND \`is_pass\` = '02' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  }
  if (data.marry) {
    sql1 = `SELECT COUNT(*) FROM \`marry_register\` WHERE \`marry\` = '${data.marry}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`marry_register\` WHERE \`marry\` = '${data.marry}' AND \`is_pass\` = '02' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  }
  if (data.friends) {
    sql1 = `SELECT COUNT(*) FROM \`marry_register\` WHERE \`friends\` = '${data.friends}' AND \`is_pass\` = '02'`
    sql2 = `SELECT * FROM \`marry_register\` WHERE \`friends\` = '${data.friends}' AND \`is_pass\` = '02' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  }
  conn().query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      conn().query(sql2, function (err2, result2) {
        if(err2){
          res.json({
            code: 500,
            msg: err2
          })
        } else {
          res.json({
            code: 0,
            msg: 'success',
            page: data.page,
            limit: data.limit,
            totalCount: totalCount,
            data: result2
          })
        }
      })
    }
  })
}

// 相亲详情
const marry_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`marry_details\` WHERE \`register_id\` = ${data.register_id}`
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

// 是否报名参加相亲
const marry_issign = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`marry_sign\` WHERE \`register_id\` = '${data.register_id}' AND \`followers_id\` = '${data.followers_id}'`
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

// 报名参加相亲
const marry_sign = (req, res, next) => {
  let data = req.query
  let sql = `INSERT INTO \`marry_sign\` (\`id\`, \`register_id\`, \`followers_id\`) VALUES (NULL, '${data.register_id}', '${data.followers_id}');`
  conn().query(sql, function (err, result) {
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

module.exports = {
  marry_list, marry_details, marry_issign, marry_sign
}