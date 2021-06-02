const conn = require('./mySQL')

// 新增岗位
const work_add = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `local_work` (`id`, `basic_title`, `basic_salary`, `	basic_type`, `basic_education`, `basic_experience`, `basic_people`, `basic_area`, `basic_welfare`, `basic_info`, `business_name`, `business_gsfr`, `business_zczb`, `business_xydm`, `business_clsj`, `business_zcdz`, `business_jyfw`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let sqlParams = [data.basic_title, data.basic_salary, data.basic_type, data.basic_education, data.basic_experience, data.basic_people, data.basic_area, data.basic_welfare, data.basic_info, data.business_name, data.business_gsfr, data.business_zczb, data.business_xydm, data.business_clsj, data.business_zcdz, data.business_jyfw]
  conn().query(sql, sqlParams, function (err, result) {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
      return
    } else {
      res.json({
        code: 0,
        msg: 'success'
      })
    }
  })
}

// 同城招聘列表
const work_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`local_work\` WHERE`
  let sql2 = `SELECT * FROM \`local_work\` WHERE`
  let basic_area = ` \`basic_area\` = '${data.basic_area}' AND`
  let basic_type = ` \`basic_type\` = '${data.basic_type}' AND`
  let basic_salary = ` \`basic_salary\` = '${data.basic_salary}' AND`
  let is_pass = ` \`is_pass\` = '${data.is_pass}'`
  let create_time = ` ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  if (data.basic_area) {
    sql1 = sql1 + basic_area
    sql2 = sql2 + basic_area
  }
  if (data.basic_type) {
    sql1 = sql1 + basic_type
    sql2 = sql2 + basic_type
  }
  if (data.basic_salary) {
    sql1 = sql1 + basic_salary
    sql2 = sql2 + basic_salary
  }
  sql1 = sql1 + is_pass
  sql2 = sql2 + is_pass + create_time
  conn().query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      conn().query(sql2, function (err2, result2) {
        if(err2){
          res.json({
            code: 500,
            msg: err2
          })
        } else {
          res.json({
            code: 0,
            msg: 'success',
            page: data.page,
            limit: data.limit,
            totalCount: totalCount,
            data: result2
          })
        }
      })
    }
  })
}

// 同城招聘详情
const work_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_work\` WHERE \`id\` = '${data.id}'`
  conn().query(sql, function (err, result) {
    if(err){
      res.json({
        code: 500,
        msg: err
      })
    } else {
      res.json({
        code: 0,
        msg: 'success',
        data: result[0]
      })
    }
  })
}

module.exports = {
  work_add, work_list, work_details
}