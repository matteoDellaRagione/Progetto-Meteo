
const express = require('express');
const bodyparser = require('body-parser')
var https = require('https'); //fai install
var fs = require('fs');

const app = express();
 //Configure dotenv package
 require("dotenv").config();
 require('./router/main')(app);

app.set('view engine', 'ejs')
const port = 8080;

var options = {
    key: fs.readFileSync(__dirname+'/certificate/key.pem'),
    cert: fs.readFileSync(__dirname+'/certificate/cert.pem')
  };

//Express static file module
app.use(express.static(__dirname + '/assets/'));

https.createServer(options, app).listen(4433);

app.listen(port);
console.log('Server started at http://localhost:' + port);


