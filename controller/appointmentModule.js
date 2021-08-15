const db = require('../model/mySQL')
const formidable = require('formidable');
const path = require('path')
const fs = require('fs')

// 发起活动(图片)
const appointment_release_img = (req, res, next) => {
  let author_id = req.headers.author_id
  let form = new formidable.IncomingForm();
  let uploadDir = path.join(__dirname, '../../../birch-forest-media/appointmentModule', author_id);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdir(uploadDir, (error) => {
      if (error) {
        res.json({
          code: 500,
          data: error
        })
      }
    })
  }
  form.uploadDir = uploadDir;
  form.parse(req, (err, fields, files) => {
    console.log(fields)
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
    } else {
      let oldPath = files.file.path;
      let newPath = path.join(path.dirname(oldPath), files.file.name);
      let newPath2 = 'https://www.silin7.cn/birch-forest-media/appointmentModule/' + files.file.name
      //fs.rename重命名图片名称
      fs.rename(oldPath, newPath, () => {
        let sql = 'INSERT INTO `activity_library` (`id`, `sponsor_id`, `sponsor_name`, `sponsor_gender`, `sponsor_age`, `sponsor_img`, `appointment_title`, `appointment_info`, `appointment_time`, `appointment_place`, `appointment_wx`, `area_type`, `appointment_type`, `appointment_pay`, `appointment_gander`, `appointment_details`, `activity_poster`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        let sqlParams = [fields.sponsor_id, fields.sponsor_name, fields.sponsor_gender, fields.sponsor_age, fields.sponsor_img, fields.appointment_title, fields.appointment_info, fields.appointment_time, fields.appointment_place, fields.appointment_wx, fields.area_type, fields.appointment_type, fields.appointment_pay, fields.appointment_gander, fields.appointment_details, newPath2]
        db().query(sql, sqlParams, function (err, result) {
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
      })
    }
  })
}

// 发起活动（文字）
const appointment_release_txt = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `activity_library` (`id`, `sponsor_id`, `sponsor_name`, `sponsor_gender`, `sponsor_age`, `sponsor_img`, `appointment_title`, `appointment_info`, `appointment_time`, `appointment_place`, `appointment_wx`, `area_type`, `appointment_type`, `appointment_pay`, `appointment_gander`, `appointment_details`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let sqlParams = [data.sponsor_id, data.sponsor_name, data.sponsor_gender, data.sponsor_age, data.sponsor_img, data.appointment_title, data.appointment_info, data.appointment_time, data.appointment_place, data.appointment_wx, data.area_type, data.appointment_type, data.appointment_pay, data.appointment_gander, data.appointment_details]
  db().query(sql, sqlParams, function (err, result) {
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

// 线下活动列表
const appointment_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`activity_library\` WHERE`
  let sql2 = `SELECT * FROM \`activity_library\` WHERE`
  let sponsor_gender = ` \`sponsor_gender\` = '${data.sponsor_gender}' AND`
  let appointment_type = ` \`appointment_type\` = '${data.appointment_type}' AND`
  let area_type = ` \`area_type\` = '${data.area_type}' AND`
  let is_pass = ` \`is_pass\` = '${data.is_pass}'`
  let create_time = ` ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  if (data.sponsor_gender) {
    sql1 = sql1 + sponsor_gender
    sql2 = sql2 + sponsor_gender
  }
  if (data.appointment_type) {
    sql1 = sql1 + appointment_type
    sql2 = sql2 + appointment_type
  }
  if (data.area_type) {
    sql1 = sql1 + area_type
    sql2 = sql2 + area_type
  }
  sql1 = sql1 + is_pass
  sql2 = sql2 + is_pass + create_time
  db().query(sql1, function (err1, result1) {
    if(err1){
      res.json({
        code: 500,
        msg: err1
      })
    } else {
      let totalCount = result1[0][`COUNT(*)`]
      db().query(sql2, function (err2, result2) {
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

// 线下活动详情
const appointment_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`activity_library\` WHERE \`id\` = '${data.id}'`
  db().query(sql, function (err, result) {
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

// 是否报名参加活动
const appointment_issign = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`activity_sign\` WHERE \`active_id\` = '${data.active_id}' AND \`followers_id\` = '${data.followers_id}'`
  db().query(sql, function (err, result) {
    if(err){
      res.json({
        code: 500,
        msg: err
      })
    } else {
      if (result.length > 0) {
        res.json({
          code: 0,
          msg: 'success',
          type: '1'
        })
      } else {
        res.json({
          code: 0,
          msg: 'success',
          type: '0'
        })
      }
    }
  })
}

// 报名参加活动
const appointment_sign = (req, res, next) => {
  let data = req.query
  let sql = `INSERT INTO \`activity_sign\` (\`id\`, \`active_id\`, \`followers_id\`) VALUES (NULL, '${data.active_id}', '${data.followers_id}');`
  db().query(sql, function (err, result) {
    if(err){
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

module.exports = {
  appointment_release_img, appointment_release_txt, appointment_list, appointment_details, appointment_issign, appointment_sign
}