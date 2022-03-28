import {
    DrawWork
} from "./DrawWork.js";

export class ControlerMobile {

    constructor(container) {
        this.applyStyle(container);
        const $canvas = document.createElement('canvas');
        $canvas.id = 'controler-mobile';
        const ctx = $canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 400, 400);
        container.appendChild($canvas);

        this.engine = new DrawWork(container.clientWidth, container.clientHeight, 'controler-mobile');
        this.canvas = $canvas;
        this.ArrowUp = null;
        this.ArrowDown = null;
        this.ArrowLeft = null;
        this.ArrowRight = null;
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

    applyStyle(container) {
        const c = container;

        c.style.display = 'block';
        c.style.margin = '0 auto';
        c.style.maxWidth = '600px';
        c.style.maxHeight = '50vh'
        c.style.width = '100%';
        c.style.height = '100%';
    }

    pad(c, w, h) {
        const wp = this.percentToPixel(w, 10);
        const hp = this.percentToPixel(h, 10);

        c.fillRect(15, h / 2, 65 + wp, 25 + hp, 'white');
        c.fillRect((65 / 3) + (25 / 2), (h / 2) - 20, 25 + wp, 65 + hp, 'white');

        c.fillRect(20, h / 2 + (5 / 2), 55 + wp, 20 + hp, 'grey');
        c.fillRect((65 / 3) + (30 / 2), (h / 2) - 15, 20 + wp, 55 + hp, 'grey');

        this.ArrowUp = (e) => {
            const MOUSE_X = e.pageX - e.target.offsetLeft;
            const MOUSE_Y = e.pageY - e.target.offsetTop;

            const x = (65 / 3) + (30 / 2);
            const y = (h / 2) - 15;
            const width = 20 + wp;
            const height = 55 + hp;

            // C = COLISION
            const C_LEFT = MOUSE_X > x;
            const C_RIGHT = MOUSE_X < x + width;
            const C_UP = MOUSE_Y > y;
            const C_DOWN = MOUSE_Y < y + height / 3;

            if (C_DOWN && C_RIGHT && C_UP && C_LEFT) {
                return true;
            } else {
                return false;
            }

        };

        this.ArrowDown = (e) => {
            const MOUSE_X = e.pageX - e.target.offsetLeft;
            const MOUSE_Y = e.pageY - e.target.offsetTop;

            const x = (65 / 3) + (30 / 2);
            const y = (h / 2) - 15;
            const width = 20 + wp;
            const height = 55 + hp;

            // C = COLISION
            const C_LEFT = MOUSE_X > x;
            const C_RIGHT = MOUSE_X < x + width;
            const C_UP = MOUSE_Y > y * 2;
            const C_DOWN = MOUSE_Y < (y * 2) + height;

            if (C_DOWN && C_RIGHT && C_UP && C_LEFT) {
                return true;
            } else {
                return false;
            }
        };

        this.ArrowLeft = (e) => {
            const MOUSE_X = e.pageX - e.target.offsetLeft;
            const MOUSE_Y = e.pageY - e.target.offsetTop;

            const x = 20;
            const y = h / 2 + (5 / 2);
            const width = 55 + wp;
            const height = 20 + hp;

            // C = COLISION
            const C_LEFT = MOUSE_X > x;
            const C_RIGHT = MOUSE_X < x + width / 4;
            const C_UP = MOUSE_Y > y;
            const C_DOWN = MOUSE_Y < y + height;


            if (C_DOWN && C_RIGHT && C_UP && C_LEFT) {
                return true;
            } else {
                return false;
            }
        };

        this.ArrowRight = (e) => {
            const MOUSE_X = e.pageX - e.target.offsetLeft;
            const MOUSE_Y = e.pageY - e.target.offsetTop;

            const x = 20;
            const y = h / 2 + (5 / 2);
            const width = 55 + wp;
            const height = 20 + hp;

            // C = COLISION
            const C_LEFT = MOUSE_X > x * 5;
            const C_RIGHT = MOUSE_X < x * 5 + width;
            const C_UP = MOUSE_Y > y;
            const C_DOWN = MOUSE_Y < y + height;


            if (C_DOWN && C_RIGHT && C_UP && C_LEFT) {
                return true;
            } else {
                return false;
            }
        };

    }

    buttons(c, w, h) {

        // r = radius
        const r = 25;
        const marginX = this.percentToPixel(w, 40);
        const marginY = this.percentToPixel(h, 40);

        c.fillRect(w - marginX, h - marginY, r * 2, r * 2, 'white');
        c.dot(w - (marginX - r), h - (marginY - r), r, 'grey');

        c.fillRect(w - marginX + r * 4, h - marginY, r * 2, r * 2, 'white');
        c.dot(w - (marginX - r) + r * 4, h - (marginY - r), r, 'grey');
    }

    strat() {

    }

    click(e) {

        if (this.ArrowLeft(e)) {
            return "ArrowLeft"
        }

        if (this.ArrowRight(e)) {
            return "ArrowRight";
        }

        if (this.ArrowUp(e)) {
            return "ArrowUp"
        }

        if (this.ArrowDown(e)) {
            return "ArrowDown";
        }
    }

    percentToPixel(maxPixel, percent) {
        return (maxPixel / 100) * percent;
    }
}