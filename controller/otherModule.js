/*
* @Description: 其他模块控制器层
* @Author: silin7
* @Date: 2021-08-30
*/

const api = require('../model/other_api')
const request = require('../model/request')

/**
 * 随机获取美女福利图片
 * @token false
 * @method GET
 */
const girl_random = (req, res) => {
  let query = Object.assign({}, req.query, req.body)
  api.girl_random(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

module.exports = {
  girl_random
}