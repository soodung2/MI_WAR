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
    var db1 = client;//db1에 db받아온거 넣어줌
    var mysort = {NOW:-1};//시간을 역순으로 정렬하는 변수선언
    var projection={_id: 0,NOW: 1,Temp: 1,PM10: 1,Humi: 1,PM25: 1};//id값을 생략해서 보여주는 변수
    db1.collection('out').find({},projection).sort(mysort).limit(1)//db/out에서 <시간역순정렬(mysort)>  후   <값1개(limit(1))>  받아옴(가장 최근 값받아옵니다.)
    .toArray(function(err, docs) {
      if (err) {
        next(err);
        return;
    }
      res.render('timeB2', {nowdata: docs[0].NOW,tempdata: docs[0].Temp,humidata: docs[0].Humi,pm25data: docs[0].PM25,pm10data: docs[0].PM10});
    });
  });
});

module.exports = router;
