abstract class Entity {
    pos: Vec2;
    vel: Vec2;
    acc: Vec2;

    constructor() {
        this.pos = new Vec2();
        this.vel = new Vec2();
        this.acc = new Vec2();
    }

    abstract update() : void;
    abstract draw() : void;
}

class Ball extends Entity {
    radius: number;
    color: string;
    squish: number = 0;

    constructor(radius: number, color?: string, pos?: Vec2, vel?: Vec2, acc?: Vec2) {
        super();
        this.radius = radius;
        this.color = color !== undefined ? color : "#000000";
        this.pos = pos !== undefined ? pos : this.pos;
        this.vel = vel !== undefined ? vel : this.vel;
        this.acc = acc !== undefined ? acc : this.acc;
    }

    update() : void {
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
        } else if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x *= -1;
        }
    }

    draw() : void {
        g.ctx.beginPath();
        g.ctx.fillStyle = this.color;
        g.ctx.ellipse(this.pos.x, this.pos.y, 
            this.radius, this.radius - (0.5*this.squish), 0, 0, 2 * Math.PI)
        g.ctx.fill();
    }
}

