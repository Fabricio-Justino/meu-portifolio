import {
    Vector
} from "../Vector.js";

export class Snake {

    constructor(row, col, grid) {
        this.row = row;
        this.col = col;
        this.dir = new Vector(1, 0);
        this.grid = grid;
        this.lc = 0;
        this.lr = 0;

        this.fruitRow = 0;
        this.fruitCol = 0;

        this.taill = [];
    }

    isCatchingFruit() {
        if (this.row === this.fruitRow && this.col === this.fruitCol) {
            const len = this.taill.length - 1;

            if (this.taill.length === 0) {
                this.taill.push(new Tail(this.lr, this.lc, this.grid));
            } else {
                this.taill.push(new Tail(this.taill[len].lr, this.taill[len].lc, this.grid));
            }
            return true;
        }
        return false;
    }

    putFruit(row, col) {
        this.fruitCol = col;
        this.fruitRow = row;
    }

    update() {
        let colized = false;
        let lr = this.lr = this.row;
        let lc = this.lc = this.col;

        this.col += Math.round(this.dir.x);
        this.row += Math.round(this.dir.y);

        if (this.row < 0) {
            this.row = this.grid.length - 1;
        } else if (this.row > this.grid.length - 1) {
            this.row = 0;
        }

        if (this.col < 0) {
            this.col = this.grid[0].length - 1;
        } else if (this.col > this.grid[0].length - 1) {
            this.col = 0;
        }

        this.grid[this.row][this.col] = 1;
        this.grid[lr][lc] = 0;

        let ltc = lc;
        let ltr = lr;
        this.taill.forEach(tail => {
            tail.update(ltr, ltc);
            ltc = tail.lc;
            ltr = tail.lr;

            if (this.row === tail.row && this.col === tail.col) {
                colized = true;
            }
        });
        return colized;
    }

    move(where) {
        try {
            this[where]();
        } catch (err) {}
    }

    ArrowRight() {
        this.dir.setHeadingAngle(90 * 0);
    }

    ArrowDown() {
        this.dir.setHeadingAngle(90 * 1);
    }

    ArrowLeft() {
        this.dir.setHeadingAngle(90 * 2);
    }

    ArrowUp() {
        this.dir.setHeadingAngle(90 * 3)
    }

}

class Tail {

    constructor(row, col, grid) {
        this.row = row;
        this.col = col;
        this.lc = 0;
        this.lr = 0;
        this.grid = grid;
    }

    update(row, col) {
        const lr = this.lr = this.row;
        const lc = this.lc = this.col;

        this.row = row;
        this.col = col;

        this.grid[this.row][this.col] = 1;
        this.grid[lr][lc] = 0;

    }
}