const five = require("johnny-five");
let board = new five.Board();

function arduino() {
    board.on("ready", function () {
        console.log('Arduino is ready.');
        let joystick = new five.Joystick({
            pins: ["A4", "A5"]
        });
        let xy = [this.x, this.y];
        joystick.on("change", function () {
            // console.log("Joystick");
            // console.log("  x : ", this.x);
            // console.log("  y : ", this.y);
            // console.log("--------------------------------------");

           return xy;
        });
    });
}

module.exports = arduino;