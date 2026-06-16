```typescript
/**
 * src/problems/coinChangeMin.ts
 *
 * Coin Change Problem (Minimum Coins)
 *
 * Given an array of coin denominations `coins` and a target `amount`,
 * return the fewest number of coins that you need to make up that amount.
 * If that amount cannot be made up by any combination of the coins, return -1.
 *
 * You may assume that you have an infinite number of each kind of coin.
 */

/**
 * Problem Description: Coin Change (Minimum Coins)
 *
 * Input:
 * - `coins`: An array of numbers representing available coin denominations.
 * - `amount`: A number representing the target amount.
 *
 * Output: The minimum number of coins needed to make the `amount`, or -1 if impossible.
 *
 * Constraints:
 * - Coins array can be empty.
 * - Coin denominations are positive integers.
 * - Amount is a non-negative integer.
 *
 * Example:
 * coins = [1, 2, 5], amount = 11  => Output: 3 (11 = 5 + 5 + 1)
 * coins = [2], amount = 3         => Output: -1 (3 cannot be made with only 2s)
 * coins = [1], amount = 0         => Output: 0 (0 coins needed for 0 amount)
 * coins = [1], amount = 1         => Output: 1
 *
 * Key Concept: Overlapping subproblems and optimal substructure.
 * This is a variation of the unbounded knapsack problem or shortest path in a DAG.
 * - `dp[i]` = minimum coins to make amount `i`.
 * - To find `dp[amount]`, for each coin `c` in `coins`:
 *   If `amount - c >= 0`, then `dp[amount] = min(dp[amount], dp[amount - c] + 1)`.
 *   The `+1` represents using the current coin `c`.
 */

const NOT_POSSIBLE = -1; // Sentinel value to indicate that an amount cannot be made.

// --- 1. Brute Force Recursive Solution ---
/**
 * Implements the Coin Change problem (minimum coins) using a brute-force recursive approach.
 * This solution explores all possible combinations of coins, leading to exponential time complexity.
 * It does not use memoization, so it recomputes many subproblems.
 *
 * Time Complexity: O(C^A) in the worst case, where C is the number of coin denominations
 *                  and A is the target amount. Each recursive call can branch into C sub-calls.
 * Space Complexity: O(A) due to the recursion stack depth.
 *
 * @param {number[]} coins - Array of coin denominations.
 * @param {number} amount - The target amount.
 * @returns {number} The minimum number of coins, or -1 if impossible.
 */
export function coinChangeMin_BruteForce(coins: number[], amount: number): number {
    // Base cases
    if (amount === 0) {
        return 0; // 0 coins needed for 0 amount
    }
    if (amount < 0) {
        // This state should ideally not be reached if called correctly,
        // or represents an invalid path in the recursive tree.
        return Infinity; // Indicate that this path is not valid/possible
    }

    let minCoins = Infinity;

    // Try each coin as the last coin used
    for (const coin of coins) {
        const remainingAmount = amount - coin;
        // Recursively find the minimum coins for the remaining amount
        const res = coinChangeMin_BruteForce(coins, remainingAmount);

        // If a valid result (not Infinity) is found for remainingAmount
        if (res !== Infinity) {
            minCoins = Math.min(minCoins, 1 + res); // +1 for the current coin
        }
    }

    // If minCoins is still Infinity, it means amount cannot be made.
    return minCoins === Infinity ? NOT_POSSIBLE : minCoins;
}


// --- 2. Top-Down Dynamic Programming (Memoization) Solution ---
/**
 * Implements the Coin Change problem (minimum coins) using memoization (top-down DP).
 * This optimizes the brute-force approach by storing results of subproblems
 * in a DP table to avoid recomputation, significantly reducing time complexity.
 *
 * Time Complexity: O(C*A), where C is the number of coin denominations and A is the target amount.
 *                  Each state `dp[a]` is computed only once, and each computation takes O(C) time.
 * Space Complexity: O(A) for the memoization table + O(A) for recursion stack depth.
 *
 * @param {number[]} coins - Array of coin denominations.
 * @param {number} amount - The target amount.
 * @returns {number} The minimum number of coins, or -1 if impossible.
 */
export function coinChangeMin_Memoized(coins: number[], amount: number): number {
    // dp table to store results. dp[i] will store min coins for amount `i`.
    // Initialize with -2 (or any sentinel) to distinguish from -1 (not possible) and 0 (base case).
    // Or, initialize with Infinity and use -1 as the final return value.
    const dp: number[] = Array(amount + 1).fill(-2); // -2 indicates 'not computed yet'

    function solve(currentAmount: number): number {
        // Base cases
        if (currentAmount === 0) {
            return 0;
        }
        if (currentAmount < 0) {
            return Infinity; // Indicate an invalid path
        }

        // If this subproblem has already been solved, return the stored result.
        if (dp[currentAmount] !== -2) {
            return dp[currentAmount];
        }

        let minCoins = Infinity;

        // Try each coin
        for (const coin of coins) {
            const res = solve(currentAmount - coin); // Recursive call for remaining amount
            if (res !== Infinity) {
                minCoins = Math.min(minCoins, 1 + res); // +1 for the current coin
            }
        }

        // Store the computed result before returning.
        // If minCoins is still Infinity, it means currentAmount cannot be made.
        dp[currentAmount] = minCoins === Infinity ? NOT_POSSIBLE : minCoins;
        return dp[currentAmount];
    }

    const result = solve(amount);
    return result === Infinity ? NOT_POSSIBLE : result; // Convert Infinity to NOT_POSSIBLE for final return
}


// --- 3. Bottom-Up Dynamic Programming (Tabulation) Solution ---
/**
 * Implements the Coin Change problem (minimum coins) using tabulation (bottom-up DP).
 * This iterative approach builds up the solution from base cases to the final result,
 * explicitly filling a 1D DP table.
 *
 * Time Complexity: O(C*A), where C is the number of coin denominations and A is the target amount.
 *                  The outer loop runs A times, and the inner loop runs C times.
 * Space Complexity: O(A) for the dp table.
 *
 * @param {number[]} coins - Array of coin denominations.
 * @param {number} amount - The target amount.
 * @returns {number} The minimum number of coins, or -1 if impossible.
 */
export function coinChangeMin_Tabulated(coins: number[], amount: number): number {
    // dp[i] will store the minimum number of coins needed to make amount `i`.
    // Initialize dp array with Infinity. dp[0] is 0 as 0 coins are needed for 0 amount.
    // The size is amount + 1 to cover amounts from 0 to `amount`.
    const dp: number[] = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    // Iterate through each amount from 1 up to the target amount.
    for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
        // For each current amount, consider all available coin denominations.
        for (const coin of coins) {
            // If the current coin can be used (i.e., currentAmount is greater than or equal to the coin's value)
            // AND if the subproblem (currentAmount - coin) was solvable (not Infinity)
            if (currentAmount - coin >= 0 && dp[currentAmount - coin] !== Infinity) {
                // Update dp[currentAmount] with the minimum of its current value
                // and (1 + minimum coins for (currentAmount - coin)).
                // The `+1` accounts for using the current `coin`.
                dp[currentAmount] = Math.min(dp[currentAmount], 1 + dp[currentAmount - coin]);
            }
        }
    }

    // The result for the target `amount` is in dp[amount].
    // If it's still Infinity, it means the amount cannot be made.
    return dp[amount] === Infinity ? NOT_POSSIBLE : dp[amount];
}

```