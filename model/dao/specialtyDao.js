/*
 * @Description: 特产模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-17
 */

const db = require('../mySQL')

module.exports = {
  // 特产列表数据条数
  specialty_total: async (position) => {
    let sql = 'SELECT COUNT(*) FROM `local_specialty`'
    let specialty_position = ` WHERE \`specialty_position\` = '${position}'`
    if (position) {
      sql += specialty_position
    }
    console.log(sql)
    return await db.query(sql)
  },

  // 特产列表数据
  specialty_list: async (page, limit, position) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = 'SELECT * FROM `local_specialty`'
    let specialty_position = ` WHERE \`specialty_position\` = '${position}'`
    let page_limit = ` LIMIT ${slimit},${elimit}`
    if (position) {
      sql += specialty_position
    }
    sql += page_limit
    return await db.query(sql)
  },

  // 特产详情
  specialty_details: async (id) => {
    let sql = `SELECT * FROM \`local_specialty\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },
}