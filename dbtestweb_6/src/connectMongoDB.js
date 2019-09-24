var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

module.exports = function connectMongoDB(app, callback) {
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
