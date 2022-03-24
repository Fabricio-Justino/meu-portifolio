import {
    DrawWork
} from "../DrawWork.js";

import {
    Player
} from "./Player.js"

import {
    Ball
} from "./Ball.js";

import {
    Vector
} from "../Vector.js";

let engine = new DrawWork(600, 400, 'pong-canvas');
const h = 80;
const player = new Player(10, 200 - (h / 2), 10, h, 5);
const enemy = new Player(600 - 20, 200 - (h / 2), 10, h, 2);

const ball = new Ball(engine.getMidleOfScreen().x - 10, engine.getMidleOfScreen().y - 10, 10, 10, 3);

const ctx = engine.getContext();

const field = {
    'playerScore': 0,
    'enemyScore': 0,

    render() {
        const h = engine.height / 20;
        const w = 5;
        const interval = 10;
        for (let i = 5; i < 400 - 5; i += h + interval) {
            engine.fillRect(engine.getMidleOfScreen().x - w, i, w, h, 'white');
        }
        ctx.font = '40px serif'
        ctx.fillText(this.playerScore, 255, 40);
        ctx.fillText(this.enemyScore, 320, 40);
    },

    playerScoreUp() {
        this.playerScore++;
    },

    enemyScoreUp() {
        this.enemyScore++;
    }
}

const renderizableObjects = [player, enemy, field, ball];


function loop() {
    engine.backGround(0, 0, 0);
    renderizableObjects.forEach((object) => object.render(engine));
    player.isOffCanvas(engine.height);
    
    ball.update();
    ball.crash(player);
    ball.crash(enemy);
    ball.rebound(engine.height);
    try {
        field[ball.scoreUp(engine.width)]();
    } catch {}
    chaseBall();
}

function chaseBall() {
    let posY = enemy.y + (enemy.height / 2);

    const v = Vector.sub(ball.pos, new Vector(enemy.x, posY));
    v.normalize();
    enemy.y += v.y * enemy.speed;
}

document.querySelectorAll('section>button').forEach((e) => e.addEventListener('', function (e) {
    player[e.target.id]();
}));

window.addEventListener('keydown', function(e) {
    try {
        player.move(e.key);
    } catch {

    }
});
engine.draw(loop);