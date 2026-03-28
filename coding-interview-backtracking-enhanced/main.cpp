```cpp
#include "src/backtracking_problems.h"
#include "tests/test_backtracking.cpp" // Include test file directly for simplicity in this project structure
#include "utils/profiler.h"
#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort

// Function to run performance benchmarks for the implemented backtracking problems.
// This helps to compare the efficiency of different approaches and see real-world performance.
void runBenchmarks() {
    std::cout << "\n--- Running Performance Benchmarks ---" << std::endl;
    Utils::Timer timer; // Initialize a timer for measuring execution time.

    // --- Benchmark 1: Subsets ---
    // For N=15, there are 2^15 = 32,768 subsets. Each copy takes O(N) in worst case.
    std::vector<int> nums_subsets = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};
    std::cout << "Benchmarking Subsets (N=" << nums_subsets.size() << ", 2^N solutions)..." << std::endl;
    
    timer.reset();
    auto result_subsets_bt = BacktrackingProblems::subsets(nums_subsets);
    long long time_subsets_bt = timer.elapsed_microseconds();
    std::cout << "  Backtracking Subsets: " << time_subsets_bt << " µs. Total subsets: " << result_subsets_bt.size() << std::endl;

    // For comparison: Iterative Subsets
    timer.reset();
    auto result_subsets_it = BacktrackingProblems::subsetsIterative(nums_subsets);
    long long time_subsets_it = timer.elapsed_microseconds();
    std::cout << "  Iterative Subsets:    " << time_subsets_it << " µs. Total subsets: " << result_subsets_it.size() << std::endl;
    std::cout << std::endl;

    // --- Benchmark 2: Permutations ---
    // For N=8, there are 8! = 40,320 permutations. This grows very rapidly.
    // N=9 -> 362,880, N=10 -> 3,628,800 (can take too long).
    std::vector<int> nums_permutations = {1, 2, 3, 4, 5, 6, 7, 8};
    std::cout << "Benchmarking Permutations (N=" << nums_permutations.size() << ", N! solutions)..." << std::endl;
    
    timer.reset();
    auto result_permutations_swap = BacktrackingProblems::permutations(nums_permutations);
    long long time_permutations_swap = timer.elapsed_microseconds();
    std::cout << "  Permutations (swap):  " << time_permutations_swap << " µs. Total permutations: " << result_permutations_swap.size() << std::endl;

    // For comparison: Permutations Visited
    timer.reset();
    auto result_permutations_vis = BacktrackingProblems::permutationsVisited(nums_permutations);
    long long time_permutations_vis = timer.elapsed_microseconds();
    std::cout << "  Permutations (visited): " << time_permutations_vis << " µs. Total permutations: " << result_permutations_vis.size() << std::endl;
    std::cout << std::endl;


    // --- Benchmark 3: Combination Sum II ---
    // This problem's performance is highly dependent on candidate values and target.
    // A moderate number of candidates with many small values can lead to many combinations.
    // Example: 10 ones, 5 twos, target 10.
    std::vector<int> nums_comb_sum = {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2}; // 10 ones, 5 twos
    int target_comb_sum = 10;
    std::cout << "Benchmarking Combination Sum II (candidates.size=" << nums_comb_sum.size() << ", target=" << target_comb_sum << ")..." << std::endl;
    
    timer.reset();
    auto result_comb_sum = BacktrackingProblems::combinationSum2(nums_comb_sum, target_comb_sum);
    long long time_comb_sum = timer.elapsed_microseconds();
    std::cout << "  Combination Sum II:   " << time_comb_sum << " µs. Total combinations: " << result_comb_sum.size() << std::endl;
    std::cout << std::endl;

    // --- Benchmark 4: N-Queens ---
    // N=8 has 92 solutions.
    // N=10 has 724 solutions (might take a few ms).
    // N=12 has 14,200 solutions (can take hundreds of ms).
    int n_queens = 8;
    std::cout << "Benchmarking N-Queens (N=" << n_queens << ")..." << std::endl;
    
    timer.reset();
    auto result_nqueens = BacktrackingProblems::solveNQueens(n_queens);
    long long time_nqueens = timer.elapsed_microseconds();
    std::cout << "  N-Queens:             " << time_nqueens << " µs. Total solutions: " << result_nqueens.size() << std::endl;
    std::cout << std::endl;
}

int main() {
    std::cout << "Backtracking Interview Project" << std::endl;
    std::cout << "===============================" << std::endl << std::endl;

    // First, run all unit tests to ensure correctness.
    runAllTests();

    std::cout << std::endl;

    // Then, run performance benchmarks to evaluate efficiency.
    runBenchmarks();

    std::cout << "\nProgram finished." << std::endl;

    return 0;
}
```