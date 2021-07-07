const api = require('./other_api')
const request = require('./request')

// 随机获取美女福利图片
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