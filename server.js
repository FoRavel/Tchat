const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var path = require('path')


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('petit_nouveau', (pseudo)=>{
    socket.pseudo = pseudo;
    socket.broadcast.emit('petit_nouveau', pseudo+' vient de se connecter!');
  })
  //reception d'un message et diffusion à tous les clients sauf à l'envoyeur
  socket.on('message', (message)=>{
    socket.broadcast.emit('message', socket.pseudo + ' : ' + msg);
  })
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

server.listen(port);
