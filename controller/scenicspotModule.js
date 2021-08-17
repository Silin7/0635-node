const db = require('../model/mySQL')
const scenicspotModel = require('../model/component/scenicspotModel');

// 景点列表
const scenicspot_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let scenicspot_name = parameter.scenicspot_name ? parameter.scenicspot_name : ''
  let scenicspot_position = parameter.scenicspot_position ? parameter.scenicspot_position : ''
  let isNext = true
  let totalCount = 0
  let result = []
  await scenicspotModel.scenicspot_total(scenicspot_position, scenicspot_name).then(res => {
    totalCount = res[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await scenicspotModel.scenicspot_list(page, limit, scenicspot_position, scenicspot_name).then(res => {
    result = res
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  if (isNext) {
    res.json({
      code: 0,
      msg: 'success',
      page: page,
      limit: limit,
      totalCount: totalCount,
      data: result
    })
  }
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
