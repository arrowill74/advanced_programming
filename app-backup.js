var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const five = require("johnny-five");
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.set('transports', ['xhr-polling']);
server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});



var index = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// joystick part

// let x, y;
// let board = new five.Board();
// board.on("ready", function () {
//     console.log('Arduino is ready.');
//
//     let joystick = new five.Joystick({
//         pins: ["A4", "A5"]
//     });
//     joystick.on("change", function () {
//         x = this.x;
//         y = this.y;
//         console.log("  x : ", Math.floor(x * 10));
//         console.log("  y : ", Math.floor(y * 10));
//         console.log("--------------------------------------");
//     });
//
//     io.on('connection', function (socket) {
//         client.on('join', function (handshake) {
//             console.log(handshake);
//         });
//
//         socket.emit('news', {hello: 'world'});
//         socket.on('my other event', function (data) {
//             console.log(data);
//         });
//         // client.emit('control', function (data) {
//         //     socket.on('my other event', function (data) {
//         //         console.log(data);
//         //     });
//         // joystick(function (res) {
//         //     if (res) {
//         //         io.emit(x, y);
//         //     } else {
//         //         io.emit('error');
//         //     }
//         // });
//
//         // client.emit('joystick', data);
//         // client.broadcast.emit('joystick', data);
//         // });
//     });
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
