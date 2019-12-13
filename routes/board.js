var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');

app.get('/', function(req, res){
  res.redirect('./plan');
});

app.get('/plan', function(req, res){
  firebase.auth().onAuthStateChanged(function(user){
      res.render('index', {userID : user});
    });
});

app.get('/log', function(req, res){
  res.render('')
});

app.get('/trip', function(req, res){
  res.redirect('./plan');
});

app.get('/forum', function(req, res){
  res.redirect('./plan');
});

app.get('/free', function(req, res){
  res.redirect('./plan');
});

module.exports = app;
