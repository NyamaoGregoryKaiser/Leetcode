```cpp
#include "dp_problems.hpp"
#include "../utils/timer.hpp"
#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::max
#include <iomanip>   // For std::setw, std::fixed, std::setprecision

// Helper function to print results
void print_result(const std::string& problem_name, const std::string& method, long long result, double time_ms) {
    std::cout << std::left << std::setw(30) << problem_name + " (" + method + ")"
              << ": Result = " << std::setw(15) << result
              << " | Time = " << std::fixed << std::setprecision(4) << time_ms << " ms\n";
}

void print_string_result(const std::string& problem_name, const std::string& method, const std::string& result, double time_ms) {
    std::cout << std::left << std::setw(30) << problem_name + " (" + method + ")"
              << ": Result = \"" << std::setw(15) << result << "\""
              << " | Time = " << std::fixed << std::setprecision(4) << time_ms << " ms\n";
}

int main() {
    std::cout << "--- Dynamic Programming Solutions Demonstration and Benchmarking ---\n\n";

    // --- Problem 1: Fibonacci Numbers ---
    std::cout << "Problem 1: Fibonacci Numbers\n";
    int fib_n_small = 10;
    int fib_n_medium = 30; // Recursive will be slow here
    int fib_n_large = 45; // Test efficiency, will overflow long long after ~92

    std::cout << "\nTesting with n = " << fib_n_small << ":\n";
    Timer timer;
    print_result("Fibonacci (Recursive)", "n=" + std::to_string(fib_n_small), fibonacci_recursive(fib_n_small), timer.elapsed_ms());
    timer.reset();
    print_result("Fibonacci (Memoized)", "n=" + std::to_string(fib_n_small), fibonacci_memoized(fib_n_small), timer.elapsed_ms());
    timer.reset();
    print_result("Fibonacci (Tabulated)", "n=" + std::to_string(fib_n_small), fibonacci_tabulated(fib_n_small), timer.elapsed_ms());
    timer.reset();
    print_result("Fibonacci (Space-Optimized)", "n=" + std::to_string(fib_n_small), fibonacci_space_optimized(fib_n_small), timer.elapsed_ms());

    std::cout << "\nTesting with n = " << fib_n_medium << " (Recursive will be noticeably slower):\n";
    timer.reset();
    // print_result("Fibonacci (Recursive)", "n=" + std::to_string(fib_n_medium), fibonacci_recursive(fib_n_medium), timer.elapsed_ms()); // Uncomment to see slow performance
    std::cout << std::left << std::setw(30) << "Fibonacci (Recursive)" << ": Result = <Too slow to run for " << fib_n_medium << ">" << "\n";
    timer.reset();
    print_result("Fibonacci (Memoized)", "n=" + std::to_string(fib_n_medium), fibonacci_memoized(fib_n_medium), timer.elapsed_ms());
    timer.reset();
    print_result("Fibonacci (Tabulated)", "n=" + std::to_string(fib_n_medium), fibonacci_tabulated(fib_n_medium), timer.elapsed_ms());
    timer.reset();
    print_result("Fibonacci (Space-Optimized)", "n=" + std::to_string(fib_n_medium), fibonacci_space_optimized(fib_n_medium), timer.elapsed_ms());

    std::cout << "\nTesting with n = " << fib_n_large << " (DP solutions demonstrate efficiency):\n";
    timer.reset();
    print_result("Fibonacci (Memoized)", "n=" + std::to_string(fib_n_large), fibonacci_memoized(fib_n_large), timer.elapsed_ms());
    timer.reset();
    print_result("Fibonacci (Tabulated)", "n=" + std::to_string(fib_n_large), fibonacci_tabulated(fib_n_large), timer.elapsed_ms());
    timer.reset();
    print_result("Fibonacci (Space-Optimized)", "n=" + std::to_string(fib_n_large), fibonacci_space_optimized(fib_n_large), timer.elapsed_ms());

    std::cout << "\n------------------------------------------------------------\n";

    // --- Problem 2: Longest Common Subsequence (LCS) ---
    std::cout << "\nProblem 2: Longest Common Subsequence (LCS)\n";
    std::string text1_lcs = "ABCBDAB";
    std::string text2_lcs = "BDCABA"; // Expected LCS: BCBA (length 4) or BDAB (length 4)

    timer.reset();
    int lcs_len = longestCommonSubsequence(text1_lcs, text2_lcs);
    print_result("LCS Length (Tabulated)", "T1='" + text1_lcs + "', T2='" + text2_lcs + "'", lcs_len, timer.elapsed_ms());

    timer.reset();
    std::string lcs_str = reconstructLCS(text1_lcs, text2_lcs);
    print_string_result("LCS String (Reconstruct)", "T1='" + text1_lcs + "', T2='" + text2_lcs + "'", lcs_str, timer.elapsed_ms());

    std::string text3_lcs = "AGGTAB";
    std::string text4_lcs = "GXTXAYB"; // Expected LCS: GTAB (length 4)
    timer.reset();
    lcs_len = longestCommonSubsequence(text3_lcs, text4_lcs);
    print_result("LCS Length (Tabulated)", "T1='" + text3_lcs + "', T2='" + text4_lcs + "'", lcs_len, timer.elapsed_ms());
    timer.reset();
    lcs_str = reconstructLCS(text3_lcs, text4_lcs);
    print_string_result("LCS String (Reconstruct)", "T1='" + text3_lcs + "', T2='" + text4_lcs + "'", lcs_str, timer.elapsed_ms());


    std::cout << "\n------------------------------------------------------------\n";

    // --- Problem 3: 0/1 Knapsack Problem ---
    std::cout << "\nProblem 3: 0/1 Knapsack Problem\n";
    std::vector<int> weights_knapsack = {10, 20, 30};
    std::vector<int> values_knapsack = {60, 100, 120};
    int capacity_knapsack = 50; // Expected: 220 (items 20, 30)

    timer.reset();
    int max_val_tabulated = knapsack_tabulated(weights_knapsack, values_knapsack, capacity_knapsack);
    print_result("Knapsack (Tabulated)", "Cap=" + std::to_string(capacity_knapsack), max_val_tabulated, timer.elapsed_ms());

    timer.reset();
    int max_val_space_optimized = knapsack_space_optimized(weights_knapsack, values_knapsack, capacity_knapsack);
    print_result("Knapsack (Space-Optimized)", "Cap=" + std::to_string(capacity_knapsack), max_val_space_optimized, timer.elapsed_ms());

    std::vector<int> weights_knapsack2 = {1, 3, 4, 5};
    std::vector<int> values_knapsack2 = {1, 4, 5, 7};
    int capacity_knapsack2 = 7; // Expected: 9 (items {3,4} -> 4+5=9 or {1,5} -> 1+7=8)

    timer.reset();
    max_val_tabulated = knapsack_tabulated(weights_knapsack2, values_knapsack2, capacity_knapsack2);
    print_result("Knapsack (Tabulated)", "Cap=" + std::to_string(capacity_knapsack2), max_val_tabulated, timer.elapsed_ms());

    timer.reset();
    max_val_space_optimized = knapsack_space_optimized(weights_knapsack2, values_knapsack2, capacity_knapsack2);
    print_result("Knapsack (Space-Optimized)", "Cap=" + std::to_string(capacity_knapsack2), max_val_space_optimized, timer.elapsed_ms());


    std::cout << "\n------------------------------------------------------------\n";

    // --- Problem 4: Coin Change Problem (Count Ways) ---
    std::cout << "\nProblem 4: Coin Change Problem (Count Ways)\n";
    std::vector<int> coins_cc = {1, 2, 5};
    int amount_cc = 5; // Expected: 4 ways ({1,1,1,1,1}, {1,1,1,2}, {1,2,2}, {5})

    timer.reset();
    long long ways_cc = coinChange_countWays_tabulated(coins_cc, amount_cc);
    print_result("Coin Change (Count Ways)", "Amount=" + std::to_string(amount_cc), ways_cc, timer.elapsed_ms());

    std::vector<int> coins_cc2 = {2, 5, 10};
    int amount_cc2 = 20; // Expected: 9 ways (e.g., ten 2s, two 10s, four 5s, etc.)
    timer.reset();
    ways_cc = coinChange_countWays_tabulated(coins_cc2, amount_cc2);
    print_result("Coin Change (Count Ways)", "Amount=" + std::to_string(amount_cc2), ways_cc, timer.elapsed_ms());

    std::cout << "\n--- End of Demonstration and Benchmarking ---\n";

    return 0;
}

```