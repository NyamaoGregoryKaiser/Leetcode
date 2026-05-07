```java
package com.backtracking.interview.algorithms;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * This class provides memory-efficient implementations for backtracking problems,
 * often utilizing bit manipulation for state tracking where applicable.
 */
public class MemoryEfficientSolutions {

    /**
     * Problem: N-Queens Problem (Memory Efficient - Bitwise Solution)
     *
     * This version of N-Queens uses bit manipulation to keep track of occupied
     * rows, columns, and diagonals. This is more memory-efficient and often
     * slightly faster than using boolean arrays or HashSets, especially for
     * checking diagonals.
     *
     * Bitmasks:
     * - `cols`: A bitmask where the i-th bit is 1 if column `i` is occupied.
     *   (Not used directly in this column-by-column approach, but can be part of the general bitmask solution)
     * - `rows`: A bitmask where the i-th bit is 1 if row `i` is occupied.
     * - `diag1`: A bitmask for main diagonals (row - col). The index for `row - col` ranges from `-(N-1)` to `N-1`.
     *   We shift this by `N-1` to map it to `0` to `2N-2` to fit in a bitmask.
     * - `diag2`: A bitmask for anti-diagonals (row + col). The index for `row + col` ranges from `0` to `2N-2`.
     *
     * Approach:
     * - The `backtrackNQueensBitwise` function takes `n`, current `col`,
     *   the `board`, `solutions`, and three integer bitmasks (`rows`, `diag1`, `diag2`).
     * - For each cell (row, col):
     *   - Check if the row, main diagonal, and anti-diagonal are free using bitwise AND (`&`) with the corresponding bitmask.
     *   - `(rows & (1 << row)) == 0`: Check if `row` is free.
     *   - `(diag1 & (1 << (row - col + n - 1))) == 0`: Check if main diagonal is free.
     *   - `(diag2 & (1 << (row + col))) == 0`: Check if anti-diagonal is free.
     * - If safe, place queen (`Q`), update bitmasks using bitwise OR (`|`).
     * - Recurse for the next column.
     * - Backtrack: remove queen (`.`), revert bitmasks using bitwise XOR (`^`).
     *
     * @param n The size of the chessboard.
     * @return A list of all distinct N-queens solutions.
     *
     * Time Complexity: O(N!) - Same as the optimized boolean array version, as the pruning logic is identical.
     *
     * Space Complexity: O(N) for recursion stack depth and the `board` representation.
     * The bitmasks use O(1) space regardless of N (up to 32/64 bits).
     * O(N! * N^2) if output is counted.
     */
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> solutions = new ArrayList<>();
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(board[i], '.');
        }

        // Bitmasks:
        // rows: bit i is 1 if row i is occupied.
        // diag1: bit k is 1 if diagonal (row - col = k - (n-1)) is occupied. Shifted for positive index.
        // diag2: bit k is 1 if diagonal (row + col = k) is occupied.
        int rows = 0;
        int diag1 = 0;
        int diag2 = 0;

        backtrackNQueensBitwise(n, 0, board, solutions, rows, diag1, diag2);
        return solutions;
    }

    private void backtrackNQueensBitwise(int n, int col, char[][] board,
                                         List<List<String>> solutions,
                                         int rowsBitmask, int diag1Bitmask, int diag2Bitmask) {
        // Base case: All columns filled, a solution found
        if (col == n) {
            solutions.add(convertBoardToList(board));
            return;
        }

        for (int row = 0; row < n; row++) {
            // Calculate indices for diagonal bitmasks
            int diag1Index = row - col + n - 1; // Maps [-N+1, N-1] to [0, 2N-2]
            int diag2Index = row + col;         // Maps [0, 2N-2] to [0, 2N-2]

            // Check if current position (row, col) is safe using bitmasks
            boolean isRowFree = (rowsBitmask & (1 << row)) == 0;
            boolean isDiag1Free = (diag1Bitmask & (1 << diag1Index)) == 0;
            boolean isDiag2Free = (diag2Bitmask & (1 << diag2Index)) == 0;

            if (isRowFree && isDiag1Free && isDiag2Free) {
                // Place queen
                board[row][col] = 'Q';
                // Update bitmasks: set corresponding bits to 1
                rowsBitmask |= (1 << row);
                diag1Bitmask |= (1 << diag1Index);
                diag2Bitmask |= (1 << diag2Index);

                // Recurse for the next column
                backtrackNQueensBitwise(n, col + 1, board, solutions, rowsBitmask, diag1Bitmask, diag2Bitmask);

                // Backtrack: Remove queen
                board[row][col] = '.';
                // Revert bitmasks: XOR with (1 << index) to toggle the bit back to 0
                // (Only if the bit was set by *this* placement. For backtracking, we just XOR with what we added)
                rowsBitmask ^= (1 << row);
                diag1Bitmask ^= (1 << diag1Index);
                diag2Bitmask ^= (1 << diag2Index);
            }
        }
    }

    // Helper to convert char[][] board to List<String> format for output
    private List<String> convertBoardToList(char[][] board) {
        List<String> currentSolution = new ArrayList<>();
        for (char[] row : board) {
            currentSolution.add(new String(row));
        }
        return currentSolution;
    }
}
```