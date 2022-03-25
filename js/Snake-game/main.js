import {
    DrawWork
} from "../DrawWork.js";
import {
    Snake
} from "./Snake.js";

const GAME = new DrawWork(600, 400, 'canvas');
const WIDTH = 10;
const $div = document.getElementById('game-over');
$div.classList.add('game-over');

let color = 'red';
let grid = new Array(400 / WIDTH).fill(null).map(el => new Array(600 / WIDTH).fill(0));
let snake = new Snake(9, 14, grid);
let thereIsfruitInGame = false;
let isGameOver
let score = 0;

function makeFruit() {
    if(!thereIsfruitInGame) {
        let row = DrawWork.random(0, grid.length-1);
        let col = DrawWork.random(0, grid[0].length-1);
        
        while(grid[row][col] !== 0) {
            row = DrawWork.random(0, grid.length-1); 
            col = DrawWork.random(0, grid[0].length-1); 
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
                GAME.fillRect(col * WIDTH, row * WIDTH, WIDTH, WIDTH, color);
            }

            if (el === 1) {
                GAME.fillRect(col * WIDTH, row * WIDTH, WIDTH, WIDTH, 'blue');
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

GAME.draw(loop);

window.addEventListener('keydown', keydown);

function keydown(e) {
    snake.move(e.key);
}