var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { docs: 'MongoNode' });
});
// app.use('/', express.static('imgfile'));

module.exports = router;
