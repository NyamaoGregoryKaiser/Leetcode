```java
package com.example.dp.problems;

import java.util.Arrays;

/**
 * Implements various approaches to solve the Coin Change problem.
 * This class covers two main variations:
 * 1. Minimum Number of Coins: Given a set of coin denominations and a target amount,
 *    find the minimum number of coins needed to make that amount. If the amount cannot be made, return -1.
 * 2. Number of Ways to Make Change: Given a set of coin denominations and a target amount,
 *    find the number of distinct ways to make that amount.
 *
 * Example (Minimum Coins):
 * coins = [1, 2, 5], amount = 11
 * Minimum coins = 3 (5 + 5 + 1)
 *
 * Example (Number of Ways):
 * coins = [1, 2, 5], amount = 5
 * Ways = 4 (1+1+1+1+1, 1+1+1+2, 1+2+2, 5)
 */
public class CoinChangeProblem {

    // --- Variation 1: Minimum Number of Coins ---

    /**
     * Approach 1.1: Brute Force Recursive Solution (Minimum Coins)
     *
     * For a given amount, we iterate through each coin. If we pick a coin,
     * we recursively call the function for (amount - coin) and add 1 to the result.
     * We take the minimum among all possibilities.
     *
     * Time Complexity: O(C^A) where C is number of coins, A is amount. Exponential.
     * Space Complexity: O(A) - Due to recursion stack depth.
     *
     * @param coins Array of coin denominations.
     * @param amount Target amount.
     * @return Minimum number of coins, or -1 if impossible.
     */
    public int minCoinsBruteForce(int[] coins, int amount) {
        if (amount == 0) {
            return 0;
        }
        if (amount < 0) {
            return -1; // Not a valid state
        }

        int minCount = Integer.MAX_VALUE;
        for (int coin : coins) {
            int res = minCoinsBruteForce(coins, amount - coin);
            if (res != -1) {
                minCount = Math.min(minCount, 1 + res);
            }
        }
        return (minCount == Integer.MAX_VALUE) ? -1 : minCount;
    }

    /**
     * Approach 1.2: Recursive Solution with Memoization (Top-Down DP - Minimum Coins)
     *
     * Optimizes the brute-force approach by storing results of subproblems.
     * `dp[i]` stores the minimum number of coins needed to make amount `i`.
     * Initialize `dp` with -2 to signify uncomputed, -1 for impossible, and non-negative for valid counts.
     *
     * Time Complexity: O(C*A) - Each state `amount` is computed once, iterating through `C` coins.
     * Space Complexity: O(A) - For memoization table + O(A) for recursion stack.
     *
     * @param coins Array of coin denominations.
     * @param amount Target amount.
     * @return Minimum number of coins, or -1 if impossible.
     */
    public int minCoinsMemoized(int[] coins, int amount) {
        // dp array to store min coins for each amount from 0 to 'amount'.
        // Initialized with -2 to signify 'not computed yet'.
        // -1 will signify 'impossible to make change'.
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, -2);
        return minCoinsMemoized(coins, amount, dp);
    }

    private int minCoinsMemoized(int[] coins, int amount, int[] dp) {
        // Base case: 0 amount requires 0 coins.
        if (amount == 0) {
            return 0;
        }
        // If amount becomes negative, it's an invalid path.
        if (amount < 0) {
            return -1;
        }
        // If the result for this amount is already computed, return it.
        if (dp[amount] != -2) {
            return dp[amount];
        }

        int minCount = Integer.MAX_VALUE;
        for (int coin : coins) {
            int res = minCoinsMemoized(coins, amount - coin, dp);
            // If subproblem was solvable, update minCount.
            if (res != -1) {
                minCount = Math.min(minCount, 1 + res);
            }
        }

        // Store the result: If minCount is still MAX_VALUE, it means no combination
        // was found, so it's impossible (-1). Otherwise, store the found minCount.
        dp[amount] = (minCount == Integer.MAX_VALUE) ? -1 : minCount;
        return dp[amount];
    }

    /**
     * Approach 1.3: Iterative Solution (Bottom-Up DP - Minimum Coins)
     *
     * This approach fills a 1D DP table `dp[i]` where `dp[i]` represents the
     * minimum number of coins needed to make amount `i`.
     *
     * `dp[0]` is 0. For `i > 0`, `dp[i]` is initialized to infinity.
     * Iterate from `i = 1` to `amount`:
     *   For each coin:
     *     If `i >= coin` and `dp[i - coin]` is not infinity:
     *       `dp[i] = Math.min(dp[i], 1 + dp[i - coin])`
     *
     * Time Complexity: O(C*A) - Two nested loops iterate through coins and amounts.
     * Space Complexity: O(A) - For the 1D DP table.
     *
     * @param coins Array of coin denominations.
     * @param amount Target amount.
     * @return Minimum number of coins, or -1 if impossible.
     */
    public int minCoinsIterative(int[] coins, int amount) {
        // dp[i] will store the minimum number of coins needed to make amount 'i'.
        // Initialize with amount + 1, effectively representing infinity,
        // since the max number of coins for amount 'A' is 'A' (using 1-unit coins).
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // Use amount + 1 as "infinity"

        // Base case: 0 amount needs 0 coins.
        dp[0] = 0;

        // Iterate for each amount from 1 to 'amount'
        for (int i = 1; i <= amount; i++) {
            // For each coin denomination
            for (int coin : coins) {
                // If current amount 'i' can be formed using 'coin'
                if (i >= coin) {
                    // Update dp[i] with the minimum of its current value and
                    // (1 + min coins for amount (i - coin))
                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
                }
            }
        }

        // If dp[amount] is still 'amount + 1' (our infinity), it means it's impossible.
        return (dp[amount] > amount) ? -1 : dp[amount];
    }


    // --- Variation 2: Number of Ways to Make Change ---

    /**
     * Approach 2.1: Recursive Solution with Memoization (Top-Down DP - Number of Ways)
     *
     * Similar to minimum coins, but instead of taking minimum, we sum up the ways.
     * The `dp[idx][a]` stores the number of ways to make amount `a` using coins
     * from index `0` to `idx`.
     *
     * Time Complexity: O(C*A) - Each state `(idx, amount)` is computed once.
     * Space Complexity: O(C*A) - For memoization table + O(C+A) for recursion stack.
     *
     * @param coins Array of coin denominations.
     * @param amount Target amount.
     * @return Number of ways to make the amount.
     */
    public long numWaysMemoized(int[] coins, int amount) {
        // Sort coins to potentially improve cache locality for some cases, though not strictly necessary for correctness.
        Arrays.sort(coins); // Or better, pass numCoins to prevent re-sorting on each call if not desired.
        long[][] dp = new long[coins.length + 1][amount + 1];
        for (long[] row : dp) {
            Arrays.fill(row, -1); // Initialize with -1 to signify uncomputed
        }
        return numWaysMemoized(coins, amount, coins.length, dp);
    }

    private long numWaysMemoized(int[] coins, int amount, int numCoins, long[][] dp) {
        // Base case: If amount is 0, there's 1 way (by choosing no coins).
        if (amount == 0) {
            return 1;
        }
        // Base case: If amount is negative or no coins are left, there are 0 ways.
        if (amount < 0 || numCoins == 0) {
            return 0;
        }

        // If the result for this subproblem is already computed, return it.
        if (dp[numCoins][amount] != -1) {
            return dp[numCoins][amount];
        }

        // Option 1: Include the current coin (coins[numCoins-1])
        // Use the current coin and recurse with the same set of coins (allowing multiple uses).
        long waysIncludingCoin = numWaysMemoized(coins, amount - coins[numCoins - 1], numCoins, dp);

        // Option 2: Exclude the current coin (coins[numCoins-1])
        // Move to the next coin (previous index) without using the current coin.
        long waysExcludingCoin = numWaysMemoized(coins, amount, numCoins - 1, dp);

        // Store and return the sum of ways.
        dp[numCoins][amount] = waysIncludingCoin + waysExcludingCoin;
        return dp[numCoins][amount];
    }

    /**
     * Approach 2.2: Iterative Solution (Bottom-Up DP - Number of Ways)
     *
     * This approach fills a 1D DP table `dp[i]` where `dp[i]` represents the
     * number of ways to make amount `i`.
     *
     * `dp[0]` is 1 (one way to make amount 0: use no coins). All other `dp[i]` are 0.
     * Iterate through each coin:
     *   For each amount `j` from `coin` to `amount`:
     *     `dp[j] += dp[j - coin]`
     *
     * The order of loops is crucial here: iterating coins first, then amounts.
     * This ensures that for each coin, we build up ways for all amounts,
     * effectively adding the new coin to previous combinations.
     *
     * Time Complexity: O(C*A) - Two nested loops iterate through coins and amounts.
     * Space Complexity: O(A) - For the 1D DP table.
     *
     * @param coins Array of coin denominations.
     * @param amount Target amount.
     * @return Number of ways to make the amount.
     */
    public long numWaysIterative(int[] coins, int amount) {
        // dp[i] will store the number of ways to make amount 'i'.
        long[] dp = new long[amount + 1];

        // Base case: One way to make amount 0 (by choosing no coins).
        dp[0] = 1;

        // Iterate through each coin denomination
        for (int coin : coins) {
            // Iterate for each amount from 'coin' to 'amount'
            // We start from 'coin' because amounts less than 'coin' cannot use this 'coin'.
            for (int j = coin; j <= amount; j++) {
                // The number of ways to make amount 'j' is increased by the number of ways
                // to make amount 'j - coin' (i.e., we are adding the current coin to all
                // combinations that make 'j - coin').
                dp[j] += dp[j - coin];
            }
        }
        return dp[amount];
    }
}
```