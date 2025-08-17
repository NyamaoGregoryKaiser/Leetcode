```typescript
/**
 * Calculates the nth Fibonacci number using iterative dynamic programming.
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
export function fibonacciIterative(n: number): number {
  if (n <= 1) return n;
  let a = 0, b = 1, temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}


/**
 * Calculates the nth Fibonacci number using recursive DP (memoization).
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
export function fibonacciRecursiveMemo(n: number, memo: number[] = []): number {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fibonacciRecursiveMemo(n - 1, memo) + fibonacciRecursiveMemo(n - 2, memo);
  return memo[n];
}

// Add more Fibonacci implementations (e.g., bottom-up DP) here...

```