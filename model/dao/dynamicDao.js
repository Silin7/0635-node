/*
 * @Description: 动态模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-26
 */

const db = require('../mySQL')

module.exports = {
  // 发动态（图片）
  dynamic_release_img: async (parameter, author_id) => {
    let sql = 'INSERT INTO `local_dynamic` (`id`, `author_id`, `author_name`, `author_avatar`, `content`, `image`) VALUES (NULL, ?, ?, ?, ?, ?)'
    let sqlParams = [author_id, parameter.author_name, parameter.author_avatar, parameter.content, backPath]
    return await db.query(sql, sqlParams)
  },
  
  // 发动态（文字）
  dynamic_release_txt: async (parameter, author_id) => {
    let sql = 'INSERT INTO `local_dynamic` (`id`, `author_id`, `author_name`, `author_avatar`, `content`) VALUES (NULL, ?, ?, ?, ?)'
    let sqlParams = [author_id, parameter.author_name, parameter.author_avatar, parameter.content]
    return await db.query(sql, sqlParams)
  },

  // 动态数据条数
  dynamic_total: async (pass) => {
    let sql = `SELECT COUNT(*) FROM \`local_dynamic\` WHERE \`is_pass\` = '${pass}'`
    return await db.query(sql)
  },
  // 动态列表
  dynamic_list: async (page, limit, pass) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT * FROM \`local_dynamic\` WHERE \`is_pass\` = '${pass}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },
  
  // 动态详情
  dynamic_details: async (id) => {
    let sql = `SELECT * FROM \`local_dynamic\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },

  // 删除动态
  cancel_dynamic: async (id, author_id) => {
    let sql = `DELETE FROM \`local_dynamic\` WHERE \`id\` = '${id}' AND \`author_id\` = '${author_id}'`
    return await db.query(sql)
  },

  // 写评论
  write_comment: async (parameter, author_id) => {
    let sql = 'INSERT INTO `local_comment` (`id`, `dynamic_id`, `comment_content`, `reviewer_id`, `reviewer_name`, `reviewer_image`) VALUES (NULL, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.dynamic_id, parameter.comment_content, parameter.reviewer_id, parameter.reviewer_name, parameter.reviewer_image]
    return await db.query(sql, sqlParams)
  },

  // 动态评论数据条数
  comment_total: async (dynamic_id, pass) => {
    let sql = `SELECT COUNT(*) FROM \`local_comment\` WHERE \`dynamic_id\` = '${dynamic_id}' AND \`is_pass\` = '${pass}'`
    return await db.query(sql)
  },
  // 动态评论列表
  comment_list: async (page, limit, dynamic_id, pass) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT * FROM \`local_comment\` WHERE \`dynamic_id\` = '${dynamic_id}' AND \`is_pass\` = '${pass}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },
}