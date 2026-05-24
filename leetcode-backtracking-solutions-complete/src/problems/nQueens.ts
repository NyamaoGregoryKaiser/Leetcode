import { formatBoard, createEmptyBoard } from '@utils/boardUtils';

/**
 * @fileoverview
 * Implements the N-Queens problem using backtracking.
 *
 * Problem: The N-Queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard.
 * This means no two queens can share the same row, column, or diagonal.
 * Given an integer `n`, return all distinct solutions to the N-Queens puzzle.
 * Each solution contains a distinct board configuration of the N-Queens' placement,
 * where 'Q' and '.' both indicate a queen and an empty space, respectively.
 *
 * Example:
 * For n = 4, there are 2 solutions.
 * [".Q..", "...Q", "Q...", "..Q."]
 * ["..Q.", "Q...", "...Q", ".Q.."]
 */

/**
 * Checks if a queen can be safely placed at a given row and column on the board.
 * A queen can be placed if no other queen attacks it from the same column,
 * or either of the two diagonals. Since we place queens row by row,
 * we only need to check columns and diagonals in *previous* rows.
 *
 * @param row The current row where the queen is to be placed.
 * @param col The current column where the queen is to be placed.
 * @param board The current state of the board (N x N boolean matrix).
 * @param n The size of the board.
 * @returns True if a queen can be placed safely, false otherwise.
 */
function isSafe(row: number, col: number, board: boolean[][], n: number): boolean {
    // Check this column in all previous rows
    for (let i = 0; i < row; i++) {
        if (board[i][col]) {
            return false;
        }
    }

    // Check upper left diagonal
    // Start from current (row, col) and move up-left
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) {
            return false;
        }
    }

    // Check upper right diagonal
    // Start from current (row, col) and move up-right
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j]) {
            return false;
        }
    }

    // If no conflicts, it's safe to place the queen
    return true;
}

/**
 * Solves the N-Queens problem using a backtracking algorithm.
 * The function finds all distinct ways to place N queens on an N x N chessboard
 * such that no two queens attack each other.
 *
 * Brute Force Approach (Conceptual):
 * A brute-force approach would involve iterating through all possible N^2 C N ways to place N queens on an N*N board,
 * and for each placement, check if it's valid. This would be (N^2)! / (N! * (N^2-N)!) combinations, which is extremely inefficient.
 *
 * Optimized Backtracking Approach:
 * The backtracking approach optimizes this by placing one queen per row. For each row, it tries placing a queen
 * in each column. If a placement is invalid (checked by `isSafe`), it prunes that branch of the search space.
 * If a placement is valid, it proceeds to the next row. If all N queens are placed, a solution is found.
 * Then, it backtracks to explore other possibilities.
 *
 * Time Complexity: O(N!) - In the worst case, the algorithm explores all permutations of placing N queens.
 *                  For each placement, `isSafe` takes O(N) time. So, more accurately, around O(N! * N).
 *                  This is a loose upper bound. The actual number of states explored is much smaller due to pruning.
 *                  The complexity can be visualized as exploring N choices for the first row, then roughly N-2
 *                  choices for the second, N-4 for the third, and so on.
 * Space Complexity: O(N^2) for storing the board (boolean matrix) and O(N) for the recursion stack depth.
 *                   If we count the output, it could be O(N! * N^2) in the worst case to store all solutions.
 *
 * @param n The size of the chessboard.
 * @returns A 2D array of strings, where each inner array represents a board configuration.
 */
export function solveNQueens(n: number): string[][] {
    const solutions: string[][] = [];

    // Edge case: If n is 0 or less, there are no queens to place.
    if (n <= 0) {
        return [];
    }
    // N=2 and N=3 have no solutions. The algorithm will naturally return an empty array.
    // For n=1, the solution is [["Q"]]

    // Initialize an N x N board with all cells empty (false).
    const board: boolean[][] = createEmptyBoard(n);

    /**
     * Recursive backtracking function.
     * Attempts to place queens starting from the given row.
     *
     * @param row The current row to place a queen in.
     */
    function backtrack(row: number): void {
        // Base case: If all queens are placed (i.e., we successfully placed a queen in row N-1 and are now at row N)
        if (row === n) {
            // A solution is found, format the board and add it to the solutions list.
            solutions.push(formatBoard(board));
            return; // No more rows to process for this path
        }

        // Recursive step: Try placing a queen in each column of the current row
        for (let col = 0; col < n; col++) {
            // Pruning: Check if it's safe to place a queen at (row, col)
            if (isSafe(row, col, board, n)) {
                // Make a choice: Place the queen
                board[row][col] = true;

                // Recurse: Move to the next row to place the next queen
                backtrack(row + 1);

                // Backtrack: Unmake the choice (remove the queen)
                // This is crucial to explore other possibilities in the current row.
                board[row][col] = false;
            }
        }
    }

    // Start the backtracking process from the first row (row 0).
    backtrack(0);

    return solutions;
}

// Alternative for `isSafe` using Set for O(1) average time lookups for occupied columns/diagonals.
// This can make `isSafe` faster, reducing the O(N) check to O(1) for column/diagonal lookups,
// though the overall complexity remains dominated by N!
export function solveNQueensOptimizedSpace(n: number): string[][] {
    const solutions: string[][] = [];
    if (n <= 0) {
        return [];
    }

    // These sets keep track of occupied columns and diagonals.
    // A diagonal `r - c` is constant for elements on the same top-left to bottom-right diagonal.
    // A diagonal `r + c` is constant for elements on the same top-right to bottom-left diagonal.
    const cols = new Set<number>();
    const diag1 = new Set<number>(); // r - c
    const diag2 = new Set<number>(); // r + c

    // The board itself can be represented by just tracking the column of the queen in each row.
    // E.g., `queens[r] = c` means a queen is at (r, c).
    const queens: number[] = new Array(n).fill(-1); // -1 indicates no queen placed in that row yet.

    function backtrack(row: number): void {
        if (row === n) {
            const board: string[] = [];
            for (let r = 0; r < n; r++) {
                let rowStr = '';
                for (let c = 0; c < n; c++) {
                    rowStr += (queens[r] === c ? 'Q' : '.');
                }
                board.push(rowStr);
            }
            solutions.push(board);
            return;
        }

        for (let col = 0; col < n; col++) {
            // Check if placing a queen at (row, col) is safe in O(1) time.
            if (!cols.has(col) && !diag1.has(row - col) && !diag2.has(row + col)) {
                // Make a choice
                queens[row] = col; // Record the queen's position
                cols.add(col);
                diag1.add(row - col);
                diag2.add(row + col);

                // Recurse
                backtrack(row + 1);

                // Backtrack (Unmake the choice)
                queens[row] = -1; // Reset queen position
                cols.delete(col);
                diag1.delete(row - col);
                diag2.delete(row + col);
            }
        }
    }

    backtrack(0);
    return solutions;
}
// Note: The `solveNQueensOptimizedSpace` function is conceptually similar in time complexity
// (still O(N! * N) in a loose sense, as the inner loop iterates N times and set operations are O(1) on average),
// but it uses O(N) space for the sets and `queens` array, rather than O(N^2) for a full boolean board.
// Both are valid and optimal backtracking approaches. For clarity, `createEmptyBoard` and `formatBoard`
// from `boardUtils` are used in the first version, making it slightly more verbose but easier to trace.
// The optimized version directly constructs the output board at the base case.
```