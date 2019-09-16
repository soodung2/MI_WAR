var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var Client = require('mongodb').MongoClient;
var app = express();
Client.connect('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017/time_B2',function(error,client){
  if (error) {
    return;
    console.log(error);
  }
  router.get('/timeB2', function (req, res, next) {
    var db1 = client;
    db1.collection('out').find({})
    .toArray(function(err, docs) {
      if (err) {
        next(err);
        return;
      }
      res.render('timeB2', {list: docs});
    });
  });
});

module.exports = router;
