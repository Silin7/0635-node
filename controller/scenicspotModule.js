const db = require('../model/mySQL')
const scenicspotModel = require('../model/scenicspotModel');

// 景点列表
const scenicspot_list = async (req, res, next) => {
  // let data = req.query
  // let slimit = (data.page - 1) * data.limit
  // let elimit = data.limit
  // let sql1 = 'SELECT * FROM `local_scenicspot`'
  // let sql2 = 'SELECT COUNT(*) FROM `local_scenicspot`'
  // let scenicspot_position = ` WHERE \`scenicspot_position\` = '${data.scenicspot_position}'`
  // let scenicspot_name = ` AND \`scenicspot_name\` Like '%${data.scenicspot_name}%'`
  // let scenicspot_limit = ` LIMIT ${slimit},${elimit}`
  // if (data.scenicspot_position) {
  //   sql1 = sql1 + scenicspot_position
  //   sql2 = sql2 + `WHERE \`scenicspot_position\` = '${data.scenicspot_position}'`
  // }
  // if (data.scenicspot_name) {
  //   sql1 = sql1 + scenicspot_name
  // }
  // sql1 = sql1 + scenicspot_limit
  // db.query(sql2, function (err1, result1) {
  //   if(err1){
  //     res.json({
  //       code: 500,
  //       msg: err1
  //     })
  //   } else {
  //     let totalCount = result1[0][`COUNT(*)`]
  //     db.query(sql1, function (err2, result2) {
  //       if(err2){
  //         res.json({
  //           code: 500,
  //           msg: err2
  //         })
  //       } else {
  //         res.json({
  //           code: 0,
  //           msg: 'success',
  //           page: data.page,
  //           limit: data.limit,
  //           totalCount: totalCount,
  //           data: result2
  //         })
  //       }
  //     })
  //   }
  // })
  let page = req.query.page ? req.query.page : 1
  let limit = req.query.limit ? req.query.limit : 10
  let scenicspot_name = req.query.scenicspot_name ? req.query.scenicspot_name : ''
  let scenicspot_position = req.query.scenicspot_position ? req.query.scenicspot_position : ''
  let tempCollect = await scenicspotModel.scenicspot_list(page, limit, scenicspot_position, scenicspot_name);
  console.log('tempCollect--------------------->', tempCollect)
}

// 景点详情
const scenicspot_info = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_scenicspot\` WHERE \`id\` = '${data.id}'`
  db.query(sql, function (err, result) {
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

// 我关注的景点列表
const mine_scenicspot_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`relations_scenicspot\` WHERE \`followers_id\` = '${data.followers_id}' ORDER BY \`create_time\` DESC`
  db.query(sql, function (err, result) {
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
  let sql = `SELECT * FROM \`relations_scenicspot\` WHERE \`scenicspot_id\` = '${data.scenicspot_id}' AND \`followers_id\` = '${data.followers_id}'`
  db.query(sql, function (err, result) {
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
  let sql = 'INSERT INTO `relations_scenicspot` (`id`, `followers_id`, `scenicspot_id`, `scenicspot_name`, `scenicspot_img`) VALUES (NULL, ?, ?, ?, ?)'
  let sqlParams = [data.followers_id, data.scenicspot_id, data.scenicspot_name, data.scenicspot_img]
  db.query(sql, sqlParams, function (err, result) {
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
  let sql = `DELETE FROM \`relations_scenicspot\` WHERE \`followers_id\` = '${data.followers_id}' AND \`scenicspot_id\` = '${data.scenicspot_id}'`
  console.log(sql)
  db.query(sql, function (err, result) {
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
