#include <vector>
#include <string>
#include <algorithm> // For std::max, std::min
#include <limits>    // For std::numeric_limits
#include "helpers.hpp"

/**
 * @brief Namespace for space-optimized Dynamic Programming (DP) solutions.
 */
namespace OptimizedSpaceDP {

// --- Problem 1: Fibonacci Number ---
// Space optimized to O(1) from O(N).

/**
 * @brief Fibonacci Number - Bottom-Up (Tabulation) with O(1) space.
 *
 * Only keeps track of the last two Fibonacci numbers to calculate the next one.
 *
 * Time Complexity: O(N) - Single loop from 2 to N.
 * Space Complexity: O(1) - Uses a constant number of variables.
 *
 * @param n The input number.
 * @return The N-th Fibonacci number.
 */
long long fibonacci_o1_space(int n) {
    if (n < 0) return 0;
    if (n <= 1) {
        return n; // Base cases: F(0) = 0, F(1) = 1
    }

    long long prev2 = 0; // Represents F(i-2)
    long long prev1 = 1; // Represents F(i-1)
    long long current_fib = 0;

    for (int i = 2; i <= n; ++i) {
        current_fib = prev1 + prev2;
        prev2 = prev1;
        prev1 = current_fib;
    }
    return current_fib;
}


// --- Problem 2: Longest Common Subsequence (LCS) ---
// Space optimized to O(min(m, n)) from O(m*n) for calculating *length*.
// NOTE: Reconstructing the actual LCS still typically requires O(m*n) space
// to backtrack through the full DP table or a table indicating path choices.

/**
 * @brief Longest Common Subsequence (LCS) - Space Optimized Bottom-Up.
 *
 * Reduces the 2D DP table to 2 rows (current and previous) because `dp[i][j]`
 * only depends on `dp[i-1][j-1]`, `dp[i-1][j]`, and `dp[i][j-1]`.
 * We can optimize further to use only `min(m, n)` space if we always iterate
 * on the shorter string in the outer loop, allowing the DP table to have
 * size `length_of_shorter_string + 1`.
 * This implementation uses O(N) space, where N is the length of `text2` (inner loop).
 *
 * Time Complexity: O(m * n) - Same as standard 2D DP.
 * Space Complexity: O(n) - Where n is the length of `text2`.
 *
 * @param text1 The first input string.
 * @param text2 The second input string.
 * @return The length of the longest common subsequence.
 */
int longest_common_subsequence_o_n_space(const std::string& text1, const std::string& text2) {
    int m = text1.length();
    int n = text2.length();

    // Optimize space by ensuring text1 is the shorter string.
    // If text1 is longer, swap them.
    if (m < n) {
        return longest_common_subsequence_o_n_space(text2, text1);
    }
    // Now 'm' is length of the potentially longer string (outer loop), 'n' is length of shorter (inner loop).
    // dp array will have size n+1

    // dp[j] stores the length of LCS of text1[0...i-1] and text2[0...j-1]
    // The current row only depends on the previous row.
    // current_dp[j] represents dp[i][j]
    // prev_dp[j] represents dp[i-1][j]
    std::vector<int> prev_dp(n + 1, 0); // Represents the previous row (i-1)
    std::vector<int> current_dp(n + 1, 0); // Represents the current row (i)

    // Fill the DP table (row by row)
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (text1[i - 1] == text2[j - 1]) {
                // Characters match, depend on prev_dp[j-1] (which is dp[i-1][j-1])
                current_dp[j] = 1 + prev_dp[j - 1];
            } else {
                // Characters don't match, depend on current_dp[j-1] (dp[i][j-1])
                // and prev_dp[j] (dp[i-1][j])
                current_dp[j] = std::max(prev_dp[j], current_dp[j - 1]);
            }
        }
        // After filling current row, it becomes the previous row for the next iteration
        prev_dp = current_dp;
    }
    return prev_dp[n]; // The last element of the last row contains the final answer
}


// --- Problem 3: 0/1 Knapsack Problem ---
// Space optimized to O(W) from O(N*W).

/**
 * @brief 0/1 Knapsack Problem - Space Optimized Bottom-Up (Tabulation).
 *
 * Reduces the 2D DP table `dp[i][w]` to a 1D DP table `dp[w]`.
 * `dp[w]` stores the maximum value for a knapsack of capacity `w` using items processed so far.
 *
 * The crucial insight for 0/1 knapsack is that for `dp[i][w]`, we look at `dp[i-1][w]`
 * (not including current item) and `values[i-1] + dp[i-1][w - weights[i-1]]` (including current item).
 * This means we only need the values from the *previous row*.
 *
 * To avoid overwriting values from the current row that are still needed for calculations
 * for the current row (specifically `dp[i][w - weights[i-1]]` which should be `dp[i-1][w - weights[i-1]]`),
 * we iterate the `w` loop backwards from `W` down to `weights[i-1]`.
 *
 * Time Complexity: O(N * W) - Same as standard 2D DP.
 * Space Complexity: O(W) - For the 1D DP table.
 *
 * @param weights A vector of weights for each item.
 * @param values A vector of values for each item.
 * @param W The maximum capacity of the knapsack.
 * @return The maximum total value that can be put in the knapsack.
 */
