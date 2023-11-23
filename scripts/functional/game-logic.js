export const GameOfLife = (width, height, generator) => ({
    init: () => ({
        cells: new Array(height).fill(null).map((_, y) =>
            new Array(width).fill(null).map((_, x) => ({ state: generator(x, y) })))
    }),
    run: ({ cells }) => ({
        cells: cells.map((row, y) => row.map((cell, x) =>
        ({
            state: nextState(cell.state, countNeighbors(cells, x, y))
        })))
    })
});

function nextState(state, count) {
    switch (state) {
        case -1:
        case 0: return count == 3 ? 1 : 0;
        default: return count < 2 || count > 3 ? -1 : state + 1;
    };
}

function countNeighbors(cells, x, y) {
    return [
        [-1, -1], [0, -1], [+1, -1],
        [-1, 0], [+1, 0], [-1, +1],
        [0, +1], [+1, +1]
    ].reduce((neighbours, [dx, dy]) => neighbours + (cells[y + dy]?.[x + dx]?.state >= 1 ? 1 : 0), 0);
}