# Dynamic Programming Guide: A Comprehensive Interview Prep

Dynamic Programming (DP) is a powerful technique for solving complex problems by breaking them down into simpler overlapping subproblems and storing the results of these subproblems to avoid redundant computations. It's a fundamental concept in algorithm design and frequently appears in coding interviews.

## Table of Contents

1.  [What is Dynamic Programming?](#1-what-is-dynamic-programming)
2.  [Key Principles](#2-key-principles)
    *   [2.1 Optimal Substructure](#21-optimal-substructure)
    *   [2.2 Overlapping Subproblems](#22-overlapping-subproblems)
3.  [Techniques](#3-techniques)
    *   [3.1 Memoization (Top-Down DP)](#31-memoization-top-down-dp)
    *   [3.2 Tabulation (Bottom-Up DP)](#32-tabulation-bottom-up-dp)
    *   [3.3 Space Optimization](#33-space-optimization)
4.  [Common DP Patterns](#4-common-dp-patterns)
    *   [4.1 Linear DP](#41-linear-dp)
    *   [4.2 Grid DP](#42-grid-dp)
    *   [4.3 Knapsack DP](#43-knapsack-dp)
    *   [4.4 String DP](#44-string-dp)
5.  [Detailed Problem Explanations](#5-detailed-problem-explanations)
    *   [5.1 Fibonacci Sequence](#51-fibonacci-sequence)
    *   [5.2 Coin Change (Minimum Coins)](#52-coin-change-minimum-coins)
    *   [5.3 Longest Common Subsequence (LCS)](#53-longest-common-subsequence-lcs)
    *   [5.4 0/1 Knapsack Problem](#54-01-knapsack-problem)
    *   [5.5 Unique Paths](#55-unique-paths)
6.  [Edge Cases and Gotchas](#6-edge-cases-and-gotchas)
7.  [Interview Tips and Variations](#7-interview-tips-and-variations)

---

## 1. What is Dynamic Programming?

Dynamic Programming is an algorithmic paradigm that solves a problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions. The next time the same subproblem occurs, instead of recomputing its solution, we simply look up the previously computed solution.

The term "Dynamic Programming" was coined by Richard Bellman in the 1950s. It might sound complex, but the core idea is quite intuitive: **don't repeat work you've already done.**

## 2. Key Principles

Two properties must be present for a problem to be solvable by Dynamic Programming:

### 2.1 Optimal Substructure

A problem has optimal substructure if an optimal solution to the problem can be constructed from optimal solutions of its subproblems.
*   **Example:** The shortest path between two nodes in a graph has optimal substructure. If `X` is on the shortest path from `U` to `V`, then the path from `U` to `X` and `X` to `V` must also be shortest paths.
*   **Non-Example:** The longest path in a general graph (without cycles) does NOT necessarily have optimal substructure.

### 2.2 Overlapping Subproblems

A problem has overlapping subproblems if the same subproblems are computed multiple times when a recursive solution is attempted. DP solves this by storing the results of subproblems to avoid recomputing them.
*   **Example:** Calculating `Fib(5)` requires `Fib(4)` and `Fib(3)`. `Fib(4)` requires `Fib(3)` and `Fib(2)`. `Fib(3)` is computed twice.
*   **Non-Example:** Merge Sort recursively sorts two halves of an array. The subproblems (sorting sub-arrays) are distinct and do not overlap.

## 3. Techniques

There are two primary ways to implement a DP solution:

### 3.1 Memoization (Top-Down DP)

*   **Concept:** This is a "top-down" approach. We start with the original problem and recursively break it down into subproblems. We store the results of solved subproblems in a cache (e.g., a hash map or an array) so that if we encounter the same subproblem again, we can return the cached result directly.
*   **Analogy:** You're solving a complex puzzle. When you solve a smaller part of it, you write down the solution in a notebook. If you later encounter that exact same small part, you just look it up in your notebook instead of solving it again.
*   **Implementation:** Typically involves a recursive function with a cache (memo object/map).
*   **Pros:**
    *   Often more intuitive to write, as it mirrors the natural recursive structure of the problem.
    *   Only necessary subproblems are computed (lazy evaluation).
*   **Cons:**
    *   Can suffer from recursion stack overflow for very large inputs if not tail-call optimized (which JavaScript engines typically don't guarantee for arbitrary recursion).
    *   Overhead of recursion.

### 3.2 Tabulation (Bottom-Up DP)

*   **Concept:** This is a "bottom-up" approach. We start by solving the smallest, most fundamental subproblems first and then use those solutions to build up the solution to larger subproblems, eventually reaching the original problem.
*   **Analogy:** Instead of starting from the top of the puzzle, you identify all the smallest pieces, solve them first, and then combine them to form slightly larger pieces, and so on, until the whole puzzle is complete.
*   **Implementation:** Typically involves an iterative loop (or nested loops) filling a DP table (usually an array or 2D array).
*   **Pros:**
    *   No recursion overhead, generally faster in practice.
    *   Avoids stack overflow issues.
*   **Cons:**
    *   Can be less intuitive to formulate, as it requires thinking about the order of solving subproblems.
    *   May compute solutions for subproblems that are not strictly necessary if the DP table is filled entirely.

### 3.3 Space Optimization

Often, when computing `dp[i]`, we only need the results from a few preceding states (e.g., `dp[i-1]`, `dp[i-2]`). In such cases, the entire DP table doesn't need to be stored. We can reduce the space complexity by only keeping track of the necessary previous states, often turning an `O(N)` or `O(M*N)` space solution into `O(1)` or `O(N)` respectively.

## 4. Common DP Patterns

DP problems often fall into certain categories:

### 4.1 Linear DP

Problems where the state depends on previous `k` states, typically solved with a 1D DP array.
*   **Examples:** Fibonacci, Coin Change, House Robber, Maximum Subarray Sum.

### 4.2 Grid DP

Problems involving a grid or matrix, where the state `dp[i][j]` depends on adjacent cells `dp[i-1][j]`, `dp[i][j-1]`, `dp[i-1][j-1]`.
*   **Examples:** Unique Paths, Minimum Path Sum, Longest Increasing Path in a Matrix.

### 4.3 Knapsack DP

Problems where you need to choose items to maximize value given a capacity constraint.
*   **0/1 Knapsack:** Each item can be taken or left (0 or 1 instance).
*   **Unbounded Knapsack:** Each item can be taken multiple times.
*   **Examples:** 0/1 Knapsack, Coin Change (unbounded, finding minimum coins or ways).

### 4.4 String DP

Problems involving operations on strings, where `dp[i][j]` often relates to substrings.
*   **Examples:** Longest Common Subsequence, Edit Distance, Palindromic Substrings.

## 5. Detailed Problem Explanations

Let's dive into the problems implemented in this project with more detail.

### 5.1 Fibonacci Sequence

**Problem:** Given an integer `n`, return the `n`-th Fibonacci number. `F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)` for `n > 1`.

**Optimal Substructure:** `F(n)` is optimally composed of `F(n-1)` and `F(n-2)`.
**Overlapping Subproblems:** `F(3)` is computed multiple times in a naive recursive call for `F(5)`.

#### Brute-Force Recursive (Naive)
```javascript
function fibonacciBruteForce(n) {
    if (n <= 1) return n;
    return fibonacciBruteForce(n - 1) + fibonacciBruteForce(n - 2);
}
// Time: O(2^n), Space: O(n) (recursion stack)
```
**Diagram (for F(4)):**
```
          fib(4)
         /      \
    fib(3)      fib(2)
   /    \      /    \
fib(2)  fib(1) fib(1) fib(0)
 /  \     |     |     |
fib(1) fib(0)   1     1     0
  |     |
  1     0
```
Notice `fib(2)` and `fib(1)` are computed multiple times.

#### Memoization (Top-Down DP)
We use a `memo` object to store computed `F(n)` values.
```javascript
function fibonacciMemoization(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);
    return memo[n];
}
// Time: O(n), Space: O(n) (memo + recursion stack)
```
**Diagram (for F(4) with memoization):**
```
          fib(4)
         /      \
    fib(3)      fib(2) -- (calculated once, then looked up)
   /    \
fib(2)  fib(1)
 /  \     |
fib(1) fib(0)   <-- base cases reached, results stored
```
Each unique `fib(k)` is computed only once.

#### Tabulation (Bottom-Up DP)
We build an array `dp` from `0` to `n`.
```javascript
function fibonacciTabulation(n) {
    if (n <= 1) return n;
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
// Time: O(n), Space: O(n) (DP table)
```
**DP Table (for F(7)):**
```
Index: | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7  |
Value: | 0 | 1 | 1 | 2 | 3 | 5 | 8 | 13 |
```

#### Space-Optimized Tabulation
Observe that `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`. We only need to store the two previous values.
```javascript
function fibonacciSpaceOptimized(n) {
    if (n <= 1) return n;
    let a = 0; // F(i-2)
    let b = 1; // F(i-1)
    let currentFib = 0;
    for (let i = 2; i <= n; i++) {
        currentFib = a + b;
        a = b;
        b = currentFib;
    }
    return currentFib;
}
// Time: O(n), Space: O(1)
```

### 5.2 Coin Change (Minimum Coins)

**Problem:** Given `coins` (denominations) and an `amount`, find the minimum number of coins to make the `amount`. Return -1 if impossible. Infinite supply of coins.

**Optimal Substructure:** The minimum coins for `amount` is `1 + min(minimum_coins(amount - coin_i))` for all `coin_i`.
**Overlapping Subproblems:** Calculating `minCoins(11)` might involve `minCoins(6)` and `minCoins(9)`, both of which might further involve `minCoins(4)`, `minCoins(1)`, etc.

#### Tabulation (Bottom-Up DP)
`dp[i]` stores the minimum coins for amount `i`.
```javascript
function coinChangeTabulation(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1); // Initialize with "infinity"
    dp[0] = 0; // Base case: 0 coins for amount 0

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0) { // If current coin can be used
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
// Time: O(amount * num_coins), Space: O(amount)
```
**DP Table (for coins = [1, 2, 5], amount = 11):**
```
Amount (i): | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
dp[i]:      | 0 | 1 | 1 | 2 | 2 | 1 | 2 | 2 | 3 | 3 | 2  | 3  |

Example: Calculate dp[7]
- Start with dp[7] = Infinity
- coin = 1: dp[7] = min(Inf, dp[6]+1) = min(Inf, 2+1) = 3
- coin = 2: dp[7] = min(3, dp[5]+1) = min(3, 1+1) = 2
- coin = 5: dp[7] = min(2, dp[2]+1) = min(2, 1+1) = 2
Result for dp[7] is 2.
```

### 5.3 Longest Common Subsequence (LCS)

**Problem:** Given two strings `text1` and `text2`, find the length of their longest common subsequence.

**Optimal Substructure:**
*   If `text1[i] == text2[j]`, then `LCS(i, j) = 1 + LCS(i-1, j-1)`.
*   If `text1[i] != text2[j]`, then `LCS(i, j) = max(LCS(i-1, j), LCS(i, j-1))`.
**Overlapping Subproblems:** Many `LCS(i, j)` calls with the same `i` and `j` occur.

#### Tabulation (Bottom-Up DP)
`dp[i][j]` stores the LCS length of `text1[0...i-1]` and `text2[0...j-1]`.
```javascript
function longestCommonSubsequenceTabulation(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
// Time: O(m * n), Space: O(m * n)
```
**DP Table (for text1 = "abcde", text2 = "ace"):**
```
      "" a c e
   ""  0 0 0 0
   a   0 1 1 1
   b   0 1 1 1
   c   0 1 2 2
   d   0 1 2 2
   e   0 1 2 3
```
*   `dp[1][1]` (`a` vs `a`): match, `1 + dp[0][0] = 1`.
*   `dp[3][2]` (`c` vs `c`): match, `1 + dp[2][1] = 1 + 1 = 2`.
*   `dp[5][3]` (`e` vs `e`): match, `1 + dp[4][2] = 1 + 2 = 3`. Final answer.

### 5.4 0/1 Knapsack Problem

**Problem:** Given `weights`, `values` for `N` items, and `capacity` `W`. Maximize total value. Each item can be taken once or not at all.

**Optimal Substructure:** For item `i` and capacity `w`:
*   `knapsack(i, w) = knapsack(i+1, w)` (don't include item `i`)
*   `knapsack(i, w) = values[i] + knapsack(i+1, w - weights[i])` (include item `i`, if it fits)
We take the maximum of these two options.
**Overlapping Subproblems:** The same subproblems (max value for `(remaining_items, remaining_capacity)`) are computed repeatedly.

#### Tabulation (Bottom-Up DP)
`dp[i][w]` is max value using first `i` items with capacity `w`.
```javascript
function knapsack01Tabulation(weights, values, capacity) {
    const N = weights.length;
    const dp = Array(N + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= N; i++) {
        const currentItemWeight = weights[i - 1];
        const currentItemValue = values[i - 1];
        for (let w = 1; w <= capacity; w++) {
            if (currentItemWeight <= w) {
                // max(exclude current, include current)
                dp[i][w] = Math.max(dp[i - 1][w], currentItemValue + dp[i - 1][w - currentItemWeight]);
            } else {
                // cannot include current
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[N][capacity];
}
// Time: O(N * W), Space: O(N * W)
```
**DP Table (Weights: [10, 20, 30], Values: [60, 100, 120], Capacity: 50):**
```
      Capacity (w) ->
Items (i) \ 0  10  20  30  40  50
---------------------------------
0           0   0   0   0   0   0
1 (W:10,V:60) 0  60  60  60  60  60
2 (W:20,V:100)0  60 100 160 160 160 (max(dp[1][w], V[1]+dp[1][w-20]))
3 (W:30,V:120)0  60 100 160 180 220 (max(dp[2][w], V[2]+dp[2][w-30]))
```
For `dp[3][50]`: `max(dp[2][50], values[2] + dp[2][50-weights[2]])`
`max(160, 120 + dp[2][20])`
`max(160, 120 + 100) = max(160, 220) = 220`.

#### Space-Optimized Tabulation
Only the previous row is needed to compute the current row. We can use a 1D array by iterating `w` downwards.
```javascript
function knapsack01SpaceOptimized(weights, values, capacity) {
    const N = weights.length;
    const dp = Array(capacity + 1).fill(0);

    for (let i = 0; i < N; i++) { // Iterate through items
        const currentItemWeight = weights[i];
        const currentItemValue = values[i];
        // Iterate capacity downwards to use previous item's results correctly
        for (let w = capacity; w >= currentItemWeight; w--) {
            dp[w] = Math.max(dp[w], currentItemValue + dp[w - currentItemWeight]);
        }
    }
    return dp[capacity];
}
// Time: O(N * W), Space: O(W)
```

### 5.5 Unique Paths

**Problem:** Robot moves right or down in an `m x n` grid from top-left to bottom-right. How many unique paths?

**Optimal Substructure:** `paths(r, c) = paths(r+1, c) + paths(r, c+1)`.
**Overlapping Subproblems:** Many cells will have their paths to the destination calculated multiple times.

#### Tabulation (Bottom-Up DP)
`dp[r][c]` stores number of paths from `(r, c)` to `(m-1, n-1)`. Fill from bottom-right up.
```javascript
function uniquePathsTabulation(m, n) {
    const dp = Array(m).fill(0).map(() => Array(n).fill(0));

    for (let r = m - 1; r >= 0; r--) {
        for (let c = n - 1; c >= 0; c--) {
            if (r === m - 1 && c === n - 1) { // Destination
                dp[r][c] = 1;
            } else {
                const pathsDown = (r + 1 < m) ? dp[r + 1][c] : 0;
                const pathsRight = (c + 1 < n) ? dp[r][c + 1] : 0;
                dp[r][c] = pathsDown + pathsRight;
            }
        }
    }
    return dp[0][0]; // Paths from start (0,0)
}
// Time: O(m * n), Space: O(m * n)
```
**DP Table (for m=3, n=2):**
```
      Col: 0  1
Row:
0         3  1   <-- dp[0][0] = dp[1][0] + dp[0][1] = 2 + 1 = 3
1         2  1   <-- dp[1][0] = dp[2][0] + dp[1][1] = 1 + 1 = 2
2         1  1   <-- dp[2][0] = dp[3][0](0) + dp[2][1](1) = 1 (base case)
                  <-- dp[2][1] = 1 (destination)
```
Explanation:
`dp[2][1]` (bottom-right) is 1.
`dp[2][0]` (left of destination): can only go right to `dp[2][1]`, so 1 path.
`dp[1][1]` (above destination): can only go down to `dp[2][1]`, so 1 path.
`dp[1][0]`: `dp[2][0]` (down) + `dp[1][1]` (right) = `1 + 1 = 2`.
`dp[0][1]`: `dp[1][1]` (down) + `dp[0][2]` (right, out of bounds) = `1 + 0 = 1`.
`dp[0][0]`: `dp[1][0]` (down) + `dp[0][1]` (right) = `2 + 1 = 3`.

#### Space-Optimized Tabulation
To calculate `dp[r][c]`, we need `dp[r+1][c]` and `dp[r][c+1]`. If we iterate rows upwards, we only need the previous row's results and current row's right results. We can use a 1D array of size `n`.
```javascript
function uniquePathsSpaceOptimized(m, n) {
    const dp = Array(n).fill(1); // Initialize last row with 1s

    for (let r = m - 2; r >= 0; r--) { // Iterate rows from second-to-last up to first
        for (let c = n - 2; c >= 0; c--) { // Iterate columns from second-to-last left to first
            dp[c] = dp[c] + dp[c + 1]; // Current cell = cell below (old dp[c]) + cell right (new dp[c+1])
        }
    }
    return dp[0];
}
// Time: O(m * n), Space: O(n)
```

## 6. Edge Cases and Gotchas

*   **Base Cases:** Correctly identifying and initializing base cases is crucial for both memoization and tabulation. An incorrect base case can lead to infinite recursion or wrong results.
*   **Initialization with "Infinity":** For problems seeking minimums (like Coin Change), initialize DP array values with a sufficiently large number (e.g., `amount + 1` or `Infinity`) rather than `0` (which might be a valid answer).
*   **Off-by-One Errors:** When mapping array indices (`0` to `N-1`) to DP table dimensions (`1` to `N`), be careful with `i-1` or `j-1` to access correct characters/weights/values.
*   **Order of Iteration:** In tabulation, the loops must iterate in an order that ensures all necessary subproblems are solved *before* they are needed for larger problems. For example, in 0/1 Knapsack space-optimized, the inner loop for capacity must go downwards.
*   **State Definition:** Clearly define what `dp[i]` or `dp[i][j]` represents. Is it the answer for `n` items, or `n` items up to `i`? Is it the count from start to `(i,j)` or from `(i,j)` to end?
*   **Negative Values/Constraints:** Ensure inputs are within expected ranges. For example, negative amounts for coin change, or weights exceeding capacity, should be handled.
*   **Empty Inputs:** Test with empty strings, empty arrays, or zero capacities.

## 7. Interview Tips and Variations

*   **Identify DP Problems:** Look for problems with:
    *   **Optimization:** "Find the minimum/maximum...", "longest/shortest...", "count ways..."
    *   **Recursive Structure:** A problem that can be naturally broken down into smaller instances of the same problem.
    *   **Constraints:** Often involves integers and relatively small ranges that suggest polynomial time solutions (e.g., `N` up to 1000, `N*M` up to 10^5, `N^2` up to 10^6).
*   **Formulate the Recurrence Relation:** This is the heart of any DP problem. Define `dp(state)` in terms of `dp(smaller_states)`.
*   **Determine Base Cases:** What are the simplest states for which the answer is known immediately?
*   **Choose Memoization vs. Tabulation:**
    *   Start with memoization if the recurrence is complex or you're unsure of iteration order. It's often easier to reason about the recursive structure first.
    *   Switch to tabulation (bottom-up) if stack depth is a concern or if space optimization is possible. Tabulation often performs better.
*   **Consider Space Optimization:** After finding a working O(N*W) or O(M*N) solution, always ask if space can be reduced. Can you replace a 2D array with 1D, or a 1D array with a few variables?
*   **Practice, Practice, Practice:** DP is often tricky initially. The more problems you solve, the better you'll become at recognizing patterns and applying the techniques.
*   **Common Variations/Follow-ups:**
    *   **Reconstruct Path/Items:** Instead of just the length/value, return the actual sequence (e.g., LCS string, items chosen in Knapsack). This usually involves backtracking the DP table.
    *   **Counting Ways:** Instead of min/max, count the total number of ways to achieve something (e.g., total ways to make change, unique paths with obstacles).
    *   **Variations of Knapsack:** Unbounded Knapsack, Bounded Knapsack (multiple instances but limited), Fractional Knapsack (greedy, not DP).
    *   **Variations of Paths:** With obstacles, minimum cost path, paths with limited moves.

By understanding these concepts and practicing with the problems in this project, you'll be well-equipped to tackle Dynamic Programming challenges in your interviews.
---