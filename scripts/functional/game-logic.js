export const GameOfLife = ({ width, height, generator }) => ({
    init: () => ({
        board: {
            width,
            height,
            cells: new Array(height).fill(null).map((_, ri) =>
                new Array(width).fill(null).map((_, ci) =>
                    ({ x: ci, y: ri, alive: generator(ci, ri) })
                )
            )
        },
    }),
    run: ({ board, board: { cells } }) => ({
        board: {
            ...board,
            cells: cells.map(row =>
                row.map(cell =>
                ({
                    ...cell,
                    alive: isAlive(cell.alive, countNeighbors(cells, cell.x, cell.y))
                })
                )
            )
        }
    })
});

function isAlive(alive, count) {
    return (!alive && count == 3) || (alive && (count == 2 || count == 3));
}

function countNeighbors(cells, cx, cy) {
    return [
        [-1, -1], [0, -1], [+1, -1],
        [-1, 0], [+1, 0], [-1, +1],
        [0, +1], [+1, +1]
    ].map(([dx, dy]) => cells[cy + dy]?.[cx + dx])
        .reduce((acc, cell) => acc + (cell?.alive ? 1 : 0), 0);
}