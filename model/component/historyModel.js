/*
 * @Description: 历史模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-26
 */

const db = require('../mySQL')

module.exports = {
  // 县市历史详情
  local_historical: async (city_id) => {
    let sql = `SELECT * FROM \`local_historical\` WHERE \`city_id\` = ${city_id}`
    return await db.query(sql)
  }
}