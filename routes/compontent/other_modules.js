const request = require('./otherModules/index')
const history_today_api = require('./otherModules/history_today')

//历史上的今天
const history_today = (req, res) => {
  let query = Object.assign({}, req.query, req.body)
  history_today_api(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

module.exports = {
  history_today
}