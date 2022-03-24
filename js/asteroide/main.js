import {
    Asteroide
} from "./Asteroide.js"

import {
    Vector
} from "../Vector.js";

import {
    DrawWork
} from "../DrawWork.js"

import {
    AirShip
} from "./AirShip.js"

import {
    Space
} from "./Space.js";

const con = new DrawWork();
const ctx = con.getContext();
const x = con.getMidleOfScreen().x;
const y = con.getMidleOfScreen().y;

let key = null;
let isPressed = false;

const player = new AirShip(500, 200, 20);


let frameCount = 0;

const SPACE = new Space(player);

con.draw(render);

function render() {
    const speed = Vector.createVectorByAngle(player.acc.heading()).mult(1.1);

    con.backGround(0, 0, 0);
    SPACE.render(con);

    if (SPACE.asteroides.length <= 0) {
        createMeteore();
    }

    if (isPressed) {
        player.aplyForce(speed);
        player.move(key);
    }
    player.update();
    frameCount++;
}

function createMeteore() {
    for (let v = 0; v < 3; v++) {
        SPACE.addAteroide(DrawWork.random(-60, (600+30)), DrawWork.random(500, 600), x, y, con);
        for (let i = 0; i < 3; i++) {
            SPACE.addAteroide(DrawWork.random(-60, (600+30)), DrawWork.random(-200, 0), x, y, con)
        }
    }
}

//con.draw(render);

let c = con.getCanvas();

window.addEventListener('keydown', function (e) {
    isPressed = player.__proto__.hasOwnProperty(e.key);
    key = e.key;
});

window.addEventListener('keyup', function (e) {
    isPressed = false;
    key = (key == ' ') ? 'disparar' : key;
    try {
        player[key]();
    } catch {}
});