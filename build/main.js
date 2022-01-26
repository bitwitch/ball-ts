"use strict";
class Entity {
    constructor() {
        this.pos = new Vec2();
        this.vel = new Vec2();
        this.acc = new Vec2();
    }
}
class Ball extends Entity {
    constructor(radius, color, pos, vel, acc) {
        super();
        this.squish = 0;
        this.radius = radius;
        this.color = color !== undefined ? color : "#000000";
        this.pos = pos !== undefined ? pos : this.pos;
        this.vel = vel !== undefined ? vel : this.vel;
        this.acc = acc !== undefined ? acc : this.acc;
    }
    update() {
        this.vel.x += this.acc.x * g.dt;
        this.vel.y += this.acc.y * g.dt;
        if (this.squish != 0) {
            this.pos.y = g.height - this.radius - this.squish;
            this.squish = 0;
        }
        this.pos.x += this.vel.x * g.dt;
        this.pos.y += this.vel.y * g.dt;
        if (this.pos.y > g.height - this.radius) {
            this.squish = this.pos.y - (g.height - this.radius);
            this.vel.y *= -1;
        }
        if (this.pos.x > g.width - this.radius) {
            this.pos.x = g.width - this.radius;
            this.vel.x *= -1;
        }
        else if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x *= -1;
        }
    }
    draw() {
        g.ctx.beginPath();
        g.ctx.fillStyle = this.color;
        g.ctx.ellipse(this.pos.x, this.pos.y, this.radius, this.radius - (0.5 * this.squish), 0, 0, 2 * Math.PI);
        g.ctx.fill();
    }
}
class Game {
    constructor(width, height, ctx, timer) {
        this.dt = 0;
        this.entities = new Array();
        this.quit = false;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.timer = timer;
    }
    loop() {
        this.timer.tick();
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.entities.length; ++i) {
            let entity = this.entities[i];
            entity.update();
            entity.draw();
        }
        if (!this.quit) {
            requestAnimationFrame(this.loop.bind(this));
        }
    }
    run() {
        requestAnimationFrame(this.loop.bind(this));
    }
}
;
let g;
window.onload = function () {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let timer = new Timer();
    g = new Game(canvas.width, canvas.height, ctx, timer);
    let ball = new Ball(50, "#32A1EG", { x: g.width / 2, y: 55 }, { x: 69, y: 0 }, { x: 0, y: 169 });
    g.entities.push(ball);
    g.run();
};
class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
;
class Timer {
    constructor() {
        this.prev_timestamp = performance.now();
        this.min_step = 0.05;
    }
    tick() {
        let timestamp = performance.now();
        g.dt = Math.min(timestamp - this.prev_timestamp, this.min_step);
        this.prev_timestamp = timestamp;
    }
}
