/*
*   Page Router Function
*   
*   Register(req,res)
*   POSTRegister(req,res)
*   Singin(req,res)
*   POSTSingin(req,res)
*   Singout(req,res)
*   ForgetPassword(req,res)
*   Profile(req,res)
*   Timeline(req,res)
*   New_Article(req,res)
*   Modify(req,res)
*   Disqus(req,res)
*   Friends(req,res)
*
*/

exports.Register = function(req,res){
    if(req.session.islogin){
        res.redirect('/');
        return;
    }else{
        res.redirect('/register.html');
    }
};

exports.POSTRegister = function(req,res){
    
    //find, 
        //if UsersDB.username is undefined
            //new account
    if(req.body.username != "test" && req.body.password.length > 5){
        res.send("OK! Now You Register, Welcome! "+req.body.name+" and "+req.body.username+" and "+ req.body.password);
    }else{
        res.redirect('/register.html?grenade=dead');
    }

};

exports.Singin = function(req,res){
    res.redirect('/login.html');
};

exports.POSTSingin = function(req,res){
    if(req.body.username == "test" && req.body.password == "1234"){
		req.session.logined = true;
        //create username in cookie
        res.cookie('likename',"test", { maxAge: 900000, httpOnly: true });
		res.redirect('/timeline');
	}else{
		//test form *res.send(req.body.username +"<br>" +  req.body.password);
		res.redirect('/login.html?grenade=dead');
	}
}

exports.Singout = function(req,res){
    req.session.logined = false; res.redirect('/login.html');
};

exports.ForgetPassword = function(req,res){

};

exports.Profile = function(req,res){
    if(req.session.logined){	
        res.send("My Name: "+req.cookies.likename);
	}else{
		res.redirect('/login.html');
	}
};

exports.Timeline = function(req,res){
    if(req.session.logined){
		res.send("Your Logined");
        console.log(req.cookies.likename + " is logined!");
	}else{
		res.redirect('/login.html');
	}
};

exports.New_Article = function(req,res){
    
};

exports.Modify = function(req,res){

};

exports.Disqus = function(req,res){

};

exports.Friends = function(req,res){

};