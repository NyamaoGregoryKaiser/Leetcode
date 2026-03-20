```javascript
/**
 * @fileoverview Test suite for N-Queens algorithm.
 * Uses the global `assert` and `testSuite` functions provided by `testRunner.js`.
 */

const { solveNQueens } = require('../src/algorithms/nqueens');
const { areSortedArraysOfArraysEqual } = require('../src/utils/arrayUtils');

testSuite('N-Queens Algorithm', () => {

    // Helper to compare results for N-Queens, where order of board configurations doesn't matter.
    // Each board is an array of strings. Sorting outer array, and then stringifying each inner board
    // to compare helps. Or comparing sorted arrays of sorted strings.
    const expectNQueensSolutionsEqual = (actual, expected, message) => {
        // Sort individual rows within each board (though they're already strings)
        // Then sort the boards themselves lexicographically
        const sortedActual = actual.map(board => [...board].sort()).sort((a, b) => {
            for (let i = 0; i < Math.min(a.length, b.length); i++) {
                if (a[i] < b[i]) return -1;
                if (a[i] > b[i]) return 1;
            }
            return a.length - b.length;
        });
        const sortedExpected = expected.map(board => [...board].sort()).sort((a, b) => {
            for (let i = 0; i < Math.min(a.length, b.length); i++) {
                if (a[i] < b[i]) return -1;
                if (a[i] > b[i]) return 1;
            }
            return a.length - b.length;
        });

        // Deep comparison of the sorted array of sorted boards.
        assert(areSortedArraysOfArraysEqual(sortedActual, sortedExpected), message);
    };


    assert(typeof solveNQueens === 'function', 'solveNQueens should be a function');

    // Test Case 1: N = 1
    expectNQueensSolutionsEqual(
        solveNQueens(1),
        [["Q"]],
        'Should correctly find 1 solution for N=1'
    );

    // Test Case 2: N = 2
    expectNQueensSolutionsEqual(
        solveNQueens(2),
        [], // No solutions for N=2
        'Should find 0 solutions for N=2'
    );

    // Test Case 3: N = 3
    expectNQueensSolutionsEqual(
        solveNQueens(3),
        [], // No solutions for N=3
        'Should find 0 solutions for N=3'
    );

    // Test Case 4: N = 4
    expectNQueensSolutionsEqual(
        solveNQueens(4),
        [
            [".Q..", "...Q", "Q...", "..Q."],
            ["..Q.", "Q...", "...Q", ".Q.."]
        ],
        'Should correctly find 2 solutions for N=4'
    );

    // Test Case 5: N = 5
    expectNQueensSolutionsEqual(
        solveNQueens(5),
        [
            ["Q....", "..Q..", "....Q", ".Q...", "...Q."],
            ["Q....", "...Q.", ".Q...", "....Q", "..Q.."],
            [".Q...", "...Q.", "Q....", "..Q..", "....Q"],
            [".Q...", "....Q", "..Q..", "Q....", "...Q."],
            ["..Q..", "Q....", "...Q.", ".Q...", "....Q"],
            ["..Q..", "....Q", ".Q...", "Q....", "...Q."],
            ["...Q.", "Q....", "..Q..", "....Q", ".Q..."],
            ["...Q.", ".Q...", "....Q", "..Q..", "Q...."],
            ["....Q", ".Q...", "...Q.", "Q....", "..Q.."],
            ["....Q", "..Q..", "Q....", "...Q.", ".Q..."]
        ],
        'Should correctly find 10 solutions for N=5'
    );

    // Test Case 6: N = 0 (edge case, outside constraint 1 <= N <= 9)
    // The current implementation might crash or return an empty array. It should ideally return [[]] for N=0 if it implies an empty board with 0 queens is a solution, or [] if it's invalid.
    // For this problem, N >= 1, so 0 is not expected input.
    expectNQueensSolutionsEqual(
        solveNQueens(0),
        [], // Assuming empty input means no solutions.
        'Should return empty array for N=0 (outside constraints)'
    );
});
```