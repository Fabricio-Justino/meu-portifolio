import {
    AirShip
} from "./AirShip.js";
import {
    Asteroide
} from "./Asteroide.js";

export class Space {

    constructor(airship) {
        this.airship = airship;
        this.asteroides = [];
    }

    render(context) {
        this.colision();
        this.airshipRender(context);
        this.asteroidesRender(context);
        this.update();
    }

    update() {
        this.airship.updateBullets();
        this.asteroides.forEach(as => as.update());
    }

    asteroidesRender(context) {
        this.asteroides.forEach(asteroide => asteroide.render(context));
    }

    airshipRender(context) {
        this.airship.render(context);
    }

    crashAirship() {
        this.asteroides.forEach(as => {
            const COLIZED = as.crash(this.airship);
            if (COLIZED) {
                console.log('bateu meu');
            }
        });
    }

    crashAsteroide() {
        const INDEXS = []
        this.asteroides.forEach((as, index) => {
            const VALI = as.colized(...this.airship.bullets);
            if(VALI.colized) {
                INDEXS.push(index);
                this.airship.bullets.splice(VALI.bulletIndex, 1);
            }
        });
        this.removeAsteroides(INDEXS);
    }

    addAteroide(x, y, tragetoryX, tragetoryY, context) {
        if (this.asteroides.length < 10) {
            const ASTEROIDE = new Asteroide(x, y);
            ASTEROIDE.createDots(context);
            ASTEROIDE.setTragetory(tragetoryX, tragetoryY);
            this.asteroides.push(ASTEROIDE);
        }
    }

    removeAsteroides(indexs) {
        indexs.forEach(index => this.asteroides.splice(index, 1));
    }

    colision() {
        this.crashAsteroide();
        this.crashAirship();
    }
}