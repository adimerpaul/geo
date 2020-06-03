var express=require('express');
var app=express();
var fs=require('fs');
const http = require('http');
const https = require('https');
//var http = require('http').createServer(app);

var key=fs.readFileSync(__dirname+'/certsFiles/selfsigned.key');
var cert=fs.readFileSync(__dirname+'/certsFiles/selfsigned.crt');
var credentials={
    key:key,
    cert:cert
}
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var io = require('socket.io')(httpsServer);

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/leaflet.html');
    res.send('hello');
});
app.get('/publico',(req,res)=>{
    res.sendFile(__dirname + '/publico.html');
});
app.get('/location',(req,res)=>{
    res.sendFile(__dirname + '/location.html');
});
io.on('connection', (socket) => {
socket.on('mensaje', (msg) => {
    //console.log('message: ' + msg);
    io.emit('vuelta', msg);
});
socket.on('location',(dato)=>{
    io.emit('ubicacion', dato);
});
});

httpServer.listen(3000, () => {
    console.log("Http server listing on port : 3000" )
  });
  
  httpsServer.listen(3001, () => {
    console.log("Https server listing on port : 3001" )
  });
  