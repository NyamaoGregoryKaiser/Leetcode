package com.greedy.problems;

import java.util.Arrays;

/**
 * **Problem: Coin Change Problem (Greedy Approach)**
 *
 * Given a set of coin denominations and a target amount, find the minimum number of coins
 * required to make up that amount.
 *
 * **Important Note on Greedy Strategy:**
 * The greedy approach (always choosing the largest denomination coin less than or equal to the remaining amount)
 * works *only* for certain "canonical" coin systems (e.g., US currency: {1, 5, 10, 25} cents, or most
 * common currencies like {1, 2, 5, 10, 20, 50} units).
 *
 * It **does NOT work** for all coin systems. For example, if denominations are {1, 3, 4} and target is 6:
 * - Greedy: 4 + 1 + 1 = 3 coins.
 * - Optimal: 3 + 3 = 2 coins.
 *
 * For arbitrary coin systems, the Dynamic Programming approach is required to guarantee optimality.
 * This problem focuses on demonstrating the greedy approach where it is applicable.
 *
 * **Greedy Strategy:**
 * 1. Sort the coin denominations in descending order.
 * 2. Iterate through the denominations, starting from the largest.
 * 3. For each denomination, take as many coins as possible without exceeding the remaining amount.
 * 4. Subtract the value of taken coins from the amount and repeat until the amount is zero.
 *
 * **Why it works for canonical systems (Intuition):**
 * Canonical systems are designed such that taking the largest possible coin at each step
 * never prevents an optimal solution from being formed. This property is usually proven
 * mathematically for specific systems, often by contradiction.
 */
public class CoinChange {

    /**
     * Solves the Coin Change Problem using a greedy approach.
     * This method assumes a canonical coin system where the greedy strategy is optimal.
     *
     * @param denominations An array of available coin denominations (e.g., {1, 5, 10, 25}).
     *                      It's assumed these are positive integers.
     * @param amount        The target amount to make change for. It's assumed to be non-negative.
     * @return The minimum number of coins required, or -1 if the amount cannot be made
     *         (though for canonical systems including 1, this shouldn't happen for non-negative amounts).
     */
    public int findMinCoinsGreedy(int[] denominations, int amount) {
        // Handle edge cases
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative.");
        }
        if (amount == 0) {
            return 0; // 0 coins needed for 0 amount
        }
        if (denominations == null || denominations.length == 0) {
            return -1; // Cannot make change without denominations
        }

        // Step 1: Sort denominations in descending order.
        // This ensures we always try to use the largest possible coin first.
        Arrays.sort(denominations);
        // Reverse the sorted array
        for (int i = 0; i < denominations.length / 2; i++) {
            int temp = denominations[i];
            denominations[i] = denominations[denominations.length - 1 - i];
            denominations[denominations.length - 1 - i] = temp;
        }

        int coinCount = 0;
        int remainingAmount = amount;

        // Step 2 & 3: Iterate through sorted denominations and take as many as possible.
        for (int denomination : denominations) {
            // As long as the current denomination can be used, take it.
            while (remainingAmount >= denomination) {
                remainingAmount -= denomination;
                coinCount++;
            }
            // Optimization: If remainingAmount becomes 0, we've found the solution.
            if (remainingAmount == 0) {
                break;
            }
        }

        // Step 4: Check if the full amount was made.
        // If remainingAmount is not 0, it means the amount cannot be made with the given denominations
        // (or the greedy approach failed because the system is not canonical).
        return remainingAmount == 0 ? coinCount : -1;
    }

    /**
     * **Alternative: Dynamic Programming (Guaranteed Optimal for any coin system)**
     *
     * For arbitrary coin systems (where greedy might fail), Dynamic Programming is the way to go.
     *
     * `dp[i]` represents the minimum number of coins to make change for amount `i`.
     * `dp[0] = 0`
     * `dp[i] = min(dp[i - coin_j] + 1)` for all coin_j <= i
     *
     * This provides a correct solution regardless of the coin system.
     */
    public int findMinCoinsDP(int[] denominations, int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative.");
        }
        if (amount == 0) {
            return 0;
        }
        if (denominations == null || denominations.length == 0) {
            return -1;
        }

        // Initialize dp array. dp[i] will store the minimum number of coins for amount i.
        // Use amount + 1 as infinity, because the max number of coins can be 'amount' (using 1-cent coins).
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // Initialize with a value larger than any possible count
        dp[0] = 0; // Base case: 0 coins for 0 amount

        // Iterate through all amounts from 1 to the target amount
        for (int i = 1; i <= amount; i++) {
            // For each amount, consider every denomination
            for (int coin : denominations) {
                // If the current coin can be used to form amount 'i'
                if (coin <= i) {
                    // Update dp[i] if using this coin gives a smaller count
                    // (dp[i - coin] + 1 means min coins for remaining amount + this coin)
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        // If dp[amount] is still amount + 1, it means the amount cannot be formed.
        return dp[amount] > amount ? -1 : dp[amount];
    }

    /**
     * **Time Complexity Analysis (Greedy):**
     * - Sorting denominations: O(D log D), where D is the number of denominations.
     * - Iterating through denominations and using coins: In the worst case, for each denomination,
     *   we might perform `amount / min_denomination` operations. However, a more precise analysis
     *   is that each coin reduces the amount. The total number of coins taken is at most `amount`.
     *   The outer loop runs D times. The inner `while` loop iterations sum up to at most `amount`
     *   over all denominations. So, roughly O(D + Amount).
     * - Overall Time Complexity: O(D log D + Amount). For a fixed set of denominations, this is
     *   effectively O(Amount).
     *
     * **Space Complexity Analysis (Greedy):**
     * - Sorting: O(1) auxiliary space (if `Arrays.sort` modifies in-place) or O(log D) for stack space.
     * - Variables: O(1).
     * - Overall Space Complexity: O(1) auxiliary space.
     *
     * **Time Complexity Analysis (Dynamic Programming):**
     * - Creating and initializing `dp` array: O(Amount).
     * - Nested loops: Outer loop runs `Amount` times, inner loop runs `D` (number of denominations) times.
     * - Overall Time Complexity: O(Amount * D).
     *
     * **Space Complexity Analysis (Dynamic Programming):**
     * - `dp` array: O(Amount) to store minimum coins for each amount up to the target.
     * - Overall Space Complexity: O(Amount).
     */
}