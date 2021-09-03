/*
 * @Description: 社交模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-23
 */

const db = require('../mySQL')

module.exports = {
  // 发起社交
  marry_release: async (parameter, author_id, cover) => {
    let sql = 'INSERT INTO `marry_library` (`id`, `type`, `user_id`, `name`, `gender`, `age`, `constellation`, `address`, `height`, `weight`, `education`, `occupation`, `income`, `state`, `car`, `house`, `introduce`, `cover`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.type, author_id, parameter.name, parameter.gender, parameter.age, parameter.constellation, parameter.address, parameter.height, parameter.weight, parameter.education, parameter.occupation, parameter.income, parameter.state, parameter.car, parameter.house, parameter.introduce, cover]
    db.query(sql, sqlParams, function (err, result) {
      if (err) {
        res.json({
          code: 500,
          msg: err
        })
      } else {
        res.json({
          code: 0,
          msg: 'success'
        })
      }
    })
  },

  // 社交数据条数
  marry_total: async (gender, type, address, pass) => {
    let sql = 'SELECT COUNT(*) FROM `marry_library` WHERE'
    let parameter_gender = ` \`gender\` = '${gender}' AND`
    let parameter_type = ` \`type\` = '${type}' AND`
    let parameter_address = ` \`address\` = '${address}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    if (gender) {
      sql += parameter_gender
    }
    if (type) {
      sql += parameter_type
    }
    if (address) {
      sql += parameter_address
    }
    sql += is_pass
    return await db.query(sql)
  },
  
  // 社交列表
  marry_list: async (page, limit, gender, type, address, pass) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql = 'SELECT * FROM `marry_library` WHERE'
    let parameter_gender = ` \`gender\` = '${gender}' AND`
    let parameter_type = ` \`type\` = '${type}' AND`
    let parameter_address = ` \`address\` = '${address}' AND`
    let is_pass = ` \`is_pass\` = '${pass}'`
    let page_limit = ` LIMIT ${slimit},${elimit}`
    if (gender) {
      sql += parameter_gender
    }
    if (type) {
      sql += parameter_type
    }
    if (address) {
      sql += parameter_address
    }
    sql += is_pass + page_limit
    return await db.query(sql)
  },

  // 社交详情
  marry_details: async (id) => {
    let sql = `SELECT * FROM \`marry_library\` WHERE \`id\` = '${id}'`
    return await db.query(sql)
  },

  // 是否报名参加社交
  is_marry_sign: async (register_id, author_id) => {
    let sql = `SELECT COUNT(*) FROM \`marry_sign\` WHERE \`register_id\` = '${register_id}' AND \`followers_id\` = '${author_id}'`
    return await db.query(sql)
  },

  // 是否报名参加社交
  marry_sign: async (register_id, author_id) => {
  let sql = `INSERT INTO \`marry_sign\` (\`id\`, \`register_id\`, \`followers_id\`) VALUES (NULL, '${register_id}', '${author_id}')`
    return await db.query(sql)
  },



}

