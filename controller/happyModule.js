/*
* @Description: 拯救不开心模块控制器层
* @Author: silin7
* @Date: 2021-08-26
*/

const happyDao = require('../model/dao/happyDao')

/**
 * 段子列表
 * @token false
 * @method GET
 * @param type_id
 */
const entertainment_list = async (req, res, next) => {
  let parameter = req.query
  await happyDao.entertainment_list(parameter.type_id).then(result => {
    res.json({
      code: 0,
      msg: 'success',
      data: result
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

module.exports = {
  entertainment_list
}