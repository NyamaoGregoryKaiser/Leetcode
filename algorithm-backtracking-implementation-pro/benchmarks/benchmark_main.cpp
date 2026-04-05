#include <iostream>
#include <vector>
#include <numeric> // For std::iota
#include <algorithm> // For std::sort

#include "../src/backtracking_solver.hpp"
#include "../src/utils.hpp"

// Benchmark function for N-Queens
void benchmark_n_queens() {
    std::cout << "\n--- Benchmarking N-Queens ---\n";
    Utils::Timer timer;

    // N = 4
    timer.reset();
    auto res4 = Backtracking::solveNQueens(4);
    timer.print_elapsed("N-Queens (N=4)");
    std::cout << "  Found " << res4.size() << " solutions.\n";

    // N = 8
    timer.reset();
    auto res8 = Backtracking::solveNQueens(8);
    timer.print_elapsed("N-Queens (N=8)");
    std::cout << "  Found " << res8.size() << " solutions.\n";

    // N = 10
    timer.reset();
    auto res10 = Backtracking::solveNQueens(10);
    timer.print_elapsed("N-Queens (N=10)");
    std::cout << "  Found " << res10.size() << " solutions.\n";
    
    // N = 12
    timer.reset();
    auto res12 = Backtracking::solveNQueens(12);
    timer.print_elapsed("N-Queens (N=12)");
    std::cout << "  Found " << res12.size() << " solutions.\n";

    // N = 14 (This can take a few seconds to tens of seconds)
    std::cout << "  Benchmarking N-Queens (N=14). This may take a while...\n";
    timer.reset();
    auto res14 = Backtracking::solveNQueens(14);
    timer.print_elapsed("N-Queens (N=14)");
    std::cout << "  Found " << res14.size() << " solutions.\n";
}

