// cnpm i silly-datetime
// cnpm i formidable
const formidable = require("formidable");
const path = require("path")
const fs = require("fs")

const upload_image = (req, res, next) => {
  var form = new formidable.IncomingForm();//既处理表单，又处理文件上传
  //设置文件上传文件夹/路径，__dirname是一个常量，为当前路径
  let uploadDir = path.join(__dirname, "../upload/");
  form.uploadDir = uploadDir;//本地文件夹目录路径
  form.parse(req, (err, fields, files) => {
    let oldPath = files.file.path;//这里的路径是图片的本地路径
    console.log(files.file.name)//图片传过来的名字
    let newPath = path.join(path.dirname(oldPath), files.file.name);
    //这里我传回一个下载此图片的Url
    var downUrl = uploadDir + files.file.name;//这里是想传回图片的链接
    fs.rename(oldPath, newPath, () => {//fs.rename重命名图片名称
      res.json({ downUrl: downUrl })
    })
  })
}

module.exports = {
  upload_image
}