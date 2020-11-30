const api = require('./otherModules')
const request = require('./otherModules/request')

//历史上的今天
const history_today = (req, res) => {
  let query = Object.assign({}, req.query, req.body)
  api.history_today(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

//获取特定城市今日天气信息
const weather_current = (req, res) => {
  let query = Object.assign({}, req.query, req.body)
  query.position = encodeURI(query.position)
  api.weather_current(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

//获取特定城市今天及未来天气信息
const weather_forecast = (req, res) => {
  let query = Object.assign({}, req.query, req.body)
  query.position = encodeURI(query.position)
  api.weather_forecast(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

//获取所有新闻类型列表
const news_types = (req, res) => {
  let query = Object.assign({}, req.query, req.body)
  api.news_types(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

//根据新闻类型获取新闻列表
const news_list = (req, res) => {
  let query = Object.assign({}, req.query, req.body)
  api.news_list(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

//根据新闻id获取新闻详情
const news_details = (req, res) => {
  let query = Object.assign({}, req.query, req.body)
  api.news_details(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

module.exports = {
  history_today, weather_current, weather_forecast, news_types, news_list, news_details
}