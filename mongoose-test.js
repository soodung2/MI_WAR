var mongoose = require('mongoose');

mongoose.connect('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017/time-5');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
      console.log("open");
});
var outSchema = mongoose.Schema({
    NOW:'String',
    Temp:'String',
    PM10:'String',
    Humi:'String',
    PM25:'String'
},{collection:'out'});//스키마 옵션 설정입니다. 콜렉션 지정해주는 옵션
var out = mongoose.model('out',outSchema);
out.find(function(error, out){
  console.log('--- Read all ---');
  if(error){
    console.log(error);
  }
  else{
    console.log(out);
  }
});
/*var UserSchema = mongoose.Schema({
    username: 'string',
    age: 'number'
},{collection:'basic'});

var User = mongoose.model( 'basic',UserSchema);
var user1 = new User({ username: 'gchoi', age: 30 });
var user2 = new User({ username: 'jmpark', age: 29 });
var user3 = new User({ username: 'aaa', age: 3});



user3.save(function (err,data){
  if (err)
      console.log("error");
});
User.find(function(error,basic){
  console.log('--- Read All ---');
  if(error){
    console.log(error);
  }
  else{
    console.log(basic);
  }
});*/
