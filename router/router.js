var mongojs = require('mongojs');
var md5 = require('../lib/md5');
var encode = require('../lib/encode');
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

var db = mongojs('TPOST',['USER']);
/**
*   Database:
*   
*   TPOST
*   
*   Collections:
*   
*   UserLogin
*   collections.USER{
*       {_id:"25as5ds5d65s",userName:'test',password:'98cf36e1eb6bcdd7fb68f12e41029dcc',ProfileName:'test',friends:['tomyc','username','buffed']}
*   }
*
*
*   Tpost
*   collections.POST{
*       {_id:'8fdk29fkw29f3kl290',userName:'test',article:'To Day is Good Day',lastUpDate:'2014-5-1 - 18:20:21',disqus:
*           [{userName:'lucy291',message:'I'd catch grenade for ya!'},{userName:'jytsp0101x64',message:'H87 sucks! using B85,Z97!'}]
*       }
*
*   }
*/

/**
*   Check and Be my friend!
*   
*   if i want be your friend, click button "+Add Friend lucy291 "
*       lucy291 user will received friend invite
*       if lucy291 click "+Add", xxx will be friend!
*       if lucy291 didn't click "+Add", xxx of Friends Array can't update lucy291 friend!
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
    /**
    *
    *   Form POST in:
    *   in Filter to username and password -> username = encode.encode(req.body.username) -> password = md5(encode.encode(req.body.password))
    *   findOne({"userName":username,"password":password},function(err,doc){
    *       if(err || doc = null){
    *           res.redirect('/login.html?grenade=dead')
    *       }else{
    *           session.logined = true;
    *           info = findOne({"userName":username}).ProfileName
    *           cookie('likename',info,) createCookie!
    *           redirect('/timeline');
    *       }});
    *   
    *
    *
    *
    */
    var username = encode.encode(req.body.username.toLowerCase()),
        password = md5(encode.encode(req.body.password.toLowerCase())),
        infoname = '';
    
    db.USER.findOne({
            query: { userName: username,password: password }
        },function(err,doc){
            if(err || doc == null){
                res.redirect('/login.html?grenade=dead');
            }else{
                req.session.logined = true;
                res.cookie('likename',doc.ProfileName,{maxAge: 900000, httpOnly: true});    
                res.redirect('/timeline');
            }
    });
    
    /* in static (no db debug)
    if(req.body.username == "test" && req.body.password == "1234"){
		req.session.logined = true;
        //create username in cookie
        res.cookie('likename',"test", { maxAge: 900000, httpOnly: true });
		res.redirect('/timeline');
	}else{
		//test form *res.send(req.body.username +"<br>" +  req.body.password);
		res.redirect('/login.html?grenade=dead');
	}
    */
}

exports.Singout = function(req,res){
    req.session.logined = false;
    res.redirect('/login.html');
};

exports.ForgetPassword = function(req,res){
    
};

exports.Profile = function(req,res){
    /**
    *  Profile Feature
    * 
    *   Router:
    *      if Login: GO TO User Profile (redirect()), using cookie!
    *      Not login: Please Enter Username to Search User Profile!
    *
    *
    */
    if(req.session.logined){	
        res.send("My Name: "+req.cookies.likename);
	}else{
		res.redirect('/login.html');
	}
};

exports.Timeline = function(req,res){
    /**
    *   Timeline Feature
    *
    *   Page:
    *       CheckLogin:
    *           Render your page, can see all people article and everyone can commit it!
    *
    *       NotLogin:
    *           redirect('login.html')
    *
    */
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
    /**
    *   Modify POST Feature <x>
    *
    *   NONE
    *
    *
    */
};

exports.Disqus = function(req,res){
    /**
    *   Commit The Post Article
    *
    *   Render Article:
    *       Article Author: Profil name->Jker <- href to profile
    *       Article See Button, if click -> ajax and load number
    *       Form and Commit:
    *           form rel = async!!
    *           Article JSON.commit array load foreach
    *           if commit -> send post and update Page!
    */
};

exports.Friends = function(req,res){
    /**
    *   frend feature
    *
    *   Check Friends Page
    *   user: Jker
    *       FindOne of 'Jker' User Friends Array!, Foreach Array Username,
    *       Username + <a> to /user/Profile Page, ProfilePage using Username
    *       //つづく
    *
    *
    *
    *
    *
    *
    */
};