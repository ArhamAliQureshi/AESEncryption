"use strict";

var _encryption = _interopRequireDefault(require("./encryption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// server.js
// where your node app starts
// init project
var express = require('express');

var bodyParser = require('body-parser');

var app = express();
// http://expressjs.com/en/starter/static-files.html
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express["static"]('.')); // http://expressjs.com/en/starter/basic-routing.html

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});
app.post('/encrypt', function (req, res, next) {
  var result = _encryption["default"].defaultEncrypt(req, res, next);

  res.json(result);
});
app.post('/decrypt', function (req, res, next) {
  var result = _encryption["default"].defaultDecrypt(req, res, next);

  res.json(result);
}); // listen for requests :)

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});