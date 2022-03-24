export class Player {

    constructor(x, y, width, height, speed = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    render(pencil) {
        pencil.fillRect(this.x, this.y, this.width, this.height, 'white');
    }

    isOffCanvas(canvasHeight) {
        if (this.y + this.height < -1) {
            this.y = canvasHeight;
        } else if (this.y > canvasHeight + 1) {
            this.y = -this.height;
        }
    }

    ArrowUp() {
        this.y -= this.speed;
    }

    ArrowDown() {
        this.y += this.speed;
    }

    move(key) {
        try{
            this[key]();
        } catch {

        }
    }
}