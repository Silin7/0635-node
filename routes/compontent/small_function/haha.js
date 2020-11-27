// 随机头像
module.exports = (query, request) => {
  // console.log(`https://api.66mz8.com/api/rand.portrait.php?type=${query.type}`)
  return request(
    'POST',
    // `https://api.66mz8.com/api/rand.portrait.php?type=${query.type}`,
    `https://api.66mz8.com/api/rand.portrait.php?type=%E5%A5%B3`,
    {},
  )
}