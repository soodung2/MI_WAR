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
  /*router.get('/',function(req,res,next){
    db1.collection('out').find(function(err,docs){
      res.render('time5',{nowdata:docss});
    });
  });*/
  router.get('/time5', function (req, res, next) {
    var db1 = client;//db1에 db받아온거 넣어줌
    var mysort = {NOW:-1};//시간을 역순으로 정렬하는 변수선언
    var projection={_id: 0,NOW: 1,Temp: 1,PM10: 1,Humi: 1,PM25: 1};//id값을 생략해서 보여주는 변수
    db1.collection('out').find({},projection).sort(mysort).limit(1)//db/out에서 <시간역순정렬(mysort)>  후   <값1개(limit(1))>  받아옴(가장 최근 값받아옵니다.)
    .toArray(function(err, docs) {
      if (err) {
        next(err);
        return;
    }
      res.render('time5', {nowdata: docs[0].NOW,tempdata: docs[0].Temp,humidata: docs[0].Humi,pm25data: docs[0].PM25,pm10data: docs[0].PM10});//받아온거 time5.ejs로 넘김
      //res.render('time5', {tempdata: docs[1].Temp});
      //res.render('time5', {humidata: docs[2].Humi});
      //res.render('time5', {pm25data: docs[3].PM25});
      //res.render('time5', {pm10data: docs[4].PM10});
    });
    /*db1.collection('out').findOne({},projection,function(err,docs){
      if (err) {
        next(err);
        return;
      }
      res.render('time5', {nowdata: docs.NOW,tempdata: docs.Temp,humidata: docs.Humi,pm25data: docs.PM25,pm10data: docs.PM10});//받아온거 time5.ejs로 넘김
      res.render('time5', {tempdata: docs.Temp});
      res.render('time5', {humidata: docs.Humi});
      res.render('time5', {pm25data: docs.PM25});
      res.render('time5', {pm10data: docs.PM10});
  });*/
});
});
module.exports = router;
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
