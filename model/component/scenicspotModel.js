const db = require('../mySQL')

module.exports = {
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
}



