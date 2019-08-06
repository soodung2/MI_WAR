var https = require('http');
var url = require('url');
var qstring = require('querystring');

function sendResponse(weatherData, res) {
  var page = '<html><head><title>Search location</title></head>' +
  '<body>' +
  '<form method="post">' +
  'Mi-war : <input name = "location"><br>' +
  '<input type="submit" value="search">' +
  '</form>';
  if(weatherData) {
    page += '<h1>Weather Info</h1><p>' + weatherData + '</p>';
  }
  page+= '</body></html>';
  res.end(page);
}

function paraseWeather(weatherResponse, res) {
  var weatherData = '';
  weatherResponse.on('data', function  (chunk) {
    weatherData += chunk;
  });
  weatherResponse.on('end', function() {
    sendResponse(weatherData, res);
  });
}

function getWeather(location, res) {
  var options = {
    host : 'api.openweathermap.org',
    path : '/data/2.5/weather?q='+location
  };
  console.log(options);
  https.request(options, function(weatherResponse) {
    paraseWeather(weatherResponse, res);
  }).end();
}


https.createServer(function(req, res) {
  console.log(req.method);
  if (req.method == "POST") {
    var reqData = '';
    req.on('data', function (chunk) {
      reqData += chunk;
    });
    req.on('end', function() {
      var postParams = qstring.parse(reqData);
      getWeather (postParams.location, res);
    });
  } else {
    sendResponse(null, res);
  }
}).listen(8080);
