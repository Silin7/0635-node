/*
* @Description: 注册登录模块控制器层
* @Author: silin7
* @Date: 2021-08-26
*/

const checkToken = require('./systemModule/checkToken')
const mineDao = require('../model/dao/mineDao')

const db = require('../model/mySQL')

/**
 * 获取用户基本信息
 * @token true
 * @method GET
 */
const mine_info = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let author_id = req.headers.author_id
  await mineDao.mine_info(author_id).then(result => {
    res.json({
      code: 0,
      msg: 'success',
      data: result[0]
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 修改保存个人信息
 * @token true
 * @method POST
 * @param nick_name, gender, user_phone, birthday, age, constellation, address, personal_signature
 */
const update_mineInfo = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  let author_id = req.headers.author_id
  await mineDao.update_mineInfo(parameter, author_id).then(result => {
    res.json({
      code: 0,
      msg: 'success'
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

// 
/**
 * 我关注（marry）的人数量
 * @token true
 * @method GET
 */
const concerns_count = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let author_id = req.headers.author_id
  await mineDao.update_mineInfo(author_id).then(result => {
    res.json({
      code: 0,
      msg: 'success',
      data: result[0][`COUNT(*)`]
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 我关注（marry）的人列表
 * @token true
 * @method GET
 * @param page, limit
 */
const concerns_list = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let isNext = true
  let totalCount = 0
  let data = []
  await mineDao.concerns_count(author_id).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await mineDao.concerns_list(page, limit, author_id).then(result => {
    data = result
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
      data: data
    })
  }
}

/**
 * 是否关注了（marry）此用户
 * @token true
 * @method GET
 * @param watched_id
 */
const is_follow_users = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await mineDao.is_follow_users(parameter.watched_id, author_id).then(result => {
    let flag = result[0]["COUNT(*)"] === 0 ? false : true
    res.json({
      code: 0,
      msg: '操作成功',
      data: flag
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 关注（marry）此用户
 * @token true
 * @method GET
 * @param watched_id, nick_name, photo, introduce
 */
const follow_users = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await mineDao.follow_users(parameter, author_id).then(result => {
    res.json({
      code: 0,
      msg: '操作成功'
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

/**
 * 取消关注（marry）此用户
 * @token true
 * @method GET
 * @param watched_id
 */
const cancel_users = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await mineDao.cancel_users(parameter.watched_id, author_id).then(result => {
    res.json({
      code: 0,
      msg: '操作成功'
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

// 我关注(user)的人数量
const collection_count = async (req, res, next) => {
  let data = req.query
  let sql = `SELECT COUNT(*) FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}'`
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
        data: result[0][`COUNT(*)`]
      })
    }
  })
}

// 我的关注(user)列表
const collection_list = async (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}'`
  let sql2 = `SELECT * FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  db.query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      db.query(sql2, function (err2, result2) {
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

// 关注此(user)用户（0：收藏成功；1：已经关注收藏）
const follow_collection = async (req, res, next) => {
  let data = req.body
  let sql1 = `SELECT COUNT(*) FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}' AND \`user_id\` = '${data.user_id}'`
  let sql2 = 'INSERT INTO `relations_user` (`id`, `followers_id`, `user_id`, `user_name`, `user_info`, `user_image`) VALUES (NULL, ?, ?, ?, ?, ?)'
  let sqlParams = [data.followers_id, data.user_id, data.user_name, data.user_info, data.user_image]
  db.query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let count = result1[0][`COUNT(*)`]
      if (Number(count) > 0) {
        res.json({
          code: 0,
          msg: 'success',
          type: '1'
        })
      } else {
        db.query(sql2, sqlParams, function (err2, result2) {
          if(err2){
            res.json({
              code: 500,
              msg: err2
            })
          } else {
            res.json({
              code: 0,
              msg: 'success',
              type: '0'
            })
          }
        })
      }
    }
  })
}

// 取消关注(user)
const cancel_collection = async (req, res, next) => {
  let data = req.query
  let sql = `DELETE FROM \`relations_user\` WHERE \`followers_id\` = '${data.followers_id}' AND \`user_id\` = '${data.user_id}'`
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

// 我的动态列表
const my_dynamic_list = async (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`local_dynamic\` WHERE \`author_id\` = '${data.author_id}' AND \`is_pass\` = '${data.is_pass}'`
  let sql2 = `SELECT * FROM \`local_dynamic\` WHERE \`author_id\` = '${data.author_id}' AND \`is_pass\` = '${data.is_pass}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  db.query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      db.query(sql2, function (err2, result2) {
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

module.exports = {
  mine_info,
  update_mineInfo,
  concerns_count,
  concerns_list,
  is_follow_users,
  follow_users,
  cancel_users,
  collection_count,
  collection_list,
  follow_collection,
  cancel_collection,
  my_dynamic_list
}