var mysql = require('mysql');

var sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library'
};

var connection = mysql.createConnection(sqlConfig);

connection.connect();

connection.on('error',err => {
  connection = mysql.createConnection(sqlConfig)
})

// 景点列表
const scenicspot_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`scenicspot_list\` WHERE 1`
  let scenicSpot_name = ` AND \`scenicSpot_name\` Like '%${data.scenicSpot_name}%'`
  let scenicSpot_type = ` AND \`scenicSpot_type\` = '${data.scenicSpot_type}'`
  let scenicSpot_place = ` AND \`scenicSpot_place\` Like '%${data.scenicSpot_place}%'`
    if (data.scenicSpot_name) {
    sql = sql + scenicSpot_name
  }
  if (data.scenicSpot_type) {
    sql = sql + scenicSpot_type
  }
  if (data.scenicSpot_place) {
    sql = sql + scenicSpot_place
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

// 是否关注此景点
const is_follow_scenicspot = (req, res, next) => {
  let data = req.body
  let sql = `SELECT * FROM \`scenicspot_relations\` WHERE \`followers_id\` = '${data.followers_id}' AND \`scenicSpot_id\` = '${data.scenicSpot_id}'`
  connection.query(sql, function (err, result) {
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
  console.log(sql)
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

module.exports = {
  scenicspot_list, scenicspot_info, mine_scenicspot_list, is_follow_scenicspot, follow_scenicspot, cancel_scenicspot
}
