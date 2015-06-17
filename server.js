'use strict';
var models = require('./models.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
.get('/', function(req,res) {
  res.sendFile('public/index.html');
})
.get('/api/moviequotes/:moviequote_id', function(req, res) {
  var moviequote_id = req.params.moviequote_id;
  models.MovieQuote.findById(moviequote_id, function(error, moviequote) {
    if(!error) {
      res.json(moviequote);
    }
  });
})
.get('/api/moviequotes', function(req, res) {
  models.MovieQuote.find({}).sort('-last_touch').exec(function(error, moviequote) {
    if(!error) {
      res.json(moviequote);
    }
  });
})
.post('/api/moviequotes', function(req, res) {
  models.MovieQuote.create(req.body, function(error, moviequote) {
    if (!error) {
      res.json(moviequote);
    }
  });
})
.put('/api/moviequotes/:moviequote_id', function(req, res) {
  var moviequote_id = req.params.moviequote_id;
  models.MovieQuote.findByIdAndUpdate(moviequote_id, req.body, function(error, moviequote) {
    if(!error) {
      res.json(moviequote);
    }
  });
})
.delete('/api/moviequotes/:moviequote_id', function(req, res) {
  var moviequote_id = req.params.moviequote_id;
  models.MovieQuote.findByIdAndRemove(moviequote_id, function(error, moviequote) {
    if(!error) {
      res.json(moviequote);
    }
  });
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = app.listen(port, ip_address, function () {
  console.log('Example app listening at http://localhost:%s', port);
});
