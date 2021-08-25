/*
 * @Description: 景点模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-17
 */

const db = require('../mySQL')

module.exports = {
  // 景点列表数据条数
  scenicspot_total: async (position, name) => {
    let sql = 'SELECT COUNT(*) FROM `local_scenicspot`'
    let scenicspot_position = ` WHERE \`scenicspot_position\` = '${position}'`
    let scenicspot_name01 = ` AND \`scenicspot_name\` Like '%${name}%'`
    let scenicspot_name02 = ` WHERE \`scenicspot_name\` Like '%${name}%'`
    if (position && name) {
      sql = sql + scenicspot_position + scenicspot_name01
    } else if (position) {
      sql = sql + scenicspot_position
    } else if (name) {
      sql = sql + scenicspot_name02
    }
    return await db.query(sql)
  },
  // 景点列表数据
  scenicspot_list: async (page, limit, position, name) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = 'SELECT * FROM `local_scenicspot`'
    let scenicspot_position = ` WHERE \`scenicspot_position\` = '${position}'`
    let scenicspot_name01 = ` AND \`scenicspot_name\` Like '%${name}%'`
    let scenicspot_name02 = ` WHERE \`scenicspot_name\` Like '%${name}%'`
    let scenicspot_limit = ` LIMIT ${slimit},${elimit}`
    if (position && name) {
      sql = sql + scenicspot_position + scenicspot_name01
    } else if (position) {
      sql = sql + scenicspot_position
    } else if (name) {
      sql = sql + scenicspot_name02
    }
    sql = sql + scenicspot_limit
    return await db.query(sql)
  },
  
  // 景点详情
  scenicspot_info: async (id) => {
    let sql = `SELECT * FROM \`local_scenicspot\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },

  // 我关注的景点列表
  mine_scenicspot_list: async (followers_id) => {
    let sql = `SELECT * FROM \`relations_scenicspot\` WHERE \`followers_id\` = '${followers_id}' ORDER BY \`create_time\` DESC`
    return await db.query(sql)
  },

  // 是否关注此景点
  is_follow_scenicspot: async (followers_id, scenicspot_id) => {
    let sql = `SELECT COUNT(*) FROM \`relations_scenicspot\` WHERE \`followers_id\` = '${followers_id}' AND \`scenicspot_id\` = '${scenicspot_id}'`
    return await db.query(sql)
  },

  // 关注此景点
  follow_scenicspot: async (parameter) => {
    let sql = 'INSERT INTO `relations_scenicspot` (`id`, `followers_id`, `scenicspot_id`, `scenicspot_name`, `scenicspot_img`) VALUES (NULL, ?, ?, ?, ?)'
    let sqlParams = [parameter.followers_id, parameter.scenicspot_id, parameter.scenicspot_name, parameter.scenicspot_img]
    return await db.query(sql, sqlParams)
  },

  // 取消关注此景点
  cancel_scenicspot: async (followers_id, scenicspot_id) => {
    let sql = `DELETE FROM \`relations_scenicspot\` WHERE \`followers_id\` = '${followers_id}' AND \`scenicspot_id\` = '${scenicspot_id}'`
    return await db.query(sql)
  }
}
