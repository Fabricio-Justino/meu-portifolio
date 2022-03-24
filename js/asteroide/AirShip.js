import {
    Vector
} from "../Vector.js";

export class AirShip {

    constructor(posX, posY, lenght) {
        this.pos = new Vector(posX, posY);
        this.len = lenght;
        this.vel = new Vector(1, 0);
        this.acc = new Vector(1, 0);
        this.bullets = [];
        this.cannon = new Vector(this.pos.x + this.len, this.pos.y + (this.len / 2));
        this.vel.limit(7);
        this.acc.limit(7);
    }

    render(frameWokrContext) {
        const c = frameWokrContext;
        const x = this.pos.x;
        const y = this.pos.y;
        const len = this.len;

        c.startRotate(x, y, len, len, this.vel.heading());
        c.strokedTriangle(x, y, x, y + len, x + len, y + (len / 2), 'red', 'white');
        c.endRotate();

        this.bulletsRender(frameWokrContext);
    }

    bulletsRender(frameWokrContext) {
        const c = frameWokrContext;
        this.bullets.forEach(bullet => c.dot(bullet.pos.x, bullet.pos.y, bullet.radius, 'white'));
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    aplyForce(vectorForce) {
        this.acc.add(vectorForce);
    }

    break() {
        this.vel.setMag(0);
        this.acc.setMag(0.1);
    }

    move(action) {
        try {
            this[action]();
            this.cannon.x = (this.pos.x) + this.len * Math.cos(this.vel.heading());
            this.cannon.y = (this.pos.y + (this.len / 2)) + this.len * Math.sin(this.vel.heading());
        } catch {}
    }

    updateBullets(width, height) {
        const INDEXS = [];
        this.bullets.forEach((b, index) => {
            b.pos.add(b.dir);
            const OFF_LEFT_AND_RIGHT = (b.pos.x + b.radius < 0) || (b.pos.x - b.radius > width);
            const OFF_TOP_AND_DOWN = (b.pos.y + b.radius < 0) || (b.pos.y - b.radius > height);
            
            if (OFF_TOP_AND_DOWN || OFF_LEFT_AND_RIGHT) {
                INDEXS.push(index);
            }
        });
        this.reloadBullet(INDEXS);
    }

    ArrowRight() {
        this.acc.setHeading(90 * 0);
    }

    ArrowDown() {

        this.acc.setHeading(90 * 1);
    }

    ArrowLeft() {
        this.acc.setHeadingAngle(90 * 2);

    }

    ArrowUp() {
        this.acc.setHeadingAngle(90 * 3);
    }

    getColisionRect() {
        return {
            'x': this.pos.x,
            'y': this.pos.y,
            'length': this.len
        }
    }


    disparar() {
        if (this.bullets.length <= 5) {
            this.bullets.push({
                'pos': new Vector(this.cannon.x, this.cannon.y),
                'dir': Vector.createVectorByAngle(this.vel.heading()).mult(5),
                'radius': 7
            });
        }
    }

    reloadBullet(indexs) {
        indexs.forEach(index => (this.bullets.splice(index, 1)));
    }
}