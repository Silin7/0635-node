const db = require('../model/mySQL')

// 新增岗位
const work_add = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `local_work` (`id`, `basic_title`, `basic_salary`, `basic_phone`, `basic_type`, `basic_education`, `basic_experience`, `basic_people`, `basic_area`, `basic_address`, `basic_welfare`, `basic_info`, `business_name`, `business_gsfr`, `business_zczb`, `business_xydm`, `business_clsj`, `business_zcdz`, `business_jyfw`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let sqlParams = [data.basic_title, data.basic_salary, data.basic_phone, data.basic_type, data.basic_education, data.basic_experience, data.basic_people, data.basic_area, data.basic_address, data.basic_welfare, data.basic_info, data.business_name, data.business_gsfr, data.business_zczb, data.business_xydm, data.business_clsj, data.business_zcdz, data.business_jyfw]
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
  db.query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      db.query(sql2, function (err2, result2) {
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
  db.query(sql, function (err, result) {
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

// 新增房屋
const room_add = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `local_room` (`id`, `room_name`, `room_type`, `lxr_phone`, `pay_rent`, `pay_method`, `room_areas`, `room_shape`, `basic_address`, `room_renovation`, `room_height`, `room_elevator`, `room_refrigerator`, `room_washing`, `room_heater`, `room_broadband`, `room_toilet`, `room_bed`, `room_wardrobe`, `room_conditioner`, `room_heating`, `room_cook`, `room_info`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let sqlParams = [data.room_name, data.room_type, data.lxr_phone, data.pay_rent, data.pay_method, data.room_areas, data.room_shape, data.basic_address, data.room_renovation, data.room_height, data.room_elevator, data.room_refrigerator, data.room_washing, data.room_heater, data.room_broadband, data.room_toilet, data.room_bed, data.room_wardrobe, data.room_conditioner, data.room_heating, data.room_cook, data.room_info]
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
}

// 同城招租列表
const room_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`local_room\` WHERE`
  let sql2 = `SELECT * FROM \`local_room\` WHERE`
  let basic_area = ` \`basic_area\` = '${data.basic_area}' AND`
  let room_type = ` \`room_type\` = '${data.room_type}' AND`
  let pay_type = ` \`pay_type\` = '${data.pay_type}' AND`
  let is_pass = ` \`is_pass\` = '${data.is_pass}'`
  let create_time = ` ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  if (data.basic_area) {
    sql1 = sql1 + basic_area
    sql2 = sql2 + basic_area
  }
  if (data.room_type) {
    sql1 = sql1 + room_type
    sql2 = sql2 + room_type
  }
  if (data.pay_type) {
    sql1 = sql1 + pay_type
    sql2 = sql2 + pay_type
  }
  sql1 = sql1 + is_pass
  sql2 = sql2 + is_pass + create_time
  db.query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      db.query(sql2, function (err2, result2) {
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

// 同城招租详情
const room_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_room\` WHERE \`id\` = '${data.id}'`
  db.query(sql, function (err, result) {
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
  work_add, work_list, work_details, room_add, room_list, room_details
}