import { GameOfLife } from './game-logic.js';

describe('Game Of Life', () => {

    describe('1 by 1 board', () => {

        testCase('no new cell appears',
            [
                [' ']
            ],
            [
                [' ']
            ]
        );

        testCase('cell dies alone',
            [
                ['█']
            ],
            [
                [' ']
            ]
        );

    });

    describe('2 by 2 board', () => {

        testCase('cell dies if no neighbours',
            [
                ['█', ' '],
                [' ', ' ']
            ],
            [
                [' ', ' '],
                [' ', ' '],
            ]);

        testCase('cell dies if 1 neighbour',
            [
                ['█', '█'],
                [' ', ' ']
            ],
            [
                [' ', ' '],
                [' ', ' '],
            ]);

        testCase('three neigbours produce new cell',
            [
                [' ', '█'],
                ['█', '█']
            ],
            [
                ['█', '█'],
                ['█', '█'],
            ]
        );

        testCase('cell lives if three neigbours',
            [
                ['█', '█'],
                ['█', '█']
            ],
            [
                ['█', '█'],
                ['█', '█'],
            ]);
    });

    describe('3 by 3 board', () => {
        testCase('blinker oscillator',
            [
                [' ', '█', ' '],
                [' ', '█', ' '],
                [' ', '█', ' ']
            ],
            [
                [' ', ' ', ' '],
                ['█', '█', '█'],
                [' ', ' ', ' ']
            ],
            [
                [' ', '█', ' '],
                [' ', '█', ' '],
                [' ', '█', ' ']
            ]
        );

        testCase('"tub" stable',
            [
                [' ', '█', ' '],
                ['█', ' ', '█'],
                [' ', '█', ' ']
            ],
            [
                [' ', '█', ' '],
                ['█', ' ', '█'],
                [' ', '█', ' ']
            ],
            [
                [' ', '█', ' '],
                ['█', ' ', '█'],
                [' ', '█', ' ']
            ]
        );
    });

    describe('4 by 4 field', () => {
        testCase('"Beacon" oscillator',
            [
                [' ', ' ', '█', '█'],
                [' ', ' ', ' ', '█'],
                ['█', ' ', ' ', ' '],
                ['█', '█', ' ', ' ']
            ],
            [
                [' ', ' ', '█', '█'],
                [' ', ' ', '█', '█'],
                ['█', '█', ' ', ' '],
                ['█', '█', ' ', ' ']
            ],
            [
                [' ', ' ', '█', '█'],
                [' ', ' ', ' ', '█'],
                ['█', ' ', ' ', ' '],
                ['█', '█', ' ', ' ']
            ]
        );
    });
});

function testCase(name, initial, ...expectedBoards) {
    test(name, () => {
        const game = createGame(initial);
        expectedBoards.reduce((prevState, expectedBoard) => {
            const nextState = game.run(prevState);
            expect(nextState).toEqual(boardOf(expectedBoard));
            return nextState;
        }, game.init());
    });

    function createGame(board) {
        return GameOfLife(
            board[0].length, board.length,
            (x, y) => board[y][x] === '█'
        );
    }

    function boardOf(board) {
        return {
            cells: board.map(row =>
                row.map(cell => ({ alive: cell === '█' })))
        }
    }
}
