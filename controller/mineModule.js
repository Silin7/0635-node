/*
* @Description: 注册登录模块控制器层
* @Author: silin7
* @Date: 2021-08-26
*/

const checkToken = require('./systemModule/checkToken')
const mineDao = require('../model/dao/mineDao')

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
 * 修改保存用户基本信息
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

/**
 * 我喜欢的用户数量
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
  await mineDao.concerns_count(author_id).then(result => {
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
 * 我喜欢的用户列表
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
 * 是否喜欢了此用户
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
 * 喜欢此用户
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
  let parameter = req.body
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
 * 取消喜欢此用户
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

/**
 * 我关注的用户数量
 * @token true
 * @method GET
 */
const collection_count = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let author_id = req.headers.author_id
  await mineDao.collection_count(author_id).then(result => {
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
 * 我喜欢的用户列表
 * @token true
 * @method GET
 * @param page, limit
 */
const collection_list = async (req, res, next) => {
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
  await mineDao.collection_count(author_id).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await mineDao.collection_list(page, limit, author_id).then(result => {
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
 * 是否关注了此用户
 * @token true
 * @method GET
 * @param watched_id
 */
const is_follow_collection = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await mineDao.is_follow_collection(parameter.watched_id, author_id).then(result => {
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
 * 关注此用户
 * @token true
 * @method GET
 * @param watched_id, nick_name, photo, introduce
 */
const follow_collection = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.body
  let author_id = req.headers.author_id
  await mineDao.follow_collection(parameter, author_id).then(result => {
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
 * 取消关注此用户
 * @token true
 * @method GET
 * @param watched_id
 */
const cancel_collection = async (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let parameter = req.query
  let author_id = req.headers.author_id
  await mineDao.cancel_collection(parameter.watched_id, author_id).then(result => {
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
 * 我的动态列表
 * @token true
 * @method GET
 * @param page, limit, is_pass
 */
const my_dynamic_list = async (req, res, next) => {
  let parameter = req.query
  let author_id = req.headers.author_id
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await mineDao.my_dynamic_count(author_id, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await mineDao.my_dynamic_list(page, limit, author_id, is_pass).then(result => {
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
  is_follow_collection,
  follow_collection,
  cancel_collection,
  my_dynamic_list
}