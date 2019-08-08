var express = require('expree');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = 8080; //random value
var url = 'mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com';

app.use(expree.static('public'));
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// native Promise set
mongoose.Promise = global.Promise;

mongoose.connect(url, {useMongoClient : true}).then(
  () => console.log('successfully connected to mongodb')).catch(
    e => console.error(e));

app.listen(port, () => console.log(`Server listening on Port ${port}`));
