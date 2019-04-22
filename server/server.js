const read = require('fs');
const express = require('express');
const session = require('express-session');
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus : 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
}
const password = encodeURIComponent('accrocks@2019')
var url = `mongodb://personalprofileuser:${password}@ds223542.mlab.com:23542/personalprofiledb`;

const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
const path = require('path');
var cors = require('cors');
//const morgan = require('morgan');
var multer = require('multer');
const uuidv4 = require('uuid/v4'); 
const mongoose = require('./dbConnection.js');
//db imports




const ObjectID = require('mongodb').ObjectID;
//const formidable = require('formidable');
//const formidableMiddleware = require('express-formidable');
const port = 4000;
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
/*app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});*/

/*var url = `mongodb://personalprofileuser:${password}@ds223542.mlab.com:23542/personalprofiledb`;

*/
var passport = require('passport')

//app.use(require('morgan'));
app.use(cors(corsOptions));
//app.use(cookieParser('keyboard cat'));
app.use(session({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({url: url}),
  cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/uploads')))
app.use(passport.initialize());
app.use(passport.session());

var local = require('./passport/login')
var initPassport = require('./passport/init');
initPassport(passport);
//const ObjectId = mongoose.Types.ObjectId;
io.on('connection', function (socket) {
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

  
app.use(require('./routes/gets.js'));
app.use(require('./routes/puts.js'));
app.use(require('./routes/posts.js'));
app.use(require('./routes/deletes.js'));

http.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


module.exports =  app 
