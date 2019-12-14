var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var firebase = require('firebase/app');
require('firebase/auth');
var app = express();

app.use(bodyParser.urlencoded( {extended : true } ));
var firebaseConfig = {
  apiKey: "AIzaSyCTMbPV8BsmuGgzf97n-At-1CnOV4n0KRA",
  authDomain: "wtgo-17e32.firebaseapp.com",
  databaseURL: "https://wtgo-17e32.firebaseio.com",
  projectId: "wtgo-17e32",
  storageBucket: "wtgo-17e32.appspot.com",
  messagingSenderId: "442941794543",
  appId: "1:442941794543:web:079c3981e37f3d6d77531a",
  measurementId: "G-NFMN1S3123"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.use(bodyParser.urlencoded( {extended : false } ));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(express.static('public'));
app.use('/users', require('./routes/users'));
//app.use('/main', require('./routes/main'));
app.use('/board', require('./routes/board'));
app.get('/',function(req, res){
	res.redirect('/board/plan');
});

http.createServer(app).listen(52273, function(){
	console.log('Server Running at http://127.0.0.1:52273');
});
