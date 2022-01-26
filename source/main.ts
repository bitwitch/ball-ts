let g: Game;

window.onload = function() {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let timer = new Timer();

    g = new Game(canvas.width, canvas.height, ctx, timer);

    let ball = new Ball(50, "#32A1EG",
        {x: g.width/2, y: 55},
        {x: 69, y: 0},
        {x: 0, y: 169});

    g.entities.push(ball);

    g.run();
};
