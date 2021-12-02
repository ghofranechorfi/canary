const express = require('express');
var mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000
const path = require('path');

const hbs = handlebars.create({
  layoutsDir: __dirname + '/views/layouts/',
  extname: 'hbs'
});
app.use(express.static('public'));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canary"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
}); 
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');



app.get('/', function (req, res) {
    //res.sendFile(path.join(__dirname, '/views/index.html'));
    res.render('main', {layout: 'index'});
});

app.get('/signin', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/signin.html'));
    res.render('signin', {layout: 'index'});
})

app.get('/signup', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/signup.html'));
    res.render('signup', {layout: 'index'});
})

app.get('/profile/:username', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/profile.html'));
    console.log(req.params.username);
    con.query("SELECT * FROM user where username = ?" , req.params.username, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('profile', 
        {layout: 'index',
        userinfo: result});
      });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})