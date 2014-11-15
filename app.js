var express = require('express');
var app = new express();
var ejs = require("ejs");
var router = require('./router');

app.configure(function(){
	app.use(express.static(__dirname+'/www'));
	app.use(express.cookieParser());
	app.use(express.session({secret:'MD5HeapMap'}));
	/**
	*Long Alive Server session
	
	app.use(express.cookieSession({
		key:'cookie',
		secret:'https://www.youtube.com/watch?v=SR6iYWJxHqs'
	}));*/
	app.use(express.bodyParser()); //open GER,POST body parser
	app.set('views',__dirname+'/www'); //views engine path
	app.set('view engine','ejs');
	app.use(app.router);//open router
});

//Singup...
app.get('/login',router.Singin);
app.get('/logout',router.Singout);
app.get('/register',router.Register);
app.post('/login',router.POSTSingin);
app.post('/register',router.POSTRegister);
app.post('/New_Article',router.New_Article);

//after Singup...
app.get('/timeline',router.Timeline);
app.get('/profile',router.Profile);


//default
app.get('/',function(req,res){
    console.log("OK!");
    res.render('index',{bot:"test"});
	//res.end(); Fuck You!
});

app.listen(5555);