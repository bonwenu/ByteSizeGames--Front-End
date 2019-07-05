var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require ("socket.io").listen(server);

let users = [];
let connections = [];
// Select port
server.listen(process.env.PORT || 3000);
console.log("Server running...");

// Direct to static file in
app.get("/", function(req, res){
    res.sendFile(__dirname + "/components/socket.component.html");
});
// You can use io.sockets.emit/on or io.emit/on to reference server side sockets connected to all clients
// When listening on the server side ,use (socket.on) since you're 
// only listening to one client/socket for a response

// When sockets are connected, listen or send these
io.sockets.on("connection", function(socket){
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);
    
    // Direction/Button pressed
	socket.on("move", function(data) {
        console.log("Data is " + data);
        switch(data) {
            case "left":
                console.log("left");
                io.sockets.emit("printDirection", data);
                break;
            case "right":
                console.log("right");
                io.sockets.emit("printDirection", data);
                break;
            case "up":
                console.log("up");
                io.sockets.emit("printDirection", data);
                break;
            case "down":
                console.log("down");
                io.sockets.emit("printDirection", data);
                break;
        }
    });


    // Disconnect
    socket.on("disconnect", function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s sockets connected", connections.length);
    });
    
});



