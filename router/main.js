const bodyparser = require('body-parser')
const { MongoClient } = require('mongodb')
const path = require('path');
require('dotenv').config()
const mongoClient = new MongoClient(process.env.mongoDB_api)
const axios = require('axios');
//const { get } = require('https');
//const { promiseImpl } = require('ejs');

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
            getCitta(req.body.info).then(results=>{
            console.log()
            getFoto(results.data.candidates[0].photos[0].photo_reference,results.data.candidates[0].geometry.location.lat,
                results.data.candidates[0].geometry.location.lng).then(result=>{
                    res.json({data:'success',image:result.image,temp:result.temp,meteo:result.meteo})
               }
                
            ).catch(err =>  {
                console.log("errore: "+err)
               })
            })
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
        checkAuth(req.body.email, req.body.password).then(data => {
            if(data==1){
                res.render('user.ejs',{nome: req.body.email})
            }else
                res.end('non registrato')
        }).catch(error => {console.log(error)}) 
    })

    /*app.get('/registrazione',bodyparser.urlencoded(), (req,res)=> {
        console.log("qui")
        console.log(req.body)
        getCitta(req.body.info).then(results=>{
        console.log(results)
        //console.log(results.data.candidates[0].photos[0].photo_reference)
        getFoto(results.data.candidates[0].photos[0].photo_reference).then(result=>{
            //console.log(result)
           //console.log(base64data)
           //req.body.info
                res.json(result)
                //res.render('citta.ejs', {nome:req.body.nome, citta:req.body.ricerca,foto:result});
           }
            
        )
        })
       // console.log(foto)
})*/
    checkAuth = async (email, password) => {
        try{
            await mongoClient.connect()
            const database = mongoClient.db(process.env.database)
            const users = database.collection(process.env.collection)
            let result = await users.find(
                { email: email, password: password}
            )
            //console.log(result);
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
async function getCitta(citta) {
    const api_key="AIzaSyCXHuJ7TnhYgdiGYT4_dawtc9awUW8hvIg"
	
  try{
    console.log("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=photos,geometry&input="+citta+"&inputtype=textquery&key="+api_key)
  let response = await axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=photos,geometry&input="+citta+"&inputtype=textquery&key="+api_key)
    return Promise.resolve(response)
    }catch(error) {
        console.log(error)
        return Promise.reject()
    }
}
async function getFoto(foto,lat,long){

    const api_key="AIzaSyCXHuJ7TnhYgdiGYT4_dawtc9awUW8hvIg  "
    try {

    let response = await axios.get("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference="+foto+"&key="+api_key,{responseType:'arraybuffer'})
    
       let image = Buffer.from(response.data, 'binary').toString('base64')
       response = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&appid=e21c453d380f0ca1bc5d071698438e15")
       var obj = { image:image,temp:response.data.main.temp,meteo:response.data}
    return Promise.resolve(obj)
    }catch(error) {
        console.log(error)
        return Promise.reject
    }
} 

