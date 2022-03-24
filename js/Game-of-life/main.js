import {
    DrawWork
} from "../DrawWork.js";

const game = new DrawWork(600, 400, 'canvas');

const WIDTH = 10;

const cw = game.width;
const ch = game.height;

let cells = new Array(ch/WIDTH).fill(null).map(el => Array(cw/WIDTH).fill(0));
let isRuning = false;



const CANVAS = game.getCanvas();



function createBlankCells() {
    cells = new Array(ch/WIDTH).fill(null).map(el => Array(cw/WIDTH).fill(0));
}

function update() {
    game.backGround(0, 0, 0);
    if (isRuning) {
        cells = nextGeneration(cells);
    }
    render(cells);
}

function makecellsArray(row, coulumn) {
    if (!isRuning) {
        game.rect(coulumn * WIDTH, row * WIDTH, WIDTH, WIDTH, 'white');
    }
}

function nextGeneration(cellsArray) {
    const copy = cellsArray.map(arr => [...arr]);

  for (let col = 0; col < cellsArray.length; col++) {
    for (let row = 0; row < cellsArray[col].length; row++) {

      const cell = cellsArray[col][row];
      let sumOfValue = 0;

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

          if (i === 0 && j === 0) {
            continue;
          }

          const x_cell = col + i;
          const y_cell = row + j;

          if (x_cell >= 0 && y_cell >= 0 && x_cell < ch/WIDTH && y_cell < cw/WIDTH) {
            const currentNeighbour = cellsArray[col + i][row + j];
            sumOfValue += currentNeighbour;
          }
        }
      }

      if (cell === 1 && sumOfValue < 2) {
        copy[col][row] = 0;
      } else if (cell === 1 && sumOfValue > 3) {
        copy[col][row] = 0;
      } else if (cell === 0 && sumOfValue === 3) {
        copy[col][row] = 1;
      }
    }
  }
  return copy;
}

function render(cellsArray) {
    for (let i = 0; i < cellsArray.length; i++) {
        for (let j = 0; j < cellsArray[i].length; j++) {
            if (cells[i][j] != 0) {
                game.fillRect(j * WIDTH, i * WIDTH, WIDTH, WIDTH, 'yellow');
            }
            makecellsArray(i, j);
        }
    }
}

function turn(mouseX, mouseY) {
    if (!isRuning) {
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                const px = j * WIDTH;
                const py = i * WIDTH;

                const CL = mouseX > px;
                const CR = mouseX < px + WIDTH;
                const CU = mouseY > py;
                const CD = mouseY < py + WIDTH;

                if (CL && CR && CU && CD) {
                    cells[i][j] = (cells[i][j] == 0) ? 1 : 0;
                }
            }
        }
    }
}

CANVAS.addEventListener('click', function (e) {
    const MOUSE_X = e.pageX - e.target.offsetLeft
    const MOUSE_Y = e.pageY - e.target.offsetTop
    turn(MOUSE_X, MOUSE_Y);
});

game.draw(update);

const $btln = document.getElementById('reset');
$btln.addEventListener('click', (e) => createBlankCells());

document.querySelectorAll('button').forEach($el => {
    $el.onclick = () => {
        isRuning = $el.id === 'run';
        $btln.disabled = isRuning;
    }
});
