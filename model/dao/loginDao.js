/*
 * @Description: 登录注册模块业务模型层
 * @Author: silin7
 * @Date: 2020-08-26
 */

const db = require('../mySQL')

module.exports = {
  // 验证此账号是否注册
  is_register: async (user_name) => {
    let sql = `SELECT COUNT(*) FROM \`user_information\` WHERE user_name = '${user_name}'`
    return await db.query(sql)
  },
  // 将注册信息写入数据库
  register_inster: async (parameter) => {
    let sql = 'INSERT INTO `user_information` (`id`, `user_name`, `password`, `nick_name`, `avatar_url`, `gender`) VALUES (NULL, ?, ?, ?, ?, ?)'
    let sqlParams = [parameter.user_name, parameter.password, parameter.nick_name, parameter.avatar_url, parameter.gender]
    return await db.query(sql, sqlParams)
  },

  // 获取用户密码
  get_password: async (user_name) => {
    let sql = `SELECT id, password FROM \`user_information\` WHERE user_name = '${user_name}'`
    return await db.query(sql)
  },
  // 修改用户密码
  change_password: async (user_name, new_password) => {
    let sql = `UPDATE \`user_information\` SET \`password\` = '${new_password}' WHERE \`user_information\`.\`user_name\` = '${user_name}'`
    return await db.query(sql)
  },
}

