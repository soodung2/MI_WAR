var mongoose = require('mongoose');

mongoose.connect('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017/MyDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
      console.log("open");
});

var userSchema = mongoose.Schema({
    username: 'string',
    age: 'number'
});

var User = mongoose.model('User', userSchema);

var user1 = new User({ username: 'gchoi', age: 30 });
var user2 = new User({ username: 'jmpark', age: 29 });

user1.save(function (err, user1) {
  if (err)
      console.log("error");
});

user2.save(function (err, user2) {
  if (err)
      console.log("error");
});


