//create read update delete api representation
var moment = require('moment');

module.exports = function (app, database) { //exports a whole funcyion of the following routes to be able to use this function in other files using a require('); method.

  app.get('/', function (req, res) { // this does nothing but send a request to an address until you code whats inside this fucntion 
    res.render('index.ejs', {     // which sends a response to the server that serves the index page
      user: {                         //and this sends an object within the index page to get the user
        name: 'Kevin Gonzalez',
      }
    });
  });
  //create a request to this path
  app.get('/get-todos', function (req, res) { //sends a request to an address of localhost:6969/get-todos.

    database.query(                           //this creates a query in the database youre posting to
      `SELECT * FROM todos`,                  //this is the query youre sending
      function (error, results, fields) {     //this function is how you handle errors 

        if (error) throw error;

        console.log('results: ', results);

        res.render('todos.ejs', { // returns and loads the page 'todos.ejs
          todos: results
        });
      });
  });

  app.post('/create-todo', function (req, res) {
    
    console.log('data ', req.body);         //this sends a request to the body for the data

    var todo = {
      task: req.body.task,
      date: moment().format(),
      completed: false,
      uid: 'sd9f87sdf76s7d6fsdf67sd',
      due_date: moment().add(7, "days").format('YYYY/MM/DD')
    }

    database.query(
      `INSERT INTO todos(task, date, complete, uid, due_date) 
       VALUES('${todo.task}', '${todo.date}', ${todo.completed}, '${todo.uid}', '${todo.due_date}')`, 
      function (error, result, fields) {

        if (error) {
          console.log('error ', error);

          res.send({
            success: false,
            error: error,
            message: 'The todo was not created sorry :('
          });
        }
        else {
          // console.log('result: ', result);
          todo.id = result.insertId;
          res.send({
            success: true,
            todo: todo
          });
        }
    });
  });

  app.post('/update-todo', function (req, res) {
    var id = req.body.id;
    database.query(
      `UPDATE todos SET complete = true WHERE id = ${id}`,
      function (error, results, fields) {

        if (error) throw error;

        console.log('results: ', results);

        res.render('todos.ejs', { // returns and loads the page 'todos.ejs'
          todos: results
        });
      });
  });

  app.post('/delete-todo', function (req, res) {
    var id = req.body.id;

    database.query(
      `DELETE FROM todos WHERE id = ${id}`,
      function (error, result, fields) {

        if (error) {
          console.log('error ', error);

          res.send({
            success: false,
            error: error,
            message: 'The todo was not deleted :('
          });
        }
        else {
          console.log('result: ', result);
         
          res.send({
            success: true,
            id: id
          });
        }
      });

  });


  app.get('*', function (req, res) {
    res.render('404.ejs', {
      user: {
        name: 'Kevin Gonzalez',
      }
    });
  });
}