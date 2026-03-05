```typescript
/**
 * @fileoverview Implementations for calculating the N-th Fibonacci number using various approaches.
 * The Fibonacci sequence is defined as F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2) for n > 1.
 */

/**
 * 1. Recursive (Brute Force)
 * Calculates the N-th Fibonacci number using a naive recursive approach.
 * This approach recomputes the same Fibonacci numbers multiple times, leading to inefficiency.
 *
 * Time Complexity: O(2^n) - Exponential, as it explores a binary tree of calls.
 * Space Complexity: O(n) - Due to recursion stack depth.
 *
 * @param n The index of the Fibonacci number to calculate.
 * @returns The N-th Fibonacci number.
 */
export function fibonacci_recursive(n: number): number {
    // Base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // Recursive step
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2);
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 * Calculates the N-th Fibonacci number using memoization to store results of subproblems.
 * This avoids redundant calculations present in the naive recursive approach.
 *
 * Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed once.
 * Space Complexity: O(n) - For the memoization table (cache) and recursion stack.
 *
 * @param n The index of the Fibonacci number to calculate.
 * @param memo Optional: A map to store computed Fibonacci numbers.
 * @returns The N-th Fibonacci number.
 */
export function fibonacci_memoized(n: number, memo: Map<number, number> = new Map()): number {
    // Base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // Check if the result is already computed
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    // Compute and store the result
    const result = fibonacci_memoized(n - 1, memo) + fibonacci_memoized(n - 2, memo);
    memo.set(n, result);
    return result;
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 * Calculates the N-th Fibonacci number iteratively using an array (DP table).
 * It builds the solution from the base cases up to `n`.
 *
 * Time Complexity: O(n) - A single loop iterates from 2 to n.
 * Space Complexity: O(n) - For the DP table of size n+1.
 *
 * @param n The index of the Fibonacci number to calculate.
 * @returns The N-th Fibonacci number.
 */
export function fibonacci_tabulated(n: number): number {
    // Handle base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // Create a DP table to store Fibonacci numbers
    // dp[i] will store the i-th Fibonacci number
    const dp: number[] = new Array(n + 1).fill(0);

    // Initialize base cases in the DP table
    dp[0] = 0;
    dp[1] = 1;

    // Fill the DP table iteratively
    // For each i from 2 to n, dp[i] = dp[i-1] + dp[i-2]
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    // The N-th Fibonacci number is at dp[n]
    return dp[n];
}

/**
 * 4. Space-Optimized Tabulation
 * Calculates the N-th Fibonacci number iteratively using only two variables,
 * reducing the space complexity from O(n) to O(1).
 *
 * Time Complexity: O(n) - A single loop iterates from 2 to n.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 *
 * @param n The index of the Fibonacci number to calculate.
 * @returns The N-th Fibonacci number.
 */
export function fibonacci_spaceOptimized(n: number): number {
    // Handle base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // Initialize two variables to store the previous two Fibonacci numbers
    let a = 0; // Represents F(i-2)
    let b = 1; // Represents F(i-1)
    let current = 0; // Represents F(i)

    // Iterate from 2 up to n
    for (let i = 2; i <= n; i++) {
        // Calculate the current Fibonacci number
        current = a + b;
        // Update a and b for the next iteration
        a = b;
        b = current;
    }

    // After the loop, 'b' holds the N-th Fibonacci number (F(n))
    return b;
}
```