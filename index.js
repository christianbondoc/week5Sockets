const server = require("http").Server();
const port = process.env.PORT || 6969;

var io = require("socket.io")(server);

var allusers = [];

io.on("connection", function(socket){
    console.log("Someone is connected");
    allusers.push(socket.id);
    console.log(socket.id)


    socket.emit("yourid", socket.id);
    io.emit("createimage", allusers);


    socket.on("mymove", (data)=> {
        socket.broadcast.emit("usermove", data);    
    });


    socket.on("disconnect", () => {
        var index = allusers.indexOf(socket.id);
        allusers.splice(index, 1);
        io.emit("createimage", allusers);
        console.log("Someone disconnected")
    })


    
});

server.listen(port, (err) => {
    if(err) {
        console.log(Err);
        return false;
    }
    else {
        console.log("Port is running");
    }
})