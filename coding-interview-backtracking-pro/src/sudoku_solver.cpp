#include <vector>
#include <string>
#include <iostream>

#include "../utils/helpers.hpp" // For printBoard

// Sudoku Solver: Solve a Sudoku puzzle by filling the empty cells.

namespace SudokuSolver {

    /**
     * @brief Checks if it's safe to place a given digit at board[row][col].
     * @param board The Sudoku board.
     * @param row The row index.
     * @param col The column index.
     * @param val The digit ('1'-'9') to be placed.
     * @return true if safe, false otherwise.
     *
     * Complexity: O(1) as it checks a fixed number of cells (9 in row, 9 in col, 9 in 3x3 box).
     */
    bool isValid(const std::vector<std::vector<char>>& board, int row, int col, char val) {
        // Check row
        for (int c = 0; c < 9; ++c) {
            if (board[row][c] == val) return false;
        }

        // Check column
        for (int r = 0; r < 9; ++r) {
            if (board[r][col] == val) return false;
        }

        // Check 3x3 sub-box
        int startRow = (row / 3) * 3;
        int startCol = (col / 3) * 3;
        for (int r = 0; r < 3; ++r) {
            for (int c = 0; c < 3; ++c) {
                if (board[startRow + r][startCol + c] == val) return false;
            }
        }
        return true;
    }

    /**
     * @brief Recursive backtracking function to solve the Sudoku puzzle.
     * @param board The Sudoku board (modified in-place).
     * @return true if a solution is found, false otherwise.
     *
     * Time Complexity:
     * In the worst case, for each empty cell, we try 9 digits. There are 81 cells total.
     * A very loose upper bound is O(9^(N*N)) where N is the side length (9 here),
     * but due to strong pruning, it's much faster.
     * It's known that typical Sudoku puzzles can be solved very quickly.
     * The actual complexity depends heavily on the initial number of empty cells
     * and their configuration.
     *
     * Space Complexity:
     * O(1) for auxiliary space (excluding input board). The recursion stack depth
     * can go up to 81 (number of cells), so O(N*N) where N is side length.
     */
    bool backtrack(std::vector<std::vector<char>>& board) {
        for (int row = 0; row < 9; ++row) {
            for (int col = 0; col < 9; ++col) {
                if (board[row][col] == '.') { // Found an empty cell
                    // Try digits from '1' to '9'
                    for (char val = '1'; val <= '9'; ++val) {
                        if (isValid(board, row, col, val)) {
                            // Place the digit (Make a choice)
                            board[row][col] = val;

                            // Recurse: Try to solve the rest of the board
                            if (backtrack(board)) {
                                return true; // Solution found!
                            }

                            // Backtrack: If placing 'val' didn't lead to a solution, undo the choice
                            board[row][col] = '.';
                        }
                    }
                    return false; // No digit from '1' to '9' works for this cell, so backtrack further
                }
            }
        }
        return true; // All cells filled, puzzle solved!
    }

    /**
     * @brief Solves the Sudoku puzzle in-place.
     * @param board The Sudoku board as a vector of vectors of characters.
     */
    void solveSudoku(std::vector<std::vector<char>>& board) {
        if (board.empty() || board[0].empty()) {
            return;
        }
        backtrack(board);
    }

    void test_sudoku_solver(std::vector<std::vector<char>> initial_board) {
        std::cout << "\n--- Sudoku Solver ---\n";
        std::cout << "Initial Board:\n";
        Helpers::printBoard(initial_board);

        std::vector<std::vector<char>> solved_board = initial_board;
        solveSudoku(solved_board);

        std::cout << "\nSolved Board:\n";
        Helpers::printBoard(solved_board);
        std::cout << "----------------------\n";
    }

} // namespace SudokuSolver