```cpp
#ifndef DP_PROBLEMS_HPP
#define DP_PROBLEMS_HPP

#include <vector>
#include <string>
#include <map> // For memoization map
#include <algorithm> // For std::max

// --- Problem 1: Fibonacci Numbers ---
// F(n) = F(n-1) + F(n-2) with F(0)=0, F(1)=1

// Brute-force recursive approach
long long fibonacci_recursive(int n);

// Memoization (Top-down DP) approach
long long fibonacci_memoized(int n);
// Helper function for memoized Fibonacci, using std::vector for memoization table
long long fibonacci_memoized_helper(int n, std::vector<long long>& memo);

// Tabulation (Bottom-up DP) approach
long long fibonacci_tabulated(int n);

// Space-optimized Tabulation approach
long long fibonacci_space_optimized(int n);


// --- Problem 2: Longest Common Subsequence (LCS) ---

// Tabulation (Bottom-up DP) approach for LCS length
int longestCommonSubsequence(const std::string& text1, const std::string& text2);

// Function to reconstruct one of the actual LCS strings
std::string reconstructLCS(const std::string& text1, const std::string& text2);


// --- Problem 3: 0/1 Knapsack Problem ---

// Tabulation (Bottom-up DP) approach for 0/1 Knapsack
int knapsack_tabulated(const std::vector<int>& weights, const std::vector<int>& values, int capacity);

// Space-optimized Tabulation approach for 0/1 Knapsack
int knapsack_space_optimized(const std::vector<int>& weights, const std::vector<int>& values, int capacity);


// --- Problem 4: Coin Change Problem (Count Ways) ---

// Tabulation (Bottom-up DP) approach for counting ways to make change
long long coinChange_countWays_tabulated(const std::vector<int>& coins, int amount);


#endif // DP_PROBLEMS_HPP

```