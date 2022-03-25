/*import {
    Vector
} from "./Vector.js";*/

let privateAtributes = {
    'callback': null,
    'drawWorkIstance': null,
    'canvas': null,
    'ctx': null,
    'canClearScreen': true,
    'animationId': null,
    'isStopped': false
}


function loop() {
    if (privateAtributes.canClearScreen) {
        privateAtributes.drawWorkIstance.clearScreen();
    }
    
    privateAtributes.callback();

    if (!privateAtributes.isStopped) {
        privateAtributes.animationId = window.requestAnimationFrame(loop);
    }
}

export class DrawWork {

    constructor(width = 600, height = 400, id) {
        if (id) {
            privateAtributes.canvas = document.getElementById(id);
        } else {
            privateAtributes.canvas = document.querySelector('canvas');
        }
        privateAtributes.ctx = privateAtributes.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        privateAtributes.isStopped = false;
        privateAtributes.canvas.width = this.width;
        privateAtributes.canvas.height = this.height;
        privateAtributes.drawWorkIstance = this;
    }

    draw(callback) {
        privateAtributes.callback = callback;
        loop();
    }

    stop() {
        privateAtributes.isStopped = true;
        window.cancelAnimationFrame(privateAtributes.animationId);
    }
    
    run() {
        privateAtributes.isStopped = false;
        loop();
    }

    stopToClearScreen() {
        privateAtributes.canClearScreen = false;
    }

    continueCleaningScreen() {
        privateAtributes.canClearScreen = true;
    }

