// 历史上的今天
const history_today = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/history/today?type=${query.type}&app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

// 获取特定城市今日天气信息
const weather_current = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/weather/current/${query.position}?app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

// 获取特定城市今天及未来天气信息
const weather_forecast = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/weather/forecast/${query.position}?app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

// 获取所有新闻类型列表
const news_types = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/news/types?app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

// 根据新闻类型获取新闻列表
const news_list = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/news/list?typeId=${query.typeId}&page=${query.page}&app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

// 根据新闻id获取新闻详情
const news_details = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/news/details?newsId=${query.newsId}&app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

// 文本多语种翻译
const translate = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/convert/translate?content=${query.content}&from=${query.from}&to=${query.to}&app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

module.exports = {
  history_today, weather_current, weather_forecast, news_types, news_list, translate
}