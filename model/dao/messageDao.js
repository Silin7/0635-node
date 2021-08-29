/*
 * @Description: 消息模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-29
 */

const db = require('../mySQL')

module.exports = {
  // 私信消息数据条数
  permessage_total: async (author_id) => {
    let sql = `SELECT COUNT(*) FROM \`message_personal\` WHERE \`receiver_id\` = '${author_id}' OR \`receiver_id\` is NULL`
    return await db.query(sql)
  },

  // 私信消息列表
  permessage_list: async (page, limit, author_id) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT * FROM \`message_personal\` WHERE \`receiver_id\` = '${author_id}' OR \`receiver_id\` is NULL ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },

  // 私信消息详情
  permessage_details: async (id) => {
    let sql = `SELECT * FROM \`message_personal\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },

  // 是否发过私信了
  is_permessage_send: async (receiver_id, author_id, message_type) => {
    let sql = `SELECT COUNT(*) FROM \`message_personal\` WHERE \`receiver_id\` = '${receiver_id}' AND \`sender_id\` = '${author_id}' AND \`message_type\` = '${message_type}'`
    return await db.query(sql)
  },

  // 发私信
  permessage_send: async (parameter, author_id) => {
    let sql = 'INSERT INTO `message_personal` (`id`, `receiver_id`, `sender_id`, `sender_name`, `sender_img`, `message_title`, `message_content`, `message_type`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.receiver_id, author_id, parameter.sender_name, parameter.sender_img, parameter.message_title, parameter.message_content, parameter.message_type]
    return await db.query(sql, sqlParams)
  },

  // 发私信（活动报名消息）
  permessage_active: async (parameter, author_id) => {
    let sql = 'INSERT INTO `message_personal` (`id`, `receiver_id`, `sender_id`, `sender_name`, `sender_img`, `message_title`, `message_content`, `message_type`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.receiver_id, author_id, parameter.sender_name, parameter.sender_img, parameter.message_title, parameter.message_content, parameter.message_type]
    return await db.query(sql, sqlParams)
  },

  // 删除私信
  permessage_delete: async (id) => {
    let sql = `DELETE FROM \`message_personal\` WHERE \`message_personal\`.\`id\` = ${id}`
    return await db.query(sql)
  },
  
  // 系统消息数据条数
  sysmessage_total: async (author_id) => {
    let sql = `SELECT COUNT(*) FROM \`message_system\` WHERE \`receiver_id\` = '${author_id}' OR \`receiver_id\` is NULL`
    return await db.query(sql)
  },
  
  // 系统消息列表
  sysmessage_list: async (page, limit, author_id) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = `SELECT * FROM \`message_system\` WHERE \`receiver_id\` = '${author_id}' OR \`receiver_id\` is NULL ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    return await db.query(sql)
  },

  // 私信消息详情
  sysmessage_details: async (id) => {
    let sql = `SELECT * FROM \`message_system\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },

}