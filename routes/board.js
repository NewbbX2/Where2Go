var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

//게시판 로드시 사용되는 함수
var initBoard = function(boardType, path, page, req, res){
  console.log(boardType + ' load');
  var page;
  var userName;
  var rows = [];
  if(firebase.auth().currentUser){
    userName = firebase.auth().currentUser.displayName;
    console.log(userName + ' is LogIn');
  }
  firebase.database().ref('/boards').once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();
      if(childData.boardType == boardType){
        rows.push(childData);
        res.render(path, {boardList : rows, userName : userName, pageNo : page});
      }
    });
  });
}

//게시물 로드시 사용되는 함수
var initContent = function(key, path, req, res){
  var userName;
  var userID;
  var board;
  if(firebase.auth().currentUser){
    userName = firebase.auth().currentUser.displayName;
    userID = firebase.auth().currentUser.email;
    console.log(userName + ' is LogIn');
  }
  firebase.database().ref('/boards').once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();
      if(childData.key == key){
        board = childData;
        res.render(path, {board : board, userName : userName, userID : userID});
      }
    });
  });
}


//계획 게시판
app.get('/plan', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard('plan','plan', page, req, res);
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
  initBoard('tripLog','tripLog', page, req, res);
});


//해외 게시판
app.get('/countryForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard('countryForum','countryForum', page, req, res);

});

//자유게시판
app.get('/freeForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard('freeForum','freeForum', page, req, res);
});

app.get('/freeForum2', function(req, res){
  var key = req.query.key;
  if(key){
    initContent(key, 'freeForum2', req, res);
  }else{
    res.send("<script>alert('존재하지 않는 게시물입니다');"
    + "document.location.href=document.referrer;</script>");
  }

});

//여행 게시판
app.get('/tripForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard('tripForum','tripForum', page, req, res);
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
  var boardKey = firebase.database().ref().child('boards').push().key;
  firebase.database().ref('boards/' + boardKey).set({
    boardWriterID : firebase.auth().currentUser.email,
    boardType : req.body.boardType,
    boardClassfy : req.body.boardClassfy,
    boardTitle : req.body.boardTitle,
    boardWriter : req.body.boardWriter,
    boardContent : req.body.boardContent
  }).catch(function(error){
    console.log(error);
    res.send("<script>alert('작성 실패');"
    + "document.location.href='./"+ boardType +"';</script>'");
  });
  if(req.body.tripForumMon){
    firebase.database().ref('boards/' + boardkey).set({
      tripForumMon : tripForumMon
    });
  }
});


module.exports = app;
