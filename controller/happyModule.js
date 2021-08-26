/*
* @Description: 拯救不开心模块控制器层
* @Author: silin7
* @Date: 2021-08-26
*/

const happyModel = require('../model/component/happyModel')

// 段子列表
const entertainment_list = async (req, res, next) => {
  let parameter = req.query
  await happyModel.entertainment_list(parameter.type_id).then(result => {
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