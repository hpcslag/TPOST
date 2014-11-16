var mongojs = require('mongojs');
var db = mongojs('TPOST',['USER']);
var db_POST =mongojs('TPOST',['POST']);

db.USER.drop();
db_POST.POST.drop();

db.USER.save({userName:'test',password:'e10adc3949ba59abbe56e057f20f883e',ProfileName:'test'});
db_POST.POST.save({title:"Demo",date:"Nov. 15",author:"MacTaylor",post:"FF"});

db.close();
db_POST.close();