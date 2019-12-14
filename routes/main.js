var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');

app.get('/', function(req, res){
  res.redirect('./main/index');
});

app.get('/index', function(req, res){
  var page = req.query.pageNo;
  var userName;
  var uid;

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
        res.render('index', {userName : userName, pageNo : page});
    });
  }else{
    console.log('no login userName ' + userName);
    res.render('index', {userName : userName, pageNo : page});
  }
});//'/index'



module.exports = app;
