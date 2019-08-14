var routes = require('../routes/index');
var time5 = require('../routes/time5');
var timeB2 = require('../routes/timeB2');

module.exports = function connectRoutes(app) {
  app.use('/', routes);
  app.use('/', time5);
  app.use('/', timeB2);
};
