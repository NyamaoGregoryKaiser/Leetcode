```typescript
/**
 * Finds the minimum number of coins to make up a target amount.
 * Uses dynamic programming.
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 */
export function minCoins(coins: number[], amount: number): number {
    const dp: number[] = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}
```