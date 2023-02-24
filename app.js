var express = require('express');
var config = require('config');
var bodyParser = require('body-parser');
var session = require('express-session');
var socket = require('socket.io');
var chat = require('./app/common/controlData');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1) 
app.use(session({
  secret: config.get('secret_key'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use("/static", express.static(__dirname + "/public"));

var controllers = require('./app/controllers');
app.use(controllers);


var host = config.get('server.host');
var port = config.get('server.port');



var server = app.listen(port, host, function() {
    console.log("Server is running on port " + port);
} );

var io = socket(server);

var socketController = require('./app/common/controlData')(io);
if(socketController){
    console.log("Socket controller is running");
}

