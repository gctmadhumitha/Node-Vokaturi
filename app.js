var express = require('express');
var app = express();
var path = require("path");
 // support json encoded bodies
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));


var bodyParser = require('body-parser');
app.use(bodyParser.json());

var voiceFile = __dirname + '/resources/4.wav';
var request = require('request');

app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/vokaturi', function (req, res) {
  console.log("vokaturi");
  var PythonShell = require('python-shell');

  var options = {
    mode: 'text',
    pythonPath: '/Library/Frameworks/Python.framework/Versions/3.6/bin/python3',
    pythonOptions: ['-u'],
    scriptPath:  './scripts/OpenVokaturi-3-0/',
    args: ['hello.wav']
  };

  PythonShell.run('examples/OpenVokaWavMean-mac64.py', options, function (err, results) {
    console.log("results :" + results);
    console.log("err :" + err);
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/index.html', function(req, res) {
   res.sendFile(path.join(__dirname + '/index.html'));
});




