/*
 * @Description: 同城模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-26
 */

const db = require('../mySQL')

module.exports = {
  // 新增岗位
  work_add: async (parameter) => {
    let sql = 'INSERT INTO `local_work` (`id`, `basic_title`, `basic_salary`, `basic_phone`, `basic_type`, `basic_education`, `basic_experience`, `basic_people`, `basic_area`, `basic_address`, `basic_welfare`, `basic_info`, `business_name`, `business_gsfr`, `business_zczb`, `business_xydm`, `business_clsj`, `business_zcdz`, `business_jyfw`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.basic_title, parameter.basic_salary, parameter.basic_phone, parameter.basic_type, parameter.basic_education, parameter.basic_experience, parameter.basic_people, parameter.basic_area, parameter.basic_address, parameter.basic_welfare, parameter.basic_info, parameter.business_name, parameter.business_gsfr, parameter.business_zczb, parameter.business_xydm, parameter.business_clsj, parameter.business_zcdz, parameter.business_jyfw]
    return await db.query(sql, sqlParams)
  },

  // 岗位数据条数
  work_total: async (area, type, salary, pass) => {
    let sql = 'SELECT COUNT(*) FROM `local_work` WHERE'
    let basic_area = ` \`basic_area\` = '${area}' AND`
    let basic_type = ` \`basic_type\` = '${type}' AND`
    let basic_salary = ` \`basic_salary\` = '${salary}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    if (area) {
      sql = sql + basic_area
    }
    if (type) {
      sql = sql + basic_type
    }
    if (salary) {
      sql = sql + basic_salary
    }
    sql = sql + is_pass
    return await db.query(sql)
  },
  // 岗位列表
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
      sql = sql + basic_area
    }
    if (type) {
      sql = sql + basic_type
    }
    if (salary) {
      sql = sql + basic_salary
    }
    sql = sql + is_pass + page_limit
    return await db.query(sql)
  },

}