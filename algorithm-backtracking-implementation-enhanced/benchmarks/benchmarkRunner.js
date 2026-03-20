```javascript
/**
 * @fileoverview
 * Runs performance benchmarks for all implemented backtracking algorithms.
 * Use `npm run benchmark` to execute this script.
 */

const { runBenchmark } = require('./benchmarkUtils');

// Import algorithms
const { findPermutations, findPermutationsSwap } = require('../src/algorithms/permutations');
const { findCombinations } = require('../src/algorithms/combinations');
const { findSubsets, findSubsetsIncludeExclude } = require('../src/algorithms/subsets');
const { solveNQueens } = require('../src/algorithms/nqueens');
const { solveSudoku } = require('../src/algorithms/sudokuSolver');

function main() {
    console.log("======================================");
    console.log("     Starting Performance Benchmarks  ");
    console.log("======================================");

    // --- Permutations Benchmarks ---
    runBenchmark('Permutations (findPermutations - used array)', findPermutations, [
        { name: 'N=1', input: [1] },
        { name: 'N=2', input: [1, 2] },
        { name: 'N=3', input: [1, 2, 3] },
        { name: 'N=4', input: [1, 2, 3, 4] },
        { name: 'N=5', input: [1, 2, 3, 4, 5] },
        { name: 'N=6', input: [1, 2, 3, 4, 5, 6] },
        // N=7 will already be very slow (5040 * 7 operations)
        // { name: 'N=7', input: [1, 2, 3, 4, 5, 6, 7] },
    ]);

    runBenchmark('Permutations (findPermutationsSwap - in-place swap)', findPermutationsSwap, [
        { name: 'N=1', input: [1] },
        { name: 'N=2', input: [1, 2] },
        { name: 'N=3', input: [1, 2, 3] },
        { name: 'N=4', input: [1, 2, 3, 4] },
        { name: 'N=5', input: [1, 2, 3, 4, 5] },
        { name: 'N=6', input: [1, 2, 3, 4, 5, 6] },
        // { name: 'N=7', input: [1, 2, 3, 4, 5, 6, 7] },
    ]);


    // --- Combinations Benchmarks ---
    runBenchmark('Combinations (findCombinations)', findCombinations, [
        { name: 'N=5, K=2', input: { n: 5, k: 2 } },
        { name: 'N=10, K=3', input: { n: 10, k: 3 } },
        { name: 'N=10, K=5', input: { n: 10, k: 5 } }, // C(10,5) = 252
        { name: 'N=15, K=5', input: { n: 15, k: 5 } }, // C(15,5) = 3003
        { name: 'N=20, K=5', input: { n: 20, k: 5 } }, // C(20,5) = 15504
        { name: 'N=20, K=10', input: { n: 20, k: 10 } }, // C(20,10) = 184756 (could be slow)
        { name: 'N=20, K=15', input: { n: 20, k: 15 } }, // C(20,15) = 15504 (same as C(20,5))
    ]);

    // --- Subsets Benchmarks ---
    runBenchmark('Subsets (findSubsets - loop based)', findSubsets, [
        { name: 'N=3', input: [1, 2, 3] },
        { name: 'N=5', input: [1, 2, 3, 4, 5] },
        { name: 'N=8', input: [1, 2, 3, 4, 5, 6, 7, 8] }, // 2^8 = 256 subsets
        { name: 'N=10', input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, // 2^10 = 1024 subsets
        { name: 'N=12', input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, // 2^12 = 4096 subsets
        // N=15 might be too slow for large output size. (2^15 = 32768 subsets)
        // { name: 'N=15', input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
    ]);

    runBenchmark('Subsets (findSubsetsIncludeExclude - two branches)', findSubsetsIncludeExclude, [
        { name: 'N=3', input: [1, 2, 3] },
        { name: 'N=5', input: [1, 2, 3, 4, 5] },
        { name: 'N=8', input: [1, 2, 3, 4, 5, 6, 7, 8] },
        { name: 'N=10', input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { name: 'N=12', input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    ]);

    // --- N-Queens Benchmarks ---
    runBenchmark('N-Queens (solveNQueens)', solveNQueens, [
        { name: 'N=1', input: 1 },
        { name: 'N=4', input: 4 }, // 2 solutions
        { name: 'N=8', input: 8 }, // 92 solutions
        { name: 'N=9', input: 9 }, // 352 solutions
        // N=10 (724 solutions) - might be slow
        // { name: 'N=10', input: 10 },
        // N=12 (14200 solutions) - very slow
        // { name: 'N=12', input: 12 },
    ]);

    // --- Sudoku Solver Benchmarks ---
    // Note: Sudoku benchmark uses a fixed board. The 'difficulty' of the board
    // affects performance more than just a simple 'size' parameter.
    const easySudokuBoard = [
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

    // A harder Sudoku board (fewer initial clues)
    const hardSudokuBoard = [
        [".", ".", "9", "7", "4", "8", ".", ".", "."],
        ["7", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "2", ".", "1", ".", "9", ".", ".", "."],
        [".", ".", "7", ".", ".", ".", "2", "4", "."],
        [".", "6", "4", ".", "1", ".", "5", "9", "."],
        [".", "9", "8", ".", ".", ".", "3", ".", "."],
        [".", ".", ".", "8", ".", "3", ".", "2", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "6"],
        [".", ".", ".", "2", "7", "5", "9", ".", "."]
    ];


    runBenchmark('Sudoku Solver (solveSudoku)', solveSudoku, [
        // Boards are modified in-place, so always pass a deep copy
        { name: 'Easy Board', input: easySudokuBoard.map(row => [...row]) },
        { name: 'Hard Board', input: hardSudokuBoard.map(row => [...row]) },
    ]);


    console.log("\n======================================");
    console.log("       Performance Benchmarks End     ");
    console.log("======================================");
}

main();
```