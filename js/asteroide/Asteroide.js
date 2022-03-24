import {
    Vector
} from '../Vector.js';

export class Asteroide {

    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(1, 1);
        this.maxRadius = 0;
        this.dots = null;
    }

    
    createDots(frameworkContext) {
        let maxRadius = 0;
        const dots = [];
        const r = frameworkContext.pickSmoothRandom(50, 20, 3);
        for(let i = 0; i < 360; i+=12) {
            const radius = r.next();
            const x = this.pos.x - radius * Math.cos(Vector.toRadian(i));
            const y = this.pos.y + radius * Math.sin(Vector.toRadian(i));
            maxRadius = (maxRadius >= radius) ? maxRadius : radius; 
            dots.push(new Vector(x, y));
        }
        this.dots = dots;
        this.maxRadius = maxRadius;
    }

    render(frameWorkContext) {
        const ctx = frameWorkContext;
        ctx.filledLines('red', 'white', ...this.dots);
    }

    setVel(value) {
        this.vel.setMag(value);
    }

    setTragetory(x, y) {
        const v = new Vector(x, y);
        const t = Vector.sub(v, this.pos);
        this.vel.setHeading(t.heading());
    }

    update() {
        this.pos.add(this.vel);
        this.dots.forEach(dot => dot.add(this.vel));
    }

    colized(...bullets) {
        let vali = {
            'colized': false,
            'bulletIndex': 0,
        };
        bullets.forEach((b, index) => {
            if(Vector.sub(b.pos, this.pos).mag() - (this.maxRadius + b.radius) <= 0) {
                vali.colized = true;
                vali.bulletIndex = index;
            }
        });
        return vali;
    }

    crash(airship) {
        const SQUERE = airship.getColisionRect();

        const ENTER_LEFT = (this.pos.x + this.maxRadius) > SQUERE.x;
        const ENTER_RIGHT = (this.pos.x - this.maxRadius) < (SQUERE.x + SQUERE.length);
        const ENTER_UP = (this.pos.y + this.maxRadius) > SQUERE.y;
        const ENTER_DOWN = (this.pos.y - this.maxRadius) < (SQUERE.y + SQUERE.length);
        
        //console.log(ENTER_RIGHT);
        const COLIZED = ENTER_DOWN && ENTER_UP && ENTER_RIGHT && ENTER_LEFT;

        if(COLIZED) {
           return true;
        }

        return false;
    }
    
}
