/*
 * @Description: 活动模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-23
 */

const db = require('../mySQL')

module.exports = {
  // 发起活动（图片）
  appointment_release_img: async (parameter) => {
    let sql = 'INSERT INTO `activity_library` (`id`, `sponsor_id`, `sponsor_name`, `sponsor_gender`, `sponsor_age`, `sponsor_img`, `appointment_title`, `appointment_info`, `appointment_time`, `appointment_place`, `appointment_wx`, `area_type`, `appointment_type`, `appointment_pay`, `appointment_gander`, `appointment_details`, `activity_poster`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.sponsor_id, parameter.sponsor_name, parameter.sponsor_gender, parameter.sponsor_age, parameter.sponsor_img, parameter.appointment_title, parameter.appointment_info, parameter.appointment_time, parameter.appointment_place, parameter.appointment_wx, parameter.area_type, parameter.appointment_type, parameter.appointment_pay, parameter.appointment_gander, parameter.appointment_details, newPath2]
    return await db.query(sql, sqlParams)
  },
  
  // 发起活动（文字）
  appointment_release_txt: async (parameter) => {
    let sql = 'INSERT INTO `activity_library` (`id`, `sponsor_id`, `sponsor_name`, `sponsor_gender`, `sponsor_age`, `sponsor_img`, `appointment_title`, `appointment_info`, `appointment_time`, `appointment_place`, `appointment_wx`, `area_type`, `appointment_type`, `appointment_pay`, `appointment_gander`, `appointment_details`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.sponsor_id, parameter.sponsor_name, parameter.sponsor_gender, parameter.sponsor_age, parameter.sponsor_img, parameter.appointment_title, parameter.appointment_info, parameter.appointment_time, parameter.appointment_place, parameter.appointment_wx, parameter.area_type, parameter.appointment_type, parameter.appointment_pay, parameter.appointment_gander, parameter.appointment_details]
    return await db.query(sql, sqlParams)
  },

  // 线下活动数据条数
  appointment_total: async (sponsor, appointment, area, pass) => {
    let sql = 'SELECT COUNT(*) FROM `activity_library` WHERE'
    let sponsor_gender = ` \`sponsor_gender\` = '${sponsor}' AND`
    let appointment_type = ` \`appointment_type\` = '${appointment}' AND`
    let area_type = ` \`area_type\` = '${area}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    if (sponsor) {
      sql = sql + sponsor_gender
    }
    if (appointment) {
      sql = sql + appointment_type
    }
    if (area) {
      sql = sql + area_type
    }
    sql = sql + is_pass
    return await db.query(sql)
  },
  // 线下活动列表
  appointment_list: async (page, limit, sponsor, appointment, area, pass) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = 'SELECT * FROM `activity_library` WHERE'
    let sponsor_gender = ` \`sponsor_gender\` = '${sponsor}' AND`
    let appointment_type = ` \`appointment_type\` = '${appointment}' AND`
    let area_type = ` \`area_type\` = '${area}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    let page_limit = ` LIMIT ${slimit},${elimit}`
    if (sponsor) {
      sql = sql + sponsor_gender
    }
    if (appointment) {
      sql = sql + appointment_type
    }
    if (area) {
      sql = sql + area_type
    }
    sql = sql + is_pass + page_limit
    return await db.query(sql)
  },
  
  // 线下活动详情
  appointment_details: async (id) => {
    let sql = `SELECT * FROM \`activity_library\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },

  // 是否报名参加活动
  appointment_issign: async (active_id, author_id) => {
    let sql = `SELECT * FROM \`activity_sign\` WHERE \`active_id\` = '${active_id}' AND \`followers_id\` = '${author_id}'`
    return await db.query(sql)
  },

  // 报名参加活动
  appointment_sign: async (active_id, author_id) => {
    let sql = `INSERT INTO \`activity_sign\` (\`id\`, \`active_id\`, \`followers_id\`) VALUES (NULL, '${active_id}', '${author_id}');`
    return await db.query(sql)
  },
}