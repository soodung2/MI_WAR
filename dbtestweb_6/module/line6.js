var mongoose = require('mongoose');

var LineSchema = new mongoose.Schema({
  station : String,
  location : String,
  PM25 : Number,
  PM10 : Number
});

module.exports = mongoose.model('line6', LineSchema);
