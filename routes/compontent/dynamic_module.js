const conn = require('./mySQL')

// 县市新闻列表
const dynamic_news_list = (req, res, next) => {
  let data = req.query
  let sql = `SELECT b.* FROM admin_city_type a INNER JOIN local_news b ON a.type_id = b.type_id WHERE a.type_id = '${data.type_id}'`
	console.log(sql)
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
        data: result
      })
    }
  })
}

// 县市新闻详情
const dynamic_news_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_news\` WHERE \`id\` = '${data.id}'`
	// let sql = `SELECT * FROM \`local_news\` WHERE \`id\` = '2'`
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

// 动态列表
const dynamic_list = (req, res, next) => {
	let data = req.query
	let slimit = (data.page - 1) * data.limit
	let elimit = (data.page) * data.limit
	let sql1 = `SELECT COUNT(*) FROM \`local_dynamic\` WHERE \`is_pass\` = '1'`
	let sql2 = `SELECT * FROM \`local_dynamic\` WHERE \`is_pass\` = '1' LIMIT ${slimit},${elimit}`
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

// 广告详情
const advertisement_details = (req, res, next) => {
  let data = req.query
  let sql = `SELECT * FROM \`local_advertisement\` WHERE \`id\` = '${data.id}'`
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
  dynamic_news_list, dynamic_news_details, dynamic_list, advertisement_details
}