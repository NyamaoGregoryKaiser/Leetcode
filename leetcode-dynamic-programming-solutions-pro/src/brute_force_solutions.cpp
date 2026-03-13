#include <string>
#include <vector>
#include <algorithm> // For std::max
#include <map>       // For recursive memoization (though not strictly "brute force")

/**
 * @brief Namespace for Brute-Force (Naive Recursive) solutions to DP problems.
 * These are often the starting point before optimization with memoization or tabulation.
 */
namespace BruteForceDP {

// --- Problem 1: Fibonacci Number ---
// Naive recursive solution without memoization.
// Demonstrates the "overlapping subproblems" issue.

/**
 * @brief Fibonacci Number - Naive Recursive (Brute Force) approach.
 *
 * Directly implements the recurrence relation F(N) = F(N-1) + F(N-2).
 * This will recompute the same subproblems many times.
 *
 * Time Complexity: O(2^N) - Exponential, due to recomputing overlapping subproblems.
 * Space Complexity: O(N) - For the recursion stack in the worst case.
 *
 * @param n The input number.
 * @return The N-th Fibonacci number.
 */
long long fibonacci_brute_force(int n) {
    if (n < 0) return 0;
    if (n <= 1) {
        return n; // Base cases: F(0) = 0, F(1) = 1
    }
    return fibonacci_brute_force(n - 1) + fibonacci_brute_force(n - 2);
}


// --- Problem 2: Longest Common Subsequence (LCS) ---
// Naive recursive solution without memoization.

/**
 * @brief Longest Common Subsequence (LCS) - Naive Recursive (Brute Force) approach.
 *
 * Directly implements the recurrence relation:
 * if text1[i-1] == text2[j-1]: 1 + LCS(i-1, j-1)
 * else: max(LCS(i-1, j), LCS(i, j-1))
 *
 * Time Complexity: O(2^(m+n)) in the worst case, as it explores all possible subsequences.
 * Space Complexity: O(m+n) - For the recursion stack.
 *
 * @param text1 The first input string.
 * @param text2 The second input string.
 * @param m Current length of text1 to consider.
 * @param n Current length of text2 to consider.
 * @return The length of the longest common subsequence.
 */
int longest_common_subsequence_recursive(const std::string& text1, const std::string& text2, int m, int n) {
    // Base cases: if either string is empty, LCS is 0
    if (m == 0 || n == 0) {
        return 0;
    }

    // If characters match, they are part of the LCS
    if (text1[m - 1] == text2[n - 1]) {
        return 1 + longest_common_subsequence_recursive(text1, text2, m - 1, n - 1);
    } else {
        // If characters don't match, try two possibilities and take the max:
        // 1. Exclude last character of text1
        // 2. Exclude last character of text2
        return std::max(longest_common_subsequence_recursive(text1, text2, m - 1, n),
                        longest_common_subsequence_recursive(text1, text2, m, n - 1));
    }
}

/**
 * @brief Wrapper for LCS brute force recursion.
 * @param text1 The first input string.
 * @param text2 The second input string.
 * @return The length of the longest common subsequence.
 */
int longest_common_subsequence_brute_force(const std::string& text1, const std::string& text2) {
    return longest_common_subsequence_recursive(text1, text2, text1.length(), text2.length());
}


// --- Problem 3: 0/1 Knapsack Problem ---
// Naive recursive solution without memoization.

/**
 * @brief 0/1 Knapsack Problem - Naive Recursive (Brute Force) approach.
 *
 * Explores all 2^N subsets of items to find the one that fits within capacity W
 * and has maximum value.
 *
 * Time Complexity: O(2^N) - Where N is number of items.
 * Space Complexity: O(N) - For the recursion stack.
 *
 * @param weights A vector of weights for each item.
 * @param values A vector of values for each item.
 * @param W The maximum capacity of the knapsack.
 * @param n The current number of items to consider (from index 0 to n-1).
 * @return The maximum total value that can be put in the knapsack.
 */
int knapsack_01_recursive(const std::vector<int>& weights, const std::vector<int>& values, int W, int n) {
    // Base cases
    if (n == 0 || W == 0) {
        return 0; // No items or no capacity, total value is 0
    }

    // If weight of the n-th item is more than knapsack capacity W, then
    // this item cannot be included in the optimal solution
    if (weights[n - 1] > W) {
        return knapsack_01_recursive(weights, values, W, n - 1);
    } else {
        // Return the maximum of two cases:
        // 1. n-th item included
        // 2. n-th item not included
        int include_item = values[n - 1] + knapsack_01_recursive(weights, values, W - weights[n - 1], n - 1);
        int exclude_item = knapsack_01_recursive(weights, values, W, n - 1);
        return std::max(include_item, exclude_item);
    }
}

/**
 * @brief Wrapper for 0/1 Knapsack brute force recursion.
 * @param weights A vector of weights for each item.
 * @param values A vector of values for each item.
 * @param W The maximum capacity of the knapsack.
 * @return The maximum total value that can be put in the knapsack.
 */
int knapsack_01_brute_force(const std::vector<int>& weights, const std::vector<int>& values, int W) {
    return knapsack_01_recursive(weights, values, W, weights.size());
}

} // namespace BruteForceDP