int knapsack_01_o_w_space(const std::vector<int>& weights, const std::vector<int>& values, int W) {
    int N = weights.size();
    // dp[w] stores the maximum value for capacity 'w' using items considered so far.
    std::vector<int> dp(W + 1, 0);

    // Iterate through each item
    for (int i = 0; i < N; ++i) {
        int current_weight = weights[i];
        int current_value = values[i];

        // Iterate knapsack capacity from W down to current_weight
        // We iterate backwards to ensure that when we use dp[w - current_weight],
        // it refers to the value from the *previous* item's calculation, not the current one.
        for (int w = W; w >= current_weight; --w) {
            // Two choices:
            // 1. Don't include the current item: dp[w] (value from previous item's calculation)
            // 2. Include the current item: current_value + dp[w - current_weight]
            //    (where dp[w - current_weight] is also from previous item's calculation)
            dp[w] = std::max(dp[w], current_value + dp[w - current_weight]);
        }
    }
    // Helpers::print_vector(dp, "Knapsack 0/1 O(W) DP Table"); // Uncomment for debugging
    return dp[W];
}


// --- Problem 4: Coin Change (Minimum Number of Coins) ---
// The standard O(amount) space solution provided in main_dp_problems.cpp is already optimal for space.
// No further space optimization needed beyond the 1D DP table for this problem.
// The `coin_change_min_coins` in `main_dp_problems.cpp` is effectively O(amount) space.

// --- Problem 5: House Robber (Linear Arrangement) ---
// Space optimized to O(1) from O(N).

/**
 * @brief House Robber (Linear Arrangement) - Bottom-Up with O(1) space.
 *
 * Similar to Fibonacci, only the two previous states are needed to compute the current state.
 *
 * Recurrence: `dp[i] = max(dp[i-1], nums[i] + dp[i-2])`
 *
 * We can map:
 * `dp[i-2]` -> `rob_prev_prev`
 * `dp[i-1]` -> `rob_prev`
 * `dp[i]`   -> `current_max_rob`
 *
 * Time Complexity: O(N) - Single pass through the houses.
 * Space Complexity: O(1) - Uses a constant number of variables.
 *
 * @param nums A vector of integers representing money in each house.
 * @return The maximum amount of money that can be robbed.
 */
int house_robber_linear_o1_space(const std::vector<int>& nums) {
    if (nums.empty()) return 0;
    if (nums.size() == 1) return nums[0];

    // rob_prev_prev: max money robbed two houses ago
    // rob_prev: max money robbed one house ago
    int rob_prev_prev = 0; // Effectively dp[-1], max value is 0 before first house
    int rob_prev = nums[0]; // Effectively dp[0], max value from first house

    for (size_t i = 1; i < nums.size(); ++i) {
        int current_max_rob = std::max(rob_prev, nums[i] + rob_prev_prev);
        rob_prev_prev = rob_prev;
        rob_prev = current_max_rob;
    }
    return rob_prev; // The last 'rob_prev' holds the total max
}

/**
 * @brief House Robber (Circular Arrangement) - Based on O(1) space Linear DP.
 *
 * This version uses the `house_robber_linear_o1_space` function.
 * The space complexity for the intermediate vectors (nums_exclude_last, nums_exclude_first)
 * is still O(N) because we create copies. A true O(1) space for circular would require
 * modifying the `house_robber_linear_o1_space` function to accept iterators or indices,
 * avoiding vector copies. However, for practical purposes, this is a common and clear way.
 *
 * Time Complexity: O(N) - Two calls to house_robber_linear_o1_space.
 * Space Complexity: O(N) - Due to creation of sub-vectors for exclusion.
 * (Note: if `house_robber_linear_o1_space` could accept `begin`/`end` iterators, this
 * could be truly O(1) if called carefully.)
 *
 * @param nums A vector of integers representing money in each house.
 * @return The maximum amount of money that can be robbed from circular houses.
 */
int house_robber_circular_o1_space(const std::vector<int>& nums) {
    if (nums.empty()) return 0;
    if (nums.size() == 1) return nums[0];

    // Case 1: Rob houses from 0 to N-2 (exclude last house)
    std::vector<int> nums_exclude_last(nums.begin(), nums.end() - 1);
    int max_val1 = house_robber_linear_o1_space(nums_exclude_last);

    // Case 2: Rob houses from 1 to N-1 (exclude first house)
    std::vector<int> nums_exclude_first(nums.begin() + 1, nums.end());
    int max_val2 = house_robber_linear_o1_space(nums_exclude_first);

    return std::max(max_val1, max_val2);
}

} // namespace OptimizedSpaceDP