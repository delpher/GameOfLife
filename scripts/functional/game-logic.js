export const GameOfLife = (width, height, generator) => ({
    init: () => ({
        cells: new Array(height).fill(null).map((_, y) =>
            new Array(width).fill(null).map((_, x) => ({ alive: generator(x, y) })))
    }),
    run: ({ cells }) => ({
        cells: cells.map((row, y) => row.map((cell, x) =>
        ({
            alive: nextState(cell.alive, countNeighbors(cells, x, y))
        })))
    })
});

function nextState(alive, count) {
    return (!alive && count == 3) || (alive && (count == 2 || count == 3));
}

function countNeighbors(cells, x, y) {
    return [
        [-1, -1], [0, -1], [+1, -1],
        [-1, 0], [+1, 0], [-1, +1],
        [0, +1], [+1, +1]
    ].reduce((neighbours, [dx, dy]) => neighbours + (cells[y + dy]?.[x + dx]?.alive ? 1 : 0), 0);
}