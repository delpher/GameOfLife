import { GameOfLife } from './game-logic.js';
import { F } from './functional.js';
import { Timer } from './timer.js';

const ctx = document
    .getElementById('canvas')
    .getContext('2d');

document.getElementById('canvas').style = 'display:block';

const game = GameOfLife({
    width: 200,
    height: 200,
    generator: () => Math.random() > 0.7,
});

F({
    gameState: game.init(),
    tick: Timer().init(1000 / 30)
}).run(
    ({ tick }) => ({ tick: Timer().run(tick) }),
    ({ tick, gameState }) => ({
        gameState: tick.tick ? game.run(gameState) : gameState
    }),
    F.renderer(render)
);

function render({ gameState: { board, width, height } }) {
    const cellSize = 5;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width * cellSize, height * cellSize);
    board.cells
        .forEach(row =>
            row.forEach(cell => {
                ctx.fillStyle = cell.alive ? 'lime' : 'black';
                ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
            }));
}