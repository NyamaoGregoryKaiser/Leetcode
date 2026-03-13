#include <vector>
#include <string>
#include <algorithm> // For std::max, std::min
#include <map>       // For memoization with map (alternative to vector for sparse/non-contiguous keys)
#include <limits>    // For std::numeric_limits
#include "helpers.hpp" // For print utilities (optional, good for debugging)

/**
 * @brief Namespace for Dynamic Programming (DP) solutions.
 */
namespace DPProblems {

// --- Problem 1: Fibonacci Number ---
// Problem Description: Calculate the N-th Fibonacci number.
// F(0) = 0, F(1) = 1, F(N) = F(N-1) + F(N-2) for N > 1.

/**
 * @brief Fibonacci Number - Top-Down (Memoization) approach.
 *
 * Uses a vector `memo` to store results of subproblems.
 *
 * Time Complexity: O(N) - Each Fibonacci number from 0 to N is computed once.
 * Space Complexity: O(N) - For the memoization table and recursion stack.
 *
 * @param n The input number for which to calculate the Fibonacci.
 * @param memo A mutable vector used for memoization.
 * @return The N-th Fibonacci number.
 */
long long fibonacci_memo_recursive(int n, std::vector<long long>& memo) {
    if (n <= 1) {
        return n; // Base cases: F(0) = 0, F(1) = 1
    }
    if (memo[n] != -1) {
        return memo[n]; // Return memoized result if already computed
    }
    // Compute and store the result
    memo[n] = fibonacci_memo_recursive(n - 1, memo) + fibonacci_memo_recursive(n - 2, memo);
    return memo[n];
}

/**
 * @brief Fibonacci Number - Wrapper for Top-Down (Memoization) approach.
 * Initializes the memoization table.
 *
 * @param n The input number.
 * @return The N-th Fibonacci number.
 */
long long fibonacci_memoization(int n) {
    if (n < 0) return 0; // Handle invalid input
    std::vector<long long> memo(n + 1, -1); // Initialize memo table with -1 (indicating not computed)
    return fibonacci_memo_recursive(n, memo);
}

/**
 * @brief Fibonacci Number - Bottom-Up (Tabulation) approach.
 *
 * Iteratively fills a DP table from base cases up to N.
 *
 * Time Complexity: O(N) - Single loop from 2 to N.
 * Space Complexity: O(N) - For the DP table.
 *
 * @param n The input number.
 * @return The N-th Fibonacci number.
 */
long long fibonacci_tabulation(int n) {
    if (n < 0) return 0;
    if (n <= 1) {
        return n; // Base cases: F(0) = 0, F(1) = 1
    }

    std::vector<long long> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}


// --- Problem 2: Longest Common Subsequence (LCS) ---
// Problem Description: Find the length of the longest common subsequence of two strings.
// A subsequence is a sequence that can be derived from another sequence by deleting some or no elements
// without changing the order of the remaining elements.

/**
 * @brief Longest Common Subsequence (LCS) - Bottom-Up (Tabulation) approach.
 *
 * Uses a 2D DP table `dp[i][j]` to store the length of the LCS of `text1[0...i-1]` and `text2[0...j-1]`.
 *
 * Recurrence Relation:
 * if text1[i-1] == text2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]
 * else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 *
 * Base Cases: dp[0][j] = 0, dp[i][0] = 0 (empty string has 0 LCS with any string)
 *
 * Time Complexity: O(m * n) - Where m is length of text1, n is length of text2.
 * Space Complexity: O(m * n) - For the 2D DP table.
 *
 * @param text1 The first input string.
 * @param text2 The second input string.
 * @return The length of the longest common subsequence.
 */
int longest_common_subsequence(const std::string& text1, const std::string& text2) {
    int m = text1.length();
    int n = text2.length();

    // dp[i][j] stores the length of LCS of text1[0...i-1] and text2[0...j-1]
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));

    // Fill the DP table
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (text1[i - 1] == text2[j - 1]) {
                // Characters match, extend the LCS from dp[i-1][j-1]
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // Characters don't match, take the maximum LCS from either
                // excluding text1[i-1] or excluding text2[j-1]
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    // Helpers::print_matrix(dp, "LCS DP Table"); // Uncomment for debugging
    return dp[m][n];
}


