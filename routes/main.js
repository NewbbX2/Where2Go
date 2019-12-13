var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');

app.get('/', function(req, res){
  res.redirect('./main/index');
});

app.get('/index', function(req, res){
  firebase.auth().onAuthStateChanged(function(user){
      var page = req.query.pageNo;
      if(!page){
        page = 1;
      }
      res.render('index', {userName : user, pageNo : page});
    });
});

module.exports = app;
