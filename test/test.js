var http = require('http');
var encode = require('../lib/encode');
var md5 = require('../lib/md5');

var mongojs = require('mongojs');
var db = mongojs('TPOST',['USER']);

/*
db.POST.save({title:"第一篇的文章",date:"Nov. 15",author:"MacTaylor",post:"今天是好日子，為啥不去駁二動漫祭?"}
                );

db.POST.find(function(err,doc){
    console.log(doc);
});*/

db.USER.findOne({
    query: {userName:'hpcslags'}
},function(err,doc){
    if(doc == null){
        console.log(doc+"沒東西");
    }
    db.close();
});
/*
encode.encode("這串會被轉成unicode");
encode.decode("這串會被剖析");

console.log(md5("dsdokalsd"));
console.log(md5("dsdokalsd"));*/