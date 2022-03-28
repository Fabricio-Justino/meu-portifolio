import {
    DrawWork
} from "../DrawWork.js";

const $container = document.querySelector('.container');
console.log($container);
const canvas = new DrawWork($container.clientWidth, $container.clientHeight, 'canvas');
const ctx = canvas.getContext();
let up;

let x, y, radius;

x = (canvas.width / 100) * 15;
y = canvas.height / 2;
radius = (canvas.width / 100) * 12;

let angle = Math.PI / 2;

const spots = [];

update();
canvas.stopToClearScreen();

function update() {
    canvas.backGround(0, 0, 0, 0.25);
    canvas.circle(x, y, radius, 'white');

    let point = {
        x: x + Math.sin(angle) * radius,
        y: y + Math.cos(angle) * radius,
        radius: radius - radius * (80 / 100),
        getArm() {
            return (x + y) - radius;
        }
    };

    canvas.strokeColor('red');
    canvas.line(x + radius, y, canvas.width, y);
    canvas.strokeColor('white');
    canvas.dot(point.x, point.y, point.radius, 'white');
    angle += 0.05;
    angle = (angle > Math.PI * 2) ? 0 : angle;

    canvas.line(point.x, point.y, point.getArm(), point.y);

    spots.push({
        x: point.getArm(),
        y: point.y
    });

    render();
}

function render() {
    ctx.beginPath();
    ctx.moveTo(spots[0].x, spots[0].y);

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        ctx.lineTo(spot.x, spot.y);
        spot.x++;
    }

    if (spots.length > 410) spots.shift();

    ctx.stroke();
    ctx.closePath();
}

canvas.draw(update);

window.addEventListener('resize', function (e) {
    canvas.setDimension($container.clientWidth, $container.clientHeight);
    x = (canvas.width / 100) * 15;
    y = canvas.height / 2;
    radius = (canvas.width / 100) * 12;
});