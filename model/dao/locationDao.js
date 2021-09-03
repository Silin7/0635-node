/*
 * @Description: 同城模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-26
 */

const db = require('../mySQL')

module.exports = {
  // 新增就业岗位信息
  work_add: async (parameter) => {
    let sql = 'INSERT INTO `local_work` (`id`, `basic_title`, `basic_salary`, `basic_phone`, `basic_type`, `basic_education`, `basic_experience`, `basic_people`, `basic_area`, `basic_address`, `basic_welfare`, `basic_info`, `business_name`, `business_gsfr`, `business_zczb`, `business_xydm`, `business_clsj`, `business_zcdz`, `business_jyfw`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.basic_title, parameter.basic_salary, parameter.basic_phone, parameter.basic_type, parameter.basic_education, parameter.basic_experience, parameter.basic_people, parameter.basic_area, parameter.basic_address, parameter.basic_welfare, parameter.basic_info, parameter.business_name, parameter.business_gsfr, parameter.business_zczb, parameter.business_xydm, parameter.business_clsj, parameter.business_zcdz, parameter.business_jyfw]
    return await db.query(sql, sqlParams)
  },

  // 就业岗位信息数据条数
  work_total: async (area, type, salary, pass) => {
    let sql = 'SELECT COUNT(*) FROM `local_work` WHERE'
    let basic_area = ` \`basic_area\` = '${area}' AND`
    let basic_type = ` \`basic_type\` = '${type}' AND`
    let basic_salary = ` \`basic_salary\` = '${salary}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    if (area) {
      sql += basic_area
    }
    if (type) {
      sql += basic_type
    }
    if (salary) {
      sql += basic_salary
    }
    sql += is_pass
    return await db.query(sql)
  },
  
  // 就业岗位信息列表
  work_list: async (page, limit, area, type, salary, pass) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = 'SELECT * FROM `local_work` WHERE'
    let basic_area = ` \`basic_area\` = '${area}' AND`
    let basic_type = ` \`basic_type\` = '${type}' AND`
    let basic_salary = ` \`basic_salary\` = '${salary}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    let page_limit = ` ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    if (area) {
      sql += basic_area
    }
    if (type) {
      sql += basic_type
    }
    if (salary) {
      sql += basic_salary
    }
    sql += is_pass + page_limit
    return await db.query(sql)
  },

  // 就业岗位信息详情
  work_details: async (id) => {
    let sql = `SELECT * FROM \`local_work\` WHERE \`id\` = '${id}'`
    return await db.query(sql, sqlParams)
  },

  // 新增房屋租赁信息
  room_add: async (parameter) => {
    let sql = 'INSERT INTO `local_room` (`id`, `room_name`, `room_type`, `lxr_phone`, `pay_rent`, `pay_method`, `room_areas`, `room_shape`, `basic_address`, `room_renovation`, `room_height`, `room_elevator`, `room_refrigerator`, `room_washing`, `room_heater`, `room_broadband`, `room_toilet`, `room_bed`, `room_wardrobe`, `room_conditioner`, `room_heating`, `room_cook`, `room_info`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.room_name, parameter.room_type, parameter.lxr_phone, parameter.pay_rent, parameter.pay_method, parameter.room_areas, parameter.room_shape, parameter.basic_address, parameter.room_renovation, parameter.room_height, parameter.room_elevator, parameter.room_refrigerator, parameter.room_washing, parameter.room_heater, parameter.room_broadband, parameter.room_toilet, parameter.room_bed, parameter.room_wardrobe, parameter.room_conditioner, parameter.room_heating, parameter.room_cook, parameter.room_info]
    return await db.query(sql, sqlParams)
  },

  // 房屋租赁信息数据条数
  room_total: async (area, type, pay, pass) => {
    let sql = 'SELECT COUNT(*) FROM `local_room` WHERE'
    let basic_area = ` \`basic_area\` = '${area}' AND`
    let room_type = ` \`room_type\` = '${type}' AND`
    let pay_type = ` \`pay_type\` = '${pay}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    if (area) {
      sql += basic_area
    }
    if (type) {
      sql += room_type
    }
    if (pay) {
      sql += pay_type
    }
    sql += is_pass
    return await db.query(sql)
  },
  
  // 房屋租赁信息列表
  room_list: async (page, limit, area, type, pay, pass) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = 'SELECT * FROM `local_room` WHERE'
    let basic_area = ` \`basic_area\` = '${area}' AND`
    let room_type = ` \`room_type\` = '${type}' AND`
    let pay_type = ` \`pay_type\` = '${pay}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    let page_limit = ` ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
    if (area) {
      sql += basic_area
    }
    if (type) {
      sql += room_type
    }
    if (pay) {
      sql += pay_type
    }
    sql += is_pass + page_limit
    return await db.query(sql)
  },

  // 房屋租赁信息详情
  room_details: async (id) => {
    let sql = `SELECT * FROM \`local_room\` WHERE \`id\` = '${id}'`
    return await db.query(sql, sqlParams)
  },

}