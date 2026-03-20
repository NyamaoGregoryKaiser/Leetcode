```javascript
/**
 * @fileoverview Test suite for Sudoku Solver algorithm.
 * Uses the global `assert` and `testSuite` functions provided by `testRunner.js`.
 */

const { solveSudoku } = require('../src/algorithms/sudokuSolver');
const { areArraysEqual, boardToString } = require('../src/utils/arrayUtils');

testSuite('Sudoku Solver Algorithm', () => {

    // Helper to deeply compare two 2D arrays (Sudoku boards).
    const expectBoardsEqual = (actualBoard, expectedBoard, message) => {
        const result = areArraysEqual(actualBoard, expectedBoard);
        if (!result) {
            console.error("Actual Board:\n" + boardToString(actualBoard));
            console.error("Expected Board:\n" + boardToString(expectedBoard));
        }
        assert(result, message);
    };

    assert(typeof solveSudoku === 'function', 'solveSudoku should be a function');

    // Test Case 1: Standard Sudoku puzzle
    const board1 = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ];
    const solution1 = [
        ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
        ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
        ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
        ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
        ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
        ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
        ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
        ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
        ["3", "4", "5", "2", "8", "6", "1", "7", "9"]
    ];
    // We need to pass a copy of the board because solveSudoku modifies in-place
    const board1Copy = board1.map(row => [...row]);
    solveSudoku(board1Copy);
    expectBoardsEqual(board1Copy, solution1, 'Should solve standard Sudoku puzzle 1');

    // Test Case 2: Another standard puzzle
    const board2 = [
        ["8", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", "3", "6", ".", ".", ".", ".", "."],
        [".", "7", ".", ".", "9", ".", "2", ".", "."],
        [".", "5", ".", ".", ".", "7", ".", ".", "."],
        [".", ".", ".", ".", "4", "5", "7", ".", "."],
        [".", ".", ".", "1", ".", ".", ".", "3", "."],
        [".", ".", "1", ".", ".", ".", ".", "6", "8"],
        [".", ".", "8", "5", ".", ".", ".", "1", "."],
        [".", "9", ".", ".", ".", ".", "4", ".", "."]
    ];
    const solution2 = [
        ["8", "1", "2", "7", "5", "3", "6", "4", "9"],
        ["9", "4", "3", "6", "8", "2", "1", "7", "5"],
        ["6", "7", "5", "4", "9", "1", "2", "8", "3"],
        ["1", "5", "4", "2", "3", "7", "8", "9", "6"],
        ["3", "6", "9", "8", "4", "5", "7", "2", "1"],
        ["2", "8", "7", "1", "6", "9", "5", "3", "4"],
        ["5", "2", "1", "9", "7", "4", "3", "6", "8"],
        ["4", "3", "8", "5", "2", "6", "9", "1", "7"],
        ["7", "9", "6", "3", "1", "8", "4", "5", "2"]
    ];
    const board2Copy = board2.map(row => [...row]);
    solveSudoku(board2Copy);
    expectBoardsEqual(board2Copy, solution2, 'Should solve standard Sudoku puzzle 2');

    // Test Case 3: A puzzle with many pre-filled cells
    const board3 = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "."],
        ["4", "5", "6", "7", "8", "9", "1", "2", "3"],
        ["7", "8", "9", "1", "2", "3", "4", "5", "6"],
        ["2", "1", "4", "3", "6", "5", "8", "7", "9"],
        ["3", "6", "5", "8", "7", "9", "2", "1", "4"],
        ["8", "7", "9", "2", "1", "4", "3", "6", "5"],
        ["5", "3", "1", "6", "4", "2", "9", "X", "7"], // X will be filled
        ["6", "4", "2", "9", "X", "7", "5", "3", "1"], // X will be filled
        ["9", "X", "7", "5", "3", "1", "6", "4", "2"] // X will be filled
    ];
    // Adjusted initial board to make it a valid solvable puzzle
    board3[6][7] = "."; // Empty cell where 'X' was. Should be '9'
    board3[7][4] = "."; // Empty cell where 'X' was. Should be '5'
    board3[8][1] = "."; // Empty cell where 'X' was. Should be '9'

    const solution3 = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        ["4", "5", "6", "7", "8", "9", "1", "2", "3"],
        ["7", "8", "9", "1", "2", "3", "4", "5", "6"],
        ["2", "1", "4", "3", "6", "5", "8", "7", "9"],
        ["3", "6", "5", "8", "7", "9", "2", "1", "4"],
        ["8", "7", "9", "2", "1", "4", "3", "6", "5"],
        ["5", "3", "1", "6", "4", "2", "9", "9", "7"], // Adjusted expected values
        ["6", "4", "2", "9", "5", "7", "5", "3", "1"], // Adjusted expected values
        ["9", "9", "7", "5", "3", "1", "6", "4", "2"]  // Adjusted expected values
    ];
    // Correcting expected solution for board3 based on the given pattern
    solution3[6][7] = "9";
    solution3[7][4] = "5";
    solution3[8][1] = "9";

    const board3Copy = board3.map(row => [...row]);
    solveSudoku(board3Copy);
    expectBoardsEqual(board3Copy, solution3, 'Should solve puzzle with few empty cells');

    // Test Case 4: A nearly empty board (more complex, might take longer)
    const board4 = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", "3", ".", "8", "5"],
        [".", ".", "1", ".", "2", ".", ".", ".", "."],
        [".", ".", ".", "5", ".", "7", ".", ".", "."],
        [".", ".", "4", ".", ".", ".", "1", ".", "."],
        [".", "9", ".", ".", ".", ".", ".", ".", "."],
        ["5", ".", ".", ".", ".", ".", ".", "7", "3"],
        [".", ".", "2", ".", "1", ".", ".", ".", "."],
        [".", ".", ".", ".", "4", ".", ".", ".", "9"]
    ];
    const solution4 = [
        ["6", "7", "2", "3", "9", "1", "4", "5", "8"],
        ["4", "1", "9", "6", "7", "3", "2", "8", "5"],
        ["8", "3", "1", "4", "2", "5", "7", "9", "6"],
        ["9", "6", "8", "5", "3", "7", "1", "4", "2"],
        ["3", "5", "4", "9", "6", "2", "8", "1", "7"],
        ["2", "9", "7", "1", "8", "4", "5", "6", "3"],
        ["5", "2", "6", "7", "1", "9", "3", "8", "4"],
        ["7", "4", "3", "8", "5", "6", "9", "2", "1"],
        ["1", "8", "5", "2", "4", "0", "6", "7", "9"] // Error in expected solution, last row, last but one is 0.
    ];
    // Correcting expected solution for board4
    solution4[8][5] = "8"; // Should be '8' not '0'

    const board4Copy = board4.map(row => [...row]);
    solveSudoku(board4Copy);
    expectBoardsEqual(board4Copy, solution4, 'Should solve a nearly empty Sudoku board');

    // Test Case 5: A full valid board (should return true and not change it)
    const boardFull = [
        ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
        ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
        ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
        ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
        ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
        ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
        ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
        ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
        ["3", "4", "5", "2", "8", "6", "1", "7", "9"]
    ];
    const boardFullCopy = boardFull.map(row => [...row]);
    solveSudoku(boardFullCopy);
    expectBoardsEqual(boardFullCopy, boardFull, 'Should not modify an already solved board');

});
```