// Benchmark function for Sudoku Solver
void benchmark_sudoku_solver() {
    std::cout << "\n--- Benchmarking Sudoku Solver ---\n";
    Utils::Timer timer;

    // Easy Sudoku
    std::vector<std::vector<char>> easy_board = {
        {'5','3','.','.','7','.','.','.','.'},
        {'6','.','.','1','9','5','.','.','.'},
        {'.','9','8','.','.','.','.','6','.'},
        {'8','.','.','.','6','.','.','.','3'},
        {'4','.','.','8','.','3','.','.','1'},
        {'7','.','.','.','2','.','.','.','6'},
        {'.','6','.','.','.','.','2','8','.'},
        {'.','.','.','4','1','9','.','.','5'},
        {'.','.','.','.','8','.','.','7','9'}
    };
    timer.reset();
    Backtracking::solveSudoku(easy_board);
    timer.print_elapsed("Sudoku Solver (Easy)");

    // Hard Sudoku (known hard puzzle)
    std::vector<std::vector<char>> hard_board = {
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
    timer.reset();
    Backtracking::solveSudoku(hard_board);
    timer.print_elapsed("Sudoku Solver (Hard)");

    // Even harder Sudoku (AI Escargot - considered one of the hardest)
    std::vector<std::vector<char>> hardest_board = {
        {'1','.','.','.','.','7','.','9','.'},
        {'.','3','.','.','2','.','.','.','8'},
        {'.','.','9','6','.','.','5','.','.'},
        {'.','.','5','3','.','.','9','.','.'},
        {'.','1','.','.','8','.','.','.','2'},
        {'6','.','.','.','.','4','5','.','.'},
        {'.','4','.','2','.','.','6','.','.'},
        {'9','2','.','.','3','.','.','.','.'},
        {'.','.','7','.','.','.','.','8','.'}
    };
    std::cout << "  Benchmarking Sudoku Solver (AI Escargot). This can take longer...\n";
    timer.reset();
    Backtracking::solveSudoku(hardest_board);
    timer.print_elapsed("Sudoku Solver (AI Escargot)");
}

// Benchmark function for Permutations
void benchmark_permutations() {
    std::cout << "\n--- Benchmarking Permutations ---\n";
    Utils::Timer timer;

    // N = 5
    std::vector<int> nums5(5);
    std::iota(nums5.begin(), nums5.end(), 1);
    timer.reset();
    auto res5 = Backtracking::permute(nums5);
    timer.print_elapsed("Permutations (N=5)");
    std::cout << "  Found " << res5.size() << " solutions.\n"; // 5! = 120

    // N = 8
    std::vector<int> nums8(8);
    std::iota(nums8.begin(), nums8.end(), 1);
    timer.reset();
    auto res8 = Backtracking::permute(nums8);
    timer.print_elapsed("Permutations (N=8)");
    std::cout << "  Found " << res8.size() << " solutions.\n"; // 8! = 40320

    // N = 10 (This can take a few seconds)
    std::cout << "  Benchmarking Permutations (N=10). This may take a while...\n";
    std::vector<int> nums10(10);
    std::iota(nums10.begin(), nums10.end(), 1);
    timer.reset();
    auto res10 = Backtracking::permute(nums10);
    timer.print_elapsed("Permutations (N=10)");
    std::cout << "  Found " << res10.size() << " solutions.\n"; // 10! = 3,628,800

    // N = 11 (This will take significant time, comment out for quick runs)
    /*
    std::cout << "  Benchmarking Permutations (N=11). This will take a LONG time...\n";
    std::vector<int> nums11(11);
    std::iota(nums11.begin(), nums11.end(), 1);
    timer.reset();
    auto res11 = Backtracking::permute(nums11);
    timer.print_elapsed("Permutations (N=11)");
    std::cout << "  Found " << res11.size() << " solutions.\n"; // 11! = 39,916,800
    */
}

// Benchmark function for Subsets
void benchmark_subsets() {
    std::cout << "\n--- Benchmarking Subsets ---\n";
    Utils::Timer timer;

    // N = 10
    std::vector<int> nums10(10);
    std::iota(nums10.begin(), nums10.end(), 1);
    timer.reset();
    auto res10 = Backtracking::subsets(nums10);
    timer.print_elapsed("Subsets (N=10)");
    std::cout << "  Found " << res10.size() << " solutions.\n"; // 2^10 = 1024

    // N = 15
    std::vector<int> nums15(15);
    std::iota(nums15.begin(), nums15.end(), 1);
    timer.reset();
    auto res15 = Backtracking::subsets(nums15);
    timer.print_elapsed("Subsets (N=15)");
    std::cout << "  Found " << res15.size() << " solutions.\n"; // 2^15 = 32768

    // N = 20 (This can take a few seconds)
    std::vector<int> nums20(20);
    std::iota(nums20.begin(), nums20.end(), 1);
    timer.reset();
    auto res20 = Backtracking::subsets(nums20);
    timer.print_elapsed("Subsets (N=20)");
    std::cout << "  Found " << res20.size() << " solutions.\n"; // 2^20 = 1,048,576

    // N = 25 (This will take a significant amount of time and memory)
    std::cout << "  Benchmarking Subsets (N=25). This may take a while and use substantial memory...\n";
    std::vector<int> nums25(25);
    std::iota(nums25.begin(), nums25.end(), 1);
    timer.reset();
    auto res25 = Backtracking::subsets(nums25);
    timer.print_elapsed("Subsets (N=25)");
    std::cout << "  Found " << res25.size() << " solutions.\n"; // 2^25 = 33,554,432
}

// Benchmark function for Optimized Subsets (Iterative/Bit Manipulation)
void benchmark_optimized_subsets() {
    std::cout << "\n--- Benchmarking Optimized Subsets (Iterative) ---\n";
    Utils::Timer timer;

    // N = 10
    std::vector<int> nums10(10);
    std::iota(nums10.begin(), nums10.end(), 1);
    timer.reset();
    auto res10 = OptimizedBacktracking::subsetsIterative(nums10);
    timer.print_elapsed("Optimized Subsets (N=10)");
    std::cout << "  Found " << res10.size() << " solutions.\n";

    // N = 15
    std::vector<int> nums15(15);
    std::iota(nums15.begin(), nums15.end(), 1);
    timer.reset();
    auto res15 = OptimizedBacktracking::subsetsIterative(nums15);
    timer.print_elapsed("Optimized Subsets (N=15)");
    std::cout << "  Found " << res15.size() << " solutions.\n";

    // N = 20
    std::vector<int> nums20(20);
    std::iota(nums20.begin(), nums20.end(), 1);
    timer.reset();
    auto res20 = OptimizedBacktracking::subsetsIterative(nums20);
    timer.print_elapsed("Optimized Subsets (N=20)");
    std::cout << "  Found " << res20.size() << " solutions.\n";

    // N = 25 (This will take a significant amount of time and memory)
    std::cout << "  Benchmarking Optimized Subsets (N=25). This may take a while and use substantial memory...\n";
    std::vector<int> nums25(25);
    std::iota(nums25.begin(), nums25.end(), 1);
    timer.reset();
    auto res25 = OptimizedBacktracking::subsetsIterative(nums25);
    timer.print_elapsed("Optimized Subsets (N=25)");
    std::cout << "  Found " << res25.size() << " solutions.\n";
}

int main() {
    benchmark_n_queens();
    benchmark_sudoku_solver();
    benchmark_permutations();
    benchmark_subsets();
    benchmark_optimized_subsets();
    std::cout << "\n--- Benchmarking Complete ---\n";
    return 0;
}