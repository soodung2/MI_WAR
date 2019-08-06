<<<<<<< Updated upstream
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var line = ["line1","line2","line3","line4","line5","line6","line7", "line8"];
var dbName = 'Seoul';
var client = new MongoClient(url, {useNewUrlParser : true });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

function con(client,collec,idx) {
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("connected successfully to server");
    var db = client.db(dbName);
    var cursor = db.collection(collec).find(idx);
    cursor.each(function(err,doc) {
      if (err) { return ''; }
      else {
        if (doc != null) { return doc; }
      }
    });
  });
}

app.get('/', function (req, res) {
  var data = req.body.name; //Building Name
  var i = 0;
  var doc = [];
  for (i in line){
    var name = '';
    name = con(client, line[i], {station:{$regex:data}});
    if (name != '') {
      doc.push([line[i],name]);
    }
  }
  console.log(doc);
  res.render('index',{list : doc});
});

app.listen(8080,function(){
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("connected successfully");
  });
  console.log('App Listening on port 8080');
});
=======
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var line = ["line1","line2","line3","line4","line5","line6","line7", "line8"];
var dbName = 'Seoul';
var client = new MongoClient(url, {useNewUrlParser : true });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

function con(client,collec,idx) {
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("connected successfully to server");
    var db = client.db(dbName);
    var cursor = db.collection(collec).find(idx);
    cursor.each(function(err,doc) {
      if (err) { return ''; }
      else {
        if (doc != null) { return doc; }
      }
    });
  });
}

app.get('/', function (req, res) {
  var data = req.body.name; //Building Name
  var i = 0;
  var doc = [];
  for (i in line){
    var name = '';
    name = con(client, line[i], {station:{$regex:data}});
    if (name != '') {
      doc.push([line[i],name]);
    }
  }
  console.log(doc);
  res.render('index',{list : doc});
});

app.listen(8080,function(){
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("connected successfully");
  });
  console.log('App Listening on port 8080');
});
>>>>>>> Stashed changes
