
const express = require('express');
var https = require('https'); 
var fs = require('fs');

const app = express();

 require("dotenv").config();
 require('./router/main')(app);

app.set('view engine', 'ejs')
const port = 4433;

var options = {
    key: fs.readFileSync(__dirname+'/certificate/key.pem'),
    cert: fs.readFileSync(__dirname+'/certificate/cert.pem')
  };

app.use(express.static(__dirname + '/assets/'));

https.createServer(options, app).listen(port);

console.log('Server started at https://localhost:' + port);


