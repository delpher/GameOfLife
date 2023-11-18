const ctx = document
    .getElementById('canvas')
    .getContext('2d');

const cellSize = 5;
const worldWidth = 200;
const worldHeight = 200;
const refreshRate = 30;

let world = new World(worldWidth, worldHeight);

window.setInterval(() => (world = world.getNextGen()).render(), 1000 / refreshRate);

function Cell(x, y, state, age) {
    age = age || 0;

    this.isAlive = function() {
        return state === "new" || state === "alive";
    }

    this.getNextGen = function() {
        const neighbours = world.countNeighbours(x, y);

        if (neighbours == 3 && (state == "none" || state == "dead"))
            return new Cell(x, y, "new");

        if (neighbours >= 2 && neighbours <= 3 && (state == "new" || state == "alive"))
            return new Cell(x, y, "alive", age < 12 ? age + 1 : age);

        if ((neighbours < 2 || neighbours >= 4) && (state == "new" || state == "alive"))
            return new Cell(x, y, "dead");

        return new Cell(x, y, "none");
    }

    this.render = function() {
        switch (state) {
            case "new": ctx.fillStyle = "lime"; break;
            case "alive": ctx.fillStyle = 'rgb(0, ' + (255 - age * 10) + ', 0)'; break;
            case "dead": ctx.fillStyle = "rgb(80,80,80)"; break;
            case "none": return;
        }
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
}

function World(width, height, cells) {
    cells = cells || generateWorld();

    this.getNextGen = function() {
        const newCells = [];

        for (let i = 0; i < width; i++) {
            newCells[i] = [];
            for (let j = 0; j < height; j++)
                newCells[i][j] = cells[i][j].getNextGen();
        }

        return new World(width, height, newCells);
    }

    this.countNeighbours = function(x, y) {
        let count = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i == x && j == y) continue;
                if (i < 0 || j < 0) continue;
                if (i >= width || j >= height) continue;
                if (cells[i][j].isAlive()) count += 1;
            }
        }
        return count;
    }

    this.render = function() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, worldWidth * cellSize, worldHeight * cellSize);

        for (let i = 0; i < width; i++)
            for (let j = 0; j < height; j++)
                cells[i][j].render();
    }

    function generateWorld() {
        const cells = [];

        for (let i = 0; i < width; i++) {
            cells[i] = [];
            for (let j = 0; j < height; j++)
                cells[i][j] = new Cell(i, j, Math.random() > 0.7 ? "new" : "none");
        }
        return cells;
    }
}