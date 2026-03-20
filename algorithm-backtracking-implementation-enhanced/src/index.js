```javascript
/**
 * @fileoverview
 * Main entry point to demonstrate the Backtracking algorithms implemented in this project.
 * Run this file using `npm start` or `node src/index.js`.
 */

const { findPermutations, findPermutationsSwap } = require('./algorithms/permutations');
const { findCombinations } = require('./algorithms/combinations');
const { findSubsets, findSubsetsIncludeExclude } = require('./algorithms/subsets');
const { solveNQueens } = require('./algorithms/nqueens');
const { solveSudoku } = require('./algorithms/sudokuSolver');
const { boardToString } = require('./utils/arrayUtils');

function runDemonstrations() {
    console.log("======================================");
    console.log("    Backtracking Algorithm Demos      ");
    console.log("======================================");

    // --- Permutations ---
    console.log("\n--- Permutations ([1, 2, 3]) ---");
    const numsPerm = [1, 2, 3];
    console.log("Using findPermutations (used array):");
    console.log(JSON.stringify(findPermutations(numsPerm)));
    console.log("Using findPermutationsSwap (in-place swap):");
    console.log(JSON.stringify(findPermutationsSwap(numsPerm)));

    console.log("\n--- Permutations ([1, 2]) ---");
    const numsPerm2 = [1, 2];
    console.log(JSON.stringify(findPermutations(numsPerm2)));

    // --- Combinations ---
    console.log("\n--- Combinations (n=4, k=2) ---");
    console.log(JSON.stringify(findCombinations(4, 2)));

    console.log("\n--- Combinations (n=3, k=1) ---");
    console.log(JSON.stringify(findCombinations(3, 1)));

    // --- Subsets ---
    console.log("\n--- Subsets ([1, 2, 3]) ---");
    const numsSub = [1, 2, 3];
    console.log("Using findSubsets (loop based):");
    console.log(JSON.stringify(findSubsets(numsSub)));
    console.log("Using findSubsetsIncludeExclude (two branches):");
    console.log(JSON.stringify(findSubsetsIncludeExclude(numsSub)));

    console.log("\n--- Subsets ([1]) ---");
    const numsSub2 = [1];
    console.log(JSON.stringify(findSubsets(numsSub2)));

    // --- N-Queens ---
    console.log("\n--- N-Queens (N=4) ---");
    const nQueensSolutions4 = solveNQueens(4);
    console.log(`Found ${nQueensSolutions4.length} solutions.`);
    nQueensSolutions4.forEach((board, index) => {
        console.log(`Solution ${index + 1}:`);
        console.log(board.join('\n'));
        console.log('---');
    });

    console.log("\n--- N-Queens (N=1) ---");
    const nQueensSolutions1 = solveNQueens(1);
    console.log(`Found ${nQueensSolutions1.length} solutions.`);
    nQueensSolutions1.forEach((board, index) => {
        console.log(`Solution ${index + 1}:`);
        console.log(board.join('\n'));
        console.log('---');
    });

    // --- Sudoku Solver ---
    console.log("\n--- Sudoku Solver ---");
    const sudokuBoard = [
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

    console.log("Original Sudoku Board:");
    console.log(boardToString(sudokuBoard));

    const solved = solveSudoku(sudokuBoard);
    if (solved) {
        console.log("\nSolved Sudoku Board:");
        console.log(boardToString(sudokuBoard));
    } else {
        console.log("\nSudoku puzzle could not be solved.");
    }

    console.log("\n======================================");
    console.log("          Demonstrations End          ");
    console.log("======================================");
}

runDemonstrations();
```