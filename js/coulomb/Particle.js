import { Vector } from "../Vector.js";

export class Particle {

    constructor(x, y, radius, charge) {
        this.position = new Vector(x, y);
        this.acc = new Vector();
        this.vel = new Vector();
        this.radius = radius;
        this.charge = charge;
    }

    render(engine) {
        let ctx = engine.getContext();
        let color = (this.charge > 0) ? 'red' : 'blue';
        color = (this.charge === 0) ? 'grey' : color;
        ctx.font = '18px serif';
        ctx.textAlign = 'center';
        engine.dot(this.position.x, this.position.y, this.radius, color);
        engine.setColor('black');
        ctx.fillText(this.charge, this.position.x, this.position.y + this.radius / 5);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    setForce(force) {
        this.acc = force;
    }

    update(width, height) {
        if (this.position.x + this.radius > width) {
            this.position.x = width - this.radius
            this.vel.x *= -1;
        } else if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.vel.x *= -1;
        }

        if (this.position.y + this.radius > height) {
            this.position.y = height - this.radius;
            this.vel.y *= -1
        } else if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.vel.y *= -1
        }

        this.vel.add(this.acc);
        this.acc.add(this.vel);
        this.position.add(this.vel);

    }

}