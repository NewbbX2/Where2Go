var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

//게시판 로드시 사용되는 함수
var initBoard = function(boardType, page, req, res){
  var pagwae;
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
        childData.key = childSnapshot.key;
        rows.push(childData);
      }
    });
    console.log(boardType + ' load');
    res.render(boardType, {boardList : rows, userName : userName, pageNo : page});
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
  firebase.database().ref('/boards/' + key).once('value').then(function(snapshot){
    board = snapshot.val();
    board.key = key;
    res.render(path, {board : board, userName : userName, userID : userID});
  });
}


//계획 게시판
app.get('/tripPlan', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard('tripPlan',page, req, res);
});

app.get('/tripPlan2', function(req, res){
var key = req.query.travelNo;

});

//일지 게시판
app.get('/tripLog', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard('tripLog', page, req, res);
});

app.get('/tripLog2', function(req, res){
  var key = req.query.key;
  if(key){
    initContent(key, 'tripLog2', req, res);
  }else{
    res.send("<script>alert('존재하지 않는 게시물입니다');"
    + "document.location.href=document.referrer;</script>");
  }
});

//해외 게시판
app.get('/countryForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard('countryForum', page, req, res);

});

app.get('/countryForum2', function(req, res){
  var key = req.query.key;
  if(key){
    initContent(key, 'countryForum2', req, res);
  }else{
    res.send("<script>alert('존재하지 않는 게시물입니다');"
    + "document.location.href=document.referrer;</script>");
  }
});

//자유게시판
app.get('/freeForum', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard('freeForum', page, req, res);
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
  initBoard('tripForum', page, req, res);
});

app.get('/tripForum2', function(req, res){
  var key = req.query.key;
  if(key){
    initContent(key, 'tripForum2', req, res);
  }else{
    res.send("<script>alert('존재하지 않는 게시물입니다');"
    + "document.location.href=document.referrer;</script>");
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

//글쓰기 저장
app.post('/boardEnrollAction', function(req, res){
  var boardKey = firebase.database().ref().child('boards').push().key;
  console.log(req.body);
  var data = {
    boardWriterID : firebase.auth().currentUser.email,
    boardType : req.body.boardType,
    boardClassify : req.body.boardClassify,
    boardTitle : req.body.boardTitle,
    boardWriter : req.body.boardWriter,
    boardContent : req.body.boardContent
  };
  if(req.body.tripForumMon){
    data.tripForumMon = req.body.tripForumMon;
  }
  firebase.database().ref('boards/' + boardKey).set(data).then(function(){
    res.send("<script>alert('등록되었습니다');"
    + "document.location.href='./"+ req.body.boardType +"';</script>'");
  }).catch(function(error){
    console.log(error);
    res.send("<script>alert('작성 실패');"
    + "document.location.href='./"+ boardType +"';</script>'");
  });
});

//글쓰기 갱신 폼
app.get('/reformBoard', function(req, res){
  var key = req.query.key;
  firebase.database().ref('boards/' + key).once('value').then(function(snapshot){
    var board = snapshot.val();
    board.key = snapshot.key;
    console.log(board);
    res.render('reformBoard', {board : board});
  });
});

//글쓰기 갱신
app.post('/reformBoardAction', function(req, res){
  var key = req.body.key;
  var data = {
    boardWriterID : firebase.auth().currentUser.email,
    boardType : req.body.boardType,
    boardClassify : req.body.boardClassify,
    boardTitle : req.body.boardTitle,
    boardWriter : req.body.boardWriter,
    boardContent : req.body.boardContent
  };
  if(req.body.tripForumMon){
    data.tripForumMon = req.body.tripForumMon;
  }
  firebase.database().ref('boards/' + key).update(data);
  res.send('<script>document.location.href=document.referrer;</script>');
});

//여행 계획 글쓰기 폼
app.get('/travelEnroll', function(req, res){
  var user = firebase.auth().currentUser;
  if(user){
    res.render('travelEnroll',{ userID : user.email, userName : user.displayName });
  }else{
    res.send("<script>alert('로그인 하세요');"
    + "document.location.href=document.referrer;</script>'");
    res.send('<script>document.location.href=document.referrer;</script>');
  }
});

//여행계획 글쓰기 저장
app.post('/travelEnrollAction', function(req, res){
  var travelKey = firebase.database().ref().child('travels').push().key;
  console.log(req.body);
  var data = {
    travelTotalSpanTime : req.body.travelTotalSpanTime,
    travelWriterID : req.body.travelWriter,
    travelClassify : req.body.travelClassify,
    travelTitle : req.body.travelTitle,
    travelStartDate : req.body.travelStartDate,
    travelCountry : req.body.travelCountry,
    travelWriter : req.body.travelWriter
  };
  var day = 1;
  while(req.body['travelMapPos' + day]){
    data['travelMapPos' + day] = req.body['travelMapPos' + day];
    data['travelContent' + day] = req.body['travelContent' + day];
  }
  firebase.database().ref('travels/' + travelKey).set(data).then(function(){
    res.send("<script>alert('등록되었습니다');"
    + "document.location.href='./"+ req.body.boardType +"';</script>'");
  }).catch(function(error){
    console.log(error);
    res.send("<script>alert('작성 실패');"
    + "document.location.href='./"+ boardType +"';</script>'");
  });
});

//글 삭제
app.get('/deleteActionBoard', function(req, res){

  var key = req.query.key;
  var boardType;
  var writer;
  firebase.database().ref('boards/' + key).once('value', function(snapshot){
    boardType = snapshot.val().boardType;
    writer = snapshot.val().boardWriterID;
  }).then(function(){
    if(!firebase.auth().currentUser){
      res.send("<script>alert('로그인 하세요');"
      + "document.location.href='"+ boardType +"';</script>'");
      return;
    }
    if(firebase.auth().currentUser.email != writer){
      res.send("<script>alert('권한이 없습니다');"
      + "document.location.href='"+ boardType +"';</script>'");
      return;
    }
    firebase.database().ref('/boards/' + key).remove().then(function(){
      console.log(key + ' is deleted');
      res.send("<script>alert('삭제되었습니다');"
      + "document.location.href='./"+ boardType +"';</script>'");
    });
  });
});


module.exports = app;
