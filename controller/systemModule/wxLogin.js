/*
 * @Description: 登录凭证校验
 * @Author: silin7
 * @Date: 2021-08-27
 */

const api = require('../../model/system_api')
const request = require('../../model/request')

// 登录凭证校验
const wx_login = (req, res) => {
  let query = Object.assign({}, req.query, req.body)
  api.wx_login(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

module.exports = {
  wx_login
}