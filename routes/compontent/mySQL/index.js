var mysql = require('mysql')

var sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_library'
}

var conn = function(){
  var connection = mysql.createConnection(sqlConfig)
  connection.connect()
  connection.on('error',err=>{
    console.log('Re-connecting lost connection: ');
    connection = mysql.createConnection(sqlConfig)
  })
  return function(){
    return connection
  }
}

module.exports = conn()