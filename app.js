var http = require('http');
var fs = require('fs');


// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});


// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket, psd) {

     socket.on('petit_nouveau', function(psd){
       socket.pseudo = psd;
       socket.broadcast.emit('message', socket.pseudo + ' vient de se connecter!');
     });
     socket.on('message', function (msg){
       socket.broadcast.emit('message', socket.pseudo + ' : ' + msg);
     });
});


server.listen(8080);
