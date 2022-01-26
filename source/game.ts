class Game {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    timer: Timer;

    dt: number = 0;
    entities: Entity[] = new Array();
    quit: boolean = false;

    constructor(width: number, height: number, ctx: CanvasRenderingContext2D, timer: Timer) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.timer = timer;
    }

    loop() : void {
        this.timer.tick();

        this.ctx.clearRect(0,0,this.width,this.height);

        for (let i = 0; i < this.entities.length; ++i) {
            let entity = this.entities[i];
            entity.update();
            entity.draw();
        }

        if (!this.quit) {
            requestAnimationFrame(this.loop.bind(this));
        }
    }

    run() : void {
        requestAnimationFrame(this.loop.bind(this));
    }
};
