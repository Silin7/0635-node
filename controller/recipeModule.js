/*
* @Description: 菜谱模块控制器层
* @Author: silin7
* @Date: 2021-08-30
*/

const request = require('../model/recipe_api/request')
const recipeCatalogs = require('../model/recipe_api/recipe_catalogs')
const recipeList = require('../model/recipe_api/recipe_list')
const recipeDetail = require('../model/recipe_api/recipe_detail')

/**
 * 菜谱分类列表
 * @token false
 * @method GET
 */
const recipe_catalogs = (req, res) => {
  let query = Object.assign({}, req.query, req.body, { cookie: req.cookies })
  recipeCatalogs(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

/**
 * 菜谱列表
 * @token false
 * @method GET
 * @param keyword
 */
const recipe_list = (req, res) => {
  let query = Object.assign({}, req.query, req.body, { cookie: req.cookies })
  recipeList(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

/**
 * 菜谱详情
 * @token false
 * @method GET
 * @param id
 */
const recipe_detail = (req, res) => {
  let query = Object.assign({}, req.query, req.body, { cookie: req.cookies })
  recipeDetail(query, request).then(answer => {
    res.status(answer.status).send(answer.body)
  }).catch(answer => {
    res.status(answer.status).send(answer.body)
  })
}

module.exports = {
  recipe_catalogs,
  recipe_list,
  recipe_detail
}