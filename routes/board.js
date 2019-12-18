var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

//로그인 체크
var loginChk = function(res){
  var user = firebase.auth().currentUser;
  if(user){
    return true;
  }else{
    res.send("<script>alert('로그인을 해주세요');"
    + "document.location.href=document.referrer;</script>'");
    return false;
  }
}

//본인 확인
var isWriter = function(writer, res){
    var user = firebase.auth().currentUser;
    if(user.email == writer){
      return true;
    }else{
      res.send("<script>alert('권한이 없습니다');"
      + "document.location.href=document.referrer;</script>'");
      return false;
    }
}


//게시판 로드시 사용되는 함수
var initBoard = function(boardType, page, req, res){
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

var initBoard2 = function(boardType, page, req, res){
  var userName;
  var rows = [];
  var stat = {};
  if(firebase.auth().currentUser){
    userName = firebase.auth().currentUser.displayName;
    console.log(userName + ' is LogIn');
  }
  firebase.database().ref('/travels').once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();
      if(childData.travelClassify == boardType){
        childData.key = childSnapshot.key;
        rows.push(childData);
      }
      //통계용 데이터
      if(stat[childData.travelCountry]==1){
        stat[childData.travelCountry]++;
        //console.log(childData.travelCountry);
      }else{
        //console.log(childData);
        stat[childData.travelCountry]=1;
      }
    });
    //console.log(stat);
    console.log(boardType + ' load');
    //console.log(rows);
    res.render(boardType, {boardList : rows, userName : userName, pageNo : page, stat : stat});
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
    if(board){
      board.key = key;
      res.render(path, {board : board, userName : userName, userID : userID});
    }else{
      res.send("<script>alert('존재하지 않는 게시물입니다');"
      + "document.location.href=history.back();</script>");
    }
  });
}

var initContent2 = function(key, path, req, res){
  var userName;
  var userID;
  var board;
  if(firebase.auth().currentUser){
    userName = firebase.auth().currentUser.displayName;
    userID = firebase.auth().currentUser.email;
    console.log(userName + ' is LogIn');
  }
  firebase.database().ref('/travels/' + key).once('value').then(function(snapshot){
    board = snapshot.val();
    //console.log(board);
    if(board){
      board.key = key;
      res.render(path, {board : board, userName : userName, userID : userID});
    }else{
      res.send("<script>alert('존재하지 않는 게시물입니다');"
      + "document.location.href=history.back();</script>");
    }
  });
}


//계획 게시판
app.get('/tripPlan', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard2('tripPlan',page, req, res);
});

app.get('/tripPlan2', function(req, res){
var key = req.query.key;
if(key){
  initContent2(key, 'tripPlan2', req, res);
}else{
  res.send("<script>alert('존재하지 않는 게시물입니다');"
  + "document.location.href=document.referrer;</script>");
}
});

//일지 게시판
app.get('/tripLog', function(req, res){
  var page = req.query.pageNo;
  if(!page){
    page = 1;
  }
  initBoard2('tripLog', page, req, res);
});

app.get('/tripLog2', function(req, res){
  var key = req.query.key;
  if(key){
    initContent2(key, 'tripLog2', req, res);
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
  loginChk(res);
  var user = firebase.auth().currentUser;
  var boardType = req.query.boardType;
  //console.log('write ' + boardType);
  res.render('boardEnroll', {userID :user.email, userName : user.displayName, boardType : boardType});
});

//글쓰기 저장
app.post('/boardEnrollAction', function(req, res){
  loginChk(res);
  var boardKey = firebase.database().ref().child('boards').push().key;
  //console.log(req.body);
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
  loginChk(res);
  var key = req.query.key;
  firebase.database().ref('boards/' + key).once('value').then(function(snapshot){
    var board = snapshot.val();
    board.key = snapshot.key;
    //console.log(board);
    res.render('reformBoard', {board : board});
  });
});
//글쓰기 갱신
app.post('/reformBoardAction', function(req, res){
  loginChk(res);
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
  res.send("<script>alert('변경되었습니다');"
  + "document.location.href='./"+ data.boardType + "2" + "?key="+ key +"';</script>'");
});

//글쓰기 삭제
app.get('/deleteActionBoard', function(req, res){
  loginChk(res);
  var key = req.query.key;
  var boardType;
  var writer;
  firebase.database().ref('boards/' + key).once('value', function(snapshot){
    boardType = snapshot.val().boardType;
    writer = snapshot.val().boardWriterID;
  }).then(function(){
    isWriter(writer, res);
    firebase.database().ref('/boards/' + key).remove().then(function(){
      console.log(key + ' is deleted');
      res.send("<script>alert('삭제되었습니다');"
      + "document.location.href='./"+ boardType +"';</script>'");
    });
  });
});

//여행 계획 글쓰기 폼
app.get('/travelEnroll', function(req, res){
  loginChk(res);
  var user = firebase.auth().currentUser;
  res.render('travelEnroll',{ userID : user.email, userName : user.displayName });
});

//여행계획 글쓰기 저장
app.post('/travelEnrollAction', function(req, res){
  loginChk(res);
  var travelKey = firebase.database().ref().child('travels').push().key;
  //console.log(req.body);
  var data = {
    travelTotalSpanTime : req.body.travelTotalSpanTime,
    travelWriterID : req.body.travelWriterID,
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
    data['travelMapInfo' + day] = JSON.parse(req.body['travelMapInfo' + day]);
    day++;
  }
  console.log(data);
  firebase.database().ref('travels/' + travelKey).set(data).then(function(){
    res.send("<script>alert('등록되었습니다');"
    + "document.location.href='./"+ req.body.travelClassify +"';</script>'");
  }).catch(function(error){
    console.log(error);
    res.send("<script>alert('작성 실패');"
    + "document.location.href='./"+ req.body.travelClassify +"';</script>'");
  });
});

//여행계획 갱신 폼
app.get('/reformTravel', function(req, res){
  loginChk(res);
  var key = req.query.key;
  firebase.database().ref('travels/' + key).once('value').then(function(snapshot){
    var board = snapshot.val();
    board.key = snapshot.key;
    //console.log(board);
    res.render('reformTravel', {board : board});
  });
});

//여행계획 갱신
app.post('/reformTravelAction', function(req, res){
  loginChk(res);
  var key = req.body.key;
  var data = {
    travelTotalSpanTime : req.body.travelTotalSpanTime,
    travelWriterID : req.body.travelWriterID,
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
    data['travelMapInfo' + day] = JSON.parse(req.body['travelMapInfo' + day]);
    day++;
  }
  if(req.body.tripForumMon){
    data.tripForumMon = req.body.tripForumMon;
  }
  firebase.database().ref('travels/' + key).update(data);
  var boardType = data.travelClassify;
  res.send("<script>alert('변경되었습니다');"
  + "document.location.href='./"+ data.travelClassify + "2" + "?key="+ key +"';</script>'");
});


//여행계획 삭제
app.get('/deleteActionTravel', function(req, res){
  loginChk(res);
  var key = req.query.key;
  var boardType;
  var writer;
  firebase.database().ref('travels/' + key).once('value', function(snapshot){
    boardType = snapshot.val().travelClassify;
    writer = snapshot.val().travelWriterID;
  }).then(function(){
    isWriter(writer, res);
    firebase.database().ref('/travels/' + key).remove().then(function(){
      console.log(key + ' is deleted');
      res.send("<script>alert('삭제되었습니다');"
      + "document.location.href='./"+ boardType +"';</script>'");
    });
  });
});


module.exports = app;
