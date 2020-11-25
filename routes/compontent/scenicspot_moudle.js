var mysql = require('mysql');

var sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library'
};

var connection = mysql.createConnection(sqlConfig);

connection.connect();

// 景点列表
const scenicspot_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`scenicspot_list\` WHERE 1`
  let scenicspot_type = ` AND \`scenicSpot_name\` Like '%${data.scenicSpot_name}%'`
  let scenicspot_date = ` AND \`scenicSpot_type\` = '${data.scenicSpot_type}'`
  let scenicspot_title = ` AND \`scenicSpot_place\` Like '%${data.scenicSpot_place}%'`
  if (data.scenicspot_type) {
    sql = sql + scenicspot_type
  }
  if (data.scenicspot_date) {
    sql = sql + scenicspot_date
  }
  if (data.scenicspot_title) {
    sql = sql + scenicspot_title
  }
  connection.query(sql, function (err, result) {
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

// 景点详情
const scenicspot_info = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`scenicspot_list\` WHERE \`id\` = '${data.id}'`
  connection.query(sql, function (err, result) {
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

// 我关注的景点列表
const mine_scenicspot_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`scenicspot_relations\` WHERE \`followers_id\` = '${data.followers_id}'`
  connection.query(sql, function (err, result) {
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

// 关注此景点
const follow_scenicspot = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `scenicspot_relations` (`id`, `followers_id`, `scenicSpot_id`, `scenicSpot_name`, `scenicSpot_img`) VALUES (NULL, ?, ?, ?, ?)'
  let sqlParams = [data.followers_id, data.scenicSpot_id, data.scenicSpot_name, data.scenicSpot_img]
  connection.query(sql, sqlParams, function (err, result) {
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

// 取消关注此景点
const cancel_scenicspot = (req, res, next) => {
  let data = req.body
  let sql = `DELETE FROM \`scenicspot_relations\` WHERE \`followers_id\` = '${data.followers_id}' AND \`scenicSpot_id\` = '${data.scenicSpot_id}'`
  connection.query(sql, function (err, result) {
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

connection.on('error',err => {
  connection = mysql.createConnection(sqlConfig)
})

module.exports = {
  scenicspot_list, scenicspot_info, mine_scenicspot_list, follow_scenicspot, cancel_scenicspot
}