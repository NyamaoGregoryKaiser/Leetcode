/**
 * src/algorithms/fibonacci.ts
 *
 * This file implements various approaches to calculate the N-th Fibonacci number.
 * The Fibonacci sequence is a classic problem used to introduce Dynamic Programming,
 * showcasing overlapping subproblems and optimal substructure.
 */

/**
 * Approach 1: Recursive (Brute Force)
 *
 * Calculates the N-th Fibonacci number using plain recursion.
 *
 * Time Complexity: O(2^N)
 *   - Each call generates two more calls, leading to an exponential growth in calls.
 *   - Redundant calculations for overlapping subproblems (e.g., fib(3) is calculated multiple times).
 * Space Complexity: O(N)
 *   - Due to the recursion stack depth.
 *
 * @param n The index of the Fibonacci number to calculate (0-indexed).
 * @returns The N-th Fibonacci number.
 */
export function fibonacciRecursive(n: number): number {
    // Base cases
    if (n <= 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // Recursive step
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

/**
 * Approach 2: Memoization (Top-Down Dynamic Programming)
 *
 * Calculates the N-th Fibonacci number using recursion with memoization.
 * It stores the results of expensive function calls and returns the cached result
 * when the same inputs occur again.
 *
 * Time Complexity: O(N)
 *   - Each Fibonacci number from 0 to N is computed only once.
 * Space Complexity: O(N)
 *   - For the memoization cache (array/map) and the recursion stack.
 *
 * @param n The index of the Fibonacci number to calculate.
 * @param memo Optional: An array used for memoization.
 * @returns The N-th Fibonacci number.
 */
export function fibonacciMemoization(n: number, memo: number[] = []): number {
    // Base cases
    if (n <= 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // Check if the result is already computed
    if (memo[n] !== undefined) {
        return memo[n];
    }

    // Compute and store the result
    memo[n] = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);
    return memo[n];
}

/**
 * Approach 3: Tabulation (Bottom-Up Dynamic Programming)
 *
 * Calculates the N-th Fibonacci number iteratively using a DP table.
 * It builds up the solution from smaller subproblems to larger ones.
 *
 * Time Complexity: O(N)
 *   - A single loop iterates N times.
 * Space Complexity: O(N)
 *   - For the DP table (array).
 *
 * @param n The index of the Fibonacci number to calculate.
 * @returns The N-th Fibonacci number.
 */
export function fibonacciTabulation(n: number): number {
    // Handle edge cases for n
    if (n <= 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // Create a DP table to store results of subproblems
    // dp[i] will store the i-th Fibonacci number
    const dp: number[] = new Array(n + 1);

    // Initialize base cases in the DP table
    dp[0] = 0;
    dp[1] = 1;

    // Fill the DP table iteratively
    // dp[i] depends on dp[i-1] and dp[i-2]
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    // The N-th Fibonacci number is the last element in the DP table
    return dp[n];
}

/**
 * Approach 4: Space-Optimized Tabulation
 *
 * Calculates the N-th Fibonacci number iteratively using only two variables
 * to store the previous two Fibonacci numbers, significantly reducing space complexity.
 *
 * Time Complexity: O(N)
 *   - A single loop iterates N times.
 * Space Complexity: O(1)
 *   - Only a constant number of variables are used, regardless of N.
 *
 * @param n The index of the Fibonacci number to calculate.
 * @returns The N-th Fibonacci number.
 */
export function fibonacciSpaceOptimized(n: number): number {
    // Handle edge cases for n
    if (n <= 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // Initialize variables to store the previous two Fibonacci numbers
    let a = 0; // Represents fib(i-2)
    let b = 1; // Represents fib(i-1)
    let currentFib = 0;

    // Iterate from 2 up to n
    for (let i = 2; i <= n; i++) {
        currentFib = a + b; // fib(i) = fib(i-2) + fib(i-1)
        a = b;              // Update a to be the previous fib(i-1)
        b = currentFib;     // Update b to be the current fib(i)
    }

    // After the loop, b holds the N-th Fibonacci number
    return b;
}