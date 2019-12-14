var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
var bodyParser = require('body-parser');
require('firebase/auth');
require('firebase/database');



app.get('/', function(req, res){
  res.send('user router');
});

app.get('/login', function(req, res, next){
  res.render('login');
});

app.use('/test', function(req, res, next){
  res.redirect('../main');
});

app.get('/join', function(req, res){
  res.render('userJoin');
});

app.post('/userJoinAction', function(req, res){
  console.log(req.body);
  firebase.auth().createUserWithEmailAndPassword(req.body.userID, req.body.userPassword1
  ).then(

  ).catch(function(error){
  //firebase.auth().createUserWithEmailAndPassword('test@test.com','123123').catch(function(error){
    console.log(error);
    res.send("<script>alert('회원가입 오류');"
    +"document.location.href='../';</script>");
  });
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      firebase.database().ref('users/' + user.uid).set({
        userID: req.body.userID,
        userName: req.body.userName,
        userBirthDate: req.body.userBirthDate,
        userGender: req.body.userGender
      }).then(function(){
        user.updateProfile({
            displayName: req.body.userName
        }).then(function(){
          res.redirect('../');
        });
      });
    }
  });
});

app.post('/login', function(req, res, next){
  console.log(req.body);
  firebase.auth().signInWithEmailAndPassword(req.body.userID, req.body.userPassword
  ).then(function(){
    res.redirect('/');
  }).catch(function(error){
  //firebase.auth().signInWithEmailAndPassword('test@testmail.com', '123123').catch(function(error){
			console.log(error);
      res.send("<script>alert('아이디 또는 비밀번호가 틀렸습니다');document.location.href='../'</script>");
	});

});

app.get('/logout', function(req, res){
  console.log('log out');
  firebase.auth().signOut().then(function(){
    res.redirect('/');
  });
});

module.exports = app;
