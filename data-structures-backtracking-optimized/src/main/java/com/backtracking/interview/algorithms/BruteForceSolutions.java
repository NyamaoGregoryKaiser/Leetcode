```java
package com.backtracking.interview.algorithms;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * This class provides "brute-force" or less optimized solutions for problems
 * that can also be solved with backtracking, to highlight the optimization
 * that backtracking (with pruning) provides.
 *
 * For N-Queens, a true "brute force" would be to iterate through all N^N possible
 * ways to place N queens on the board and then validate each. This is computationally
 * infeasible for N > 2.
 *
 * This implementation will show a "less optimized" backtracking, which still uses
 * recursion, but might have less efficient pruning or state management compared
 * to the `BacktrackingProblems` version. For N-Queens, this often means
 * checking safety in O(N) time for each placement, instead of O(1) with boolean arrays/sets.
 */
public class BruteForceSolutions {

    /**
     * Problem: N-Queens Problem (Less Optimized / Brute-force-like Backtracking)
     *
     * This version of N-Queens solver uses backtracking but performs the safety check
     * by iterating through previously placed queens for each candidate cell. This
     * makes the `isSafe` check O(N) for each cell, compared to O(1) in the optimized
     * version that uses boolean arrays for rows, columns, and diagonals.
     *
     * Approach:
     * - Place queens one by one, column by column.
     * - For each cell (row, col), check if it's safe by iterating through all queens
     *   already placed in columns 0 to col-1.
     * - If safe, place queen, recurse for next column.
     * - Backtrack.
     *
     * @param n The size of the chessboard.
     * @return A list of all distinct N-queens solutions.
     *
     * Time Complexity: O(N! * N). The N! is for the search space, and the additional N
     * comes from the `isSafe` check which iterates through previously placed queens.
     *
     * Space Complexity: O(N) for recursion stack depth and `queenPositions` array
     * (which stores row for each column). O(N! * N^2) if output is counted.
     */
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> solutions = new ArrayList<>();
        // queenPositions[col] = row; stores the row where queen in 'col' is placed
        int[] queenPositions = new int[n];
        Arrays.fill(queenPositions, -1); // Initialize to -1 (no queen placed)

        backtrackNQueensBruteForce(n, 0, queenPositions, solutions);
        return solutions;
    }

    private void backtrackNQueensBruteForce(int n, int col, int[] queenPositions, List<List<String>> solutions) {
        if (col == n) {
            solutions.add(convertPositionsToBoard(n, queenPositions));
            return;
        }

        for (int row = 0; row < n; row++) {
            if (isSafeBruteForce(col, row, queenPositions)) {
                queenPositions[col] = row; // Place queen
                backtrackNQueensBruteForce(n, col + 1, queenPositions, solutions);
                queenPositions[col] = -1; // Backtrack: remove queen
            }
        }
    }

    /**
     * Checks if placing a queen at (currentCol, currentRow) is safe.
     * This involves checking against all previously placed queens (columns 0 to currentCol-1).
     * This is the "less optimized" part as it iterates for each check.
     */
    private boolean isSafeBruteForce(int currentCol, int currentRow, int[] queenPositions) {
        for (int prevCol = 0; prevCol < currentCol; prevCol++) {
            int prevRow = queenPositions[prevCol];

            // Check if same row
            if (prevRow == currentRow) {
                return false;
            }

            // Check if same diagonal (main diagonal: row - col, anti-diagonal: row + col)
            // abs(r1 - r2) == abs(c1 - c2)
            if (Math.abs(prevRow - currentRow) == Math.abs(prevCol - currentCol)) {
                return false;
            }
        }
        return true;
    }

    // Helper to convert queen positions to board representation
    private List<String> convertPositionsToBoard(int n, int[] queenPositions) {
        List<String> board = new ArrayList<>();
        for (int r = 0; r < n; r++) {
            char[] rowChars = new char[n];
            Arrays.fill(rowChars, '.');
            for (int c = 0; c < n; c++) {
                if (queenPositions[c] == r) {
                    rowChars[c] = 'Q';
                    break; // Only one queen per row (implicit by our logic)
                }
            }
            board.add(new String(rowChars));
        }
        return board;
    }
}
```