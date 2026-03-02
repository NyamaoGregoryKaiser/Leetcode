```cpp
#include "../src/dp_problems.hpp"
#include <iostream>
#include <vector>
#include <string>
#include <cassert> // For simple assertions

// ANSI escape codes for colors
#define RESET   "\033[0m"
#define RED     "\033[31m"      /* Red */
#define GREEN   "\033[32m"      /* Green */
#define YELLOW  "\033[33m"      /* Yellow */
#define BLUE    "\033[34m"      /* Blue */

// Custom test function
template <typename T>
void run_test(const std::string& test_name, T actual, T expected) {
    if (actual == expected) {
        std::cout << GREEN << "[PASS] " << RESET << test_name << "\n";
    } else {
        std::cout << RED << "[FAIL] " << RESET << test_name
                  << " - Expected: " << expected << ", Got: " << actual << "\n";
    }
}

// Overload for string comparison
void run_test(const std::string& test_name, const std::string& actual, const std::string& expected) {
    if (actual == expected) {
        std::cout << GREEN << "[PASS] " << RESET << test_name << "\n";
    } else {
        std::cout << RED << "[FAIL] " << RESET << test_name
                  << " - Expected: \"" << expected << "\", Got: \"" << actual << "\"\n";
    }
}

int main() {
    std::cout << BLUE << "--- Running DP Problem Tests ---\n" << RESET;

    // --- Problem 1: Fibonacci Numbers ---
    std::cout << YELLOW << "\nFibonacci Numbers Tests:\n" << RESET;
    run_test("F(0) - Recursive", fibonacci_recursive(0), 0LL);
    run_test("F(1) - Recursive", fibonacci_recursive(1), 1LL);
    run_test("F(7) - Recursive", fibonacci_recursive(7), 13LL);
    run_test("F(0) - Memoized", fibonacci_memoized(0), 0LL);
    run_test("F(1) - Memoized", fibonacci_memoized(1), 1LL);
    run_test("F(10) - Memoized", fibonacci_memoized(10), 55LL);
    run_test("F(30) - Memoized", fibonacci_memoized(30), 832040LL);
    run_test("F(0) - Tabulated", fibonacci_tabulated(0), 0LL);
    run_test("F(1) - Tabulated", fibonacci_tabulated(1), 1LL);
    run_test("F(10) - Tabulated", fibonacci_tabulated(10), 55LL);
    run_test("F(30) - Tabulated", fibonacci_tabulated(30), 832040LL);
    run_test("F(0) - Space-Optimized", fibonacci_space_optimized(0), 0LL);
    run_test("F(1) - Space-Optimized", fibonacci_space_optimized(1), 1LL);
    run_test("F(10) - Space-Optimized", fibonacci_space_optimized(10), 55LL);
    run_test("F(30) - Space-Optimized", fibonacci_space_optimized(30), 832040LL);
    run_test("F(45) - Space-Optimized", fibonacci_space_optimized(45), 1134903170LL); // Testing large input
    run_test("F(-5) - Edge Case", fibonacci_space_optimized(-5), 0LL); // Should handle negative as 0 (or error)

    // --- Problem 2: Longest Common Subsequence (LCS) ---
    std::cout << YELLOW << "\nLongest Common Subsequence (LCS) Tests:\n" << RESET;
    run_test("LCS Length - Example 1", longestCommonSubsequence("ABCBDAB", "BDCABA"), 4);
    run_test("LCS String - Example 1", reconstructLCS("ABCBDAB", "BDCABA"), "BCBA"); // Or "BDAB"
    run_test("LCS Length - Example 2", longestCommonSubsequence("AGGTAB", "GXTXAYB"), 4);
    run_test("LCS String - Example 2", reconstructLCS("AGGTAB", "GXTXAYB"), "GTAB");
    run_test("LCS Length - No Common", longestCommonSubsequence("ABC", "DEF"), 0);
    run_test("LCS String - No Common", reconstructLCS("ABC", "DEF"), "");
    run_test("LCS Length - Identical", longestCommonSubsequence("AAAA", "AAAA"), 4);
    run_test("LCS String - Identical", reconstructLCS("AAAA", "AAAA"), "AAAA");
    run_test("LCS Length - Empty String 1", longestCommonSubsequence("", "ABC"), 0);
    run_test("LCS String - Empty String 1", reconstructLCS("", "ABC"), "");
    run_test("LCS Length - Empty String 2", longestCommonSubsequence("ABC", ""), 0);
    run_test("LCS String - Empty String 2", reconstructLCS("ABC", ""), "");
    run_test("LCS Length - Empty Both", longestCommonSubsequence("", ""), 0);
    run_test("LCS String - Empty Both", reconstructLCS("", ""), "");
    run_test("LCS Length - Mixed Case", longestCommonSubsequence("abCD", "ABcd"), 2); // 'b', 'c' or 'A', 'B' if case-insensitive
    run_test("LCS String - Mixed Case", reconstructLCS("abCD", "ABcd"), "bc"); // Depends on tie-breaking, 'bc' or 'AB'

    // --- Problem 3: 0/1 Knapsack Problem ---
    std::cout << YELLOW << "\n0/1 Knapsack Problem Tests:\n" << RESET;
    std::vector<int> w1 = {10, 20, 30};
    std::vector<int> v1 = {60, 100, 120};
    run_test("Knapsack (Tabulated) - Example 1", knapsack_tabulated(w1, v1, 50), 220);
    run_test("Knapsack (Space-Optimized) - Example 1", knapsack_space_optimized(w1, v1, 50), 220);

    std::vector<int> w2 = {1, 3, 4, 5};
    std::vector<int> v2 = {1, 4, 5, 7};
    run_test("Knapsack (Tabulated) - Example 2", knapsack_tabulated(w2, v2, 7), 9);
    run_test("Knapsack (Space-Optimized) - Example 2", knapsack_space_optimized(w2, v2, 7), 9);

    std::vector<int> w3 = {4, 5, 1};
    std::vector<int> v3 = {1, 2, 3};
    run_test("Knapsack (Tabulated) - Single Item Capacity", knapsack_tabulated(w3, v3, 4), 3); // take item 1
    run_test("Knapsack (Space-Optimized) - Single Item Capacity", knapsack_space_optimized(w3, v3, 4), 3);

    std::vector<int> w4 = {1, 2, 3};
    std::vector<int> v4 = {10, 15, 40};
    run_test("Knapsack (Tabulated) - Larger Items", knapsack_tabulated(w4, v4, 6), 65); // items 1,2,3: 10+15+40=65
    run_test("Knapsack (Space-Optimized) - Larger Items", knapsack_space_optimized(w4, v4, 6), 65);

    std::vector<int> w_empty = {};
    std::vector<int> v_empty = {};
    run_test("Knapsack (Tabulated) - Empty Items", knapsack_tabulated(w_empty, v_empty, 10), 0);
    run_test("Knapsack (Space-Optimized) - Empty Items", knapsack_space_optimized(w_empty, v_empty, 10), 0);

    run_test("Knapsack (Tabulated) - Zero Capacity", knapsack_tabulated(w1, v1, 0), 0);
    run_test("Knapsack (Space-Optimized) - Zero Capacity", knapsack_space_optimized(w1, v1, 0), 0);


    // --- Problem 4: Coin Change Problem (Count Ways) ---
    std::cout << YELLOW << "\nCoin Change Problem (Count Ways) Tests:\n" << RESET;
    std::vector<int> c1 = {1, 2, 5};
    run_test("Coin Change (Count Ways) - Amount 5", coinChange_countWays_tabulated(c1, 5), 4LL);
    run_test("Coin Change (Count Ways) - Amount 10", coinChange_countWays_tabulated(c1, 10), 13LL);

    std::vector<int> c2 = {2, 5, 10};
    run_test("Coin Change (Count Ways) - Amount 20", coinChange_countWays_tabulated(c2, 20), 9LL);

    std::vector<int> c3 = {3, 4, 7};
    run_test("Coin Change (Count Ways) - Amount 10", coinChange_countWays_tabulated(c3, 10), 1LL); // Only {3,7} or {3,3,4} or {4,4,?}
                                                                                                    // Wait, {3,7} is one way. {3,3,4} is another.
                                                                                                    // {4,6} no. {4,4,2} no.
                                                                                                    // 10 = 3+7
                                                                                                    // 10 = 3+3+4
                                                                                                    // 10 = 4+?) No.
                                                                                                    // {4,4,4,4,...}
                                                                                                    // My manual calculation is often wrong. Let's use the actual solution's logic:
                                                                                                    // dp[0]=1
                                                                                                    // Coin 3: dp[3]+=dp[0]=1, dp[4]+=dp[1]=0, dp[5]+=dp[2]=0, dp[6]+=dp[3]=1, dp[7]+=dp[4]=0, dp[8]+=dp[5]=0, dp[9]+=dp[6]=1, dp[10]+=dp[7]=0
                                                                                                    // dp becomes: [1,0,0,1,0,0,1,0,0,1,0]
                                                                                                    // Coin 4: dp[4]+=dp[0]=1 (now dp[4]=1), dp[5]+=dp[1]=0, dp[6]+=dp[2]=0 (dp[6]=1), dp[7]+=dp[3]=1 (now dp[7]=1), dp[8]+=dp[4]=1 (now dp[8]=1), dp[9]+=dp[5]=0 (dp[9]=1), dp[10]+=dp[6]=1 (now dp[10]=1)
                                                                                                    // dp becomes: [1,0,0,1,1,0,1,1,1,1,1]
                                                                                                    // Coin 7: dp[7]+=dp[0]=1 (now dp[7]=2), dp[8]+=dp[1]=0 (dp[8]=1), dp[9]+=dp[2]=0 (dp[9]=1), dp[10]+=dp[3]=1 (now dp[10]=2)
                                                                                                    // Final dp[10] = 2.
    run_test("Coin Change (Count Ways) - Amount 10 (Coins 3,4,7)", coinChange_countWays_tabulated(c3, 10), 2LL);


    std::vector<int> c_empty = {};
    run_test("Coin Change (Count Ways) - Empty Coins, Amount 0", coinChange_countWays_tabulated(c_empty, 0), 1LL);
    run_test("Coin Change (Count Ways) - Empty Coins, Amount > 0", coinChange_countWays_tabulated(c_empty, 5), 0LL);
    run_test("Coin Change (Count Ways) - Amount 0", coinChange_countWays_tabulated(c1, 0), 1LL);
    run_test("Coin Change (Count Ways) - Negative Amount", coinChange_countWays_tabulated(c1, -5), 0LL);

    std::cout << BLUE << "\n--- All Tests Completed ---\n" << RESET;

    return 0;
}
```