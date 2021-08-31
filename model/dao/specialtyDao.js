/*
 * @Description: 特产模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-17
 */

const db = require('../mySQL')

module.exports = {
  // 特产列表数据条数
  specialty_total: async (position) => {
    let sql = `SELECT COUNT(*) FROM \`local_specialty\` WHERE \`specialty_position\` = '${position}'`
    return await db.query(sql)
  },

  // 特产列表数据
  specialty_list: async (page, limit, position) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT * FROM \`local_specialty\` WHERE \`specialty_position\` = '${position}' LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },

  // 特产详情
  specialty_details: async (id) => {
    let sql = `SELECT * FROM \`local_specialty\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },
}