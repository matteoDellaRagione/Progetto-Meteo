const bodyparser = require('body-parser')
const { MongoClient } = require('mongodb')
const path = require('path');
require('dotenv').config()
const mongoClient = new MongoClient(process.env.mongoDB_api)
module.exports=function(app) {
    app.get('/', function (req, res) {
        res.render('aboutus.ejs');
     });
     
     
     app.get('/aboutus', function (req, res) {
         res.render('aboutus.ejs');
      });
     
     app.get('/help',function(req,res){
         res.render('help.ejs')
     })
     
     
     app.get('/reg', function (req, res) {
         res.render('registrazione.ejs');
     });

     app.get('/log', function (req, res) {
        res.render('login.ejs');
    });
    app.post('/search', bodyparser.urlencoded(), (req,res)=> {
        console.log("qui")
        console.log(req.body)
    })

    app.post('/registrazione', bodyparser.urlencoded(), (req,res) => {
        console.log(req.body);
        registrati(req.body.email, req.body.password).then(data => {
            if(data==1){
                res.render('user.ejs', {nome: req.body.email})
            }else
                res.end('non registrato')
        }).catch(error => {console.log(error)}) 
    })
    
    app.post('/login', bodyparser.urlencoded(), (req,res) => {
        console.log(req.body);
        registrati(req.body.email, req.body.password).then(data => {
            if(data==1){
                res.render('user.ejs',)
            }else
                res.end('non registrato')
        }).catch(error => {console.log(error)}) 
    })
    checkAuth = async (email, password) => {
        try{
            await mongoClient.connect()
            const database = mongoClient.db(process.env.database)
            const users = database.collection(process.env.collection)
            let result = await users.find(
                { email: email, password: password}
            )
            console.log(result);
            return Promise.resolve(1)
        }catch (error) {
            return Promise.reject(0)
        }
    }
    
    async function registrati(email,password) {
        try {
            await mongoClient.connect()
            const database = mongoClient.db(process.env.database)
            const users = database.collection(process.env.collection)
             await users.insertOne({email:email,password:password})
            return Promise.resolve(1)
        } catch(error) {
            return Promise.reject(0)
        }
    }    

}