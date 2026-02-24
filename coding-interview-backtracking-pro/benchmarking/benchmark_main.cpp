#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include <numeric> // For std::iota

#include "../src/n_queens.cpp"
#include "../src/sudoku_solver.cpp"
#include "../src/combination_sum_ii.cpp"
#include "../src/permutations.cpp"

#include "../utils/helpers.hpp" // For Timer

void benchmarkNQueens() {
    std::cout << "\n=== Benchmarking N-Queens ===\n";
    std::vector<int> n_values = {4, 8, 10, 12, 13, 14}; // N=15 and higher get very slow

    for (int n : n_values) {
        Helpers::Timer timer;
        auto solutions = NQueens::solveNQueens(n);
        double elapsed_ms = timer.elapsedMilliseconds();
        std::cout << "N=" << n << ": Found " << solutions.size()
                  << " solutions in " << elapsed_ms << " ms\n";
    }
    std::cout << "-----------------------------\n";
}

void benchmarkSudokuSolver() {
    std::cout << "\n=== Benchmarking Sudoku Solver ===\n";
    // A standard hard Sudoku puzzle
    std::vector<std::vector<char>> board = {
        {'8','.','.','.','.','.','.','.','.'},
        {'.','.','3','6','.','.','.','.','.'},
        {'.','7','.','.','9','.','2','.','.'},
        {'.','5','.','.','.','7','.','.','.'},
        {'.','.','.','.','4','5','7','.','.'},
        {'.','.','.','1','.','.','.','3','.'},
        {'.','.','1','.','.','.','.','6','8'},
        {'.','.','8','5','.','.','.','1','.'},
        {'.','9','.','.','.','.','4','.','.'}
    };

    std::cout << "Solving a single hard Sudoku puzzle...\n";
    Helpers::Timer timer;
    SudokuSolver::solveSudoku(board);
    double elapsed_ms = timer.elapsedMilliseconds();
    std::cout << "Solved in " << elapsed_ms << " ms\n";
    // Helpers::printBoard(board); // Optionally print the solved board
    std::cout << "-----------------------------------\n";
}

void benchmarkCombinationSumII() {
    std::cout << "\n=== Benchmarking Combination Sum II ===\n";
    // Test with various inputs
    std::vector<int> candidates1 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
    int target1 = 25; // Many combinations possible

    std::cout << "Candidates size: " << candidates1.size() << ", Target: " << target1 << "\n";
    Helpers::Timer timer1;
    auto solutions1 = CombinationSumII::combinationSum2(candidates1, target1);
    double elapsed_ms1 = timer1.elapsedMilliseconds();
    std::cout << "Found " << solutions1.size() << " solutions in " << elapsed_ms1 << " ms\n";

    std::vector<int> candidates2 = {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 10, 10, 10};
    int target2 = 30; // More duplicates, larger target
    std::cout << "Candidates size: " << candidates2.size() << ", Target: " << target2 << " (with duplicates)\n";
    Helpers::Timer timer2;
    auto solutions2 = CombinationSumII::combinationSum2(candidates2, target2);
    double elapsed_ms2 = timer2.elapsedMilliseconds();
    std::cout << "Found " << solutions2.size() << " solutions in " << elapsed_ms2 << " ms\n";

    std::cout << "--------------------------------------\n";
}

void benchmarkPermutations() {
    std::cout << "\n=== Benchmarking Permutations ===\n";
    std::vector<int> n_values = {3, 5, 7, 8, 9, 10}; // N=11 and higher get very slow

    for (int n : n_values) {
        std::vector<int> nums(n);
        std::iota(nums.begin(), nums.end(), 1); // Fill with 1, 2, ..., n

        Helpers::Timer timer;
        auto solutions = Permutations::permute(nums);
        double elapsed_ms = timer.elapsedMilliseconds();
        std::cout << "N=" << n << ": Found " << solutions.size()
                  << " solutions in " << elapsed_ms << " ms\n";
    }
    std::cout << "-------------------------------\n";
}


int main() {
    std::cout << "Starting Benchmarking Suite...\n";
    benchmarkNQueens();
    benchmarkSudokuSolver();
    benchmarkCombinationSumII();
    benchmarkPermutations();
    std::cout << "\nBenchmarking Suite Completed.\n";
    return 0;
}