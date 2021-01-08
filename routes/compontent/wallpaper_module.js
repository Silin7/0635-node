const conn = require('./mySQL')

// 壁纸分类
const wallpaper_type = (req, res, next) => {
  let sql = `SELECT * FROM \`wallpaper_type\` WHERE 1`
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

// 壁纸列表
const wallpaper_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`wallpaper_list\` WHERE \`wallpaper_type\` = '${data.type_id}' `
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
  wallpaper_type, wallpaper_list
}