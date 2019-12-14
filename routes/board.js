var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

var userName;
var uid;

//계획 게시판
app.get('/plan', function(req, res){
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
        res.render('index', {userName : userName, pageNo : page});
    });
  }else{
    console.log('no login userName ' + userName);
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
      + "document.location.href='./plan'</script>'");
    }
  });
});

//일지 게시판
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



//해외 게시판
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

//자유게시판
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

//여행 게시판
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
