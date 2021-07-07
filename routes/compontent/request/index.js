const request = require('request');
const queryString = require('querystring')

const createRequest = (method, url, data) => {
  //两个参数 resolve 异步执行成功的回调函数,reject异步执行失败的回调函数
  return new Promise((resolve, reject) => {
    const answer = { status: 500, body: {}}
    const settings = {
      method: method,
      url: url,
      body: queryString.stringify(data)
    }
    request(settings, (err, res, body) => {
      if (err) {
        answer.status = 502;
        answer.body = { code: 502, msg: err.stack};
        reject(answer);
      } else {
        answer.body = JSON.parse(body)
        answer.body = body
        answer.status = answer.body.code || res.statusCode
        answer.status = 100 < answer.status && answer.status < 600 ? answer.status : 400
        if (answer.status == 200) resolve(answer)
        else reject(answer)
      }
    })
  })
}
module.exports = createRequest