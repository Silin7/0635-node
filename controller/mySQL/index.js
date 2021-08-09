var mysql = require('mysql')

var sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'birch-forest',
  timezone: "08:00"
}

const handleDisconnection = function() {
  var pool = mysql.createPool(sqlConfig);
  pool.getConnection(function(err) {
    if (err) {
      setTimeout(handleDisconnection(), 2000);
    }
  });
  pool.on('error', function(err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('db error执行重连:' + err.message);
      handleDisconnection();
      // pool.threadId()
    } else {
      throw err;
    }
  });
  return function(){
    return pool
  }
}

module.exports = handleDisconnection()
