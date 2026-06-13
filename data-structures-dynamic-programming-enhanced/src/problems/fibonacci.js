```javascript
/**
 * Dynamic Programming: Fibonacci Sequence
 *
 * The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones,
 * usually starting with 0 and 1. (0, 1, 1, 2, 3, 5, 8, ...)
 *
 * Problem: Given an integer n, return the nth Fibonacci number.
 */

/**
 * Approach 1: Brute-Force Recursive (Naive)
 *
 * This approach directly translates the recursive definition of Fibonacci.
 * F(n) = F(n-1) + F(n-2)
 *
 * Time Complexity: O(2^n) - Exponential, due to redundant calculations of subproblems.
 *                  Each call branches into two, creating a recursion tree.
 * Space Complexity: O(n) - Due to the recursion stack depth.
 *
 * @param {number} n The index of the Fibonacci number to find.
 * @returns {number} The nth Fibonacci number.
 */
function fibonacciBruteForce(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacciBruteForce(n - 1) + fibonacciBruteForce(n - 2);
}

/**
 * Approach 2: Memoization (Top-Down Dynamic Programming)
 *
 * This approach optimizes the brute-force recursion by storing the results of expensive function calls
 * and returning the cached result when the same inputs occur again. This avoids re-calculating the
 * same Fibonacci numbers multiple times.
 *
 * Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed only once.
 * Space Complexity: O(n) - For the memoization table (cache) and the recursion stack.
 *
 * @param {number} n The index of the Fibonacci number to find.
 * @param {Object<number, number>} memo An object used as a cache for storing computed Fibonacci numbers.
 * @returns {number} The nth Fibonacci number.
 */
function fibonacciMemoization(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }
    if (n <= 1) {
        return n;
    }
    memo[n] = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);
    return memo[n];
}

/**
 * Approach 3: Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds the solution iteratively from the base cases up to the desired 'n'.
 * It uses an array (DP table) to store results of subproblems.
 *
 * Time Complexity: O(n) - A single loop runs 'n' times.
 * Space Complexity: O(n) - For the DP table.
 *
 * @param {number} n The index of the Fibonacci number to find.
 * @returns {number} The nth Fibonacci number.
 */
function fibonacciTabulation(n) {
    if (n <= 1) {
        return n;
    }

    // dp[i] will store the i-th Fibonacci number
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

/**
 * Approach 4: Space-Optimized Tabulation
 *
 * This approach further optimizes the tabulation method by observing that to calculate F(i),
 * we only need F(i-1) and F(i-2). Thus, we only need to store the two previous numbers,
 * reducing space complexity from O(n) to O(1).
 *
 * Time Complexity: O(n) - A single loop runs 'n' times.
 * Space Complexity: O(1) - Only a constant number of variables are used.
 *
 * @param {number} n The index of the Fibonacci number to find.
 * @returns {number} The nth Fibonacci number.
 */
function fibonacciSpaceOptimized(n) {
    if (n <= 1) {
        return n;
    }

    let a = 0; // Represents F(i-2)
    let b = 1; // Represents F(i-1)
    let currentFib = 0;

    // Iterate from 2 to n
    for (let i = 2; i <= n; i++) {
        currentFib = a + b; // F(i) = F(i-2) + F(i-1)
        a = b;              // Update a to be the previous b
        b = currentFib;     // Update b to be the current F(i)
    }

    return currentFib;
}

module.exports = {
    fibonacciBruteForce,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized,
};
```