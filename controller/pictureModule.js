const conn = require('../model/mySQL')

// 头像系列
const wallportrait_series = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql = `SELECT id, series_id, series_name, series_image FROM \`wallportrait_series\` WHERE \`series_id\` = '${data.series_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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

// 头像列表
const wallportrait_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`wallportrait_series\` WHERE \`id\` = '${data.id}'`
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

// 壁纸系列
const wallpaper_series = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql = `SELECT id, series_id, series_name, series_image FROM \`wallpaper_series\` WHERE \`series_id\` = '${data.series_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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
  let sql = `SELECT * FROM \`wallpaper_series\` WHERE \`id\` = '${data.id}'`
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

// 文案系列
const wallwriting_series = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql = `SELECT id, series_id, series_name, series_image FROM \`wallwriting_series\` WHERE \`series_id\` = '${data.series_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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

// 文案列表
const wallwriting_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`wallwriting_series\` WHERE \`id\` = '${data.id}'`
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

module.exports = {
  wallportrait_series, wallportrait_list, wallpaper_series, wallpaper_list, wallwriting_series, wallwriting_list
}