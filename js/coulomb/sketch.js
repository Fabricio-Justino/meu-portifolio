import { Box } from "./Box.js";

import { DrawWork } from "../DrawWork.js";

const canvas = new DrawWork(600, 400, 'sketch');
const box = new Box();

/*box.add(new Particle(575, 350, 25, -100));
box.add(new Particle(125, 25, 25, -27));
box.add(new Particle(500, 325, 25, 27));
box.add(new Particle(200, 25, 25, 100));*/

canvas.getCanvas().addEventListener('click', function(e) {
    let res = Number(window.prompt('valor da carga?'));

    const mx = e.pageX - canvas.getCanvas().offsetLeft;
    const my = e.pageY - canvas.getCanvas().offsetTop;

    console.log(mx);
    box.add(mx, my, 25, res);
});

canvas.stopToClearScreen();
function update() {
    box.render(canvas);
    box.simulate(canvas.width, canvas.height, true);
}

canvas.draw(update);