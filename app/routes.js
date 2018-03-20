module.exports = function (app, database) {

    app.get('/', function (req, res) {
        res.render('index.ejs', {
            user: {
                name: 'Kevin Gonzalez'
            }
        });
    });

    app.get('/get-task', function (req, res) {
        database.connect();

        database.query(
            `SELECT * FROM todos`, 
            function (error, results, fields) {
                
            if (error) throw error;
                                            //results[0].solution
            console.log('The todos are: ', results);
            res.render('todos.ejs', {
                todos: results
            });
        });

    });

    app.post('/create-task', function (req, res) {

        database.query(
            `INSERT INTO todos (task, date, complete, uid, due_date) 
            VALUES('play gta5', CURRENT_TIMESTAMP(), false, 'longggggaaasssssssStrinnnnnngggggggggg', CURDATE());`, 
            function (error, results, fields) {
                
            if (error) throw error;
                                            //results[0].solution
            console.log('The todos are: ', results);
            res.render('todos.ejs', {
                todos: results
            });
        });


    });

    app.post('/update-task', function (req, res) {
        res.render('index.ejs');
    });

    app.get('/delete-task', function (req, res) {
        res.render('index.ejs');
    });

};