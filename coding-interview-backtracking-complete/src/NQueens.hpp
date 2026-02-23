```cpp
#ifndef NQUEENS_HPP
#define NQUEENS_HPP

#include <vector>
#include <string>
#include <numeric> // For std::iota (optional, if generating board size for testing)

/**
 * @brief Solution for the N-Queens problem.
 *
 * The N-Queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard.
 * This means no two queens share the same row, column, or diagonal.
 * The goal is to return all distinct solutions to the N-Queens puzzle.
 *
 * @complexity
 * Time Complexity: O(N!) - Roughly. In the worst case, without pruning, it would be O(N^N).
 * However, due to pruning, the effective search space is significantly reduced.
 * The number of valid positions decreases rapidly. For N=14, the number of solutions is 365,596.
 * Each solution involves O(N^2) work to construct. So, it's closer to O(N! * N).
 * The exact complexity is difficult to express precisely but is bounded by N!.
 *
 * Space Complexity: O(N^2) - To store the board (N strings of N chars) for each solution,
 * plus O(N) for the recursion stack and boolean arrays (cols, diag1, diag2).
 * If we only count the auxiliary space used by the algorithm (recursion stack, boolean arrays), it's O(N).
 */
class NQueens {
public:
    /**
     * @brief Finds all distinct solutions to the N-Queens puzzle.
     * @param n The size of the chessboard.
     * @return A vector of vectors of strings, where each inner vector represents a solution
     *         (each string represents a row of the board).
     */
    std::vector<std::vector<std::string>> solveNQueens(int n) {
        std::vector<std::vector<std::string>> result;
        if (n <= 0) {
            return result;
        }

        // Initialize an empty board with '.'
        std::vector<std::string> board(n, std::string(n, '.'));

        // Boolean arrays to keep track of occupied columns and diagonals.
        // `colOccupied[c]` is true if column `c` is occupied.
        // `diag1Occupied[r + c]` is true if the main diagonal `r + c` is occupied.
        // `diag2Occupied[r - c + n - 1]` is true if the anti-diagonal `r - c` is occupied.
        // The `+ n - 1` offset for `diag2Occupied` is to ensure indices are non-negative.
        std::vector<bool> colOccupied(n, false);
        std::vector<bool> diag1Occupied(2 * n - 1, false); // Main diagonals (r + c)
        std::vector<bool> diag2Occupied(2 * n - 1, false); // Anti-diagonals (r - c + n - 1)

        // Start the backtracking process from the first row (row 0).
        backtrack(n, 0, board, colOccupied, diag1Occupied, diag2Occupied, result);

        return result;
    }

private:
    /**
     * @brief Recursive backtracking helper function to find N-Queens solutions.
     * @param n The size of the chessboard.
     * @param row The current row being processed.
     * @param board The current state of the chessboard (mutable).
     * @param colOccupied Boolean array tracking occupied columns.
     * @param diag1Occupied Boolean array tracking occupied main diagonals (r+c).
     * @param diag2Occupied Boolean array tracking occupied anti-diagonals (r-c+n-1).
     * @param result Reference to the vector storing all found solutions.
     */
    void backtrack(int n, int row,
                   std::vector<std::string>& board,
                   std::vector<bool>& colOccupied,
                   std::vector<bool>& diag1Occupied,
                   std::vector<bool>& diag2Occupied,
                   std::vector<std::vector<std::string>>& result) {
        // Base case: If all queens are successfully placed (i.e., we have filled all rows).
        if (row == n) {
            result.push_back(board); // A solution is found, add it to the results.
            return;
        }

        // Iterate through each column in the current row.
        for (int col = 0; col < n; ++col) {
            // Check if placing a queen at (row, col) is safe.
            // A position is safe if its column, main diagonal, and anti-diagonal are all unoccupied.
            if (!colOccupied[col] &&
                !diag1Occupied[row + col] &&
                !diag2Occupied[row - col + n - 1]) {

                // Place the queen:
                board[row][col] = 'Q'; // Mark the position with 'Q'
                colOccupied[col] = true; // Mark column as occupied
                diag1Occupied[row + col] = true; // Mark main diagonal as occupied
                diag2Occupied[row - col + n - 1] = true; // Mark anti-diagonal as occupied

                // Recurse for the next row.
                backtrack(n, row + 1, board, colOccupied, diag1Occupied, diag2Occupied, result);

                // Backtrack: Remove the queen and reset occupied flags.
                // This is crucial to explore other possibilities.
                board[row][col] = '.'; // Unmark the position
                colOccupied[col] = false; // Unmark column
                diag1Occupied[row + col] = false; // Unmark main diagonal
                diag2Occupied[row - col + n - 1] = false; // Unmark anti-diagonal
            }
        }
    }
    /*
    Alternative approach discussion:
    Instead of boolean arrays for occupied columns/diagonals, one could iterate through the already
    placed queens (stored in a list of (row, col) pairs) and check for conflicts for each new
    (row, col) candidate. However, this check would take O(N) time for each candidate position,
    leading to a slower overall solution (O(N^4) in a naive analysis before pruning,
    or O(N^2) for the check at each step leading to O(N! * N^2) overall), whereas boolean arrays
    allow O(1) check time. The boolean array approach is generally preferred for its efficiency.
    */
};

#endif // NQUEENS_HPP
```