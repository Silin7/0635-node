/*
 * @Description: 新闻模块业务模型层
 * @Author: silin7
 * @Date: 2021-10-19
 */

const db = require('../mySQL')

module.exports = {
  // 新闻列表数据条数
  journalism_list_total: async (area, type, pass) => {
    let sql = `SELECT COUNT(*) FROM \`local_journalism\` WHERE`
    let journalism_area = ` \`journalism_area\` = '${area}' AND`
    let journalism_type = ` \`journalism_type\` = '${type}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    if (area) {
      sql += journalism_area
    }
    if (type) {
      sql += journalism_type
    }
    sql += is_pass
    return await db.query(sql)
  },

  // 新闻列表数据
  journalism_list: async (page, limit, area, type, pass) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT id, journalism_title, journalism_img, create_time FROM \`local_journalism\` WHERE`
    let journalism_area = ` \`journalism_area\` = '${area}' AND`
    let journalism_type = ` \`journalism_type\` = '${type}' AND`
    let is_pass = ` \`is_pass\` = '${pass}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    if (area) {
      sql += journalism_area
    }
    if (type) {
      sql += journalism_type
    }
    sql += is_pass
    return await db.query(sql)
  },

  // 新闻详情
  journalism_details: async (id) => {
    let sql = `SELECT * FROM \`local_journalism\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  }
}