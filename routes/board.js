var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

var userName;
firebase.auth().onAuthStateChanged(function(user){
  if(user){
    var getName = firebase.database().ref('users/' + user.uid + '/name');
    getName.on('value', function(snapshot){
        userName = snapshot.val();
    });
  }else{

  }
});

app.get('/', function(req, res){
  res.redirect('./plan');
});

app.get('/plan', function(req, res){
  firebase.auth().onAuthStateChanged(function(user){
      res.render('index', {userName : user});
    });
});

app.get('/countryForum', function(req, res){
  firebase.auth().onAuthStateChanged(function(user){
      res.render('countryForum', {userName : user});
    });
});

app.get('/freeForum', function(req, res){
  res.render('countryForum', {userName : userName});
});

app.get('/forum', function(req, res){
  res.redirect('./plan');
});

app.get('/free', function(req, res){
  res.redirect('./plan');
});

module.exports = app;
