/**
 * @fileoverview Implementations of the Fibonacci Sequence problem using various Dynamic Programming techniques.
 * Fibonacci numbers are defined by the recurrence relation: F(n) = F(n-1) + F(n-2), with F(0)=0 and F(1)=1.
 */

/**
 * --- Problem Description ---
 * Calculate the n-th Fibonacci number. The sequence starts with F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.
 *
 * Example:
 * fib(0) = 0
 * fib(1) = 1
 * fib(2) = 1 (F(1) + F(0))
 * fib(3) = 2 (F(2) + F(1))
 * fib(4) = 3 (F(3) + F(2))
 * fib(5) = 5 (F(4) + F(3))
 */

/**
 * 1. Brute Force (Recursive)
 * This approach directly implements the recursive definition of Fibonacci.
 * It suffers from redundant calculations of overlapping subproblems.
 *
 * @param {number} n The index of the Fibonacci number to calculate.
 * @returns {number} The n-th Fibonacci number.
 *
 * Time Complexity: O(2^n) - Each call makes two more calls, leading to an exponential growth in calls.
 * Space Complexity: O(n) - Due to the recursion stack depth.
 */
function fibonacci_brute_force(n) {
    if (n < 0) {
        throw new Error("Input cannot be negative.");
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fibonacci_brute_force(n - 1) + fibonacci_brute_force(n - 2);
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 * This approach uses recursion but stores the results of expensive function calls
 * and returns the cached result when the same inputs occur again, avoiding redundant computations.
 *
 * @param {number} n The index of the Fibonacci number to calculate.
 * @param {Object<number, number>} memo A map to store already computed Fibonacci numbers.
 * @returns {number} The n-th Fibonacci number.
 *
 * Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed only once.
 * Space Complexity: O(n) - For the memoization table (map) and the recursion stack.
 */
function fibonacci_memo(n, memo = {}) {
    if (n < 0) {
        throw new Error("Input cannot be negative.");
    }
    if (n in memo) {
        return memo[n];
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // Store result in memo before returning
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo);
    return memo[n];
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 * This approach builds up the solution iteratively by solving smaller subproblems first
 * and storing their results in a table (array).
 *
 * @param {number} n The index of the Fibonacci number to calculate.
 * @returns {number} The n-th Fibonacci number.
 *
 * Time Complexity: O(n) - A single loop runs 'n' times.
 * Space Complexity: O(n) - An array of size 'n+1' is used to store results.
 */
function fibonacci_tab(n) {
    if (n < 0) {
        throw new Error("Input cannot be negative.");
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    // dp[i] will store the i-th Fibonacci number
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    // Fill the dp table from 2 up to n
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

/**
 * 4. Tabulation with Space Optimization
 * This approach further optimizes the tabulation method by observing that to compute F(i),
 * we only need F(i-1) and F(i-2). Thus, we can reduce the space complexity to O(1)
 * by only storing the two previous Fibonacci numbers.
 *
 * @param {number} n The index of the Fibonacci number to calculate.
 * @returns {number} The n-th Fibonacci number.
 *
 * Time Complexity: O(n) - A single loop runs 'n' times.
 * Space Complexity: O(1) - Only a constant number of variables are used.
 */
function fibonacci_tab_optimized(n) {
    if (n < 0) {
        throw new Error("Input cannot be negative.");
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    let a = 0; // Represents dp[i-2]
    let b = 1; // Represents dp[i-1]
    let currentFib = 0;

    // Loop from 2 up to n
    for (let i = 2; i <= n; i++) {
        currentFib = a + b; // currentFib = dp[i] = dp[i-2] + dp[i-1]
        a = b;              // Update a to become the previous b (dp[i-1])
        b = currentFib;     // Update b to become the currentFib (dp[i])
    }

    return currentFib;
}


module.exports = {
    fibonacci_brute_force,
    fibonacci_memo,
    fibonacci_tab,
    fibonacci_tab_optimized
};