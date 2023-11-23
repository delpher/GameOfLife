import { GameOfLife } from './game-logic.js';

describe('Game Of Life', () => {

    describe('1 by 1 board', () => {

        testCase('no new cell appears',
            [
                [0]
            ],
            [
                [0]
            ]
        );

        testCase('cell dies alone',
            [
                [1]
            ],
            [
                [-1]
            ]
        );

        testCase('cell death state transitions',
            [
                [1]
            ],
            [
                [-1]
            ],
            [
                [0]
            ],
            [
                [0]
            ]
        );

    });

    describe('2 by 2 board', () => {

        testCase('cell dies if no neighbours',
            [
                [ 1,  0],
                [ 0,  0]
            ],
            [
                [-1,  0],
                [ 0,  0],
            ]);

        testCase('cell dies if 1 neighbour',
            [
                [ 1,  1],
                [ 0,  0]
            ],
            [
                [-1, -1],
                [ 0,  0],
            ]);

        testCase('three neigbours produce new cell',
            [
                [ 0,  1],
                [ 1,  1]
            ],
            [
                [ 1,  2],
                [ 2,  2],
            ]
        );

        testCase('cell lives if three neigbours',
            [
                [ 1,  1],
                [ 1,  1]
            ],
            [
                [ 2,  2],
                [ 2,  2],
            ]);


        testCase('cells aging over time',
            [
                [1, 1],
                [1, 1]
            ],
            [
                [2, 2],
                [2, 2],
            ],
            [
                [3, 3],
                [3, 3],
            ],
            [
                [4, 4],
                [4, 4],
            ]
        );
    });

    describe('3 by 3 board', () => {
        testCase('blinker oscillator',
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ],
            [
                [0, -1, 0],
                [1,  2, 1],
                [0, -1, 0]
            ],
            [
                [0,  1,  0],
                [-1, 3, -1],
                [0,  1,  0]
            ]
        );

        testCase('"tub" stable',
            [
                [0, 1, 0],
                [1, 0, 1],
                [0, 1, 0]
            ],
            [
                [0, 2, 0],
                [2, 0, 2],
                [0, 2, 0]
            ],
            [
                [0, 3, 0],
                [3, 0, 3],
                [0, 3, 0]
            ],
        );
    });

    describe('4 by 4 field', () => {
        testCase('"Beacon" oscillator',
            [
                [0,  0,  1,  1],
                [0,  0,  0,  1],
                [1,  0,  0,  0],
                [1,  1,  0,  0]
            ],
            [
                [0,  0,  2,  2],
                [0,  0,  1,  2],
                [2,  1,  0,  0],
                [2,  2,  0,  0]
            ],
            [
                [0,  0,  3,  3],
                [0,  0, -1,  3],
                [3, -1,  0,  0],
                [3,  3,  0,  0]
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
            (x, y) => board[y][x]
        );
    }

    function boardOf(board) {
        return {
            cells: board.map(row =>
                row.map(cell => ({ state: cell })))
        }
    }
}