// --- Problem 3: 0/1 Knapsack Problem ---
// Problem Description: Given weights and values of N items, put these items in a knapsack of capacity W
// to get the maximum total value in the knapsack. Each item can either be put in the knapsack (0/1 choice).

/**
 * @brief 0/1 Knapsack Problem - Bottom-Up (Tabulation) approach.
 *
 * Uses a 2D DP table `dp[i][w]` to store the maximum value that can be obtained with a knapsack
 * of capacity `w` using items from `0` to `i-1`.
 *
 * Recurrence Relation:
 * if weights[i-1] > w: dp[i][w] = dp[i-1][w] (current item too heavy, don't include)
 * else: dp[i][w] = max(dp[i-1][w],          // don't include current item
 *                      values[i-1] + dp[i-1][w - weights[i-1]]) // include current item
 *
 * Base Cases: dp[0][w] = 0, dp[i][0] = 0
 *
 * Time Complexity: O(N * W) - Where N is number of items, W is knapsack capacity.
 * Space Complexity: O(N * W) - For the 2D DP table.
 *
 * @param weights A vector of weights for each item.
 * @param values A vector of values for each item.
 * @param W The maximum capacity of the knapsack.
 * @return The maximum total value that can be put in the knapsack.
 */
int knapsack_01_tabulation(const std::vector<int>& weights, const std::vector<int>& values, int W) {
    int N = weights.size();
    // dp[i][w] represents the maximum value that can be obtained with items up to index i-1
    // and a knapsack capacity of w.
    std::vector<std::vector<int>> dp(N + 1, std::vector<int>(W + 1, 0));

    // Fill the DP table
    for (int i = 1; i <= N; ++i) {
        for (int w = 1; w <= W; ++w) {
            // Current item's weight and value (using 0-based indexing for inputs)
            int current_weight = weights[i - 1];
            int current_value = values[i - 1];

            if (current_weight > w) {
                // If the current item's weight is more than the current capacity 'w',
                // we cannot include it. So, the max value is the same as without this item.
                dp[i][w] = dp[i - 1][w];
            } else {
                // If we can include the current item, we have two choices:
                // 1. Don't include the current item: value is dp[i-1][w]
                // 2. Include the current item: value is current_value + dp[i-1][w - current_weight]
                //    (value of current item + max value from remaining capacity with previous items)
                dp[i][w] = std::max(dp[i - 1][w], current_value + dp[i - 1][w - current_weight]);
            }
        }
    }
    // Helpers::print_matrix(dp, "Knapsack 0/1 DP Table"); // Uncomment for debugging
    return dp[N][W];
}


// --- Problem 4: Coin Change (Minimum Number of Coins) ---
// Problem Description: Given an array of coin denominations and a target amount,
// return the fewest number of coins that you need to make up that amount.
// If that amount cannot be made up by any combination of the coins, return -1.
// Assume an infinite supply of each coin.

/**
 * @brief Coin Change (Minimum Coins) - Bottom-Up (Tabulation) approach.
 *
 * Uses a 1D DP table `dp[a]` to store the minimum number of coins needed to make amount `a`.
 *
 * Recurrence Relation:
 * dp[a] = min(dp[a], 1 + dp[a - coin]) for each coin in coins array
 *
 * Base Cases: dp[0] = 0 (0 coins for 0 amount)
 * Initialization: dp[a] = infinity for a > 0 (to correctly find minimum)
 *
 * Time Complexity: O(amount * N) - Where N is number of coin denominations.
 * Space Complexity: O(amount) - For the 1D DP table.
 *
 * @param coins A vector of available coin denominations.
 * @param amount The target amount.
 * @return The minimum number of coins, or -1 if impossible.
 */
