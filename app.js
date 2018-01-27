const express=require('express');
const hbs=require('hbs');
const fs= require('fs');

var app= express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

app.use((req,res,next) => {
  var now= new Date().toString();
  var log= `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log',log + '\n');
  next();
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage:"Welcome!",
  });

});

app.get('/about',(req,res)=> {
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.listen(3000);
