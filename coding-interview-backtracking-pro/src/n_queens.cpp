#include <vector>
#include <string>
#include <iostream>
#include <numeric> // For iota

#include "../utils/helpers.hpp" // For printBoard

// N-Queens Problem: Place N non-attacking queens on an N x N chessboard.
// Find all distinct solutions.

namespace NQueens {

    /**
     * @brief Helper function to check if a queen can be placed at board[row][col]
     *        without attacking any previously placed queens.
     * @param row Current row to place a queen.
     * @param col Current column to place a queen.
     * @param n Size of the board.
     * @param colUsed Boolean array to track if a column is used.
     * @param diag1Used Boolean array to track if a primary diagonal (row - col) is used.
     *        Primary diagonals have constant (row - col) values. The index maps to (row - col + n - 1).
     * @param diag2Used Boolean array to track if a secondary diagonal (row + col) is used.
     *        Secondary diagonals have constant (row + col) values. The index maps to (row + col).
     * @return true if safe to place, false otherwise.
     *
     * Complexity: O(1) as it's just array lookups.
     */
    bool isSafe(int row, int col, int n,
                const std::vector<bool>& colUsed,
                const std::vector<bool>& diag1Used,
                const std::vector<bool>& diag2Used) {
        // Check if column is used
        if (colUsed[col]) return false;
        // Check if primary diagonal (row - col) is used
        if (diag1Used[row - col + n - 1]) return false;
        // Check if secondary diagonal (row + col) is used
        if (diag2Used[row + col]) return false;
        return true;
    }

    /**
     * @brief Recursive backtracking function to find all N-Queens solutions.
     * @param row Current row we are trying to place a queen in.
     * @param n Size of the chessboard.
     * @param currentBoard Current state of the board (list of strings).
     * @param result Vector to store all found solutions.
     * @param colUsed Boolean array tracking used columns.
     * @param diag1Used Boolean array tracking used primary diagonals (row - col).
     * @param diag2Used Boolean array tracking used secondary diagonals (row + col).
     *
     * Time Complexity:
     * The exact time complexity is hard to pin down with a simple formula. It's much
     * less than O(N!), but more than O(N^N). A loose upper bound is O(N!).
     * It's roughly proportional to the number of solutions, which grows rapidly.
     * For N=8, it's very fast. For N=15, it's quite slow.
     *
     * Space Complexity:
     * O(N^2) for storing the `currentBoard` (N strings of length N).
     * O(N) for `colUsed`.
     * O(2N-1) for `diag1Used` (indices from 0 to N-1 for row - col + N - 1)
     * O(2N-1) for `diag2Used` (indices from 0 to 2N-2 for row + col)
     * O(N) for recursion stack depth.
     * Total: O(N^2) (dominated by board storage).
     */
    void backtrack(int row, int n,
                   std::vector<std::string>& currentBoard,
                   std::vector<std::vector<std::string>>& result,
                   std::vector<bool>& colUsed,
                   std::vector<bool>& diag1Used,
                   std::vector<bool>& diag2Used) {
        // Base case: If all queens are placed (we've successfully placed a queen in each row)
        if (row == n) {
            result.push_back(currentBoard);
            return;
        }

        // Recursive step: Try placing a queen in each column of the current row
        for (int col = 0; col < n; ++col) {
            // Check if it's safe to place a queen at (row, col)
            if (isSafe(row, col, n, colUsed, diag1Used, diag2Used)) {
                // Place the queen (Make a choice)
                currentBoard[row][col] = 'Q';
                colUsed[col] = true;
                diag1Used[row - col + n - 1] = true; // Map (row - col) to a positive index
                diag2Used[row + col] = true;         // Map (row + col) to an index

                // Recurse to the next row
                backtrack(row + 1, n, currentBoard, result, colUsed, diag1Used, diag2Used);

                // Backtrack: Remove the queen (Undo the choice)
                currentBoard[row][col] = '.';
                colUsed[col] = false;
                diag1Used[row - col + n - 1] = false;
                diag2Used[row + col] = false;
            }
        }
    }

    /**
     * @brief Solves the N-Queens problem and returns all distinct solutions.
     * @param n The size of the chessboard.
     * @return A vector of vectors of strings, where each inner vector represents a solution.
     */
    std::vector<std::vector<std::string>> solveNQueens(int n) {
        std::vector<std::vector<std::string>> result;
        if (n <= 0) {
            return result; // No queens to place or invalid board size
        }

        std::vector<std::string> currentBoard(n, std::string(n, '.'));
        std::vector<bool> colUsed(n, false);
        // Diagonals: (row - col) ranges from -(n-1) to (n-1).
        // Map to index: (row - col + n - 1) ranges from 0 to 2n-2. Size 2n-1.
        std::vector<bool> diag1Used(2 * n - 1, false);
        // Anti-diagonals: (row + col) ranges from 0 to 2n-2. Size 2n-1.
        std::vector<bool> diag2Used(2 * n - 1, false);

        backtrack(0, n, currentBoard, result, colUsed, diag1Used, diag2Used);
        return result;
    }

    void test_n_queens(int n) {
        std::cout << "\n--- N-Queens (N=" << n << ") ---\n";
        auto solutions = solveNQueens(n);
        std::cout << "Found " << solutions.size() << " solutions.\n";
        if (solutions.size() > 0 && n <= 6) { // Print for smaller N
            for (const auto& board : solutions) {
                Helpers::printBoard(board);
                std::cout << "------------\n";
            }
        } else if (solutions.size() > 0) {
             std::cout << "Showing first solution for N=" << n << ":\n";
             Helpers::printBoard(solutions[0]);
             std::cout << "------------\n";
        }
        std::cout << "----------------------\n";
    }

} // namespace NQueens