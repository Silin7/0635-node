/*
 * @Description: 上传文件
 * @Author: silin7
 * @Date: 2021-11-12
 */

const formidable = require('formidable');
const path = require('path')
const fs = require('fs')

const checkToken = require('./checkToken')

/**
 * 上传文件
 * @token true
 * @method POST
 * @param author_id, file_path
 */
const upload_files = (req, res, next) => {
  if (!checkToken(req.headers)) {
    res.json({
      code: 401,
      msg: '请登录后操作'
    })
    return
  }
  let author_id = req.headers.author_id
  let file_path = req.headers.file_path
  let form = new formidable.IncomingForm();
  let uploadDir = path.join(__dirname, '../../../0635-files/', file_path, author_id);
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
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
    } else {
      let oldPath = files.file.path;
      let newPath = path.join(path.dirname(oldPath), files.file.name);
      let backPath = path.join('http://121.89.215.228:10010/0635-files/dynamicModules', author_id, files.file.name)
      fs.rename(oldPath, newPath, () => {
        res.send(backPath)
      })
    }
  })
}

module.exports = {
  upload_files
}