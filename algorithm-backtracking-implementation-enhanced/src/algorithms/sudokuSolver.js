```javascript
/**
 * @fileoverview
 * Implementation for a Sudoku Solver using backtracking.
 *
 * Problem: Write a program to solve a Sudoku puzzle by filling the empty cells.
 * A Sudoku solution must satisfy all the following rules:
 * 1. Each of the digits 1-9 must appear exactly once in each row.
 * 2. Each of the digits 1-9 must appear exactly once in each column.
 * 3. Each of the digits 1-9 must appear exactly once in each of the nine 3x3 sub-boxes of the grid.
 * The '.' character indicates empty cells.
 * You may assume that the given Sudoku puzzle will have a single unique solution.
 *
 * Example:
 * Input board (partially filled):
 * [["5","3",".",".","7",".",".",".","."],
 *  ["6",".",".","1","9","5",".",".","."],
 *  [".","9","8",".",".",".",".","6","."],
 *  ["8",".",".",".","6",".",".",".","3"],
 *  ["4",".",".","8",".","3",".",".","1"],
 *  ["7",".",".",".","2",".",".",".","6"],
 *  [".","6",".",".",".",".","2","8","."],
 *  [".",".",".","4","1","9",".",".","5"],
 *  [".",".",".",".","8",".",".","7","9"]]
 *
 * Output board (solved):
 * [["5","3","4","6","7","8","9","1","2"],
 *  ["6","7","2","1","9","5","3","4","8"],
 *  ["1","9","8","3","4","2","5","6","7"],
 *  ["8","5","9","7","6","1","4","2","3"],
 *  ["4","2","6","8","5","3","7","9","1"],
 *  ["7","1","3","9","2","4","8","5","6"],
 *  ["9","6","1","5","3","7","2","8","4"],
 *  ["2","8","7","4","1","9","6","3","5"],
 *  ["3","4","5","2","8","6","1","7","9"]]
 *
 * Constraints:
 * - board.length == 9
 * - board[i].length == 9
 * - board[i][j] is a digit or '.'.
 * - It is guaranteed that the input board has only one solution.
 */

/**
 * Solves a Sudoku puzzle in-place using backtracking.
 *
 * @param {string[][]} board The 9x9 Sudoku board, where '.' represents an empty cell.
 *                           This board will be modified directly.
 * @returns {boolean} True if the board was solved, false otherwise (though problem guarantees a solution).
 */
function solveSudoku(board) {
    const N = 9; // Sudoku board size

    /**
     * Helper function to check if a number can be placed at board[row][col].
     * @param {number} row The row index.
     * @param {number} col The column index.
     * @param {string} num The number (as a string '1'-'9') to check.
     * @returns {boolean} True if the number is valid at this position, false otherwise.
     */
    function isValid(row, col, num) {
        // Check row
        for (let x = 0; x < N; x++) {
            if (board[row][x] === num) {
                return false;
            }
        }

        // Check column
        for (let x = 0; x < N; x++) {
            if (board[x][col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        // Calculate the starting row and column of the 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Recursive backtracking function to fill the board.
     * It iterates through the board, finds an empty cell, tries to fill it, and recurses.
     *
     * @returns {boolean} True if the current path leads to a valid solution, false otherwise.
     */
    function backtrack() {
        // Iterate through each cell of the board.
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                // If the current cell is empty ('.'), try to fill it.
                if (board[row][col] === '.') {
                    // Try numbers from '1' to '9'.
                    for (let numChar = 1; numChar <= 9; numChar++) {
                        const num = String(numChar); // Convert number to string

                        // Pruning: Check if placing 'num' at (row, col) is valid
                        if (isValid(row, col, num)) {
                            // Make a choice: Place the number.
                            board[row][col] = num;

                            // Explore: Recurse to fill the rest of the board.
                            // If the recursive call returns true, it means a solution was found.
                            if (backtrack()) {
                                return true; // Propagate success upwards.
                            }

                            // Unmake the choice (backtrack): If the recursive call returned false,
                            // this 'num' at (row, col) did not lead to a solution.
                            // Reset the cell to '.' and try the next number.
                            board[row][col] = '.';
                        }
                    }
                    // If no number from '1' to '9' could be placed in this cell,
                    // or if all numbers led to dead ends, then this path is invalid.
                    // We need to backtrack to the previous decision point.
                    return false;
                }
            }
        }

        // Base case: If the loops complete without finding any empty cells,
        // it means the entire board is filled, and thus we've found a valid solution.
        return true;
    }

    return backtrack(); // Start the backtracking process
}


/*
 * Time Complexity Analysis:
 * Let N be the side length of the Sudoku board (N=9).
 * The number of empty cells is `E`.
 *
 * For each empty cell:
 * - We try digits 1 through 9 (at most 9 choices).
 * - For each choice, `isValid` function is called.
 * - `isValid` performs checks for row, column, and 3x3 box.
 *   - Row check: O(N)
 *   - Column check: O(N)
 *   - Box check: O(N) (specifically O(N) as N/3 * N/3 = N, since N=9, N/3=3, so 3*3=9=N)
 *   - Total `isValid` complexity: O(N)
 *
 * In the worst case, we might have to try all 9 numbers for each empty cell.
 * The depth of the recursion can go up to `E` (number of empty cells).
 *
 * This is a highly branching search tree. The worst-case for Sudoku can be very large.
 * A loose upper bound: O(9^E * N) or more strictly O(9^E * N^2) for board copy operations if done.
 *
 * Given N=9, E can be up to 81. So 9^81 is a huge number.
 * However, the `isValid` pruning significantly reduces the actual search space.
 * For practical Sudoku puzzles, it's very fast.
 * The constraints on the problem (guaranteed unique solution) help; we only need to find one.
 *
 * A more realistic bound, based on the effective branching factor for Sudoku,
 * is often cited as roughly `O(b^E)`, where `b` is the average branching factor (less than 9)
 * and E is the number of empty cells.
 *
 * Total Time Complexity: Cannot be easily expressed polynomially or purely exponentially.
 * It's generally much faster than the worst-case `9^E` due to early pruning.
 *
 * Space Complexity Analysis:
 *
 * 1. `board`: The board is modified in-place, so O(N^2) for input storage.
 * 2. Recursion call stack: The maximum depth of recursion is `E` (number of empty cells). O(E) space.
 *
 * Total Space Complexity: O(N^2 + E) which simplifies to O(N^2) since E <= N^2.
 */

module.exports = {
    solveSudoku
};
```