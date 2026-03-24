/**
 * @fileoverview Implementations for the Fibonacci Sequence problem.
 *
 * Problem Description:
 * Given an integer `n`, return the `n`-th Fibonacci number.
 * The Fibonacci sequence is a sequence where each number is the sum of the two preceding ones,
 * usually starting with 0 and 1.
 * F(0) = 0, F(1) = 1
 * F(n) = F(n-1) + F(n-2) for n > 1.
 */

/**
 * 1. Brute Force (Recursive)
 *
 * This approach directly implements the recursive definition of the Fibonacci sequence.
 * It computes F(n) by recursively calling F(n-1) and F(n-2).
 *
 * Characteristics:
 * - Simple to understand and directly follows the mathematical definition.
 * - Inefficient due to redundant calculations of the same subproblems (e.g., F(3) is calculated multiple times
 *   when computing F(5)).
 *
 * Time Complexity: O(2^n) - Exponential, because each call branches into two more calls.
 * Space Complexity: O(n) - Due to the recursion stack depth.
 *
 * @param {number} n The index of the Fibonacci number to compute.
 * @returns {number} The n-th Fibonacci number.
 */
function fibonacciBruteForce(n) {
    if (n < 0) return -1; // Or throw an error, depending on problem constraints
    if (n === 0) return 0;
    if (n === 1) return 1;

    return fibonacciBruteForce(n - 1) + fibonacciBruteForce(n - 2);
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 *
 * This approach optimizes the brute force recursion by storing the results of subproblems
 * in a cache (often an array or hash map). Before computing F(n), it checks if F(n) has
 * already been computed and, if so, returns the cached value. Otherwise, it computes F(n)
 * recursively and stores the result before returning it.
 *
 * Characteristics:
 * - Solves the "overlapping subproblems" issue of brute force.
 * - Still recursive, but computations are done only once for each unique subproblem.
 * - "Top-down" because it starts from the desired result (F(n)) and breaks it down.
 *
 * Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed only once.
 * Space Complexity: O(n) - For the memoization cache and the recursion stack depth.
 *
 * @param {number} n The index of the Fibonacci number to compute.
 * @param {Array<number|null>} memo Cache to store computed Fibonacci numbers.
 * @returns {number} The n-th Fibonacci number.
 */
function fibonacciMemoization(n, memo = []) {
    if (n < 0) return -1;
    if (n === 0) return 0;
    if (n === 1) return 1;

    // If already computed, return the cached value
    if (memo[n] !== undefined) {
        return memo[n];
    }

    // Compute and store the result
    memo[n] = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);
    return memo[n];
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds the solution iteratively from the base cases up to the desired result.
 * It typically uses an array (DP table) to store intermediate results.
 *
 * Characteristics:
 * - Iterative, avoids recursion stack overhead.
 * - Often more intuitive to trace the flow of computation.
 * - "Bottom-up" because it starts from the smallest subproblems (base cases) and builds towards the larger ones.
 *
 * Time Complexity: O(n) - A single loop runs n times.
 * Space Complexity: O(n) - For the DP table `dp` of size `n+1`.
 *
 * @param {number} n The index of the Fibonacci number to compute.
 * @returns {number} The n-th Fibonacci number.
 */
function fibonacciTabulation(n) {
    if (n < 0) return -1;
    if (n === 0) return 0;
    if (n === 1) return 1;

    // Create a DP table to store results, dp[i] will store F(i)
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
 * 4. Space-Optimized Tabulation
 *
 * This approach further optimizes the tabulation method by noticing that to compute F(i),
 * we only need F(i-1) and F(i-2). Thus, we don't need to store the entire DP table.
 * We can use just a few variables to keep track of the last two computed Fibonacci numbers.
 *
 * Characteristics:
 * - Most efficient in terms of space.
 * - Still iterative, maintaining O(n) time complexity.
 *
 * Time Complexity: O(n) - A single loop runs n times.
 * Space Complexity: O(1) - Only a constant number of variables are used.
 *
 * @param {number} n The index of the Fibonacci number to compute.
 * @returns {number} The n-th Fibonacci number.
 */
function fibonacciSpaceOptimized(n) {
    if (n < 0) return -1;
    if (n === 0) return 0;
    if (n === 1) return 1;

    let a = 0; // Represents F(i-2)
    let b = 1; // Represents F(i-1)
    let current = 0; // Represents F(i)

    // Start from i = 2, as F(0) and F(1) are already handled
    for (let i = 2; i <= n; i++) {
        current = a + b; // F(i) = F(i-2) + F(i-1)
        a = b;           // Update F(i-2) to the previous F(i-1)
        b = current;     // Update F(i-1) to the current F(i)
    }

    return current;
}

module.exports = {
    fibonacciBruteForce,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized,
};