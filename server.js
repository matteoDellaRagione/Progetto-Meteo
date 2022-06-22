const { MongoClient } = require('mongodb')
const express = require('express');
const path = require('path');
require('dotenv').config()
const mongoClient = new MongoClient(process.env.mongoDB_api)
const bodyparser = require('body-parser')


 //Configure dotenv package
 require("dotenv").config();

const app = express();
app.set('view engine', 'ejs')
const port = 8080;



//Express static file module
app.use(express.static(__dirname + '/assets/'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/index', function (req, res) {
	"use strict";
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/ciao', function (req, res) {
    res.render('ciao.ejs');
});

app.post('/auth', bodyparser.urlencoded(), (req,res) => {
    console.log(req.body);
    checkAuth(req.body.email, req.body.password).then(data => {
        if(data.length){
            res.end('autenticato')
        }else
            res.end('non autenticato')
    })
})

app.listen(port);
console.log('Server started at http://localhost:' + port);

checkAuth = async (email, password) => {
    try{
        await mongoClient.connect()
        const database = mongoClient.db(process.env.database)
        const users = database.collection(process.env.collection)
        let result = await users.find(
            { email: email, password: password}
        ).toArray()
        console.log(result);
        return Promise.resolve(result)
    }catch (error) {
        return Promise.reject([])
    }
}

