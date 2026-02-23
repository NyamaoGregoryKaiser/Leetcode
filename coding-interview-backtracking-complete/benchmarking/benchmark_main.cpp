```cpp
#include <iostream>
#include <vector>
#include <string>
#include <chrono> // For high_resolution_clock
#include <algorithm> // For std::sort

#include "src/NQueens.hpp"
#include "src/SubsetsII.hpp"
#include "src/PermutationsII.hpp"
#include "src/CombinationSumIII.hpp"
#include "src/WordSearch.hpp"

// Define a macro for easy benchmarking
#define RUN_BENCHMARK(name, func, ...) \
    do { \
        std::cout << "Benchmarking " << name << "...\n"; \
        auto start = std::chrono::high_resolution_clock::now(); \
        func(__VA_ARGS__); \
        auto end = std::chrono::high_resolution_clock::now(); \
        std::chrono::duration<double, std::milli> duration = end - start; \
        std::cout << "  Time taken: " << duration.count() << " ms\n"; \
    } while(0)

// Helper to suppress output for benchmarks if needed
void suppress_output_nqueens(int n) {
    NQueens solver;
    volatile auto res = solver.solveNQueens(n); // Use volatile to prevent optimization
}

void suppress_output_subsets(std::vector<int>& nums) {
    SubsetsII solver;
    volatile auto res = solver.subsetsWithDup(nums);
}

void suppress_output_permutations(std::vector<int>& nums) {
    PermutationsII solver;
    volatile auto res = solver.permuteUnique(nums);
}

void suppress_output_combination_sum_iii(int k, int n) {
    CombinationSumIII solver;
    volatile auto res = solver.combinationSum3(k, n);
}

void suppress_output_word_search(std::vector<std::vector<char>>& board, std::string& word) {
    WordSearch solver;
    volatile bool res = solver.exist(board, word);
}

int main() {
    std::cout << "Starting benchmarks...\n\n";

    // --- N-Queens Benchmark ---
    // N=8 is standard for interviews, N=12 is a good stress test, N=14 is very heavy
    // N-Queens (N=8) - 92 solutions
    RUN_BENCHMARK("N-Queens (N=8)", suppress_output_nqueens, 8);
    // N-Queens (N=10) - 724 solutions
    RUN_BENCHMARK("N-Queens (N=10)", suppress_output_nqueens, 10);
    // N-Queens (N=12) - 14,200 solutions
    RUN_BENCHMARK("N-Queens (N=12)", suppress_output_nqueens, 12);
    std::cout << "-----------------------------------\n";

    // --- Subsets II Benchmark ---
    // Subsets II (N=10, 5 distinct, 5 duplicates)
    std::vector<int> nums_subsets_1 = {1,1,2,2,3,3,4,4,5,5}; // 2^10 subsets conceptually
    RUN_BENCHMARK("Subsets II (10 elements, 5 distinct, 5 dup)", suppress_output_subsets, nums_subsets_1);

    // Subsets II (N=12, all distinct) - 2^12 = 4096 subsets
    std::vector<int> nums_subsets_2 = {1,2,3,4,5,6,7,8,9,10,11,12};
    RUN_BENCHMARK("Subsets II (12 elements, all distinct)", suppress_output_subsets, nums_subsets_2);
    std::cout << "-----------------------------------\n";

    // --- Permutations II Benchmark ---
    // Permutations II (N=8, all distinct) - 8! = 40,320 permutations
    std::vector<int> nums_perms_1 = {1,2,3,4,5,6,7,8};
    RUN_BENCHMARK("Permutations II (8 elements, all distinct)", suppress_output_permutations, nums_perms_1);

    // Permutations II (N=8, some duplicates) - 8! / (4! * 4!) = 70 permutations
    std::vector<int> nums_perms_2 = {1,1,1,1,2,2,2,2};
    RUN_BENCHMARK("Permutations II (8 elements, 4 of 1, 4 of 2)", suppress_output_permutations, nums_perms_2);
    std::cout << "-----------------------------------\n";

    // --- Combination Sum III Benchmark ---
    // k=4, n=30 (max possible is 9+8+7+6 = 30)
    RUN_BENCHMARK("Combination Sum III (k=4, n=30)", suppress_output_combination_sum_iii, 4, 30);
    // k=5, n=35 (max possible is 9+8+7+6+5 = 35)
    RUN_BENCHMARK("Combination Sum III (k=5, n=35)", suppress_output_combination_sum_iii, 5, 35);
    std::cout << "-----------------------------------\n";

    // --- Word Search Benchmark ---
    std::vector<std::vector<char>> board_ws = {
        {'A','B','C','E','F','G'},
        {'S','F','C','S','H','I'},
        {'A','D','E','E','J','K'},
        {'L','M','N','O','P','Q'},
        {'R','S','T','U','V','W'},
        {'X','Y','Z','A','B','C'}
    };
    std::string word_ws_1 = "ABCCEDFGHIJKLMNOPQRSTUVWXYZA"; // Long word (length 28)
    RUN_BENCHMARK("Word Search (long word, 6x6 board, found)", suppress_output_word_search, board_ws, word_ws_1);

    std::string word_ws_2 = "ZYXWVUTSRQPONMLKJIHGFEDCSAB"; // Long word (length 27, not found typically)
    RUN_BENCHMARK("Word Search (long word, 6x6 board, not found)", suppress_output_word_search, board_ws, word_ws_2);
    std::cout << "-----------------------------------\n";

    std::cout << "\nAll benchmarks completed.\n";

    return 0;
}
```