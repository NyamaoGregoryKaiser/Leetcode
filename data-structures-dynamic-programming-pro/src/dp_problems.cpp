```cpp
#include "dp_problems.hpp"
#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <numeric> // For std::accumulate in some contexts, if needed

// --- Problem 1: Fibonacci Numbers ---

/**
 * @brief Computes the N-th Fibonacci number using a brute-force recursive approach.
 *        Demonstrates overlapping subproblems.
 * @param n The index of the Fibonacci number to compute (n >= 0).
 * @return The N-th Fibonacci number.
 * @complexity Time: O(2^n) - Exponential, due to recomputing same subproblems.
 *             Space: O(n) - For the recursion call stack depth.
 */
long long fibonacci_recursive(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2);
}

/**
 * @brief Helper function for memoized Fibonacci.
 * @param n The index of the Fibonacci number to compute.
 * @param memo Reference to the memoization table (initialized with -1 or similar).
 * @return The N-th Fibonacci number.
 */
long long fibonacci_memoized_helper(int n, std::vector<long long>& memo) {
    if (n <= 1) {
        return n;
    }
    // If already computed, return the stored result
    if (memo[n] != -1) {
        return memo[n];
    }
    // Compute and store the result
    memo[n] = fibonacci_memoized_helper(n - 1, memo) + fibonacci_memoized_helper(n - 2, memo);
    return memo[n];
}

/**
 * @brief Computes the N-th Fibonacci number using memoization (top-down DP).
 *        Avoids recomputing subproblems by storing results.
 * @param n The index of the Fibonacci number to compute (n >= 0).
 * @return The N-th Fibonacci number.
 * @complexity Time: O(n) - Each subproblem F(i) is computed once.
 *             Space: O(n) - For the memoization table and recursion call stack.
 */
long long fibonacci_memoized(int n) {
    if (n < 0) return 0; // Or throw an error for invalid input
    std::vector<long long> memo(n + 1, -1); // Initialize memo table with -1 (or other indicator)
    return fibonacci_memoized_helper(n, memo);
}

/**
 * @brief Computes the N-th Fibonacci number using tabulation (bottom-up DP).
 *        Builds the solution iteratively from base cases.
 * @param n The index of the Fibonacci number to compute (n >= 0).
 * @return The N-th Fibonacci number.
 * @complexity Time: O(n) - Single loop from 2 to n.
 *             Space: O(n) - For the DP table `dp`.
 */
long long fibonacci_tabulated(int n) {
    if (n < 0) return 0;
    if (n <= 1) return n;

    std::vector<long long> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    // Fill dp table iteratively
    for (int i = 2; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

/**
 * @brief Computes the N-th Fibonacci number using space-optimized tabulation.
 *        Reduces space complexity to O(1) by only storing the last two values.
 * @param n The index of the Fibonacci number to compute (n >= 0).
 * @return The N-th Fibonacci number.
 * @complexity Time: O(n) - Single loop from 2 to n.
 *             Space: O(1) - Only a few variables are used.
 */
long long fibonacci_space_optimized(int n) {
    if (n < 0) return 0;
    if (n <= 1) return n;

    long long a = 0; // Represents F(i-2)
    long long b = 1; // Represents F(i-1)
    long long current_fib = 0;

    // Iterate from 2 up to n
    for (int i = 2; i <= n; ++i) {
        current_fib = a + b; // F(i) = F(i-2) + F(i-1)
        a = b;               // Update F(i-2) to F(i-1)
        b = current_fib;     // Update F(i-1) to F(i)
    }
    return current_fib;
}


// --- Problem 2: Longest Common Subsequence (LCS) ---

/**
 * @brief Computes the length of the Longest Common Subsequence (LCS) using tabulation (bottom-up DP).
 * @param text1 The first input string.
 * @param text2 The second input string.
 * @return The length of the LCS.
 * @complexity Time: O(m*n) where m is length of text1, n is length of text2.
 *             Space: O(m*n) for the 2D DP table.
 */
int longestCommonSubsequence(const std::string& text1, const std::string& text2) {
    int m = text1.length();
    int n = text2.length();

    // dp[i][j] stores the length of LCS of text1[0...i-1] and text2[0...j-1]
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));

    // Fill the dp table
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            // If characters match, add 1 to the LCS of previous substrings
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters don't match, take the maximum LCS from
                // 1. LCS of text1[0...i-2] and text2[0...j-1] (skip char from text1)
                // 2. LCS of text1[0...i-1] and text2[0...j-2] (skip char from text2)
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    // The value at dp[m][n] is the length of LCS for full strings
    return dp[m][n];
}

/**
 * @brief Reconstructs one of the actual Longest Common Subsequence (LCS) strings.
 *        Requires filling the DP table first, then backtracking.
 * @param text1 The first input string.
 * @param text2 The second input string.
 * @return One of the LCS strings. If multiple exist, any valid one is returned.
 * @complexity Time: O(m*n) for building DP table + O(m+n) for reconstruction = O(m*n).
 *             Space: O(m*n) for the 2D DP table.
 */
std::string reconstructLCS(const std::string& text1, const std::string& text2) {
    int m = text1.length();
    int n = text2.length();

    // First, compute the DP table as in longestCommonSubsequence
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Now, reconstruct the LCS by backtracking through the DP table
    std::string lcs = "";
    int i = m;
    int j = n;

    while (i > 0 && j > 0) {
        // If characters match, this character is part of LCS
        if (text1[i - 1] == text2[j - 1]) {
            lcs = text1[i - 1] + lcs; // Prepend character to build LCS in correct order
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            // If top cell is greater, move up (character from text1 was skipped)
            i--;
        } else {
            // If left cell is greater or equal, move left (character from text2 was skipped)
            j--;
        }
    }
    return lcs;
}


// --- Problem 3: 0/1 Knapsack Problem ---

/**
 * @brief Solves the 0/1 Knapsack problem using tabulation (bottom-up DP).
 *        Finds the maximum value that can be obtained for a given capacity.
 * @param weights A vector of item weights.
 * @param values A vector of item values.
 * @param capacity The maximum capacity of the knapsack.
 * @return The maximum total value.
 * @complexity Time: O(N*W) where N is number of items, W is knapsack capacity.
 *             Space: O(N*W) for the 2D DP table.
 */
int knapsack_tabulated(const std::vector<int>& weights, const std::vector<int>& values, int capacity) {
    int n = weights.size();
    // dp[i][w] stores the maximum value that can be obtained with first i items
    // and knapsack capacity w.
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(capacity + 1, 0));

    // Fill the dp table
    // i represents the current item being considered (from 1 to n)
    // w represents the current knapsack capacity being considered (from 0 to capacity)
    for (int i = 1; i <= n; ++i) {
        for (int w = 0; w <= capacity; ++w) {
            // Option 1: Don't include the current item (item i-1)
            // Value is the same as max value with (i-1) items and same capacity w
            dp[i][w] = dp[i - 1][w];

            // Option 2: Include the current item (item i-1), if its weight allows
            if (weights[i - 1] <= w) {
                // Value is the value of current item + max value with (i-1) items
                // and reduced capacity (w - weights[i-1])
                dp[i][w] = std::max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            }
        }
    }
    // The value at dp[n][capacity] is the maximum value for all n items and full capacity.
    return dp[n][capacity];
}

/**
 * @brief Solves the 0/1 Knapsack problem using space-optimized tabulation.
 *        Reduces space complexity to O(W) by using only two rows (or even one).
 * @param weights A vector of item weights.
 * @param values A vector of item values.
 * @param capacity The maximum capacity of the knapsack.
 * @return The maximum total value.
 * @complexity Time: O(N*W) where N is number of items, W is knapsack capacity.
 *             Space: O(W) for the 1D DP table.
 */
int knapsack_space_optimized(const std::vector<int>& weights, const std::vector<int>& values, int capacity) {
    int n = weights.size();
    // dp[w] stores the maximum value that can be obtained with items processed so far
    // and knapsack capacity w.
    // We only need the previous row's values to compute the current row.
    // By iterating 'w' from capacity down to 0, we ensure that dp[w - weights[i-1]]
    // refers to the value from the 'previous row' (i-1 items) before it's updated for current item 'i'.
    std::vector<int> dp(capacity + 1, 0);

    // Iterate through each item
    for (int i = 0; i < n; ++i) { // i is 0-indexed for weights/values
        int current_weight = weights[i];
        int current_value = values[i];

        // Iterate knapsack capacity from right to left (capacity down to current_weight)
        // This is crucial to avoid using the current item multiple times
        // and ensures we are always using values from the previous iteration (i-1 items)
        for (int w = capacity; w >= current_weight; --w) {
            // Option 1: Don't include current item (dp[w] already holds this from previous iteration)
            // Option 2: Include current item (current_value + dp[w - current_weight])
            dp[w] = std::max(dp[w], current_value + dp[w - current_weight]);
        }
    }
    return dp[capacity];
}


// --- Problem 4: Coin Change Problem (Count Ways) ---

/**
 * @brief Computes the number of ways to make change for a given amount using a set of coins.
 *        Assumes an infinite supply of each coin type (unbounded knapsack variant).
 * @param coins A vector of available coin denominations.
 * @param amount The target amount to make change for.
 * @return The number of distinct ways to make change.
 * @complexity Time: O(N*Amount) where N is number of coin denominations, Amount is target sum.
 *             Space: O(Amount) for the 1D DP table.
 */
long long coinChange_countWays_tabulated(const std::vector<int>& coins, int amount) {
    if (amount < 0) return 0; // Cannot make change for a negative amount

    // dp[i] will store the number of ways to make change for amount i
    std::vector<long long> dp(amount + 1, 0);

    // Base case: There is one way to make change for amount 0 (by taking no coins)
    dp[0] = 1;

    // Iterate through each coin
    for (int coin : coins) {
        // For each coin, iterate through amounts from the coin's value up to the target amount
        // This ensures that for each amount, we consider adding the current coin
        // The order of loops here (coins outer, amount inner) is important for counting combinations
        // If amount outer, coins inner, it would count permutations (order matters)
        for (int j = coin; j <= amount; ++j) {
            // Add the number of ways to make change for (j - coin) to dp[j]
            // This represents using the current 'coin' to contribute to amount 'j'
            dp[j] += dp[j - coin];
        }
    }
    return dp[amount];
}

```