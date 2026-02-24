#include <vector>
#include <string>
#include <iostream>
#include <numeric> // For iota

#include "../utils/helpers.hpp" // For printBoard

// N-Queens Problem (Less Pruned Version):
// This version demonstrates the impact of early pruning.
// Instead of checking for conflicts at each queen placement,
// it places N queens (one per row), and *then* checks if the entire board is valid.
// This is still a form of backtracking but with much less effective pruning,
// essentially trying all permutations of column placements and then filtering.

namespace NQueensLessPruned {

    /**
     * @brief Checks if a full board configuration is valid for N-Queens.
     *        This function is called *after* all N queens have been placed.
     * @param board The completed N x N board with N queens placed.
     * @return true if all queens are non-attacking, false otherwise.
     *
     * Complexity: O(N^2) because it iterates through all queens and then checks their attack lines.
     */
    bool isBoardValid(const std::vector<std::string>& board, int n) {
        // We know there's one queen per row.
        // We need to check columns and diagonals.

        // Check columns
        for (int col = 0; col < n; ++col) {
            int queenCount = 0;
            for (int row = 0; row < n; ++row) {
                if (board[row][col] == 'Q') {
                    queenCount++;
                }
            }
            if (queenCount > 1) return false; // More than one queen in this column
        }

        // Check diagonals (top-left to bottom-right)
        // Iterate through all possible primary diagonals
        for (int i = 0; i < n; ++i) { // Starting from row 0, col i
            int queenCount = 0;
            for (int row = 0, col = i; row < n && col < n; ++row, ++col) {
                if (board[row][col] == 'Q') queenCount++;
            }
            if (queenCount > 1) return false;
        }
        for (int i = 1; i < n; ++i) { // Starting from row i, col 0
            int queenCount = 0;
            for (int row = i, col = 0; row < n && col < n; ++row, ++col) {
                if (board[row][col] == 'Q') queenCount++;
            }
            if (queenCount > 1) return false;
        }

        // Check anti-diagonals (top-right to bottom-left)
        // Iterate through all possible secondary diagonals
        for (int i = 0; i < n; ++i) { // Starting from row 0, col i
            int queenCount = 0;
            for (int row = 0, col = i; row < n && col >= 0; ++row, --col) {
                if (board[row][col] == 'Q') queenCount++;
            }
            if (queenCount > 1) return false;
        }
        for (int i = 1; i < n; ++i) { // Starting from row i, col n-1
            int queenCount = 0;
            for (int row = i, col = n-1; row < n && col >= 0; ++row, --col) {
                if (board[row][col] == 'Q') queenCount++;
            }
            if (queenCount > 1) return false;
        }

        return true;
    }

    /**
     * @brief Recursive backtracking function for N-Queens with less effective pruning.
     *        Places N queens one per row, then validates the whole board.
     * @param row Current row to place a queen.
     * @param n Size of the chessboard.
     * @param currentBoard Current state of the board.
     * @param result Vector to store all found solutions.
     *
     * Time Complexity:
     * Much worse than the optimized version. It essentially tries all N^N possible
     * placements (or N! if restricting to one per column from the start).
     * If we restrict to placing one queen per column (like permutations), it would be O(N! * N^2)
     * where N^2 is the cost of `isBoardValid`.
     * If we place a queen in any column without tracking used columns early, it's closer to O(N^N * N^2).
     * This implementation places one queen per row, and then checks. It effectively tries all `N^N` possibilities
     * (though implicitly the `for (int col = 0; col < n; ++col)` ensures one queen per row).
     * If `colUsed` was added for column safety, it would be N! * N^2.
     * Without it, we would need to check column usage as part of `isBoardValid`.
     * To make it a true "less pruned" version of the optimized N-Queens, we simulate
     * placing a queen in *any* column, not just unique columns, and then check `isBoardValid`.
     * However, the problem definition typically implies one queen per row, and one queen per col.
     * A common less-pruned approach is generating all permutations of column indices [0, N-1]
     * and for each permutation, construct the board and check validity. That's O(N! * N^2).
     *
     * Let's make this version place one queen per row, and then *validate the full board* only at the end.
     * We'll still ensure one queen per column by having `colUsed` to avoid identical solutions
     * (as in the optimized version, but the `isSafe` check is gone).
     * No, to make it truly 'less pruned', we should only check `isBoardValid` at `row == n`.
     * We need to remove the `colUsed`, `diag1Used`, `diag2Used` from the `backtrack` parameters
     * and only rely on `isBoardValid` at the end. This will make it much slower.
     *
     * To achieve "less effective pruning" for N-Queens:
     * 1. Place a queen in `(row, col)`.
     * 2. Recurse for `row + 1`.
     * 3. Only at `row == n`, call a comprehensive `isBoardValid` to check ALL conflicts.
     * This means the `backtrack` function will explore branches that are already invalid
     * (e.g., two queens in the same column/diagonal in early rows) until the very end.
     *
     * Let's implement it this way:
     */
    void backtrack_less_pruned(int row, int n,
                               std::vector<std::string>& currentBoard,
                               std::vector<std::vector<std::string>>& result) {
        // Base case: All queens placed (one per row)
        if (row == n) {
            // Check if this full board configuration is valid
            if (isBoardValid(currentBoard, n)) {
                result.push_back(currentBoard);
            }
            return;
        }

        // Recursive step: Try placing a queen in each column of the current row
        for (int col = 0; col < n; ++col) {
            // Make a choice: Place the queen
            currentBoard[row][col] = 'Q';

            // Recurse to the next row (no immediate validity checks for conflicts)
            backtrack_less_pruned(row + 1, n, currentBoard, result);

            // Backtrack: Remove the queen
            currentBoard[row][col] = '.';
        }
    }

    /**
     * @brief Solves the N-Queens problem with less effective pruning.
     * @param n The size of the chessboard.
     * @return A vector of vectors of strings, where each inner vector represents a solution.
     */
    std::vector<std::vector<std::string>> solveNQueensLessPruned(int n) {
        std::vector<std::vector<std::string>> result;
        if (n <= 0) {
            return result;
        }

        std::vector<std::string> currentBoard(n, std::string(n, '.'));
        backtrack_less_pruned(0, n, currentBoard, result);
        return result;
    }

    void test_n_queens_less_pruned(int n) {
        std::cout << "\n--- N-Queens (N=" << n << ", Less Pruned Version) ---\n";
        Helpers::Timer timer;
        auto solutions = solveNQueensLessPruned(n);
        double elapsed_ms = timer.elapsedMilliseconds();
        std::cout << "Found " << solutions.size() << " solutions in " << elapsed_ms << " ms.\n";
        if (solutions.size() > 0 && n <= 6) { // Print for smaller N
            for (const auto& board : solutions) {
                Helpers::printBoard(board);
                std::cout << "------------\n";
            }
        }
        std::cout << "--------------------------------------------------\n";
    }

} // namespace NQueensLessPruned

// Main function to run tests for this specific file
int main() {
    std::cout << "Running N-Queens Less Pruned Version...\n";
    NQueensLessPruned::test_n_queens_less_pruned(4);
    // Compare with NQueens::test_n_queens(4) if you compile both and run.
    // N=8 would be prohibitively slow for this less-pruned version.
    // N=6 is already much slower than optimized N=8.
    NQueensLessPruned::test_n_queens_less_pruned(6);
    return 0;
}