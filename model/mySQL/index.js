const mysql = require('mysql')

const { dbConfig } = require('../../config');

const pool = mysql.createPool(dbConfig);

const db = {};

db.query = function handleDisconnection(sql, params) {
  
  return new Promise((resolve, reject) => {

    pool.getConnection((err, connection) => {

      if (err) {
        reject(err)
        return
      }

      connection.query(sql, params, function(error, results, fields) {
        // 释放连接
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(results)
      })

    })
  })
}

// 导出对象
module.exports = db
