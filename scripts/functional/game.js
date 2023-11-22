import { GameOfLife } from './game-logic.js';

const ctx = document.getElementById('canvas').getContext('2d');
const game = GameOfLife(200, 200, () => Math.random() > 0.7);
let state = game.init();

window.setInterval(() => { state = game.run(state); render(state); });

function render({ cells }) {
    const cellSize = 5;
    cells.map((row, y) => row.map((cell, x) => {
        ctx.fillStyle = cell.alive ? 'lime' : 'black';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }));
}