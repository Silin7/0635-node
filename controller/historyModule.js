/*
* @Description: 历史模块控制器层
* @Author: silin7
* @Date: 2021-08-26
*/

const historyDao = require('../model/dao/historyDao')

// 县市历史详情
const local_historical = async (req, res, next) => {
  let parameter = req.query
  await historyDao.local_historical(parameter.city_id).then(result => {
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

module.exports = {
  local_historical
}