int coin_change_min_coins(const std::vector<int>& coins, int amount) {
    if (amount < 0) return -1;
    if (amount == 0) return 0;

    // dp[i] will store the minimum number of coins needed to make amount i.
    // Initialize with amount + 1, which acts as infinity (since max coins cannot exceed amount)
    std::vector<int> dp(amount + 1, amount + 1);

    // Base case: 0 coins needed for amount 0
    dp[0] = 0;

    // Iterate through all amounts from 1 to 'amount'
    for (int a = 1; a <= amount; ++a) {
        // For each amount, consider every coin denomination
        for (int coin : coins) {
            // If the current coin can be used (i.e., it's not greater than the current amount)
            if (a - coin >= 0) {
                // Update dp[a] with the minimum of its current value
                // and 1 (for the current coin) + dp[a - coin] (min coins for remaining amount)
                dp[a] = std::min(dp[a], 1 + dp[a - coin]);
            }
        }
    }
    // Helpers::print_vector(dp, "Coin Change DP Table"); // Uncomment for debugging

    // If dp[amount] is still amount + 1, it means the amount cannot be made
    return (dp[amount] > amount) ? -1 : dp[amount];
}


// --- Problem 5: House Robber ---
// Problem Description: You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money stashed. All houses are arranged in a circle.
// That means the first house and the last house are adjacent.
// The only constraint stopping you from robbing each of them is that adjacent houses
// have security systems connected, and it will automatically contact the police
// if two adjacent houses are robbed on the same night.
// Given a list of non-negative integers representing the amount of money of each house,
// return the maximum amount of money you can rob tonight without alerting the police.

// NOTE: The common "House Robber" problem is a linear arrangement. The circular variant
// is a classic extension. I will provide the linear version first, then use it to solve the circular.

/**
 * @brief House Robber (Linear Arrangement) - Bottom-Up (Tabulation) approach.
 *
 * Calculates the maximum money that can be robbed from houses in a linear arrangement
 * without robbing adjacent houses.
 *
 * Uses a 1D DP table `dp[i]` where `dp[i]` is the maximum money robbed up to house `i`.
 *
 * Recurrence Relation:
 * dp[i] = max(dp[i-1],            // Don't rob current house i
 *             nums[i] + dp[i-2])  // Rob current house i, then add max from two houses prior
 *
 * Base Cases:
 * dp[0] = nums[0]
 * dp[1] = max(nums[0], nums[1])
 *
 * Time Complexity: O(N) - Single pass through the houses.
 * Space Complexity: O(N) - For the DP table. (Can be optimized to O(1))
 *
 * @param nums A vector of integers representing money in each house.
 * @return The maximum amount of money that can be robbed.
 */
int house_robber_linear(const std::vector<int>& nums) {
    if (nums.empty()) return 0;
    if (nums.size() == 1) return nums[0];

    std::vector<int> dp(nums.size());

    // Base cases
    dp[0] = nums[0];
    dp[1] = std::max(nums[0], nums[1]);

    // Fill DP table
    for (size_t i = 2; i < nums.size(); ++i) {
        dp[i] = std::max(dp[i - 1], nums[i] + dp[i - 2]);
    }
    // Helpers::print_vector(dp, "House Robber Linear DP Table"); // Uncomment for debugging
    return dp[nums.size() - 1];
}


/**
 * @brief House Robber (Circular Arrangement) - Based on Linear DP.
 *
 * Due to the circular arrangement, the first house and the last house cannot be robbed simultaneously.
 * This problem can be broken down into two subproblems using the linear house robber solution:
 * 1. Rob houses from index 0 to N-2 (excluding the last house).
 * 2. Rob houses from index 1 to N-1 (excluding the first house).
 * The maximum of these two scenarios will be the answer.
 *
 * Time Complexity: O(N) - Two calls to house_robber_linear.
 * Space Complexity: O(N) - For intermediate vectors and DP table in linear solver.
 *
 * @param nums A vector of integers representing money in each house.
 * @return The maximum amount of money that can be robbed from circular houses.
 */
int house_robber_circular(const std::vector<int>& nums) {
    if (nums.empty()) return 0;
    if (nums.size() == 1) return nums[0];

    // Case 1: Rob houses from 0 to N-2 (exclude last house)
    std::vector<int> nums_exclude_last(nums.begin(), nums.end() - 1);
    int max_val1 = house_robber_linear(nums_exclude_last);

    // Case 2: Rob houses from 1 to N-1 (exclude first house)
    std::vector<int> nums_exclude_first(nums.begin() + 1, nums.end());
    int max_val2 = house_robber_linear(nums_exclude_first);

    return std::max(max_val1, max_val2);
}

} // namespace DPProblems