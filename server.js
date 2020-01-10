var express = require('express');
var app = express();

var server = app.listen(4444, function () {

});

const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on("connection", socket => {
    io.clients((error, clients) => {
        if (error) throw error;
    });

    socket.on("fetchLocation", location => {
        socket.broadcast.emit('otherPositions', location);
    });
});