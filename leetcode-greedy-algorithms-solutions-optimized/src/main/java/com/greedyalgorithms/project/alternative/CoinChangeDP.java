package com.greedyalgorithms.project.alternative;

import java.util.Arrays;

/**
 * Dynamic Programming solution for the general Coin Change Problem (Minimum Coins).
 * This approach correctly solves the problem for any arbitrary set of coin denominations,
 * including non-canonical systems where the greedy approach might fail.
 *
 * Problem Statement: Given a set of coin denominations `coins` and a target `amount`,
 * find the minimum number of coins needed to make up that amount.
 *
 * Time Complexity: O(amount * C), where `amount` is the target amount and `C` is the number of coin denominations.
 * Space Complexity: O(amount) for the DP table.
 */
public class CoinChangeDP {

    /**
     * Finds the minimum number of coins to make up a given amount using dynamic programming.
     *
     * @param coins An array of available coin denominations.
     * @param amount The target amount to make change for.
     * @return The minimum number of coins required, or -1 if the amount cannot be made.
     * @throws IllegalArgumentException if coins array is null/empty or amount is negative.
     */
    public int coinChangeDP(int[] coins, int amount) {
        if (coins == null || coins.length == 0) {
            throw new IllegalArgumentException("Coin denominations cannot be null or empty.");
        }
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative.");
        }
        if (amount == 0) {
            return 0;
        }

        // dp[i] will store the minimum number of coins required to make change for amount 'i'.
        // Initialize dp table with amount + 1, representing "infinity" (an unreachable state).
        // The maximum possible coins needed for amount 'X' is 'X' (if smallest coin is 1).
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);

        // Base case: 0 coins are needed for amount 0.
        dp[0] = 0;

        // Iterate through all amounts from 1 to the target amount.
        for (int i = 1; i <= amount; i++) {
            // For each amount 'i', try to use each coin denomination.
            for (int coin : coins) {
                // If the current coin can be used to form amount 'i':
                if (coin <= i) {
                    // Update dp[i] with the minimum of its current value
                    // and (1 + dp[i - coin])
                    // 1 represents the current 'coin' being used,
                    // dp[i - coin] is the minimum coins for the remaining amount.
                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
                }
            }
        }

        // If dp[amount] is still (amount + 1), it means the amount cannot be made
        // with the given coin denominations.
        return dp[amount] > amount ? -1 : dp[amount];
    }
}