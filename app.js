var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
//var hbs = require('express-handlebars');
var path = require('path');

var login = require('./routes/index');
var admin = require('./routes/admin');
var app = express();

//configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine('hbs', hbs({defaultLayout: 'main'}));

//app.set('view engine', 'hbs');
//use middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));


app.use(express.static('./public'));
app.use('/login', login);
app.use('/admin', admin);


//start the server
app.listen(1337, function(){
  console.log('server started at port 1337');
});

module.exports = app;