// *********************************************
//              MySQL Connection Stuff
// *********************************************

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'todo_app'
});

connection.connect(); // connects to the database

module.exports = connection;

// connection.end();

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();