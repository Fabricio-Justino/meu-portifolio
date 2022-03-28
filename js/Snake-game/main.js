import {
    DrawWork
} from "../DrawWork.js";

import {
    Snake
} from "./Snake.js";

import {
    ControlerMobile
} from "../controleMobile.js";


const $container = document.querySelectorAll('.container');
const GAME = new DrawWork($container[0].clientWidth, $container[0].clientHeight, 'canvas');
const $div = document.querySelector('#game-over');
$div.classList.add('game-over');

let resolution = (GAME.width / 100) * 2;
let gridRow = Math.floor(GAME.height / resolution);
let gridCol = Math.floor(GAME.width / resolution);
let grid = new Array(gridRow).fill(null).map(el => new Array(gridCol).fill(0));
let snake = new Snake(9, 14, grid);

let color = 'red';
let thereIsfruitInGame = false;
let isGameOver
let score = 0;

const controler = new ControlerMobile(document.querySelector('.controller'));

function makeFruit() {
    if (!thereIsfruitInGame) {
        let row = DrawWork.random(0, grid.length - 1);
        let col = DrawWork.random(0, grid[0].length - 1);

        while (grid[row][col] !== 0) {
            row = DrawWork.random(0, grid.length - 1);
            col = DrawWork.random(0, grid[0].length - 1);
        }

        grid[row][col] = 2;
        thereIsfruitInGame = true;
        snake.putFruit(row, col);
        color = pickRandomColor();
    }
}

let frameCount = 1;

function loop() {
    $div.innerHTML = `pontos: ${score}`;
    GAME.backGround(0, 0, 0);
    if (isGameOver) {
        $div.innerHTML = 'Game over';
        GAME.stop();
    }
    renderGrid(grid);
    makeFruit();
    if (frameCount % 5 === 0) {
        update();
    }
    frameCount++;
}

function pickRandomColor() {
    const r = DrawWork.random(0, 255);
    const g = DrawWork.random(0, 255);
    const b = DrawWork.random(0, 255);
    return `rgb(${r} ${g} ${b})`;
}

function renderGrid(grid) {
    grid.forEach((array, row) => {
        array.forEach((el, col) => {
            if (el === 2) {
                GAME.fillRect(col * resolution, row * resolution, resolution, resolution, color);
            }

            if (el === 1) {
                GAME.fillRect(col * resolution, row * resolution, resolution, resolution, 'blue');
            }
        });
    });
}

function update() {
    isGameOver = snake.update();
    thereIsfruitInGame = !snake.isCatchingFruit();
    scoreUp();
}

function scoreUp() {
    if (!thereIsfruitInGame) {
        score++;
    }
}

window.addEventListener('keydown', keydown);

controler.canvas.addEventListener('click', function(e) {
    snake.move(controler.click(e));
});

function keydown(e) {
    snake.move(e.key);
}

GAME.draw(loop);
controler.start();

window.addEventListener('resize', function (e) {
    GAME.setDimension($container[0].clientWidth, $container[0].clientHeight);
    let resolution = (GAME.width / 100) * 2;
    let gridRow = Math.floor(GAME.height / resolution);
    let gridCol = Math.floor(GAME.width / resolution);
    let grid = new Array(gridRow).fill(null).map(el => new Array(gridCol).fill(0));
    let snake = new Snake(9, 14, grid);
});