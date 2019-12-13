var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');

app.get('/', function(req, res){
  res.redirect('./main/index');
});

app.get('/index', function(req, res){
  firebase.auth().onAuthStateChanged(function(user){
      res.render('index', {userName : user});
    });
});

module.exports = app;
