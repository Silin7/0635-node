/*
 * @Description: 判断是否登录
 * @Author: silin7
 * @Date: 2021-08-27
 */

// 根据请求头里面是否有"author_id"判断是否登录
module.exports = function (parameter) {
  let isToken = parameter.author_id ? true : false
  if (!isToken) {
    return false;
  }
  return true;
}

