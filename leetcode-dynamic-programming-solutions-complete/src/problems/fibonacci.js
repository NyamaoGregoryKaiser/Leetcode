/**
 * src/problems/fibonacci.js
 *
 * Problem: Fibonacci Sequence
 *
 * The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones,
 * usually starting with 0 and 1.
 * F(0) = 0
 * F(1) = 1
 * F(n) = F(n-1) + F(n-2) for n > 1
 *
 * This file implements various approaches to calculate the nth Fibonacci number:
 * 1. Recursive (Brute Force)
 * 2. Memoization (Top-Down Dynamic Programming)
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 * 4. Space-Optimized Tabulation
 */

/**
 * 1. Recursive (Brute Force) Solution
 *
 * This is the most straightforward implementation of the Fibonacci definition.
 * It directly translates the recurrence relation F(n) = F(n-1) + F(n-2).
 *
 * Time Complexity: O(2^n) - Exponential. Each call makes two more calls, leading to a rapidly growing
 *                             number of computations, recalculating the same subproblems many times.
 * Space Complexity: O(n) - Due to the recursion stack depth.
 *
 * @param {number} n - The index of the Fibonacci number to calculate (n >= 0).
 * @returns {number} The nth Fibonacci number.
 */
function fibonacciRecursive(n) {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer.");
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

/**
 * 2. Memoization (Top-Down Dynamic Programming) Solution
 *
 * This approach optimizes the recursive solution by storing the results of expensive function calls
 * and returning the cached result when the same inputs occur again. This avoids redundant computations.
 *
 * Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed only once.
 * Space Complexity: O(n) - For the memoization table (cache) and the recursion stack.
 *
 * @param {number} n - The index of the Fibonacci number to calculate (n >= 0).
 * @param {Array<number|undefined>} memo - An array used as a cache to store computed Fibonacci numbers.
 * @returns {number} The nth Fibonacci number.
 */
function fibonacciMemoized(n, memo = []) {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer.");
    }
    if (memo[n] !== undefined) {
        return memo[n]; // Return cached value if already computed
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // Compute and store the result in memo
    memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
    return memo[n];
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming) Solution
 *
 * This approach builds the solution iteratively from the base cases up to the desired result.
 * It uses an array (DP table) to store the results of subproblems.
 *
 * Time Complexity: O(n) - A single loop iterates from 2 to n.
 * Space Complexity: O(n) - For the DP table `dp` of size n+1.
 *
 * @param {number} n - The index of the Fibonacci number to calculate (n >= 0).
 * @returns {number} The nth Fibonacci number.
 */
function fibonacciTabulated(n) {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer.");
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // Create a DP table to store results of subproblems
    // dp[i] will store the ith Fibonacci number
    const dp = new Array(n + 1);

    // Initialize base cases
    dp[0] = 0;
    dp[1] = 1;

    // Fill the DP table iteratively
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

/**
 * 4. Space-Optimized Tabulation Solution
 *
 * This approach further optimizes the tabulation method by observing that to compute F(i),
 * we only need F(i-1) and F(i-2). Thus, we don't need to store the entire DP table;
 * only the last two computed values are sufficient.
 *
 * Time Complexity: O(n) - A single loop iterates from 2 to n.
 * Space Complexity: O(1) - Only a constant number of variables are used (two for previous values).
 *
 * @param {number} n - The index of the Fibonacci number to calculate (n >= 0).
 * @returns {number} The nth Fibonacci number.
 */
function fibonacciSpaceOptimized(n) {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer.");
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    let a = 0; // Represents F(i-2)
    let b = 1; // Represents F(i-1)
    let c;     // Represents F(i)

    // Iterate from 2 up to n
    for (let i = 2; i <= n; i++) {
        c = a + b; // Calculate current Fibonacci number
        a = b;     // Update a to be the previous b
        b = c;     // Update b to be the current c
    }

    return c;
}

module.exports = {
    fibonacciRecursive,
    fibonacciMemoized,
    fibonacciTabulated,
    fibonacciSpaceOptimized,
};