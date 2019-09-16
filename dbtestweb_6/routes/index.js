var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { docs: 'MongoNode' });
});//res는 client에게 돌려주는 변수며
  //render는 view에 준비한 화면을 뿌려주는 역할을 한다.



module.exports = router;
