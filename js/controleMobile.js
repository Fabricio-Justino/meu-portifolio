import {
    DrawWork
} from "./DrawWork.js";

export class ControlerMobile {

    constructor(container) {
        const $canvas = document.createElement('canvas');
        $canvas.id = 'controler-mobile';
        const ctx = $canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 400, 400);
        container.appendChild($canvas);
        this.engine = new DrawWork(container.clientWidth, container.clientHeight, 'controler-mobile');
    }

    start() {
        const c = this.engine;
        const w = c.width;
        const h = c.height;
        c.backGround(200, 200, 200);

        c.fillRect(5, 15, w - 10, h - 20, 'rgb(0,0,0,0.9)');
        this.pad(c, w, h);
        this.buttons(c, w, h);
    }

    pad(c, w, h) {
        const wp = this.percentToPixel(w, 10);
        const hp = this.percentToPixel(h, 10);

        c.fillRect(15, h / 2, 65 + wp, 25 + hp, 'white');
        c.fillRect((65 / 3) + (25 / 2), (h / 2) - 20, 25 + wp, 65 + hp, 'white');
        c.endScale();
        c.fillRect(20, h / 2 + (5 / 2), 55 + wp, 20 + hp, 'grey');
        c.fillRect((65 / 3) + (30 / 2), (h / 2) - 15, 20 + wp, 55 + hp, 'grey');
    }

    buttons(c, w, h) {

        // r = radius
        const r = 25;
        const marginX = 180;
        const marginY = 165;

        c.fillRect(w - marginX, h - marginY, r * 2, r * 2, 'white');
        c.dot(w - (marginX - r), h - (marginY - r), r, 'grey');

        c.fillRect(w - marginX + r*4, h - marginY, r * 2, r * 2, 'white');
        c.dot(w - (marginX - r) + r*4, h - (marginY - r), r, 'grey');
    }

    strat() {

    }

    percentToPixel(maxPixel, percent) {
        return (maxPixel / 100) * percent;
    }
}