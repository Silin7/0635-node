const db = require('./mySQL')

module.exports = {
  scenicspot_list: async (page, limit, position, name) => {
    let slimit = (page - 1) * limit
    let elimit = limit
    let sql1 = 'SELECT * FROM `local_scenicspot`'
    let sql2 = 'SELECT COUNT(*) FROM `local_scenicspot`'
    let scenicspot_position = ` WHERE \`scenicspot_position\` = '${position}'`
    let scenicspot_name = ` AND \`scenicspot_name\` Like '%${name}%'`
    let scenicspot_limit = ` LIMIT ${slimit},${elimit}`
    if (position) {
      sql1 = sql1 + scenicspot_position
      sql2 = sql2 + `WHERE \`scenicspot_position\` = '${position}'`
    }
    if (name) {
      sql1 = sql1 + scenicspot_name
    }
    sql1 = sql1 + scenicspot_limit
    return await db.query(sql1);
  }
}



