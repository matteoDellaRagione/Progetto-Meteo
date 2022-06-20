
const express = require('express');
const path = require('path');

 //Configure dotenv package
 require("dotenv").config();

const app = express();
const port = 8080;
console.log(__dirname);


//Express static file module
app.use(express.static(__dirname + '/assets/'));

// webWorker
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/index', function (req, res) {
	"use strict";
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);