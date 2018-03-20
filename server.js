var port = process.env.PORT || 6969;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database = require('./database');


// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

// purpose of this is to enable cross domain requests
app.use(function (req, res, next) {
    //Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', 'http://localhost:6969');
    //Requests methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Methods', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //set up ejs for templating

app.use("/assets", express.static(__dirname + "/assets"));

require('./app/routes')(app, database);

app.listen(port, function(err){
    if (err)console.log('error ', err);

    console.log('Server Listening on port' + port);
});
