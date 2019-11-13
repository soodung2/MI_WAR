var express = require('express');
var router = express.Router();
var {PythonShell} = require('python-shell');
// var mongodb = require('mongodb');
// var Client = require('mongodb').MongoClient;
var app = express();
// var io = require('socket.io')
// Client.connect('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017/time-5',function(error,client){
//   if (error) {
//     return;
//     console.log(error);
//   }//버튼 누를때 db접속

  router.get('/time5', function (req, res, next) {
    PythonShell.run("testclient.py", null, function(err,results){
        if(err) console.log('err msg : ', err);
        console.log('finished1/results: %j',results);

    })
    var db1 = req.db;//db1에 db받아온거 넣어줌
    var mysort = {NOW:-1};//시간을 역순으로 정렬하는 변수선언
    // var projection={_id: 0,NOW: 1,Temp: 1,PM10: 1,Humi: 1,PM25: 1};//id값을 생략해서 보여주는 변수
    var projection={_id: 0,NOW: 1,Temp: 1,Humi: 1,PM10: 1,PM25: 1};
    db1.collection('Null').find({},projection).sort(mysort).limit(5)//db/out에서 <시간역순정렬(mysort)>  후   <값1개(limit(1))>  받아옴(가장 최근 값받아옵니다.)
    .toArray(function(err, docs) {
      if (err) {
        next(err);
        return;
    }

      res.render('time5', {
      nowdata: docs[0].NOW,tempdata: docs[0].Temp,humidata: docs[0].Humi,pm25data: docs[0].PM25,pm10data: docs[0].PM10,
      nowdata1: docs[1].NOW,tempdata1: docs[1].Temp,humidata1: docs[1].Humi,pm25data1: docs[1].PM25,pm10data1: docs[1].PM10,
      nowdata2: docs[2].NOW,tempdata2: docs[2].Temp,humidata2: docs[2].Humi,pm25data2: docs[2].PM25,pm10data2: docs[2].PM10,
      nowdata3: docs[3].NOW,tempdata3: docs[3].Temp,humidata3: docs[3].Humi,pm25data3: docs[3].PM25,pm10data3: docs[3].PM10,
      nowdata4: docs[4].NOW,tempdata4: docs[4].Temp,humidata4: docs[4].Humi,pm25data4: docs[4].PM25,pm10data4: docs[4].PM10
    });
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
