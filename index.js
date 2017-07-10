var express = require('express');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
  //properties..
  host:'localhost',
  user: 'root',
  password: '',
  database: 'pharmacy'
});

connection.connect(function(error){
  if (!!error) {
    console.log('ERROR');
  } else {
    console.log('Conncected');
  }
});

app.get('/', function(req, res){
  //about mysql
  connection.query("SELECT * FROM admin", function(error, rows, fields) {
    if (!!error) {
      console.log('Error in the query');
    } else {
      console.log('Successful query \n');
      console.log(rows[0].admin_name);
      res.send('Hello '+ rows[0].admin_name);
      //parse with your rows/fields
    }
  });
});
app.listen(1337);
