class Cell {
    constructor(x, y, state, age, world) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.age = age || 0;
        this.state = state;
        this.newState = state;
    }

    isAlive() {
        return this.state === "new" || this.state === "alive";
    };

    getNextGen() {
        const neighbours = this.world.countNeighbours(this);

        if (neighbours == 3 && !this.isAlive())
            this.newState = 'new';
        else if ((neighbours == 2 || neighbours == 3) && this.isAlive()) {
            this.age = this.age < 12 ? this.age + 1 : this.age;
            this.newState = 'alive';
        }
        else if ((neighbours < 2 || neighbours >= 4) && this.isAlive())
            this.newState = 'dead';
        else
            this.newState = 'none';
    };

    render(ctx, cellSize) {
        ctx.fillStyle = ({
            'new':  'lime',
            'alive': 'green',
            'dead': 'gray',
            'none': 'black'
        })[this.state = this.newState];
        ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    };

}

class World {
    constructor(width, height, cells) {
        this.width = width;
        this.height = height;
        this.cells = cells || World._generateWorld(width, height, this);
    }

    getNextGen() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++)
                this.cells[i][j].getNextGen();
        }
    };

    countNeighbours(cell) {
        let count = 0;
        for (let i = cell.x - 1; i <= cell.x + 1; i++) {
            for (let j = cell.y - 1; j <= cell.y + 1; j++) {
                const c = this.cells[i]?.[j];
                if (c !== cell && c?.isAlive()) count += 1;
            }
        }
        return count;
    };

    render(ctx, cellSize) {
        for (let i = 0; i < this.width; i++)
            for (let j = 0; j < this.height; j++)
                this.cells[i][j].render(ctx, cellSize);
    };

    static _generateWorld(width, height, world) {
        const cells = [];
        for (let i = 0; i < width; i++) {
            cells[i] = [];
            for (let j = 0; j < height; j++)
                cells[i][j] = new Cell(i, j, Math.random() > 0.7 ? "new" : "none", 0, world);
        }
        return cells;
    }
}

const ctx = document
    .getElementById('canvas')
    .getContext('2d');

document.getElementById('canvas').style = 'display:block';

const cellSize = 3;

let world = new World(200, 200);

window.setInterval(() => {
    world.getNextGen();
    world.render(ctx, cellSize)
});