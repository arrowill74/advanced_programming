const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const five = require("johnny-five");

// io.set('transports', ['xhr-polling']);
var path = require('path');
app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let x, y, xpr, ypr;
let board = new five.Board();
board.on("ready", function () {
    console.log('Arduino is ready.');

    // socket
    io.on('connection', function (client) {
        client.emit('news', "Socket emit!");

        // joystick part
        let joystick = new five.Joystick({
            pins: ["A4", "A5"]
        });
        joystick.on("change", function () {
            xpr = x;
            ypr = y;
            x = Math.floor(this.x * 10);
            y = Math.floor(this.y * 10);
            emitXY(x, y);
        });

        function emitXY(x, y) {
            client.emit('control', {
                xr: x,
                yr: y
            });
            console.log('Emit XY!')
        };
    });
});

server.listen(3000, () => {
    console.log("Server Started. http://localhost:3000");
});
