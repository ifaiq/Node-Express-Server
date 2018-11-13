const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// for heroku 
const port = process.env.PORT || 3000;

var app= express();
app.set('view engine', 'hbs');
//Middleware app.use => custom functions
app.use(express.static(__dirname+'/pages'));
app.use((req,res, next)=>{
var date = new Date().toString();
console.log(`${date}`);
fs.appendFile('log.log',date,(err)=>{
    if(err){
        console.log(err);
    }
});
next();

})

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('date',()=>{
    return new Date().getFullYear();

})

hbs.registerHelper('scream',(text)=>{
    return text.toUpperCase();

})




app.get('/', (req,res)=>{
    res.render('home.hbs',{
        me: 'Home Page',
        welcome: 'Welcome Home'
    });
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        me: 'About Me'
    })
});

app.get('/bad',(req,res)=>{
res.send({
    Name : 'Error Req',
    type : 'error'
});
});


app.listen(port);