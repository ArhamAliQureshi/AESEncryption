
// server.js
// where your node app starts

// init project
const express = require('express');
var bodyParser = require('body-parser') 
const app = express();
import EtoEncryption from './encryption';

// http://expressjs.com/en/starter/static-files.html
app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(bodyParser.json());
app.use(express.static('.'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.post('/encrypt', (req, res, next) => {
  let result = EtoEncryption.defaultEncrypt(req,res,next);
  res.json(result);
  })
  
app.post('/decrypt', (req, res, next) => {
    let result = EtoEncryption.defaultDecrypt(req,res,next);
    res.json(result);
})
  

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});



