var mongoose = require('mongoose');

var SearchSchema = new mongoose.Schema({
  line : String,
  location : String
});

module.exports = mongoose.model('Search', SearchSchema);
