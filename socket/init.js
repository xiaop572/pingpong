let io=null;
let server=null;
const socketIo=require('socket.io');
const http=require('http');

module.exports=function(app){
    server=http.Server(app);
    io=socketIo(server);
    io.on('connection',function(socket){

    })
}