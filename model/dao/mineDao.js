/*
 * @Description: 我的模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-27
 */

const db = require('../mySQL')

module.exports = {
  // 获取用户基本信息
  mine_info: async (author_id) => {
    let sql = `SELECT * FROM \`user_information\` WHERE \`id\` = '${author_id}'`
    return await db.query(sql)
  },

  // 修改保存个人信息
  update_mineInfo: async (parameter, author_id) => {
    let sql = `UPDATE \`user_information\` SET \`nick_name\` = '${parameter.nick_name}', \`gender\` = '${parameter.gender}', \`user_phone\` = '${parameter.user_phone}', \`birthday\` = '${parameter.birthday}', \`age\` = '${parameter.age}', \`constellation\` = '${parameter.constellation}', \`address\` = '${parameter.address}', \`personal_signature\` = '${parameter.personal_signature}' WHERE \`user_information\`.\`id\` = '${author_id}'`
    return await db.query(sql)
  },

  // 我喜欢的用户数量
  concerns_count: async (author_id) => {
    let sql = `SELECT COUNT(*) FROM \`relations_personnel\` WHERE \`followers_id\` = '${author_id}'`
    return await db.query(sql)
  },
  
  // 我喜欢的用户列表
  concerns_list: async (page, limit, author_id) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT * FROM \`relations_personnel\` WHERE \`followers_id\` = '${author_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },

  // 是否喜欢了此用户
  is_follow_users: async (watched_id, author_id) => {
    let sql = `SELECT COUNT(*) FROM \`relations_personnel\` WHERE \`followers_id\` = '${author_id}' AND \`watched_id\` = '${watched_id}'`
    return await db.query(sql)
  },

  // 喜欢此用户
  follow_users: async (parameter, author_id) => {
    let sql = 'INSERT INTO `relations_personnel` (`id`, `followers_id`, `watched_id`, `nick_name`, `photo`, `introduce`) VALUES (NULL, ?, ?, ?, ?, ?)'
    let sqlParams = [author_id, parameter.watched_id, parameter.nick_name, parameter.photo, parameter.introduce]
    return await db.query(sql, sqlParams)
  },

  // 取消喜欢此用户
  cancel_users: async (watched_id, author_id) => {
    let sql = `DELETE FROM \`relations_personnel\` WHERE \`followers_id\` = '${author_id}' AND \`watched_id\` = '${watched_id}'`
    return await db.query(sql)
  },

  // 我关注的用户数量
  collection_count: async (author_id) => {
    let sql = `SELECT COUNT(*) FROM \`relations_user\` WHERE \`followers_id\` = '${author_id}'`
    return await db.query(sql)
  },

  // 我关注的用户列表
  collection_list: async (page, limit, author_id) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT * FROM \`relations_user\` WHERE \`followers_id\` = '${author_id}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },
  
  // 是否关注了此用户
  is_follow_collection: async (watched_id, author_id) => {
    let sql = `SELECT COUNT(*) FROM \`relations_user\` WHERE \`followers_id\` = '${author_id}' AND \`watched_id\` = '${watched_id}'`
    return await db.query(sql)
  },

  // 关注此用户
  follow_collection: async (parameter, author_id) => {
    let sql = 'INSERT INTO `relations_user` (`id`, `followers_id`, `user_id`, `user_name`, `user_info`, `user_image`) VALUES (NULL, ?, ?, ?, ?, ?)'
    let sqlParams = [author_id, parameter.user_id, parameter.user_name, parameter.user_info, parameter.user_image]
    return await db.query(sql, sqlParams)
  },

  // 取消关注此用户
  cancel_collection: async (watched_id, author_id) => {
    let sql = `DELETE FROM \`relations_user\` WHERE \`followers_id\` = '${author_id}' AND \`watched_id\` = '${watched_id}'`
    return await db.query(sql)
  },

  // 我的动态数量
  my_dynamic_count: async (author_id, pass) => {
    let sql = `SELECT COUNT(*) FROM \`local_dynamic\` WHERE \`author_id\` = '${author_id}' AND \`is_pass\` = '${pass}'`
    return await db.query(sql)
  },

  // 我的动态列表
  my_dynamic_list: async (page, limit, author_id, pass) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT * FROM \`local_dynamic\` WHERE \`author_id\` = '${author_id}' AND \`is_pass\` = '${pass}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },
}