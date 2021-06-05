const conn = require('./mySQL')
const formidable = require('formidable');
const path = require('path')
const fs = require('fs')

// 发动态(图片)
const dynamic_release_img = (req, res, next) => {
  //既处理表单，又处理文件上传
  let form = new formidable.IncomingForm();
  let uploadDir = path.join(__dirname, '../../../birch-forest-media/dynamicModules');
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
      let backPath = path.join('https://www.silin7.cn/birch-forest-media/dynamicModules', files.file.name)
      //fs.rename重命名图片名称
      fs.rename(oldPath, newPath, () => {
        let sql = 'INSERT INTO `local_dynamic` (`id`, `author_id`, `author_name`, `author_avatar`, `content`, `image`) VALUES (NULL, ?, ?, ?, ?, ?)'
        let sqlParams = [fields.author_id, fields.author_name, fields.author_avatar, fields.content, backPath]
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

// 发动态（文字）
const dynamic_release_txt = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `local_dynamic` (`id`, `author_id`, `author_name`, `author_avatar`, `content`) VALUES (NULL, ?, ?, ?, ?)'
  let sqlParams = [data.author_id, data.author_name, data.author_avatar, data.content]
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

// 动态列表
const dynamic_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`local_dynamic\` WHERE \`is_pass\` = '${data.is_pass}'`
  let sql2 = `SELECT * FROM \`local_dynamic\` WHERE \`is_pass\` = '${data.is_pass}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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

// 动态详情
const dynamic_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_dynamic\` WHERE \`id\` = '${data.id}'`
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

// 删除动态
const cancel_dynamic = (req, res, next) => {
  let data = req.query
  let sql = `DELETE FROM \`local_dynamic\` WHERE \`id\` = '${data.id}' AND \`author_id\` = '${data.author_id}'`
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

// 写评论
const write_comment = (req, res, next) => {
  let data = req.body
  let sql = 'INSERT INTO `local_comment` (`id`, `dynamic_id`, `comment_content`, `reviewer_id`, `reviewer_name`, `reviewer_image`) VALUES (NULL, ?, ?, ?, ?, ?)'
  let sqlParams = [data.dynamic_id, data.comment_content, data.reviewer_id, data.reviewer_name, data.reviewer_image]
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
// 动态评论的列表
const comment_list = (req, res, next) => {
  let data = req.query
  let slimit = (data.page - 1) * data.limit
  let elimit = data.limit
  let sql1 = `SELECT COUNT(*) FROM \`local_comment\` WHERE \`dynamic_id\` = '${data.dynamic_id}' AND \`is_pass\` = '${data.is_pass}'`
  let sql2 = `SELECT * FROM \`local_comment\` WHERE \`dynamic_id\` = '${data.dynamic_id}' AND \`is_pass\` = '${data.is_pass}' ORDER BY \`create_time\` DESC LIMIT ${slimit},${elimit}`
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

module.exports = {
  dynamic_release_img, dynamic_release_txt, dynamic_list, dynamic_details, cancel_dynamic, write_comment, comment_list
}