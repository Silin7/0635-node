const request = require('./recipe_api/request')
const recipeCatalogs = require('./recipe_api/recipe_catalogs')
const recipeList = require('./recipe_api/recipe_list')
const recipeDetail = require('./recipe_api/recipe_detail')

//菜肴分类
const recipe_catalogs = (req, res) => {
  let query = Object.assign({}, req.query, req.body, { cookie: req.cookies })
  recipeCatalogs(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

//菜肴列表(keyword)
const recipe_list = (req, res) => {
  let query = Object.assign({}, req.query, req.body, { cookie: req.cookies })
  recipeList(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

//菜肴详情(id)
const recipe_detail = (req, res) => {
  let query = Object.assign({}, req.query, req.body, { cookie: req.cookies })
  recipeDetail(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

module.exports = {
  recipe_catalogs, recipe_list, recipe_detail
}