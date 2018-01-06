(function () {
    var socket = io.connect(window.location.hostname + ':' + 3000);
    var xr = document.getElementById('x-reading');
    var yr = document.getElementById('y-reading');

    socket.on('connect', function (data) {
        socket.emit('join', 'Client is connected!');
    });

    // function emitValue(color, e) {
    //     socket.emit('rgb', {
    //         color: color,
    //         value: e.target.value
    //     });
    // }

    red.addEventListener('change', emitValue.bind(null, 'red'));
    blue.addEventListener('change', emitValue.bind(null, 'blue'));
    green.addEventListener('change', emitValue.bind(null, 'green'));

    socket.on('joystick', function (data) {
        var color = data.color;
        document.getElementById(color).value = data.value;
    });
}());