/*
 * @Description: 拯救不开心模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-26
 */

const db = require('../mySQL')

module.exports = {
  // 段子列表
  entertainment_list: async (type_id) => {
    let sql = `SELECT * FROM \`entertainment_list\` WHERE \`type_id\` = '${type_id}'`
    return await db.query(sql)
  }
}