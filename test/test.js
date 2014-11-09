var http = require('http');
var encode = require('../lib/encode');
var md5 = require('../lib/md5');

var mongojs = require('mongojs');
var db = mongojs('TPOST',['USER']);


db.USER.findOne({
		query: { userName:"test" }
	},function(err,doc){
		console.log(doc.ProfileName);
});


/*
encode.encode("這串會被轉成unicode");
encode.decode("這串會被剖析");

console.log(md5("dsdokalsd"));
console.log(md5("dsdokalsd"));*/