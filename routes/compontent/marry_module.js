const conn = require('./mySQL')
const formidable = require('formidable');
const path = require('path')
const fs = require('fs')

// 发起社交
const marry_release = (req, res, next) => {
  //既处理表单，又处理文件上传
  let form = new formidable.IncomingForm();
  let uploadDir = path.join(__dirname, '../../../birch-forest-media/marryModule');
  //本地文件夹目录路径
  form.uploadDir = uploadDir;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
    } else {
      //这里的路径是图片的本地路径
      let oldPath = files.file.path;
      //图片传过来的名字
      let newPath = path.join(path.dirname(oldPath), files.file.name);
      let newPath2 = 'https://www.silin7.cn/birch-forest-media/marryModule/' + files.file.name
      //fs.rename重命名图片名称
      fs.rename(oldPath, newPath, () => {
        let sql = 'INSERT INTO `marry_library` (`id`, `type`, `user_id`, `name`, `gender`, `age`, `constellation`, `address`, `height`, `weight`, `education`, `occupation`, `income`, `state`, `car`, `house`, `introduce`, `cover`) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        let sqlParams = [fields.type, fields.user_id, fields.name, fields.gender, fields.age, fields.constellation, fields.address, fields.height, fields.weight, fields.education, fields.occupation, fields.income, fields.state, fields.car, fields.house, fields.introduce, newPath2]
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
      })
    }
  })
}

// 社交列表
const marry_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`marry_library\` WHERE`
  let sql2 = `SELECT id, name, age, introduce, cover FROM \`marry_library\` WHERE`
  let gender = ` \`gender\` = '${data.gender}' AND`
  let type = ` \`type\` = '${data.type}' AND`
  let address = ` \`address\` = '${data.address}' AND`
  let is_pass = ` \`is_pass\` = '${is_pass}'`
  let create_time = ` ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
  if (data.gender) {
    sql1 = sql1 + gender
    sql2 = sql2 + gender
  }
  if (data.type) {
    sql1 = sql1 + type
    sql2 = sql2 + type
  }
  if (data.address) {
    sql1 = sql1 + address
    sql2 = sql2 + address
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

// 社交详情
const marry_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`marry_library\` WHERE \`id\` = ${data.id}`
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

// 是否报名参加社交
const marry_issign = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`marry_sign\` WHERE \`register_id\` = '${data.register_id}' AND \`followers_id\` = '${data.followers_id}'`
  conn().query(sql, function (err, result) {
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

// 报名参加社交
const marry_sign = (req, res, next) => {
  let data = req.query
  let sql = `INSERT INTO \`marry_sign\` (\`id\`, \`register_id\`, \`followers_id\`) VALUES (NULL, '${data.register_id}', '${data.followers_id}');`
  conn().query(sql, function (err, result) {
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
  marry_release, marry_list, marry_details, marry_issign, marry_sign
}