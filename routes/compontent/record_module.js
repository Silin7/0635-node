const conn = require('./mySQL')

// 日记列表
const diary_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`diary_module\` WHERE \`user_id\` = '${data.user_id}' ORDER BY \`diary_module\`.\`creat_time\` DESC`
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
  let sql = `SELECT * FROM \`diary_module\` WHERE \`id\` = ${data.id}`
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
  let sql = `INSERT INTO \`diary_module\` (\`id\`, \`user_id\`, \`diary_date\`, \`diary_weather\`, \`diary_content\`) VALUES (NULL, '${data.user_id}', '${data.diary_date}', '${data.diary_weather}', '${data.diary_content}');`
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
  let sql = `DELETE FROM \`diary_module\` WHERE \`diary_module\`.\`id\` = ${data.id}`
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
  diary_list, diary_details, keep_diary, delete_diary
}