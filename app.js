var express = require('express');
var app = new express();

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

/**
*	Page redirect
*/
app.get('/login',function(req,res){res.redirect('/login.html')});
app.get('/logout',function(req,res){req.session.logined = false; res.redirect('/login.html');});

/** 
* 	Router Handle
* 	page check
*/
app.post('/loginnow',function(req,res){
	if(req.body.username == "test" && req.body.password == "1234"){
		req.session.logined = true;
		res.redirect('/timeline');
	}else{
		//test form *res.send(req.body.username +"<br>" +  req.body.password);
		res.redirect('/login.html?grenade=dead');
	}
});

app.get('/timeline',function(req,res){
	if(req.session.logined){
		res.send("Your Logined");
	}else{
		res.redirect('/login.html');
	}
});


app.get('/',function(req,res){
	res.render('index',{bot:"test"});
	res.end();
});

app.listen(80);