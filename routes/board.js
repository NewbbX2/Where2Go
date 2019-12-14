var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

//계획 게시판
app.get('/plan', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }

  var user = firebase.auth().currentUser;
  if(user){
    var userName = user.displayName;
        console.log('받아옴 ' + userName);
        console.log(userName + ' is login');
        res.render('index', {userName : userName, pageNo : page});
  }else{
    console.log('no login');
    res.render('index', {userName : userName, pageNo : page});
  }
});

app.get('/index2', function(req, res){
var key = req.query.travelNo;
firebase.database().ref('/plan/'+key).once('value').then(function(snapshot){
    if(snapshot.val()){
      console.log('watch ' + snapshot.val());
      var travelBoard = snapshot.val();
      var userID;
      var userName;
      uid = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + uid).once('value').then(function(snapshot){
        userID = snapshot.val().email;
        userName = snapshot.val().userName;
      });
      res.render('index2', {travelBoard : travelBoard});
    }else{
      res.send("<script>alert('게시물이 존재하지 않습니다');"
      + "document.location.href='./plan';</script>'");
    }
  });
});

//일지 게시판
app.get('/tripLog', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }

  var user = firebase.auth().currentUser;

  if(user){
    var userName = user.displayName;
    console.log(userName + ' is login');
    res.render('tripLog', {userName : userName, pageNo : page});
  }else{
    console.log('no login userName ' + userName);
    res.render('tripLog', {userName : userName, pageNo : page});
  }
});



//해외 게시판
app.get('/countryForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }

  var user = firebase.auth().currentUser;

  if(user){
    var userName = user.displayName;
    console.log(userName + ' is login');
    res.render('countryForum', {userName : userName, pageNo : page});
  }else{
    console.log('no login userName ' + userName);
    res.render('countryForum', {userName : userName, pageNo : page});
  }
});

//자유게시판
app.get('/freeForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }

  var user = firebase.auth().currentUser;

  if(user){
    var userName = user.displayName;
    console.log('받아옴 ' + userName);
    console.log(userName + ' is login');
    res.render('freeForum', {userName : userName, pageNo : page});
  }else{
    console.log('no login userName ' + userName);
    res.render('freeForum', {userName : userName, pageNo : page});
  }
});

//여행 게시판
app.get('/tripForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }

  var user = firebase.currentUser;

  if(user){
    var userName = user.displayName;
    console.log('받아옴 ' + userName);
    console.log(userName + ' is login');
    res.render('tripForum', {userName : userName, pageNo : page});
  }else{
    console.log('no login userName ' + userName);
    res.render('tripForum', {userName : userName, pageNo : page});
  }
});

//글쓰기 폼
app.get('/boardEnroll', function(req, res){
  var user = firebase.auth().currentUser;
  var boardType = req.query.boardType;
  if(user){
    var userName = user.displayName;
    var userID = user.email;
    console.log('write ' + boardType);
    res.render('boardEnroll', {userID :userID, userName : userName, boardType : boardType});
  }else{
    res.send("<script>alert('로그인을 해주세요');"
    + "document.location.href='./"+ boardType +"';</script>'");
  }
});

app.post('/boardEnrollAction', function(req, res){

});


module.exports = app;
