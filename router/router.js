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
var db_POST = mongojs('TPOST',['POST']);
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
*   Tpost(Old version,don't use)
*   collections.POST{
*       {_id:'8fdk29fkw29f3kl290',userName:'test',article:'To Day is Good Day',lastUpDate:'2014-5-1 - 18:20:21',disqus:
*           [{userName:'lucy291',message:'I'd catch grenade for ya!'},{userName:'jytsp0101x64',message:'H87 sucks! using B85,Z97!'}]
*       }
*
*   }
*   NEW TPOST:
*   collection.POST{
*       [
*           {title:"第一篇的文章",date:"Nov. 15",author:"MacTaylor",post:"今天是好日子，為啥不去駁二動漫祭?"},
*           {title:"今天買的本子",date:"Nov. 15",author:"MacTaylor",post:"找不到摯愛第六艦隊 \"響\" 很慚愧..."}
*       ]
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
                res.cookie('likename',doc.ProfileName,{maxAge: new Date(Date.now() + 1000), httpOnly: true});    
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
    /*
        set session => req.session.name = "xxxx"
        set cookie  => res.cookie('cookiename','value',{xxx})
        using session => req.session.name
        using cookie = res.cookies.cookiename
    */
    req.session.logined = false;
    res.redirect('/login.html');
};

exports.ForgetPassword = function(req,res){
    /*Security--*/
};

exports.Profile = function(req,res){
    /*
        Avator using : Gravatar
        User all post, in start load 8 post(Ajax)
        now i don't want this feature!
    */
    if(req.session.logined){	
        res.send("My Name: "+req.cookies.likename);
	}else{
		res.redirect('/login.html');
	}
};

exports.Timeline = function(req,res){
    /*
        TwitPost in top
        
        Show Everyone Post load 15 post, (Ajax) using api RESTful Request!
        but, now i don't want this feature!
        Load all
    */
    if(req.session.logined){
		//res.send("Your Logined");
        db_POST.POST.find(function(err,doc){
            res.render('timeline',{list:doc});
        });
        console.log(req.cookies.likename + " is logined!");
	}else{
		res.redirect('/login.html');
	}
};

exports.New_Article = function(req,res){
    /*
        POST Method, 
        Timeline post to New_Article(post), and handle to new article in database
        
        Article:
            Title
            Date(new Date inside)
            Author name
            post message, worning <script> XSS
            post id.
    */
    if(req.session.logined){
        /*Check and write in database*/
        var title = req.body.title;
        var post = req.body.post;
        if(title.toString().length < 1 && post.toString().length < 5){
            var html = '<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Article Dead</title></head><body><p>"Article text must be greater than one, regardless of the title or the text"</p><p>"文章的文字必須大於一，無論標題或是內文"</p><p>"記事のテキストは、タイトルまたはテキストに関係なく、1より大きくなければならない"</p><script>alert("Article text must be greater than one, regardless of the title or the text"); window.location.href = "/timeline";</script></body></html>';
            res.send(html);
            //res.redirect('/timeline');
        }else{
            //{title:"第一篇的文章",date:"Nov. 15",author:"MacTaylor",post:"今天是好日子，為啥不去駁二動漫祭?"}
            db_POST.POST.save({title:title.toString(),date:new Date().toString(),author:req.cookies.likename,post:post.toString()});
            res.redirect('/timeline');
        }
    }else{
        res.redirect('/login.html');
    }
};

exports.Modify = function(req,res){
    
};

exports.Disqus = function(req,res){

};

exports.Friends = function(req,res){

};