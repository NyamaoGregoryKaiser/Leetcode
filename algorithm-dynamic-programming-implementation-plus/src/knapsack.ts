```typescript
/**
 * Solves the 0/1 knapsack problem using dynamic programming.
 * Time complexity: O(nW), where n is the number of items and W is the knapsack capacity.
 * Space complexity: O(nW)
 */
export function knapsack01(capacity: number, weights: number[], values: number[]): number {
  const n = weights.length;
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}

```