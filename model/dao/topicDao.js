/*
 * @Description: 话题模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-17
 */

const db = require('../mySQL')

module.exports = {
  // 话题分类列表数据条数
  topic_class_total: async (state) => {
    let sql = `SELECT COUNT(*) FROM \`topic_class\` WHERE \`state\` = '${state}'`
    return await db.query(sql)
  },

  // 话题分类列表数据
  topic_class: async (page, limit, state) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT * FROM \`topic_class\` WHERE \`state\` = '${state}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },

  // 话题分类详情
  topic_class_details: async (id) => {
    let sql = `SELECT * FROM \`topic_class\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },
  
  // 话题列表数据条数
  topic_list_total: async (topic_class, is_pass) => {
    let sql = `SELECT COUNT(*) FROM \`topic_list\` WHERE \`topic_class\` = '${topic_class}' AND \`is_pass\` = '${is_pass}`
    return await db.query(sql)
  },

  // 话题列表数据
  topic_list: async (page, limit, topic_class, is_pass) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT id, topic_title, topic_img, create_time FROM \`topic_list\` WHERE \`topic_class\` = '${topic_class}' AND \`is_pass\` = '${is_pass} ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },

  // 话题详情
  topic_list_details: async (id) => {
    let sql = `SELECT * FROM \`topic_list\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },

}