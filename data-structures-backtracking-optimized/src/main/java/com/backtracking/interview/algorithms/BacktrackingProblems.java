```java
package com.backtracking.interview.algorithms;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * This class contains implementations of various backtracking problems commonly
 * encountered in coding interviews. Each problem includes detailed comments
 * explaining the logic, time complexity, and space complexity.
 *
 * Backtracking is an algorithmic paradigm that tries to find all (or some)
 * solutions to a computational problem by incrementally building candidates to the solutions,
 * and abandoning a candidate ("backtracking") as soon as it determines that the
 * candidate cannot possibly be completed to a valid solution.
 *
 * Key components of a backtracking algorithm:
 * 1.  **State**: What information do we need to pass recursively (current solution, remaining choices, visited status, etc.)?
 * 2.  **Base Case**: When do we know a valid solution has been found (or that a path is invalid)?
 * 3.  **Choices**: What are the possible next steps from the current state?
 * 4.  **Explore**: Recursively call the function for each choice.
 * 5.  **Backtrack**: Undo the choice made after the recursive call returns, restoring the state to explore other paths.
 * 6.  **Pruning**: Optimizations to reduce the search space by identifying invalid paths early.
 */
public class BacktrackingProblems {

    /**
     * Problem 1: N-Queens Problem
     *
     * The N-queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard.
     * Given an integer N, return all distinct solutions to the N-queens puzzle.
     * Each solution contains a distinct board configuration of the N-queens' placement,
     * where 'Q' and '.' both indicate a queen and an empty space respectively.
     *
     * Approach:
     * We place queens one by one, column by column (or row by row).
     * For each cell (row, col), we try to place a queen. If it's safe (doesn't attack
     * any previously placed queens), we mark it and recursively try to place the next queen.
     * If the recursion leads to a solution, we add it. If not, or if all columns are filled,
     * we backtrack: remove the queen from (row, col) and try the next row/column.
     *
     * Safety Check:
     * A queen at (r1, c1) attacks another queen at (r2, c2) if:
     * 1. They are in the same row: r1 == r2
     * 2. They are in the same column: c1 == c2
     * 3. They are on the same diagonal: abs(r1 - r2) == abs(c1 - c2)
     *
     * Since we place queens one column at a time, we only need to worry about
     * checking current row, and two diagonals (main diagonal: r-c, anti-diagonal: r+c).
     * We can use boolean arrays or hash sets to keep track of occupied rows, columns,
     * and diagonals. For N-Queens, as we place one queen per column, we only need to
     * check row and diagonals.
     *
     * @param n The size of the chessboard (N x N).
     * @return A list of all distinct N-queens solutions.
     *
     * Time Complexity: O(N!) - Roughly. In the worst case, it explores many branches.
     * The exact complexity is hard to pin down but much better than N^N due to pruning.
     * It's bounded by N! because there are N! ways to place N queens such that no two
     * queens share the same row or column (before checking diagonals).
     *
     * Space Complexity: O(N^2) for the board, or O(N) for auxiliary space (rows, cols, diagonals tracking)
     * and recursion stack depth, if we don't count the output. If output is counted, it could be O(N! * N^2).
     */
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> solutions = new ArrayList<>();
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(board[i], '.');
        }

        // To keep track of occupied rows, columns, and diagonals for O(1) lookup.
        // `cols` array is not strictly needed if we iterate by columns and only place one queen per column.
        // `diag1` checks main diagonal (row - col)
        // `diag2` checks anti-diagonal (row + col)
        boolean[] usedRows = new boolean[n];
        boolean[] usedDiag1 = new boolean[2 * n - 1]; // row - col can range from -(N-1) to N-1. Shift by N-1 to get positive index.
        boolean[] usedDiag2 = new boolean[2 * n - 1]; // row + col can range from 0 to 2*(N-1).

        backtrackNQueens(n, 0, board, solutions, usedRows, usedDiag1, usedDiag2);
        return solutions;
    }

    private void backtrackNQueens(int n, int col, char[][] board,
                                  List<List<String>> solutions,
                                  boolean[] usedRows, boolean[] usedDiag1, boolean[] usedDiag2) {
        // Base case: If all queens are placed (all columns filled), a solution is found.
        if (col == n) {
            solutions.add(convertBoardToList(board));
            return;
        }

        // Iterate through each row in the current column
        for (int row = 0; row < n; row++) {
            // Check if it's safe to place a queen at (row, col)
            // (row - col) + (n - 1) for diag1 index to handle negative values
            // (row + col) for diag2 index
            if (!usedRows[row] && !usedDiag1[row - col + n - 1] && !usedDiag2[row + col]) {
                // Place queen
                board[row][col] = 'Q';
                usedRows[row] = true;
                usedDiag1[row - col + n - 1] = true;
                usedDiag2[row + col] = true;

                // Recurse for the next column
                backtrackNQueens(n, col + 1, board, solutions, usedRows, usedDiag1, usedDiag2);

                // Backtrack: Remove queen and reset state
                usedRows[row] = false;
                usedDiag1[row - col + n - 1] = false;
                usedDiag2[row + col] = false;
                board[row][col] = '.';
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


    /**
     * Problem 2: Sudoku Solver
     *
     * Write a program to solve a Sudoku puzzle by filling the empty cells.
     * A Sudoku solution must satisfy all of the following rules:
     * 1. Each of the digits 1-9 must occur exactly once in each row.
     * 2. Each of the digits 1-9 must occur exactly once in each column.
     * 3. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
     * The '.' character indicates empty cells.
     *
     * Approach:
     * This is a classic backtracking problem. We iterate through the board to find an empty cell ('.').
     * For each empty cell, we try placing digits from '1' to '9'.
     * If placing a digit is valid according to Sudoku rules (row, column, 3x3 sub-grid),
     * we place it and recursively call the solver for the next empty cell.
     * If the recursive call returns true (meaning a solution was found), we propagate true.
     * If the recursive call returns false (meaning this path didn't lead to a solution),
     * we backtrack: remove the placed digit (reset to '.') and try the next digit.
     * If no digit works for the current cell, we return false.
     *
     * @param board The N x N Sudoku board (N=9 for standard Sudoku). Modifies the board in-place.
     * @return true if the Sudoku was solved, false otherwise.
     *
     * Time Complexity: O(9^(N*N)), where N is the side length (9 for Sudoku). This is the worst-case
     * without any early pruning. The actual time is significantly less due to pruning.
     * For each empty cell, we try 9 possibilities. If there are K empty cells, roughly 9^K.
     *
     * Space Complexity: O(N*N) for the recursion stack in the worst case (a board with many empty cells),
     * plus constant space for sets/arrays if used to track availability (not used in this in-place validation version).
     */
    public boolean solveSudoku(char[][] board) {
        return backtrackSudoku(board);
    }

    private boolean backtrackSudoku(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') { // Found an empty cell
                    for (char num = '1'; num <= '9'; num++) { // Try placing digits 1-9
                        if (isValidSudokuPlacement(board, r, c, num)) {
                            board[r][c] = num; // Place the number
                            if (backtrackSudoku(board)) { // Recurse for the next empty cell
                                return true; // If solution found, propagate true
                            } else {
                                board[r][c] = '.'; // Backtrack: undo the choice
                            }
                        }
                    }
                    return false; // No number worked for this cell, so this path is invalid
                }
            }
        }
        return true; // All cells filled, Sudoku solved
    }

    // Helper to check if placing 'num' at (row, col) is valid
    private boolean isValidSudokuPlacement(char[][] board, int row, int col, char num) {
        // Check row
        for (int c = 0; c < 9; c++) {
            if (board[row][c] == num) {
                return false;
            }
        }
        // Check column
        for (int r = 0; r < 9; r++) {
            if (board[r][col] == num) {
                return false;
            }
        }
        // Check 3x3 sub-box
        int startRow = (row / 3) * 3;
        int startCol = (col / 3) * 3;
        for (int r = startRow; r < startRow + 3; r++) {
            for (int c = startCol; c < startCol + 3; c++) {
                if (board[r][c] == num) {
                    return false;
                }
            }
        }
        return true;
    }


    /**
     * Problem 3: Combination Sum II
     *
     * Given a collection of candidate numbers (candidates) and a target number (target),
     * find all unique combinations in candidates where the candidate numbers sum to target.
     * Each number in candidates may only be used once in the combination.
     * The solution set must not contain duplicate combinations.
     *
     * Example: candidates = [10,1,2,7,6,1,5], target = 8
     * A solution set is:
     * [
     *   [1,1,6],
     *   [1,2,5],
     *   [1,7],
     *   [2,6]
     * ]
     *
     * Approach:
     * This is a variation of Combination Sum where each number can be used at most once,
     * and the input array might contain duplicates.
     * 1. Sort the `candidates` array. This is crucial for handling duplicates effectively.
     * 2. Use a recursive backtracking helper function.
     * 3. At each step, iterate through the candidates from the `start` index.
     * 4. To avoid duplicate combinations:
     *    If the current candidate is the same as the previous one (i.e., `candidates[i] == candidates[i-1]`)
     *    AND `i > start`, then skip this candidate. This ensures that for duplicate numbers,
     *    we only pick the first occurrence in the sorted array for a given "level" of recursion,
     *    preventing [1,1,6] being generated from (first 1, second 1, 6) and (second 1, first 1, 6).
     * 5. Add the current candidate to the `currentCombination`.
     * 6. Recurse with `target - currentCandidate` and `i + 1` (since each number can be used once).
     * 7. Backtrack: remove the last added candidate from `currentCombination`.
     * 8. Base cases:
     *    - If `target == 0`, a valid combination is found. Add `currentCombination` to results.
     *    - If `target < 0`, this path is invalid, return.
     *
     * @param candidates An array of candidate numbers.
     * @param target The target sum.
     * @return A list of unique combinations.
     *
     * Time Complexity: O(2^N) in the worst case (e.g., all 1s). The number of subsets can be 2^N.
     * Sorting takes O(N log N).
     *
     * Space Complexity: O(N) for recursion stack depth and `currentCombination`.
     * O(N * 2^N) if counting the output list.
     */
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> solutions = new ArrayList<>();
        Arrays.sort(candidates); // Sort to handle duplicates effectively
        backtrackCombinationSum2(candidates, target, 0, new ArrayList<>(), solutions);
        return solutions;
    }

    private void backtrackCombinationSum2(int[] candidates, int remainingTarget, int start,
                                          List<Integer> currentCombination, List<List<Integer>> solutions) {
        // Base case 1: Found a combination that sums to target
        if (remainingTarget == 0) {
            solutions.add(new ArrayList<>(currentCombination));
            return;
        }
        // Base case 2: Target cannot be reached with current path
        if (remainingTarget < 0) {
            return;
        }

        // Iterate through candidates starting from 'start' index
        for (int i = start; i < candidates.length; i++) {
            // Skip duplicates: If current number is same as previous, and it's not the first element in the current recursive call
            // This prevents generating duplicate combinations like [1,1,6] and [1,1,6] where the '1's are from different indices.
            if (i > start && candidates[i] == candidates[i - 1]) {
                continue;
            }

            // Pruning: if current candidate is greater than remainingTarget, no need to proceed further
            // (because array is sorted, subsequent numbers will also be too large)
            if (candidates[i] > remainingTarget) {
                break;
            }

            // Choose
            currentCombination.add(candidates[i]);
            // Explore: Recurse with updated target and next index (i+1 because each number can be used only once)
            backtrackCombinationSum2(candidates, remainingTarget - candidates[i], i + 1, currentCombination, solutions);
            // Unchoose (Backtrack)
            currentCombination.remove(currentCombination.size() - 1);
        }
    }


    /**
     * Problem 4: Permutations II
     *
     * Given a collection of numbers that might contain duplicates, return all unique permutations.
     *
     * Example: nums = [1,1,2]
     * A solution set is:
     * [
     *   [1,1,2],
     *   [1,2,1],
     *   [2,1,1]
     * ]
     *
     * Approach:
     * Similar to Permutations I, but with the added complexity of handling duplicates.
     * 1. Sort the input array `nums`. This is crucial for correctly identifying and skipping duplicates.
     * 2. Use a boolean array `used` to track which numbers have been used in the `currentPermutation`.
     * 3. The backtracking function takes `nums`, `used`, `currentPermutation`, and `solutions`.
     * 4. Base case: If `currentPermutation` size equals `nums.length`, add it to `solutions`.
     * 5. For each number in `nums`:
     *    - If it's already `used`, skip it.
     *    - **Duplicate handling**: If `i > 0` and `nums[i] == nums[i-1]` AND `!used[i-1]`, then skip `nums[i]`.
     *      Explanation: `nums[i-1]` is identical to `nums[i]`. If `used[i-1]` is false, it means `nums[i-1]`
     *      was *not* picked in the previous step of the *same recursive level*, but we are considering `nums[i]`
     *      now. This means `nums[i-1]` was skipped, and we are now trying `nums[i]`. If we allow this, we'll
     *      generate duplicate permutations. By skipping `nums[i]` in this case, we ensure that if there are
     *      duplicate numbers, only the "leftmost" unused duplicate is considered first at any given depth
     *      of the recursion.
     *    - Choose: Mark `used[i] = true`, add `nums[i]` to `currentPermutation`.
     *    - Explore: Recurse.
     *    - Unchoose (Backtrack): Mark `used[i] = false`, remove `nums[i]` from `currentPermutation`.
     *
     * @param nums An array of numbers that may contain duplicates.
     * @return A list of all unique permutations.
     *
     * Time Complexity: O(N * N!) - N! permutations, and for each, it takes O(N) to build the permutation.
     * Sorting takes O(N log N).
     *
     * Space Complexity: O(N) for recursion stack and `currentPermutation` and `used` array.
     * O(N * N!) if counting the output list.
     */
    public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> solutions = new ArrayList<>();
        Arrays.sort(nums); // Sort to handle duplicates
        boolean[] used = new boolean[nums.length];
        backtrackPermuteUnique(nums, used, new ArrayList<>(), solutions);
        return solutions;
    }

    private void backtrackPermuteUnique(int[] nums, boolean[] used,
                                        List<Integer> currentPermutation, List<List<Integer>> solutions) {
        // Base case: currentPermutation is complete
        if (currentPermutation.size() == nums.length) {
            solutions.add(new ArrayList<>(currentPermutation));
            return;
        }

        // Iterate through all numbers in nums
        for (int i = 0; i < nums.length; i++) {
            // If the number is already used, skip it
            if (used[i]) {
                continue;
            }

            // Handling duplicates:
            // If the current number is the same as the previous number, AND
            // the previous number was NOT used (meaning it was skipped for this slot)
            // THEN, skipping the current number prevents duplicate permutations.
            // Example: [1_a, 1_b, 2]. If we are at index i=1 (1_b) and 1_a (index i=0)
            // was skipped, it means we are effectively trying to place 1_b first.
            // This would lead to a permutation that starts with 1_b, which would be
            // identical to one starting with 1_a.
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                continue;
            }

            // Choose
            used[i] = true;
            currentPermutation.add(nums[i]);

            // Explore
            backtrackPermuteUnique(nums, used, currentPermutation, solutions);

            // Unchoose (Backtrack)
            currentPermutation.remove(currentPermutation.size() - 1);
            used[i] = false;
        }
    }


    /**
     * Problem 5: Word Search
     *
     * Given an m x n grid of characters and a string word, return true if word exists in the grid.
     * The word can be constructed from letters of sequentially adjacent cells, where adjacent cells
     * are horizontally or vertically neighboring. The same letter cell may not be used more than once.
     *
     * Example:
     * board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
     * Output: true
     *
     * Approach:
     * This is a pathfinding problem using Depth-First Search (DFS) with backtracking.
     * 1. Iterate through each cell (r, c) in the `board`.
     * 2. If `board[r][c]` matches the first character of `word`, start a DFS from this cell.
     * 3. The `dfs` function takes `board`, `word`, current `index` (of character in word),
     *    current `row`, `col`.
     * 4. Base case: If `index` reaches `word.length()`, it means the entire word has been found, return `true`.
     * 5. Invalid cases (pruning):
     *    - If `row` or `col` are out of bounds.
     *    - If `board[row][col]` does not match `word.charAt(index)`.
     *    - If the cell has already been visited (marked).
     * 6. Mark the current cell as visited (e.g., by changing its character to a temporary non-match character like '#').
     * 7. Explore its four neighbors (up, down, left, right).
     *    If any recursive call to `dfs` for a neighbor returns `true`, propagate `true`.
     * 8. Backtrack: Restore the character in `board[row][col]` to its original value. This is crucial
     *    because other paths might need to use this cell.
     * 9. If all neighbors are explored and none returned `true`, return `false`.
     *
     * @param board The character grid.
     * @param word The word to search for.
     * @return true if the word exists, false otherwise.
     *
     * Time Complexity: O(M * N * 3^L) where M is number of rows, N is number of columns, and L is word length.
     * We iterate through M*N cells. From each cell, we can go in 3 directions (not 4, because we don't go back
     * to the cell we came from). Each step takes O(1).
     *
     * Space Complexity: O(L) for the recursion stack depth (length of the word), as each recursive call
     * corresponds to one character in the word. O(1) for board modification (in-place).
     */
    public boolean exist(char[][] board, String word) {
        if (board == null || board.length == 0 || board[0].length == 0 || word == null || word.isEmpty()) {
            return false;
        }

        int rows = board.length;
        int cols = board[0].length;

        // Iterate through each cell as a starting point
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (board[r][c] == word.charAt(0)) { // Check if the first character matches
                    if (dfsWordSearch(board, word, 0, r, c, rows, cols)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private boolean dfsWordSearch(char[][] board, String word, int index,
                                  int r, int c, int rows, int cols) {
        // Base case: If we have matched all characters in the word
        if (index == word.length()) {
            return true;
        }

        // Invalid cases: out of bounds, or character mismatch, or already visited cell
        // A cell is considered "visited" temporarily by changing its value.
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word.charAt(index)) {
            return false;
        }

        char originalChar = board[r][c];
        board[r][c] = '#'; // Mark cell as visited (temporarily change character)

        // Explore neighbors (up, down, left, right)
        // int[] dr = {-1, 1, 0, 0};
        // int[] dc = {0, 0, -1, 1};
        // for (int i = 0; i < 4; i++) {
        //     if (dfsWordSearch(board, word, index + 1, r + dr[i], c + dc[i], rows, cols)) {
        //         return true;
        //     }
        // }
        
        // Manual neighbor exploration for clarity:
        if (dfsWordSearch(board, word, index + 1, r + 1, c, rows, cols) || // Down
            dfsWordSearch(board, word, index + 1, r - 1, c, rows, cols) || // Up
            dfsWordSearch(board, word, index + 1, r, c + 1, rows, cols) || // Right
            dfsWordSearch(board, word, index + 1, r, c - 1, rows, cols)) { // Left
            return true;
        }

        board[r][c] = originalChar; // Backtrack: Restore the cell's original character
        return false;
    }
}
```