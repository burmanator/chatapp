var express = require('express');
var http = require('http');
// var bodyParser = require('body-parser');
var app = express();
var httpServer = http.createServer(app);
var io = require('socket.io')(httpServer);
// var messages = [];

// app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log("Received", req.method, "request for resource", req.path, "from", req.ip);
  next(); // callback to the middleware function
});

// app.post('/', function(req,res){
//   res.send({
//     newMessages: messages.slice(req.body.nextIdx),
//     nextIdx:messages.length,
//     isLastClient:false
//   });
// });

// app.post('/newMsg', function(req,res){
//   messages.push(req.body.msg);
//   res.send({
//     newMessages: messages.slice(req.body.nextIdx),
//     nextIdx:messages.length,
//     isLastClient:true
//   });
// });

app.use(express.static('src'));

httpServer.listen(3000, function(){
    console.log("Listening on port 3000");
});

//=============SERVER =============//


// other middleware from earlier goes here

var numClients = 0;
io.on('connection', function(client) {
	console.log('Client', numClients++, 'connected.');

	client.on('join', function(data) {
    
	console.log(data);
  });
  
  client.on("chat", function(msg) {
    console.log(msg);
    client.broadcast.emit('chat msg', msg);
    });
});
