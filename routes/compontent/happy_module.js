const conn = require('./mySQL')

// 段子列表
const story_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`save_unhappy\` WHERE \`type_id\` = '${data.type_id}'`
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
  story_list
}