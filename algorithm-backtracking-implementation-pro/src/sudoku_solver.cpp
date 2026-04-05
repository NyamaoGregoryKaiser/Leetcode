#include "backtracking_solver.hpp"
#include <vector>
#include <string> // Not directly used in sudoku_solver itself, but helpful for board representation in tests/main
#include <iostream> // For debugging or printing

namespace Backtracking {

// Helper function to check if 'num' can be placed at board[row][col]
// without violating Sudoku rules.
bool is_valid(const std::vector<std::vector<char>>& board, int row, int col, char num) {
    // Check row
    for (int x = 0; x < 9; ++x) {
        if (board[row][x] == num) {
            return false;
        }
    }

    // Check column
    for (int x = 0; x < 9; ++x) {
        if (board[x][col] == num) {
            return false;
        }
    }

    // Check 3x3 subgrid
    int startRow = row - row % 3;
    int startCol = col - col % 3;
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            if (board[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }

    return true;
}

// Recursive backtracking function to solve Sudoku
// Modifies the board in place. Returns true if a solution is found.
// @param board: The Sudoku board (9x9 grid of characters)
// @return: true if the board is solvable and has been solved, false otherwise.
bool backtrack_sudoku(std::vector<std::vector<char>>& board) {
    // Iterate through each cell of the board
    for (int row = 0; row < 9; ++row) {
        for (int col = 0; col < 9; ++col) {
            // If the cell is empty ('.')
            if (board[row][col] == '.') {
                // Try digits '1' through '9'
                for (char num_char = '1'; num_char <= '9'; ++num_char) {
                    // Pruning step: Check if placing 'num_char' at (row, col) is valid
                    if (is_valid(board, row, col, num_char)) {
                        // Choice: Place the number
                        board[row][col] = num_char;

                        // Recurse: Try to solve the rest of the board
                        if (backtrack_sudoku(board)) {
                            // If the recursive call finds a solution, propagate true
                            return true;
                        }

                        // Backtrack: If placing 'num_char' didn't lead to a solution,
                        // undo the choice and try the next number.
                        board[row][col] = '.';
                    }
                }
                // If no number from '1' to '9' works for this cell,
                // then this path is invalid, so backtrack.
                return false;
            }
        }
    }
    // Base case: If no empty cells are found, the board is solved.
    return true;
}

// Main function to solve the Sudoku puzzle
// @param board: The Sudoku board (9x9 grid of characters), modified in place.
void solveSudoku(std::vector<std::vector<char>>& board) {
    backtrack_sudoku(board);
}

} // namespace Backtracking

/*
Complexity Analysis for Sudoku Solver:

Time Complexity:
In the worst case, for an empty 9x9 Sudoku board, we might have to try up to 9 choices for each of the 81 cells.
This leads to an upper bound of O(9^81). However, due to the `is_valid` pruning step, many branches are cut early.
The exact complexity is very hard to determine empirically, as it depends heavily on the initial board configuration.
For a typical Sudoku puzzle with many pre-filled cells, the number of choices per cell is much smaller,
and the search space is significantly reduced.
A more realistic, albeit still very loose, upper bound for puzzles with some initial clues might be
around O(9^M) where M is the number of empty cells. Given M can be up to 81, this still shows the exponential
nature.
The `is_valid` function takes O(N) for checking row/col and O(sqrt(N)) for checking the subgrid, where N is the size of the board (9).
So each check is effectively O(9) (constant time for a fixed 9x9 board).
The number of valid Sudoku grids is known to be around 6.67 × 10^21. The algorithm explores a tiny fraction of this.

Space Complexity:
1. `board`: O(N^2) where N=9, constant space O(81) for the board itself.
2. `recursion stack`: The maximum depth of the recursion is the number of empty cells,
   which can be up to 81. So, O(N^2) for the recursion stack in the worst case.
   The `is_valid` function itself uses O(1) auxiliary space.
*/