var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require ("socket.io").listen(server);

let users = [];
let connections = [];

server.listen(process.env.PORT || 3000);
console.log("Server running...");

app.get("/", function(req, res){
    res.sendFile(__dirname + "/components/chat-demo/game.component.html");
});

io.sockets.on("connection", function(socket){
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);
    });


    // Disconnect
    socket.on("disconnect", function(data) {
        
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        //connections.splice(connections.indexOf(socket), 1);
        connections.pop(socket);
        console.log("Disconnected: %s sockets connected", connections.length);

    });

    socket.on('countdown', function(data){
        console.log("Countdown Data: " + data);
        io.sockets.emit('countdown', data);
    });
    

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        console.log("Chattttttt");
        io.sockets.emit('chat', data);
    });

    socket.on('displayQuestion', function(data){
        console.log("Displaying Data from Server.js: " + data);
        io.sockets.emit('displayQuestion', data);
    });


    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    function updateUsernames() {
        io.sockets.emit("get users", users);
    };

    socket.on("hello", function(data) {
        console.log(data);
        
    });
