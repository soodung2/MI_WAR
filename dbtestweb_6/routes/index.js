// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { docs: 'MongoNode' });
// });//res는 client에게 돌려주는 변수며
//   //render는 view에 준비한 화면을 뿌려주는 역할을 한다.
//
//
//
// module.exports = router;
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var db = req.db;
  db.collection('out').find({})
  .toArray(function(err, docs) {
    if (err) {
      next(err);
      return;
    }
    res.render('index', {list: docs});

  });
});

module.exports = router;
