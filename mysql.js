var mysql = require('mysql');
var migration = require('mysql-migrations');

var pool = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'my_db'
});

module.exports = {
  query: function(query, options, cb) {
    pool.getConnection(function(error, connection) {
      if (error) throw error;
      connection.query(query, options, function (error, results, fields) {
        if (error) throw error;
        connection.release();
        cb(error, results, fields);
      });
    });
  }
};
