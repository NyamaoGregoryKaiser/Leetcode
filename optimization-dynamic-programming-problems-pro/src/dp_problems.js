```javascript
/**
 * src/dp_problems.js
 *
 * This file contains implementations for several classic Dynamic Programming (DP) problems.
 * For each problem, multiple approaches are provided:
 * 1.  **Recursive (Brute-Force)**: The straightforward recursive solution, often inefficient due to redundant calculations.
 * 2.  **Memoization (Top-Down DP)**: An optimized recursive approach that caches results of subproblems.
 * 3.  **Tabulation (Bottom-Up DP)**: An iterative approach that builds up solutions from base cases.
 * 4.  **Space-Optimized Tabulation**: A further optimized iterative approach that reduces memory usage where possible.
 *
 * Each function includes detailed comments on logic, time complexity, and space complexity.
 */

// --- 1. Fibonacci Number ---
/**
 * Problem: Given an integer n, return the n-th Fibonacci number.
 * F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.
 */

/**
 * Fibonacci: Recursive (Brute-Force)
 *
 * Time Complexity: O(2^n) - Exponential, due to recalculating the same subproblems many times.
 *                  Imagine a call tree: F(5) -> F(4), F(3); F(4) -> F(3), F(2); F(3) is calculated twice.
 * Space Complexity: O(n) - Due to the recursion call stack depth.
 *
 * @param {number} n The index of the Fibonacci number to calculate.
 * @returns {number} The n-th Fibonacci number.
 */
function fibonacciRecursive(n) {
    // Base cases for the Fibonacci sequence
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // Recursive step: F(n) = F(n-1) + F(n-2)
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

/**
 * Fibonacci: Memoization (Top-Down Dynamic Programming)
 *
 * Memoization stores the results of expensive function calls and returns the cached result
 * when the same inputs occur again. This avoids redundant computations.
 *
 * Time Complexity: O(n) - Each Fibonacci number from 0 to n is computed only once.
 * Space Complexity: O(n) - For the memo (cache) and the recursion call stack.
 *
 * @param {number} n The index of the Fibonacci number to calculate.
 * @param {Map<number, number>} memo A map to store already computed Fibonacci numbers (defaults to a new Map).
 * @returns {number} The n-th Fibonacci number.
 */
function fibonacciMemoization(n, memo = new Map()) {
    // Base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // If the result for 'n' is already in memo, return it
    if (memo.has(n)) {
        return memo.get(n);
    }

    // Compute the result and store it in memo before returning
    const result = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);
    memo.set(n, result);
    return result;
}

/**
 * Fibonacci: Tabulation (Bottom-Up Dynamic Programming)
 *
 * Tabulation solves the problem iteratively by filling up a DP table (array)
 * from the base cases to the desired solution.
 *
 * Time Complexity: O(n) - A single loop runs 'n' times.
 * Space Complexity: O(n) - For the `dp` array.
 *
 * @param {number} n The index of the Fibonacci number to calculate.
 * @returns {number} The n-th Fibonacci number.
 */
function fibonacciTabulation(n) {
    // Handle base cases for n=0 and n=1 directly
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // Create a DP array to store Fibonacci numbers
    // dp[i] will store the i-th Fibonacci number
    const dp = new Array(n + 1);

    // Initialize base cases in the DP array
    dp[0] = 0;
    dp[1] = 1;

    // Fill the DP array iteratively from 2 up to n
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    // The result is the value at dp[n]
    return dp[n];
}

/**
 * Fibonacci: Space-Optimized Tabulation
 *
 * This approach reduces the space complexity of tabulation by noticing that
 * we only need the two previous values to compute the current one.
 *
 * Time Complexity: O(n) - A single loop runs 'n' times.
 * Space Complexity: O(1) - Only a constant number of variables are used.
 *
 * @param {number} n The index of the Fibonacci number to calculate.
 * @returns {number} The n-th Fibonacci number.
 */
function fibonacciSpaceOptimized(n) {
    // Handle base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // Initialize two variables to hold the last two Fibonacci numbers
    let a = 0; // Represents F(i-2)
    let b = 1; // Represents F(i-1)
    let currentFib = 0;

    // Iterate from 2 up to n
    for (let i = 2; i <= n; i++) {
        // Current Fibonacci number is the sum of the previous two
        currentFib = a + b;
        // Update 'a' and 'b' for the next iteration
        a = b;
        b = currentFib;
    }

    // After the loop, 'b' holds the n-th Fibonacci number
    return b;
}

// --- 2. Climbing Stairs ---
/**
 * Problem: You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 * This is a classic Fibonacci-like problem.
 */

/**
 * Climbing Stairs: Recursive (Brute-Force)
 *
 * Time Complexity: O(2^n) - Exponential, similar to Fibonacci.
 * Space Complexity: O(n) - Due to the recursion call stack depth.
 *
 * @param {number} n The number of steps to reach the top.
 * @returns {number} The number of distinct ways to climb to the top.
 */
function climbStairsRecursive(n) {
    // Base cases:
    // If there are no steps, there's 1 way (do nothing).
    if (n === 0) return 1;
    // If there's 1 step, there's 1 way (take 1 step).
    if (n === 1) return 1;
    // If there are 2 steps, there are 2 ways (1+1 or 2 steps).
    // The recursive formula climbStairs(1) + climbStairs(0) would give 1 + 1 = 2, so it works.

    // Recursive step: The total ways to reach step 'n' is the sum of ways to reach 'n-1'
    // (then take 1 step) and ways to reach 'n-2' (then take 2 steps).
    return climbStairsRecursive(n - 1) + climbStairsRecursive(n - 2);
}

/**
 * Climbing Stairs: Memoization (Top-Down Dynamic Programming)
 *
 * Time Complexity: O(n) - Each subproblem is solved once.
 * Space Complexity: O(n) - For the memo cache and recursion call stack.
 *
 * @param {number} n The number of steps.
 * @param {Map<number, number>} memo A map to store computed results.
 * @returns {number} The number of distinct ways.
 */
function climbStairsMemoization(n, memo = new Map()) {
    // Base cases
    if (n === 0) return 1;
    if (n === 1) return 1;

    // If result is already computed, return it
    if (memo.has(n)) {
        return memo.get(n);
    }

    // Compute result, store in memo, then return
    const result = climbStairsMemoization(n - 1, memo) + climbStairsMemoization(n - 2, memo);
    memo.set(n, result);
    return result;
}

/**
 * Climbing Stairs: Tabulation (Bottom-Up Dynamic Programming)
 *
 * Time Complexity: O(n) - Single loop.
 * Space Complexity: O(n) - For the `dp` array.
 *
 * @param {number} n The number of steps.
 * @returns {number} The number of distinct ways.
 */
function climbStairsTabulation(n) {
    // Handle small base cases
    if (n <= 0) return 1; // 1 way to climb 0 steps (do nothing)
    if (n === 1) return 1; // 1 way to climb 1 step (1)

    // dp[i] will store the number of ways to reach step 'i'
    const dp = new Array(n + 1);

    // Initialize base cases
    dp[0] = 1; // 1 way to reach step 0
    dp[1] = 1; // 1 way to reach step 1

    // Fill the DP array from 2 up to n
    for (let i = 2; i <= n; i++) {
        // Ways to reach step 'i' = (ways to reach i-1) + (ways to reach i-2)
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    // The result is the number of ways to reach step 'n'
    return dp[n];
}

/**
 * Climbing Stairs: Space-Optimized Tabulation
 *
 * Time Complexity: O(n) - Single loop.
 * Space Complexity: O(1) - Constant number of variables.
 *
 * @param {number} n The number of steps.
 * @returns {number} The number of distinct ways.
 */
function climbStairsSpaceOptimized(n) {
    // Handle base cases
    if (n <= 0) return 1;
    if (n === 1) return 1;

    // Initialize two variables to hold the ways to reach the last two steps
    let prev2 = 1; // Ways to reach step (i-2)
    let prev1 = 1; // Ways to reach step (i-1)
    let currentWays = 0;

    // Iterate from step 2 up to n
    for (let i = 2; i <= n; i++) {
        // Ways to reach current step 'i' is the sum of ways to reach 'i-1' and 'i-2'
        currentWays = prev1 + prev2;
        // Update for the next iteration
        prev2 = prev1;
        prev1 = currentWays;
    }

    // 'prev1' now holds the ways to reach step 'n'
    return prev1;
}

// --- 3. Longest Common Subsequence (LCS) ---
/**
 * Problem: Given two strings text1 and text2, return the length of their longest common subsequence.
 * A subsequence is a sequence that can be derived from another sequence by deleting some or no characters
 * without changing the order of the remaining characters.
 */

/**
 * LCS: Recursive (Brute-Force)
 *
 * Time Complexity: O(2^(m+n)) - Exponential, where m and n are lengths of strings.
 * Space Complexity: O(m+n) - Due to recursion call stack depth.
 *
 * @param {string} text1 The first string.
 * @param {string} text2 The second string.
 * @param {number} [idx1=0] Current index in text1.
 * @param {number} [idx2=0] Current index in text2.
 * @returns {number} The length of the LCS.
 */
function lcsRecursive(text1, text2, idx1 = 0, idx2 = 0) {
    // Base case: If either string is exhausted, no more common characters can be found.
    if (idx1 === text1.length || idx2 === text2.length) {
        return 0;
    }

    // If characters match, they are part of the LCS. Increment count and move to next characters in both strings.
    if (text1[idx1] === text2[idx2]) {
        return 1 + lcsRecursive(text1, text2, idx1 + 1, idx2 + 1);
    } else {
        // If characters don't match, we have two choices:
        // 1. Skip character in text1 and try to find LCS with remaining text1 and current text2.
        // 2. Skip character in text2 and try to find LCS with current text1 and remaining text2.
        // We take the maximum of these two options.
        const option1 = lcsRecursive(text1, text2, idx1 + 1, idx2);
        const option2 = lcsRecursive(text1, text2, idx1, idx2 + 1);
        return Math.max(option1, option2);
    }
}

/**
 * LCS: Memoization (Top-Down Dynamic Programming)
 *
 * Time Complexity: O(m*n) - Each state (idx1, idx2) is computed once.
 * Space Complexity: O(m*n) - For the memo cache (2D array/map) and recursion call stack.
 *
 * @param {string} text1 The first string.
 * @param {string} text2 The second string.
 * @param {number} [idx1=0] Current index in text1.
 * @param {number} [idx2=0] Current index in text2.
 * @param {Array<Array<number>>} memo A 2D array to store computed results. Initialized with -1.
 * @returns {number} The length of the LCS.
 */
function lcsMemoization(text1, text2, idx1 = 0, idx2 = 0, memo = null) {
    // Initialize memo table if it's the first call
    if (memo === null) {
        memo = Array(text1.length + 1).fill(null).map(() => Array(text2.length + 1).fill(-1));
    }

    // Base case
    if (idx1 === text1.length || idx2 === text2.length) {
        return 0;
    }

    // Check if result is already computed
    if (memo[idx1][idx2] !== -1) {
        return memo[idx1][idx2];
    }

    let result;
    if (text1[idx1] === text2[idx2]) {
        // Characters match: Add 1 and recurse for next characters in both strings
        result = 1 + lcsMemoization(text1, text2, idx1 + 1, idx2 + 1, memo);
    } else {
        // Characters don't match: Try skipping char in text1 OR skipping char in text2
        const option1 = lcsMemoization(text1, text2, idx1 + 1, idx2, memo);
        const option2 = lcsMemoization(text1, text2, idx1, idx2 + 1, memo);
        result = Math.max(option1, option2);
    }

    // Store result in memo and return
    memo[idx1][idx2] = result;
    return result;
}

/**
 * LCS: Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds a 2D DP table `dp[i][j]` representing the length of the LCS
 * of `text1.substring(0, i)` and `text2.substring(0, j)`.
 *
 * Time Complexity: O(m*n) - Two nested loops iterate m*n times.
 * Space Complexity: O(m*n) - For the `dp` 2D array.
 *
 * @param {string} text1 The first string.
 * @param {string} text2 The second string.
 * @returns {number} The length of the LCS.
 */
function lcsTabulation(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // dp[i][j] will store the length of LCS of text1[0...i-1] and text2[0...j-1]
    // We use (m+1) x (n+1) size to handle empty string cases (base cases at row/col 0)
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Fill the dp table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If characters match, take 1 + LCS of previous substrings
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters don't match, take max of (LCS skipping char in text1)
                // or (LCS skipping char in text2)
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // The result is in the bottom-right cell of the DP table
    return dp[m][n];
}

// NOTE: LCS Space-Optimized Tabulation is possible, but slightly more complex
// and typically uses only two rows (current and previous) of the DP table.
// For simplicity and clarity in an interview setting, the 2D tabulation is often preferred
// unless explicitly asked for space optimization. It's O(min(m,n)) space.
// It will not be implemented here to keep the focus on standard DP forms, but mentionable.


// --- 4. 0/1 Knapsack Problem ---
/**
 * Problem: Given weights and values of n items, put these items in a knapsack
 * of capacity W to get the maximum total value. You can't break an item.
 */

/**
 * Knapsack: Recursive (Brute-Force)
 *
 * Time Complexity: O(2^n) - For each item, we have two choices (include or exclude), leading to exponential growth.
 * Space Complexity: O(n) - Due to the recursion call stack depth.
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @param {number} n The number of items currently considered (initially, total number of items).
 * @returns {number} The maximum value that can be obtained.
 */
function knapsackRecursive(weights, values, capacity, n) {
    // Base cases:
    // If no items are left or knapsack capacity is 0, no value can be obtained.
    if (n === 0 || capacity === 0) {
        return 0;
    }

    // If the weight of the n-th item is more than the knapsack capacity,
    // this item cannot be included. So, we consider the remaining n-1 items.
    if (weights[n - 1] > capacity) {
        return knapsackRecursive(weights, values, capacity, n - 1);
    } else {
        // If the n-th item can be included, we have two options:
        // 1. Include the n-th item: Add its value and recurse with remaining capacity and n-1 items.
        // 2. Exclude the n-th item: Recurse with same capacity and n-1 items.
        // We choose the option that yields maximum value.
        const includeItem = values[n - 1] + knapsackRecursive(weights, values, capacity - weights[n - 1], n - 1);
        const excludeItem = knapsackRecursive(weights, values, capacity, n - 1);
        return Math.max(includeItem, excludeItem);
    }
}

/**
 * Knapsack: Memoization (Top-Down Dynamic Programming)
 *
 * We need a 2D memo table `dp[i][j]` to store the maximum value for `i` items
 * and `j` capacity.
 *
 * Time Complexity: O(n*W) - Each state (number of items, capacity) is computed once.
 * Space Complexity: O(n*W) - For the memo table and recursion call stack.
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @param {number} n The number of items currently considered.
 * @param {Array<Array<number>>} memo A 2D array for memoization, initialized with -1.
 * @returns {number} The maximum value that can be obtained.
 */
function knapsackMemoization(weights, values, capacity, n, memo = null) {
    // Initialize memo table on the first call
    if (memo === null) {
        // dp[i][j] will store max value with 'i' items and capacity 'j'
        memo = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(-1));
    }

    // Base cases
    if (n === 0 || capacity === 0) {
        return 0;
    }

    // If the result is already computed, return it
    if (memo[n][capacity] !== -1) {
        return memo[n][capacity];
    }

    let result;
    // If current item's weight is more than current capacity, we cannot include it
    if (weights[n - 1] > capacity) {
        result = knapsackMemoization(weights, values, capacity, n - 1, memo);
    } else {
        // Otherwise, we have two choices:
        // 1. Include the item: add its value and recurse for remaining capacity and items
        const includeItem = values[n - 1] + knapsackMemoization(weights, values, capacity - weights[n - 1], n - 1, memo);
        // 2. Exclude the item: recurse for same capacity and remaining items
        const excludeItem = knapsackMemoization(weights, values, capacity, n - 1, memo);
        result = Math.max(includeItem, excludeItem);
    }

    // Store the computed result in memo and return
    memo[n][capacity] = result;
    return result;
}

/**
 * Knapsack: Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds a 2D DP table `dp[i][j]` where `dp[i][j]` represents
 * the maximum value that can be obtained using the first `i` items with a knapsack
 * capacity of `j`.
 *
 * Time Complexity: O(n*W) - Two nested loops iterate n*W times.
 * Space Complexity: O(n*W) - For the `dp` 2D array.
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @returns {number} The maximum value that can be obtained.
 */
function knapsackTabulation(weights, values, capacity) {
    const n = weights.length;

    // dp[i][j] will store the maximum value achievable with 'i' items and capacity 'j'
    // dp table size will be (n+1) x (capacity+1)
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    // Build dp table in a bottom-up manner
    // i represents the number of items considered (from 1 to n)
    for (let i = 1; i <= n; i++) {
        // w represents the current knapsack capacity (from 0 to W)
        for (let w = 0; w <= capacity; w++) {
            // Get weight and value of the current item (i-1 because arrays are 0-indexed)
            const currentWeight = weights[i - 1];
            const currentValue = values[i - 1];

            // Option 1: If current item's weight is less than or equal to current capacity
            if (currentWeight <= w) {
                // We have two choices:
                // a) Include the current item: value of current item + max value from (i-1) items with remaining capacity (w - currentWeight)
                const takeItem = currentValue + dp[i - 1][w - currentWeight];
                // b) Exclude the current item: max value from (i-1) items with the same capacity 'w'
                const skipItem = dp[i - 1][w];
                // Take the maximum of these two choices
                dp[i][w] = Math.max(takeItem, skipItem);
            } else {
                // Option 2: Current item's weight is greater than current capacity, so we cannot include it.
                // The max value is the same as with (i-1) items and the same capacity.
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // The result is in the bottom-right cell of the DP table
    return dp[n][capacity];
}

/**
 * Knapsack: Space-Optimized Tabulation (1D DP Array)
 *
 * This approach reduces the space complexity of tabulation to O(W) by observing
 * that `dp[i][w]` only depends on `dp[i-1][...]`. We can use a single 1D array
 * `dp[w]` representing the max value for capacity `w`.
 * Crucially, to ensure `dp[i-1]` values are used for `dp[i]`, we must iterate
 * the capacity `w` loop in **reverse order**.
 *
 * Time Complexity: O(n*W) - Two nested loops iterate n*W times.
 * Space Complexity: O(W) - For the `dp` 1D array.
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @returns {number} The maximum value that can be obtained.
 */
function knapsackSpaceOptimized(weights, values, capacity) {
    const n = weights.length;

    // dp[w] will store the maximum value achievable with capacity 'w' using items considered so far.
    const dp = Array(capacity + 1).fill(0);

    // Iterate through each item
    for (let i = 0; i < n; i++) {
        const currentWeight = weights[i];
        const currentValue = values[i];

        // Iterate capacity from `capacity` down to `currentWeight`.
        // Iterating in reverse is crucial. If we iterate forward,
        // dp[w - currentWeight] would have already been updated with the current item,
        // effectively making it a 0/unbounded knapsack (allowing multiple takes of the same item).
        for (let w = capacity; w >= currentWeight; w--) {
            // Option 1: Take the current item.
            // Value will be (current item's value) + (max value for remaining capacity `w - currentWeight` from *previous* items).
            // `dp[w - currentWeight]` still holds the value from considering *previous* items because we are iterating backwards.
            const takeItem = currentValue + dp[w - currentWeight];

            // Option 2: Don't take the current item.
            // Value is simply the max value for capacity `w` using *previous* items, which is `dp[w]`.
            const skipItem = dp[w];

            dp[w] = Math.max(takeItem, skipItem);
        }
    }

    // The result is the max value for the full knapsack capacity
    return dp[capacity];
}


// Export all functions for testing and benchmarking
module.exports = {
    fibonacciRecursive,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized,
    climbStairsRecursive,
    climbStairsMemoization,
    climbStairsTabulation,
    climbStairsSpaceOptimized,
    lcsRecursive,
    lcsMemoization,
    lcsTabulation,
    knapsackRecursive,
    knapsackMemoization,
    knapsackTabulation,
    knapsackSpaceOptimized
};
```