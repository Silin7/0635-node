// 历史上的今天
const history_today = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/history/today?type=${query.type}&app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

// 随机淘宝买家秀 // Token=oGEubKhhx4dWY7TPn3KRbBi3
const taobao_mjxiu = (query, request) => {
  return request(
    'GET',
    `https://api.sumt.cn/api/rand.tbimg.php?token=oGEubKhhx4dWY7TPn3KRbBi3&format=json`,
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

// 随机获取笑话段子列表
const jokes_random = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/jokes/list/random?app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
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

// 随机获取美女福利图片
const girl_random = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/image/girl/list/random?app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
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

// 垃圾分类查询
const rubbish = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/rubbish/type?name=${query.name}&app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

// 手机号码归属地查询
const aim_mobile = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/mobile_location/aim_mobile?mobile=${query.mobile}&app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}

// 精神小伙社会语录
const jsxh_quotations = (query, request) => {
  return request(
    'GET',
    `https://api.66mz8.com/api/social.php?format=json`,
    {},
  )
}

module.exports = {
  history_today,
  taobao_mjxiu,
  weather_current,
  weather_forecast,
  jokes_random,
  news_types,
  news_list,
  news_details,
  girl_random,
  translate,
  rubbish,
  aim_mobile,
  jsxh_quotations
}