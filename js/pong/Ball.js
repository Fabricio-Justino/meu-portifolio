import {
    Vector
} from "../Vector.js"
export class Ball {

    constructor(x, y, width, height, speed) {
        this.pos = new Vector(x, y);
        this.resetVector = new Vector(x, y);
        this.dir = new Vector(-1, -1).setMag(speed);
        this.width = width;
        this.height = height;
    }

    render(pencil) {
        pencil.fillRect(this.pos.x, this.pos.y, this.width, this.height, 'white');
    }

    update() {
        this.pos.add(this.dir);
    }

    crash(racket) {
        const colisionRight = this.pos.x < (racket.x + racket.width);
        const colisionLeft = (this.pos.x + this.width) > racket.x;
        const colisionUp = (this.pos.y + this.height) > racket.y;
        const colisionDown = this.pos.y < (racket.y + racket.height);
        if (colisionRight && colisionLeft && colisionUp && colisionDown) {
            this.dir.x *= -1;
        }
    }

    rebound(height) {
        if ((this.pos.y + this.height >= height) || this.pos.y <= 0) {
            this.dir.y *= -1;
        }
    }

    scoreUp(width) {
        if (this.pos .x+ this.width >= width) {
            this.dir.reverse();
            this.pos = this.resetVector.copy();
            return 'playerScoreUp';
        } else if (this.pos.x <= 0) {
            this.pos = this.resetVector.copy();
            this.dir.reverse();
            return 'enemyScoreUp';
        }
    }
}