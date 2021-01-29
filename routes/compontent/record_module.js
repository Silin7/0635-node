const conn = require('./mySQL')

// 日记列表
const record_diary = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`record_diary\` WHERE \`user_id\` = '${data.user_id}' ORDER BY \`record_diary\`.\`create_time\` DESC`
	console.log(sql)
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

// 日记详情
const diary_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`record_diary\` WHERE \`id\` = ${data.id}`
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

// 写日记
const keep_diary = (req, res, next) => {
  let data = req.body
  let sql = `INSERT INTO \`record_diary\` (\`id\`, \`user_id\`, \`diary_date\`, \`diary_weather\`, \`diary_content\`) VALUES (NULL, '${data.user_id}', '${data.diary_date}', '${data.diary_weather}', '${data.diary_content}');`
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

// 删除日记
const delete_diary = (req, res, next) => {
  let data = req.query
  let sql = `DELETE FROM \`record_diary\` WHERE \`record_diary\`.\`id\` = ${data.id}`
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
  record_diary, diary_details, keep_diary, delete_diary
}