class Timer {
    prev_timestamp: number;
    min_step: number;

    constructor() {
        this.prev_timestamp = performance.now();
        this.min_step = 0.05;
    }

    tick() {
        let timestamp = performance.now();
        g.dt = Math.min(timestamp-this.prev_timestamp, this.min_step);
        this.prev_timestamp = timestamp;
    }
}


