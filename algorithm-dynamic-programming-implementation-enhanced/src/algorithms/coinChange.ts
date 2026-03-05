```typescript
/**
 * @fileoverview Implementations for the Coin Change problem.
 * Given an integer array coins representing coins of different denominations and an integer amount
 * representing a total amount of money. Return the fewest number of coins that you need to make up that amount.
 * If that amount of money cannot be made up by any combination of the coins, return -1.
 * You may assume that you have an infinite number of each kind of coin.
 */

const MAX_VALUE = Infinity; // Using Infinity to represent an unreachable state or a very large number of coins.

/**
 * 1. Recursive (Brute Force)
 * Finds the fewest number of coins to make up the amount using a naive recursive approach.
 * This method explores all possible combinations, leading to redundant calculations for overlapping subproblems.
 *
 * Time Complexity: O(amount^num_coins) in the worst case, or exponential.
 *                  Each step branches for each coin.
 * Space Complexity: O(amount) - Due to recursion stack depth.
 *
 * @param coins An array of coin denominations.
 * @param amount The target amount.
 * @returns The fewest number of coins, or -1 if the amount cannot be made.
 */
export function coinChange_recursive(coins: number[], amount: number): number {
    // Base cases
    if (amount < 0) return MAX_VALUE; // Cannot make negative amount
    if (amount === 0) return 0; // 0 coins needed for 0 amount

    let minCoins = MAX_VALUE;

    // Try each coin
    for (const coin of coins) {
        // If the current coin can be used
        if (amount - coin >= 0) {
            const result = coinChange_recursive(coins, amount - coin);
            // If the subproblem result is not MAX_VALUE (meaning a solution was found)
            if (result !== MAX_VALUE) {
                minCoins = Math.min(minCoins, result + 1); // +1 for the current coin
            }
        }
    }

    return minCoins === MAX_VALUE ? -1 : minCoins;
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 * Finds the fewest number of coins using memoization to store results of subproblems.
 * This avoids redundant calculations, significantly improving performance.
 *
 * Time Complexity: O(amount * num_coins) - Each 'amount' state is computed once,
 *                  and for each state, we iterate through 'num_coins'.
 * Space Complexity: O(amount) - For the memoization table (cache) and recursion stack.
 *
 * @param coins An array of coin denominations.
 * @param amount The target amount.
 * @param memo Optional: A map to store computed results for amounts.
 * @returns The fewest number of coins, or -1 if the amount cannot be made.
 */
export function coinChange_memoized(
    coins: number[],
    amount: number,
    memo: Map<number, number> = new Map()
): number {
    // Base cases
    if (amount < 0) return MAX_VALUE;
    if (amount === 0) return 0;

    // Check if the result is already computed
    if (memo.has(amount)) {
        return memo.get(amount)!;
    }

    let minCoins = MAX_VALUE;

    // Try each coin
    for (const coin of coins) {
        if (amount - coin >= 0) {
            const result = coinChange_memoized(coins, amount - coin, memo);
            if (result !== MAX_VALUE) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }
    }

    // Store and return the result
    memo.set(amount, minCoins);
    return minCoins === MAX_VALUE ? -1 : minCoins;
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 * Finds the fewest number of coins iteratively using a DP table.
 * `dp[i]` will store the minimum number of coins needed to make up amount `i`.
 * The table is built from 0 up to the target `amount`.
 *
 * `dp[i] = min(dp[i], dp[i - coin] + 1)` for each coin in coins.
 *
 * Time Complexity: O(amount * num_coins) - Outer loop runs 'amount' times,
 *                  inner loop runs 'num_coins' times.
 * Space Complexity: O(amount) - For the DP table of size 'amount + 1'.
 *
 * @param coins An array of coin denominations.
 * @param amount The target amount.
 * @returns The fewest number of coins, or -1 if the amount cannot be made.
 */
export function coinChange_tabulated(coins: number[], amount: number): number {
    // dp[i] will store the minimum number of coins to make up amount 'i'.
    // Initialize dp array with MAX_VALUE, except for dp[0].
    // dp[0] = 0, because 0 coins are needed to make up amount 0.
    const dp: number[] = new Array(amount + 1).fill(MAX_VALUE);
    dp[0] = 0;

    // Fill the DP table iteratively
    // Iterate through each possible amount from 1 up to the target amount
    for (let i = 1; i <= amount; i++) {
        // For each amount, consider every coin denomination
        for (const coin of coins) {
            // If the current coin can be used to form amount 'i'
            // (i.e., 'i - coin' is a valid previous amount)
            if (i - coin >= 0) {
                // If dp[i - coin] is not MAX_VALUE (meaning 'i - coin' is reachable)
                if (dp[i - coin] !== MAX_VALUE) {
                    // Update dp[i] with the minimum of its current value
                    // and (1 + number of coins to make up 'i - coin')
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
    }

    // If dp[amount] is still MAX_VALUE, it means the amount cannot be made.
    return dp[amount] === MAX_VALUE ? -1 : dp[amount];
}
```