    fillTriangle(x0, y0, x1, y1, x2, y2, color = 'black') {
        const ctx = privateAtributes.ctx;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x0, y0);
        this.setColor(color);
        ctx.fill();
        ctx.closePath();
    }

    triangle(x0, y0, x1, y1, x2, y2, strokeColor = 'black') {
        const ctx = privateAtributes.ctx;

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x0, y0);
        this.strokeColor(strokeColor);
        ctx.stroke();
        ctx.closePath();
    }

    strokedTriangle(x0, y0, x1, y1, x2, y2, strokeColor = 'black', color = 'lightgrey') {
        this.triangle(x0, y0, x1, y1, x2, y2, strokeColor);
        this.fillTriangle(x0, y0, x1, y1, x2, y2, color);
    }

    fillRect(x, y, width, height, color = 'white') {
        this.setColor(color);
        privateAtributes.ctx.fillRect(x, y, width, height);
    }

    rect(x, y, width, height, strokeColor = 'black') {
        privateAtributes.ctx.strokeStyle = strokeColor;
        privateAtributes.ctx.strokeRect(x, y, width, height);
    }

    strokedRect(x, y, width, height, color = 'white', strokeColor = 'black') {
        fillRect(x, y, width, height, color);
        rect(x, y, width, height, strokeColor);
    }

    dot(x, y, radius, color = 'white') {
        privateAtributes.ctx.beginPath();
        privateAtributes.ctx.fillStyle = color;
        privateAtributes.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        privateAtributes.ctx.fill();
        privateAtributes.ctx.closePath();
    }

    circle(x, y, radius, color = 'white') {
        privateAtributes.ctx.beginPath();
        privateAtributes.ctx.strokeStyle = color;
        privateAtributes.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        privateAtributes.ctx.stroke();
        privateAtributes.ctx.closePath();
    }

    strokedDot(x, y, radius, color = 'white', strokeColor = 'black') {
        dot(x, y, radius, color);
        circle(x, y, radius, strokeColor);
    }

    backGround(red = 255, blue = 255, green = 255, alpha = 1.0) {
        alpha = (alpha < 0 || alpha > 1) ? 1.0 : alpha;
        const color = `rgba(${red},${green},${blue},${alpha})`
        privateAtributes.ctx.fillStyle = color;
        this.fillRect(0, 0, privateAtributes.canvas.width, privateAtributes.canvas.height, color);
    }

    clearScreen(bgColor = null) {
        privateAtributes.ctx.clearRect(0, 0, privateAtributes.canvas.width, privateAtributes.canvas.height);
        privateAtributes.ctx.fillStyle = bgColor;
        if (bgColor)
            fillRect(0, 0, privateAtributes.canvas.width, privateAtributes.canvas.height, bgColor);
    }

    line(x0, y0, x1, y1) {
        privateAtributes.ctx.beginPath();
        privateAtributes.ctx.moveTo(x0, y0);
        privateAtributes.ctx.lineTo(x1, y1);
        privateAtributes.ctx.stroke();
        privateAtributes.ctx.closePath();
    }

    filledLines(strokeColor = 'black', color = 'lightgrey', ...dots) {
        const ctx = privateAtributes.ctx;
        ctx.beginPath();
        ctx.moveTo(dots[0].x, dots[0].y);
        dots.forEach(dot => ctx.lineTo(dot.x, dot.y));
        ctx.lineTo(dots[0].x, dots[0].y);
        this.setColor(color);
        this.strokeColor(strokeColor);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    lines(strokeColor = 'black', ...dots) {
        const ctx = privateAtributes.ctx;
        ctx.beginPath();
        ctx.moveTo(dots[0].x, dots[0].y);
        dots.forEach(dot => ctx.lineTo(dot.x, dot.y));
        ctx.lineTo(dots[0].x, dots[0].y);
        this.strokeColor(strokeColor);
        ctx.stroke();
        ctx.closePath();
    }

    arrow(x0, y0, x1, y1, arrowWidth = 4, color = 'black') {
        const headlen = 10;
        const angle = Math.atan2(y1 - y0, x1 - x0);

        privateAtributes.ctx.beginPath();
        this.strokeColor(color);
        this.strokeWeight(arrowWidth);

        privateAtributes.ctx.beginPath();
        privateAtributes.ctx.moveTo(x0, y0);
        privateAtributes.ctx.lineTo(x1, y1);
        privateAtributes.ctx.stroke();

        privateAtributes.ctx.beginPath();
        privateAtributes.ctx.moveTo(x1, y1);
        privateAtributes.ctx.lineTo(x1 - headlen * Math.cos(angle - Math.PI / 7),
            y1 - headlen * Math.sin(angle - Math.PI / 7));

        privateAtributes.ctx.lineTo(x1 - headlen * Math.cos(angle + Math.PI / 7),
            y1 - headlen * Math.sin(angle + Math.PI / 7));

        privateAtributes.ctx.lineTo(x1, y1);
        privateAtributes.ctx.lineTo(x1 - headlen * Math.cos(angle - Math.PI / 7),
            y1 - headlen * Math.sin(angle - Math.PI / 7));

        privateAtributes.ctx.stroke();
        privateAtributes.ctx.closePath();


    }

    strokeWeight(weight) {
        privateAtributes.ctx.lineWidth = weight;
    }

    strokeColor(color) {
        privateAtributes.ctx.strokeStyle = color;
    }

    setColor(color) {
        privateAtributes.ctx.fillStyle = color;
    }

    getContext() {
        return privateAtributes.ctx;
    }

    getMidleOfScreen() {
        return {
            'x': this.width / 2,
            'y': this.height / 2
        };
    }

    getCanvas() {
        return privateAtributes.canvas;
    }

    startRotate(x, y, width, height, radian) {
        const centerX = x + (width / 2);
        const centerY = y + (height / 2);
        privateAtributes.ctx.translate(centerX, centerY);
        privateAtributes.ctx.rotate(radian);
        privateAtributes.ctx.translate(-centerX, -centerY);
    }

    startRotateAngle(x, y, width, height, angle) {
        angle = (angle * Math.PI) / 180;
        this.startRotate(x, y, width, height, angle);
    }

    endRotate() {
        privateAtributes.ctx.resetTransform();
    }

    pickSmoothRandom(valueMax, valueMin = 0, interval = 3) {
        const width = Math.floor(valueMin + (Math.random() * (valueMax - valueMin)));
        return {

            next() {
                const n = Math.floor((width - interval) + (Math.random() * ((width + interval) - (width - interval))))
                return n;
            }
        }
    }

    // statics methods

    static pickSmoothRandom(valueMax, valueMin = 0, interval = 3) {
        const width = Math.floor(valueMin + (Math.random() * (valueMax - valueMin)));
        return {

            next() {
                const n = Math.floor((width - interval) + (Math.random() * ((width + interval) - (width - interval))))
                return n;
            }
        }
    }

    static random(minValue, MaxValue) {
        return Math.floor(minValue + Math.random() * (MaxValue - minValue));
    }
}

class bounds {

}