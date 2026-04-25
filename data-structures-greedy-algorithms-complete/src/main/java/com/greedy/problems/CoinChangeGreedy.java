```java
package com.greedy.problems;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap; // To maintain insertion order for printing

/**
 * **Problem:** Coin Change Problem (Greedy Variant)
 *
 * Given a set of available coin denominations and a target amount, find the minimum
 * number of coins required to make up that amount. This specific implementation
 * focuses on the *greedy approach*, which works only for certain "canonical"
 * coin systems (like US currency denominations: 1, 5, 10, 25 cents).
 *
 * For a greedy approach to work, it must always be optimal to pick the largest
 * possible coin that is less than or equal to the remaining amount.
 *
 * **Example (US Currency):**
 * Denominations: {1, 5, 10, 25} cents
 * Target Amount: 49 cents
 *
 * Greedy steps:
 * 1. Take 25 (remaining: 24)
 * 2. Take 10 (remaining: 14)
 * 3. Take 10 (remaining: 4)
 * 4. Take 1 (remaining: 3)
 * 5. Take 1 (remaining: 2)
 * 6. Take 1 (remaining: 1)
 * 7. Take 1 (remaining: 0)
 * Result: 1x25, 2x10, 4x1 (Total 7 coins)
 *
 * **Why Greedy doesn't always work:**
 * Consider denominations: {1, 3, 4} and target amount: 6
 * Greedy: Take 4 (remaining 2), then 1 (remaining 1), then 1 (remaining 0). Total: 3 coins (4, 1, 1).
 * Optimal: Take 3 (remaining 3), then 3 (remaining 0). Total: 2 coins (3, 3).
 * In this case, the greedy approach fails. For such arbitrary denominations, Dynamic Programming
 * (e.g., `dp[i] = min(dp[i-coin] + 1)`) is required.
 *
 * **Algorithm Steps (Greedy):**
 * 1. Sort the denominations in descending order.
 * 2. Initialize a counter for the total number of coins and a map to store coin counts.
 * 3. Iterate through the sorted denominations:
 *    a. For each denomination, calculate how many coins of this type can be used without exceeding the remaining amount.
 *    b. Add this count to the total coins.
 *    c. Subtract the value of these coins from the remaining amount.
 *    d. Store the count for this denomination in the map.
 * 4. If the remaining amount is not zero after processing all denominations, it's impossible
 *    to make the exact change with the given denominations (or the greedy approach failed).
 */
public class CoinChangeGreedy {

    /**
     * Solves the Coin Change Problem using a greedy approach.
     * This approach is optimal only for "canonical" coin systems.
     *
     * @param denominations An array of available coin denominations (e.g., {1, 5, 10, 25}).
     *                      Assumed to be positive integers.
     * @param amount The target amount to make change for.
     * @return A map where keys are denominations and values are the counts of those denominations used.
     *         Returns null if the amount cannot be made with the given denominations greedily,
     *         or if the input is invalid (e.g., amount < 0).
     *
     * **Time Complexity:**
     * - Sorting denominations: O(D log D), where D is the number of denominations.
     * - Iterating through denominations: O(D).
     * - Total: O(D log D) dominated by sorting.
     *
     * **Space Complexity:**
     * - O(D) for storing the sorted denominations and the result map.
     */
    public Map<Integer, Integer> findMinCoinsGreedy(int[] denominations, int amount) {
        if (denominations == null || denominations.length == 0 || amount < 0) {
            System.err.println("Invalid input: Denominations array is null/empty or amount is negative.");
            return null;
        }
        if (amount == 0) {
            return new LinkedHashMap<>(); // No coins needed for 0 amount
        }

        // Create a mutable list and sort in descending order for greedy approach
        List<Integer> sortedDenominations = new ArrayList<>();
        for (int denom : denominations) {
            if (denom <= 0) {
                System.err.println("Invalid input: Denominations must be positive. Found: " + denom);
                return null;
            }
            sortedDenominations.add(denom);
        }
        sortedDenominations.sort(Collections.reverseOrder());

        Map<Integer, Integer> coinCounts = new LinkedHashMap<>();
        int remainingAmount = amount;

        for (int denom : sortedDenominations) {
            if (remainingAmount >= denom) {
                int count = remainingAmount / denom; // How many coins of this denomination can be used
                coinCounts.put(denom, count);
                remainingAmount -= count * denom; // Update remaining amount
            }
            if (remainingAmount == 0) {
                break; // Target amount reached
            }
        }

        if (remainingAmount > 0) {
            // This indicates that the amount cannot be made exactly,
            // or the greedy approach failed (i.e., it's not a canonical coin system for this amount).
            System.err.println("Cannot make exact change for " + amount + " with given denominations (greedy failure or insufficient denominations). Remaining: " + remainingAmount);
            return null;
        }

        return coinCounts;
    }

    /**
     * Calculates the total number of coins used from a coin counts map.
     * @param coinCounts Map of denomination to count.
     * @return Total number of coins.
     */
    public int getTotalCoins(Map<Integer, Integer> coinCounts) {
        if (coinCounts == null) {
            return -1; // Indicates an error or no solution
        }
        return coinCounts.values().stream().mapToInt(Integer::intValue).sum();
    }

    /**
     * Conceptual brute-force approach (exponential complexity).
     * This method outlines how one might try to explore all combinations.
     * It's highly inefficient and only for comparative understanding.
     * A true brute-force would involve recursive calls trying every possible number of coins.
     *
     * @param denominations The available coin denominations.
     * @param amount The target amount.
     * @return The minimum number of coins found, or Integer.MAX_VALUE if impossible.
     */
    public int findMinCoinsBruteForceConceptual(int[] denominations, int amount) {
        if (amount == 0) return 0;
        if (amount < 0 || denominations == null || denominations.length == 0) return Integer.MAX_VALUE;

        int minCoins = Integer.MAX_VALUE;

        // Try using each denomination for the current amount
        for (int denom : denominations) {
            if (amount >= denom) {
                int result = findMinCoinsBruteForceConceptual(denominations, amount - denom);
                if (result != Integer.MAX_VALUE) {
                    minCoins = Math.min(minCoins, result + 1);
                }
            }
        }
        return minCoins;
    }


    /**
     * Finds the minimum number of coins using Dynamic Programming.
     * This is the correct approach for arbitrary coin systems (where greedy might fail).
     * Included for comparison against the greedy approach.
     *
     * @param denominations An array of available coin denominations.
     * @param amount The target amount.
     * @return The minimum number of coins required, or -1 if the amount cannot be made.
     *
     * **Time Complexity:** O(amount * D), where D is the number of denominations.
     * **Space Complexity:** O(amount) for the DP table.
     */
    public int findMinCoinsDP(int[] denominations, int amount) {
        if (amount < 0 || denominations == null || denominations.length == 0) {
            return -1;
        }
        if (amount == 0) {
            return 0;
        }

        // dp[i] will store the minimum number of coins needed to make amount 'i'.
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // Initialize with a value larger than any possible answer
        dp[0] = 0; // Base case: 0 coins for 0 amount

        for (int i = 1; i <= amount; i++) {
            for (int denom : denominations) {
                if (denom <= i) { // If current denomination can be used
                    // dp[i] = min(dp[i], dp[i - denom] + 1)
                    // If we use 'denom', the remaining amount is 'i - denom'.
                    // We need dp[i - denom] coins for the remaining amount plus 1 for the current coin.
                    if (dp[i - denom] != amount + 1) { // Ensure dp[i - denom] was reachable
                        dp[i] = Math.min(dp[i], dp[i - denom] + 1);
                    }
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount]; // If dp[amount] is still amount+1, it's unreachable
    }
}

```