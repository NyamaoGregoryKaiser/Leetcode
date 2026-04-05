#ifndef BACKTRACKING_SOLVER_HPP
#define BACKTRACKING_SOLVER_HPP

#include <vector>
#include <string>
#include <set> // For optimized_solutions (if needed for distinct elements)

// Forward declarations for all problem solutions
namespace Backtracking {

    // N-Queens
    std::vector<std::vector<std::string>> solveNQueens(int n);

    // Sudoku Solver
    void solveSudoku(std::vector<std::vector<char>>& board);

    // Permutations
    std::vector<std::vector<int>> permute(std::vector<int>& nums);

    // Subsets
    std::vector<std::vector<int>> subsets(std::vector<int>& nums);

} // namespace Backtracking

// Forward declarations for optimized/alternative solutions
namespace OptimizedBacktracking {

    // Iterative Subsets using bit manipulation
    std::vector<std::vector<int>> subsetsIterative(std::vector<int>& nums);

} // namespace OptimizedBacktracking

#endif // BACKTRACKING_SOLVER_HPP