var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

var userName;
var uid;

app.get('/plan', function(req, res){
  res.redirect('/');
});

app.get('/tripLog', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }

  if(firebase.auth().currentUser){
    uid = firebase.auth().currentUser.uid;
  }

  if(uid){
    var getName = firebase.database().ref('users/' + uid + '/name');
    getName.once('value').then(function(snapshot){
        userName = snapshot.val();
        console.log('받아옴 ' + userName);
        console.log(userName + ' is login');
        res.render('tripLog', {userName : userName, pageNo : page});
    });
  }else{
    console.log('no login userName ' + userName);
    res.render('tripLog', {userName : userName, pageNo : page});
  }
});

app.get('/countryForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }

  if(firebase.auth().currentUser){
    uid = firebase.auth().currentUser.uid;
  }

  if(uid){
    var getName = firebase.database().ref('users/' + uid + '/name');
    getName.once('value').then(function(snapshot){
        userName = snapshot.val();
        console.log('받아옴 ' + userName);
        console.log(userName + ' is login');
        res.render('countryForum', {userName : userName, pageNo : page});
    });
  }else{
    console.log('no login userName ' + userName);
    res.render('countryForum', {userName : userName, pageNo : page});
  }
});

app.get('/freeForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }

  if(firebase.auth().currentUser){
    uid = firebase.auth().currentUser.uid;
  }

  if(uid){
    var getName = firebase.database().ref('users/' + uid + '/name');
    getName.once('value').then(function(snapshot){
        userName = snapshot.val();
        console.log('받아옴 ' + userName);
        console.log(userName + ' is login');
        res.render('freeForum', {userName : userName, pageNo : page});
    });
  }else{
    console.log('no login userName ' + userName);
    res.render('freeForum', {userName : userName, pageNo : page});
  }
});

app.get('/tripForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  
  if(firebase.auth().currentUser){
    uid = firebase.auth().currentUser.uid;
  }

  if(uid){
    var getName = firebase.database().ref('users/' + uid + '/name');
    getName.once('value').then(function(snapshot){
        userName = snapshot.val();
        console.log('받아옴 ' + userName);
        console.log(userName + ' is login');
        res.render('tripForum', {userName : userName, pageNo : page});
    });
  }else{
    console.log('no login userName ' + userName);
    res.render('tripForum', {userName : userName, pageNo : page});
  }
});


module.exports = app;
