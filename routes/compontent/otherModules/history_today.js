// 历史上的今天
module.exports = (query, request) => {
  return request(
    'GET',
    `https://www.mxnzp.com/api/history/today?type=${query.type}&app_id=rtqbawfrwfapaxrq&app_secret=R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09`,
    {},
  )
}