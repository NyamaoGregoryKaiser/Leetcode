#include "backtracking_solver.hpp"
#include <vector>
#include <string>
#include <numeric> // For std::iota, though not strictly needed here

namespace Backtracking {

// Helper function to check if placing a queen at (row, col) is safe
// A position is safe if no other queen attacks it.
// We only need to check queens in previous rows, as we place queens row by row.
bool is_safe(int row, int col, const std::vector<std::string>& board, int n) {
    // Check this column upwards
    for (int i = 0; i < row; ++i) {
        if (board[i][col] == 'Q') {
            return false;
        }
    }

    // Check upper-left diagonal
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
        if (board[i][j] == 'Q') {
            return false;
        }
    }

    // Check upper-right diagonal
    for (int i = row - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
        if (board[i][j] == 'Q') {
            return false;
        }
    }

    return true;
}

// Recursive backtracking function to solve N-Queens
// @param row: The current row we are trying to place a queen in
// @param n: The size of the chessboard (N x N)
// @param board: The current state of the board (passed by reference to modify)
// @param results: A vector to store all valid board configurations (solutions)
void backtrack_n_queens(int row, int n,
                        std::vector<std::string>& board,
                        std::vector<std::vector<std::string>>& results) {
    // Base case: If all queens are placed (we have successfully placed a queen in each row)
    if (row == n) {
        results.push_back(board); // Add the current valid configuration to results
        return;
    }

    // Recursive step: Try placing a queen in each column of the current row
    for (int col = 0; col < n; ++col) {
        // Pruning step: Check if it's safe to place a queen at (row, col)
        if (is_safe(row, col, board, n)) {
            // Choice: Place a queen at (row, col)
            board[row][col] = 'Q';

            // Recurse: Move to the next row
            backtrack_n_queens(row + 1, n, board, results);

            // Backtrack: Undo the choice (remove the queen)
            // This is crucial to explore other possibilities in the current row
            board[row][col] = '.';
        }
    }
}

// Main function to solve the N-Queens problem
// @param n: The size of the chessboard
// @return: A vector of vectors of strings, where each inner vector represents a solution
//          and each string in the inner vector represents a row of the board.
std::vector<std::vector<std::string>> solveNQueens(int n) {
    std::vector<std::vector<std::string>> results; // Stores all solutions
    // Initialize an N x N empty board with '.'
    std::vector<std::string> board(n, std::string(n, '.'));

    // Start the backtracking process from the first row (row 0)
    backtrack_n_queens(0, n, board, results);

    return results;
}

} // namespace Backtracking

/*
Complexity Analysis for N-Queens:

Time Complexity:
The theoretical upper bound for N-Queens is O(N!). This is because, in the worst case,
we might explore branches that lead to N! possible permutations of queen placements.
However, due to aggressive pruning by `is_safe`, the actual number of states visited
is significantly less.
A tighter upper bound for the number of solutions is approximately N! / C^N, where C is some constant.
Empirically, the complexity is closer to O(N!). For N=14, there are 365,596 solutions,
but the number of nodes in the search tree is much larger, yet far less than 14! (which is ~8.7 trillion).

Space Complexity:
1. `board`: O(N^2) to store the N x N chessboard.
2. `recursion stack`: The maximum depth of the recursion is N (one call for each row). So, O(N) for the stack space.
3. `results`: In the worst case, there can be many solutions. For N=14, there are 365,596 solutions.
   Each solution takes O(N^2) space. So, the total space for storing results can be O(N_solutions * N^2).
   If we only count the auxiliary space needed by the algorithm excluding the output, it's O(N^2) for the board
   plus O(N) for the recursion stack.

Optimization:
The `is_safe` function can be optimized using boolean arrays or bit manipulation to check for conflicts
in O(1) time. This would typically involve three boolean arrays (or bitmasks):
- `col_used[N]`: to check if a column is occupied.
- `diag1_used[2*N-1]`: to check main diagonals (row + col).
- `diag2_used[2*N-1]`: to check anti-diagonals (row - col + N - 1).
This allows `is_safe` to be an O(1) check, improving the constant factors but not the asymptotic complexity
of the search space exploration. The current implementation of `is_safe` checks linearly, which adds O(N)
to each step. Thus, the current time complexity is more accurately O(N^2 * N!) if counting checks naively,
but since the checks are done on parts of the board, it's generally considered to fall under the N! exploration.
For interview purposes, mentioning the O(1) optimization for `is_safe` is a good point.
*/