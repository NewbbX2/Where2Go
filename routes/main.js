var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');

//유저 이름 가져오기
var getUserName = function(){
  var userName;
  firebase.auth().onAuthStateChanged(function(user){
    console.log(user);
    if(user){
      var getName = firebase.database().ref('users/' + user.uid + '/name');
      getName.on('value', function(snapshot){
          console.log(snapshot);
          userName = snapshot.val();
      });
    }else{
     userName = "";
    }
  });
  return userName;
}


app.get('/', function(req, res){
  res.redirect('./main/index');
});

app.get('/index', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  res.render('index', {userName : getUserName, pageNo : page});
});



module.exports = app;
