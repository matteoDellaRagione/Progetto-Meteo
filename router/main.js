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
     
     
     app.get('/login', function (req, res) {
         res.render('login.ejs');
     });
}