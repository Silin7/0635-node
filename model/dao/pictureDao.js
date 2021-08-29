/*
 * @Description: 图文模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-29
 */

const db = require('../mySQL')

module.exports = {
  // 头像系列数据条数
  wallportrait_total: async (series_id) => {
    let sql = `SELECT COUNT(*) FROM \`wallportrait_series\` WHERE \`series_id\` = '${series_id}'`
    return await db.query(sql)
  },

  // 头像系列列表
  wallportrait_series: async (page, limit, series_id) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT id, series_id, series_name, series_image FROM \`wallportrait_series\` WHERE \`series_id\` = '${series_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },

  // 头像列表详情
  wallportrait_list: async (id) => {
    let sql = `SELECT * FROM \`wallportrait_series\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },

  // 壁纸系列数据条数
  wallpaper_total: async (series_id) => {
    let sql = `SELECT COUNT(*) FROM \`wallpaper_series\` WHERE \`series_id\` = '${series_id}'`
    return await db.query(sql)
  },

  // 壁纸系列列表
  wallpaper_series: async (page, limit, series_id) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT id, series_id, series_name, series_image FROM \`wallpaper_series\` WHERE \`series_id\` = '${series_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },

  // 壁纸列表详情
  wallpaper_list: async (id) => {
    let sql = `SELECT * FROM \`wallpaper_series\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },
  
  // 文案系列数据条数
  wallwriting_total: async (series_id) => {
    let sql = `SELECT COUNT(*) FROM \`wallwriting_series\` WHERE \`series_id\` = '${series_id}'`
    return await db.query(sql)
  },

  // 文案系列列表
  wallwriting_series: async (page, limit, series_id) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT id, series_id, series_name, series_image FROM \`wallwriting_series\` WHERE \`series_id\` = '${series_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },

  // 文案列表详情
  wallwriting_list: async (id) => {
    let sql = `SELECT * FROM \`wallwriting_series\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },

}