var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var Client = require('mongodb').MongoClient;
var app = express();
Client.connect('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017/time-5',function(error,client){
  if (error) {
    return;
    console.log(error);
  }//버튼 누를때 db접속
  router.get('/time5', function (req, res, next) {
    var db1 = client;//db1에 db받아온거 넣어줌
    db1.collection('out').find({})//db 받아온거에서 out 컬렉션에있는거 find로 다 불러옴 (findOne 함수쓰면 골라서 가져올수있음)
    .toArray(function(err, docs) {
      if (err) {
        next(err);
        return;
      }
      res.render('time5', {list: docs});//받아온거 time5.ejs로 넘김
    });
  });
});
    /*router.get('/time5', function (req, res, next) {
      db1 = client.db;
      db1.collection('out').find({})
      .toArray(function(err, docs) {
        if (err) {
          next(err);
          return;
        }
        res.render('time5', {list: docs});
      });
    });


/*app.get('/',function(req,res){
  db.connection('out').find({},function(err,doc){
    if(err) throw err;
    res.render('time5',{list:docs});
  });
});*/

/*module.exports = function connectMongoDB(app, callback) {
  MongoClient.connect('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017/time-5', function (err, db) {
    if (err) {
      callback(err);
      return;
    }
       // Register MongoDB middleware
    app.use(function mongoDBMiddleware(req, res, next) {
      req.db = db;
      next();
    });
    callback();
  });
};
router.get('/time5', function (req, res, next) {
  var db = req.db;
  db.collection('out').find({})
  .toArray(function(err, docs) {
    if (err) {
      next(err);
      return;
    }
    res.render('time5', {list: docs});
  });
});*/

module.exports = router;
