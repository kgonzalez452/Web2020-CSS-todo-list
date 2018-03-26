var port = process.env.PORT || 6969; // looking for an environment called port
var express = require('express'); //requires the node express server
var app = express(); //initializes express and assigns it 
var bodyParser = require('body-parser'); //requires body parser module
var database = require('./database'); //requires module from your database.js file
//ejs is a templating language

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

// purpose of this is to enable cross domain requests
app.use(function (req, res, next) {    // sets the security
    //Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', 'http://localhost:6969');
    //Requests methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
     // Set to true if you need the website to include cookies in the requests sent //sets logins and lets you stay logged in.
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //set up ejs for templating
//expose as public path   //this specific path from your computer
app.use("/assets", express.static(__dirname + "/assets")); //dirname is a global node.js variable

require('./app/routes')(app, database);

app.listen(port, function(err){
    if (err)console.log('error ', err);

    console.log('Server Listening on port' + port);
});


//xxamp in an apache server