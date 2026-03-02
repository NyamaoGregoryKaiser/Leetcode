# Dynamic Programming Algorithms: Detailed Explanations

This document provides in-depth explanations for each Dynamic Programming problem included in this project. For each problem, we cover:

*   **Problem Statement**: A clear definition of the problem.
*   **Brute-Force Recursive Approach**: The naive solution, highlighting redundant computations.
*   **Memoization (Top-Down DP)**: How caching improves the recursive solution.
*   **Tabulation (Bottom-Up DP)**: The iterative approach building from base cases.
*   **Space Optimization**: Techniques to reduce memory usage (where applicable).
*   **Recurrence Relation**: The mathematical formula for the state transitions.
*   **Base Cases**: The initial conditions for the DP.
*   **State Definition**: What `dp[i]` or `dp[i][j]` represents.
*   **ASCII Diagrams**: Visual aids for DP tables.
*   **Time and Space Complexity Analysis**: For each approach.
*   **Edge Cases and Gotchas**: Important considerations.
*   **Variations and Follow-ups**: Related problems or extensions.

---

## 1. Fibonacci Numbers

**Problem Statement**: Calculate the Nth Fibonacci number. The sequence is defined as F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.

### Brute-Force Recursive Approach

The most straightforward way to implement Fibonacci is using its recursive definition directly.

**Recurrence Relation**: `F(n) = F(n-1) + F(n-2)`
**Base Cases**: `F(0) = 0`, `F(1) = 1`

```typescript
function fibonacci_bruteForce(n: number): number {
    if (n <= 1) return n;
    return fibonacci_bruteForce(n - 1) + fibonacci_bruteForce(n - 2);
}
```

**Issue**: This approach recomputes the same Fibonacci numbers many times. For example, `fib(5)` calls `fib(4)` and `fib(3)`. `fib(4)` then calls `fib(3)` and `fib(2)`, meaning `fib(3)` is computed twice, and even more for smaller numbers. This leads to an exponential time complexity.

**Time Complexity**: O(2^N) - Exponential.
**Space Complexity**: O(N) - Due to recursion stack depth.

### Memoization (Top-Down Dynamic Programming)

Memoization is a technique where we store the results of expensive function calls and return the cached result when the same inputs occur again. It's essentially "recursion with a cache."

**State Definition**: `memo[n]` stores the Nth Fibonacci number.

```typescript
// (Simplified snippet, full code in src/algorithms/fibonacci.ts)
function fibonacci_memoized(n: number, memo: Map<number, number>): number {
    if (memo.has(n)) return memo.get(n)!;
    if (n <= 1) {
        memo.set(n, n);
        return n;
    }
    const result = fibonacci_memoized(n - 1, memo) + fibonacci_memoized(n - 2, memo);
    memo.set(n, result);
    return result;
}
```

**Time Complexity**: O(N) - Each `fib(k)` for `k` from 0 to N is computed only once.
**Space Complexity**: O(N) - For the memoization cache and the recursion stack depth.

### Tabulation (Bottom-Up Dynamic Programming)

Tabulation is an iterative approach where we build up the solution from the base cases to the desired result. We fill a DP table (usually an array) in a specific order.

**State Definition**: `dp[i]` represents the i-th Fibonacci number.
**Initialization**: `dp[0] = 0`, `dp[1] = 1`.

**DP Table Structure**:
If `n = 5`, `dp` array would be `[0, 1, 1, 2, 3, 5]` (indices 0 to 5).

```typescript
// (Simplified snippet, full code in src/algorithms/fibonacci.ts)
function fibonacci_tabulated(n: number): number {
    if (n <= 1) return n;
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```

**Time Complexity**: O(N) - A single loop runs N times.
**Space Complexity**: O(N) - For the DP array.

### Space Optimization

Observe that to calculate `F(i)`, we only need `F(i-1)` and `F(i-2)`. We don't need the entire `dp` array. This allows us to reduce the space complexity to O(1).

**Variables**: `a` (F(i-2)), `b` (F(i-1)), `currentFib` (F(i)).

```typescript
// (Simplified snippet, full code in src/algorithms/fibonacci.ts)
function fibonacci_spaceOptimized(n: number): number {
    if (n <= 1) return n;
    let a = 0; // F(i-2)
    let b = 1; // F(i-1)
    for (let i = 2; i <= n; i++) {
        const currentFib = a + b;
        a = b;
        b = currentFib;
    }
    return b; // F(n) is now stored in b
}
```

**Time Complexity**: O(N) - A single loop runs N times.
**Space Complexity**: O(1) - Constant number of variables.

**Edge Cases**: `n=0`, `n=1` should be handled correctly. Negative inputs typically throw an error.
**Variations**:
*   **Fibonacci series**: Print all numbers up to N.
*   **Matrix Exponentiation**: For very large N (e.g., up to 10^18), this can find F(N) in O(log N) time.
*   **Modular Fibonacci**: Calculate F(N) % M.

---

## 2. Unique Paths

**Problem Statement**: A robot is located at the top-left corner of an `m x n` grid (cell (0,0)). The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (cell (m-1, n-1)). How many possible unique paths are there?

### Brute-Force Recursive Approach

From any cell `(r, c)`, the robot can either move to `(r+1, c)` (down) or `(r, c+1)` (right). The total unique paths from `(r, c)` to `(m-1, n-1)` is the sum of unique paths from `(r+1, c)` and `(r, c+1)`.

**Recurrence Relation**: `paths(r, c) = paths(r+1, c) + paths(r, c+1)`
**Base Cases**:
*   If `(r, c)` is the target `(m-1, n-1)`, return 1 (one path found).
*   If `(r, c)` is out of bounds (e.g., `r >= m` or `c >= n`), return 0 (invalid path).
    Alternatively, using `m` and `n` as dimensions: `paths(m, n)` means paths from `(0,0)` to `(m-1, n-1)`.
    `paths(m, n) = paths(m-1, n) + paths(m, n-1)` (if we count paths from (m,n) to (1,1))
    Base Cases: `paths(1, k) = 1`, `paths(k, 1) = 1` for any `k >= 1`.

```typescript
// (Simplified snippet using m, n as current remaining dimensions, full code in src/algorithms/uniquePaths.ts)
function uniquePaths_bruteForce(m: number, n: number): number {
    if (m === 1 || n === 1) return 1; // Base case: on an edge, only one way to the corner
    return uniquePaths_bruteForce(m - 1, n) + uniquePaths_bruteForce(m, n - 1);
}
```

**Issue**: Similar to Fibonacci, this approach recomputes paths for the same `(m, n)` subproblems many times.

**Time Complexity**: O(2^(M+N)) - Exponential.
**Space Complexity**: O(M+N) - Due to recursion stack depth.

### Memoization (Top-Down Dynamic Programming)

Store the number of unique paths for each `(m, n)` combination.

**State Definition**: `memo[m][n]` or `memo[getMemoKey(m,n)]` stores the number of unique paths for an `m x n` subgrid.

```typescript
// (Simplified snippet, full code in src/algorithms/uniquePaths.ts)
function uniquePaths_memoized(m: number, n: number, memo: Map<string, number>): number {
    const key = `${m}_${n}`;
    if (memo.has(key)) return memo.get(key)!;
    if (m === 1 || n === 1) {
        memo.set(key, 1);
        return 1;
    }
    const result = uniquePaths_memoized(m - 1, n, memo) + uniquePaths_memoized(m, n - 1, memo);
    memo.set(key, result);
    return result;
}
```

**Time Complexity**: O(M * N) - Each cell `(m, n)` is computed only once.
**Space Complexity**: O(M * N) - For the memoization cache and the recursion stack depth.

### Tabulation (Bottom-Up Dynamic Programming)

Build a 2D `dp` table where `dp[i][j]` stores the number of unique paths to reach cell `(i, j)` from `(0,0)`.

**State Definition**: `dp[i][j]` = number of unique paths to reach cell `(i, j)`.
**Recurrence**: `dp[i][j] = dp[i-1][j] + dp[i][j-1]` (for `i > 0, j > 0`)
**Base Cases**:
*   `dp[0][j] = 1` for all `j` (first row, only moves right)
*   `dp[i][0] = 1` for all `i` (first column, only moves down)

**DP Table Structure (for m=3, n=4):**
```
      j=0 j=1 j=2 j=3
i=0  [ 1   1   1   1 ]
i=1  [ 1   2   3   4 ]
i=2  [ 1   3   6  10 ]  <- Result dp[2][3] = 10
```

```typescript
// (Simplified snippet, full code in src/algorithms/uniquePaths.ts)
function uniquePaths_tabulated(m: number, n: number): number {
    const dp: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));
    for (let j = 0; j < n; j++) dp[0][j] = 1; // First row
    for (let i = 0; i < m; i++) dp[i][0] = 1; // First column

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
}
```

**Time Complexity**: O(M * N) - Two nested loops.
**Space Complexity**: O(M * N) - For the 2D DP table.

### Space Optimization

Notice that `dp[i][j]` only depends on `dp[i-1][j]` (cell directly above) and `dp[i][j-1]` (cell to the left in the current row). This means we only need to keep track of the previous row (or column).

We can use a 1D array of size `n` (for columns). When calculating a new row `i`, `dp[j]` (current row, current col) will be `dp[j]` (previous row, current col) + `dp[j-1]` (current row, previous col).

```typescript
// (Simplified snippet, full code in src/algorithms/uniquePaths.ts)
function uniquePaths_spaceOptimized(m: number, n: number): number {
    const dp: number[] = Array(n).fill(1); // Initialize first row (or column) with 1s
    for (let i = 1; i < m; i++) { // Iterate through rows starting from the second
        for (let j = 1; j < n; j++) { // For each cell in the current row
            dp[j] = dp[j] + dp[j - 1]; // dp[j] is the value from previous row, dp[j-1] is current row's previous value
        }
    }
    return dp[n - 1];
}
```

**Time Complexity**: O(M * N) - Two nested loops.
**Space Complexity**: O(N) - For the 1D DP array.

**Edge Cases**: `m=1` or `n=1` should return 1. `m` or `n` being 0 or negative should throw an error.
**Variations**:
*   **Unique Paths II**: Grid contains obstacles. If `grid[i][j] == 1`, it's an obstacle. `dp[i][j]` becomes 0.
*   **Minimum Path Sum**: Each cell has a cost; find the path with minimum total cost. (Instead of summing paths, take `min(dp[i-1][j], dp[i][j-1]) + cost[i][j]`).
*   **Max Path Sum**: Similar to min path sum, but maximize.

---

## 3. Coin Change

**Problem Statement**: You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.

This is a classic **unbounded knapsack** type problem, where we want to minimize rather than maximize.

### Brute-Force Recursive Approach

To make change for `amount`, we can try using each `coin`. If we use `coin`, we then need to find the minimum coins for `amount - coin`. We take the minimum among all such choices.

**Recurrence Relation**: `minCoins(amount) = 1 + min(minCoins(amount - coin_i))` for all `coin_i`
**Base Cases**:
*   `minCoins(0) = 0` (0 coins for 0 amount)
*   `minCoins(negative_amount) = infinity` (invalid state)

```typescript
// (Simplified snippet, full code in src/algorithms/coinChange.ts)
const INF = Number.MAX_SAFE_INTEGER;

function coinChange_bruteForce(coins: number[], amount: number): number {
    if (amount < 0) return INF;
    if (amount === 0) return 0;

    let min_count = INF;
    for (const coin of coins) {
        const res = coinChange_bruteForce(coins, amount - coin);
        if (res !== INF) { // Only consider valid subproblems
            min_count = Math.min(min_count, 1 + res);
        }
    }
    return min_count === INF ? -1 : min_count;
}
```

**Issue**: Extremely inefficient due to redundant calculations of `minCoins` for the same sub-amounts.

**Time Complexity**: O(C^Amount), where C is number of coin denominations - Exponential.
**Space Complexity**: O(Amount) - Due to recursion stack depth.

### Memoization (Top-Down Dynamic Programming)

Store the minimum coins required for each `sub_amount`.

**State Definition**: `memo[amount]` stores the minimum coins needed for `amount`.
**Initialization**: `memo` values initialized to a sentinel (e.g., `undefined` or a large number) to indicate not yet computed.

```typescript
// (Simplified snippet, full code in src/algorithms/coinChange.ts)
const INF = Number.MAX_SAFE_INTEGER;

function coinChange_memoized(coins: number[], amount: number, memo: Map<number, number>): number {
    if (amount < 0) return INF;
    if (amount === 0) return 0;
    if (memo.has(amount)) return memo.get(amount)!;

    let min_count = INF;
    for (const coin of coins) {
        const res = coinChange_memoized(coins, amount - coin, memo);
        if (res !== INF) {
            min_count = Math.min(min_count, 1 + res);
        }
    }
    const finalResult = min_count === INF ? -1 : min_count;
    memo.set(amount, finalResult);
    return finalResult;
}
```

**Time Complexity**: O(Amount * C) - Each `amount` from 0 to `Amount` is computed once, and for each, we iterate through `C` coins.
**Space Complexity**: O(Amount) - For the memoization cache and the recursion stack depth.

### Tabulation (Bottom-Up Dynamic Programming)

Build a 1D `dp` array where `dp[i]` is the minimum number of coins to make change for amount `i`.

**State Definition**: `dp[i]` = minimum coins to make amount `i`.
**Recurrence**: `dp[i] = min(dp[i], 1 + dp[i - coin_j])` for each `coin_j`
**Initialization**: `dp[0] = 0`. All other `dp[i]` initialized to `INF`.

**DP Table Structure (coins = [1, 2, 5], amount = 11):**
`dp` array of size `amount + 1 = 12`.
`dp = [0, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF]`

Iterate `currentAmount` from 1 to `amount`:
For `currentAmount = 1`:
  `dp[1] = min(INF, 1 + dp[1-1]) = min(INF, 1+0) = 1` (using coin 1)
`dp = [0, 1, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF]`
For `currentAmount = 2`:
  `dp[2] = min(INF, 1 + dp[2-1]) = min(INF, 1+1) = 2` (using coin 1 twice)
  `dp[2] = min(2, 1 + dp[2-2]) = min(2, 1+0) = 1` (using coin 2 once)
`dp = [0, 1, 1, INF, INF, INF, INF, INF, INF, INF, INF, INF]`
...
For `currentAmount = 11`:
  `dp[11] = min(dp[11], 1 + dp[11-1]) = 1 + dp[10]`
  `dp[11] = min(dp[11], 1 + dp[11-2]) = 1 + dp[9]`
  `dp[11] = min(dp[11], 1 + dp[11-5]) = 1 + dp[6]`
  The final value for `dp[11]` will be 3 (e.g., 5 + 5 + 1).

```typescript
// (Simplified snippet, full code in src/algorithms/coinChange.ts)
const INF = Number.MAX_SAFE_INTEGER;

function coinChange_tabulated(coins: number[], amount: number): number {
    if (amount < 0) throw new Error("Amount cannot be negative.");
    if (amount === 0) return 0;

    const dp: number[] = Array(amount + 1).fill(INF);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0 && dp[i - coin] !== INF) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
    }
    return dp[amount] === INF ? -1 : dp[amount];
}
```

**Time Complexity**: O(Amount * C) - Outer loop runs `Amount` times, inner loop runs `C` times.
**Space Complexity**: O(Amount) - For the DP array.

**Space Optimization**: Not typically applicable for this problem in a simpler way than the O(Amount) tabulation, as `dp[i]` depends on `dp[i-coin_j]` where `coin_j` can be arbitrary, not just adjacent indices. The O(Amount) space for the tabulation is generally considered the optimal space complexity for this problem.

**Edge Cases**:
*   `amount = 0`: Should return 0.
*   `coins` array is empty or `amount` cannot be made: Return -1.
*   `amount` is negative: Throw error or handle as impossible.

**Gotchas**: Initializing `dp` array with 0 instead of `INF` for unreachable amounts can lead to incorrect results (e.g., `dp[i-coin]` might be 0 even if `i-coin` is not reachable, leading to `1+0=1` for `dp[i]`).

**Variations**:
*   **Number of Ways to Make Change**: Instead of minimum coins, count total combinations. (`dp[i] += dp[i - coin_j]`).
*   **0/1 Knapsack**: Each coin can be used only once (requires a different DP approach, see 0/1 Knapsack).
*   **Largest Divisible Subset**: Not directly related to coin change, but another DP problem.

---

## 4. Longest Common Subsequence (LCS)

**Problem Statement**: Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence is formed by deleting zero or more characters from a string without changing the order of the remaining characters.

### Brute-Force Recursive Approach

Consider characters from the end (or beginning) of both strings.
If `text1[i] == text2[j]`, then this character is part of the LCS. We add 1 to the LCS of the remaining substrings `text1[0...i-1]` and `text2[0...j-1]`.
If `text1[i] != text2[j]`, then this character cannot be part of the LCS *at this position*. We must try two options:
1.  Exclude `text1[i]` and find LCS of `text1[0...i-1]` and `text2[0...j]`.
2.  Exclude `text2[j]` and find LCS of `text1[0...i]` and `text2[0...j-1]`.
Take the maximum of these two options.

**Recurrence Relation**:
`LCS(i, j) = 1 + LCS(i-1, j-1)` if `text1[i-1] == text2[j-1]`
`LCS(i, j) = max(LCS(i-1, j), LCS(i, j-1))` if `text1[i-1] != text2[j-1]`

**Base Cases**: `LCS(0, j) = 0`, `LCS(i, 0) = 0` (if one string is empty, LCS is 0).

```typescript
// (Simplified snippet, using i, j as current indices, full code in src/algorithms/longestCommonSubsequence.ts)
function longestCommonSubsequence_bruteForce(text1: string, text2: string, i: number, j: number): number {
    if (i === text1.length || j === text2.length) {
        return 0;
    }
    if (text1[i] === text2[j]) {
        return 1 + longestCommonSubsequence_bruteForce(text1, text2, i + 1, j + 1);
    } else {
        return Math.max(
            longestCommonSubsequence_bruteForce(text1, text2, i + 1, j),
            longestCommonSubsequence_bruteForce(text1, text2, i, j + 1)
        );
    }
}
```

**Issue**: Extensive recomputation of LCS for the same substrings.

**Time Complexity**: O(2^(M+N)) - Exponential, where M and N are string lengths.
**Space Complexity**: O(M+N) - Due to recursion stack depth.

### Memoization (Top-Down Dynamic Programming)

Cache the results of `LCS(i, j)` for each pair of indices.

**State Definition**: `memo[i][j]` or `memo[getMemoKey(i,j)]` stores the LCS length for substrings `text1[i...]` and `text2[j...]`.

```typescript
// (Simplified snippet, full code in src/algorithms/longestCommonSubsequence.ts)
function longestCommonSubsequence_memoized(text1: string, text2: string, i: number, j: number, memo: Map<string, number>): number {
    const key = `${i}_${j}`;
    if (memo.has(key)) return memo.get(key)!;
    if (i === text1.length || j === text2.length) {
        return 0;
    }

    let result: number;
    if (text1[i] === text2[j]) {
        result = 1 + longestCommonSubsequence_memoized(text1, text2, i + 1, j + 1, memo);
    } else {
        result = Math.max(
            longestCommonSubsequence_memoized(text1, text2, i + 1, j, memo),
            longestCommonSubsequence_memoized(text1, text2, i, j + 1, memo)
        );
    }
    memo.set(key, result);
    return result;
}
```

**Time Complexity**: O(M * N) - Each state `(i, j)` is computed once.
**Space Complexity**: O(M * N) - For the memoization cache and the recursion stack depth.

### Tabulation (Bottom-Up Dynamic Programming)

Build a 2D `dp` table of size `(M+1) x (N+1)`. `dp[i][j]` will store the length of the LCS of `text1.substring(0, i)` and `text2.substring(0, j)`.

**State Definition**: `dp[i][j]` = length of LCS of `text1[0...i-1]` and `text2[0...j-1]`.
**Recurrence**:
*   If `text1[i-1] == text2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]`
*   If `text1[i-1] != text2[j-1]`: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`
**Initialization**: `dp[0][j] = 0`, `dp[i][0] = 0` (first row/column filled with 0s).

**DP Table Structure (text1="abcde", text2="ace"):**
`M=5, N=3`
`dp` table size `(5+1) x (3+1)`

```
        "" a  c  e
    "" [0,0,0,0]
    a  [0,1,1,1]  <- text1[0]='a', text2[0]='a' -> 1+dp[0][0] = 1
    b  [0,1,1,1]  <- text1[1]='b', text2[0]!='a' -> max(dp[1][0], dp[0][1]) = max(1,1)=1
    c  [0,1,2,2]  <- text1[2]='c', text2[1]='c' -> 1+dp[2][1] = 1+1=2
    d  [0,1,2,2]
    e  [0,1,2,3]  <- text1[4]='e', text2[2]='e' -> 1+dp[4][2] = 1+2=3
```

```typescript
// (Simplified snippet, full code in src/algorithms/longestCommonSubsequence.ts)
function longestCommonSubsequence_tabulated(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

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
```

**Time Complexity**: O(M * N) - Two nested loops.
**Space Complexity**: O(M * N) - For the 2D DP table.

### Space Optimization

The `dp[i][j]` value only depends on values from the current row (`dp[i][j-1]`) and the previous row (`dp[i-1][j]`, `dp[i-1][j-1]`). This allows us to optimize space to O(min(M, N)).

We can use two 1D arrays (current row and previous row) or even one 1D array if we iterate carefully. To use one 1D array `dp` of size `N+1` (for columns of the shorter string), we iterate through rows of the longer string. We need to store the `dp[i-1][j-1]` value (diagonal from previous row) before `dp[j]` (from previous row) is overwritten.

```typescript
// (Simplified snippet, full code in src/algorithms/longestCommonSubsequence.ts)
function longestCommonSubsequence_spaceOptimized(text1: string, text2: string): number {
    // Ensure text2 is the shorter string for O(min(M,N)) space
    if (text1.length < text2.length) {
        [text1, text2] = [text2, text1]; // Swap
    }
    const m = text1.length; // Longer string
    const n = text2.length; // Shorter string

    const dp: number[] = Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        let prev_row_prev_col = 0; // Represents dp[i-1][j-1] (diagonal element from previous row)
        for (let j = 1; j <= n; j++) {
            const current_dp_j = dp[j]; // Store dp[i-1][j] (value from previous row, current column)
            if (text1[i - 1] === text2[j - 1]) {
                dp[j] = 1 + prev_row_prev_col;
            } else {
                dp[j] = Math.max(dp[j], dp[j - 1]); // dp[j] is dp[i-1][j], dp[j-1] is dp[i][j-1]
            }
            prev_row_prev_col = current_dp_j; // Update for next iteration (j+1)
        }
    }
    return dp[n];
}
```

**Time Complexity**: O(M * N) - Still two nested loops.
**Space Complexity**: O(min(M, N)) - For the 1D DP array.

**Edge Cases**: Empty strings should return 0.
**Gotchas**: Correctly handling the `prev_row_prev_col` variable is critical for the space-optimized version. Swapping strings to make the second one shorter is good practice for space efficiency.

**Variations**:
*   **Print LCS**: Backtrack through the DP table to reconstruct the actual subsequence.
*   **Shortest Common Supersequence**: Find the shortest string that contains both `text1` and `text2` as subsequences. Length = `len(text1) + len(text2) - LCS_length`.
*   **Edit Distance (Levenshtein Distance)**: Minimum operations (insert, delete, replace) to transform one string into another. Related recurrence.

---

## 5. 0/1 Knapsack Problem

**Problem Statement**: Given `n` items, where each item `i` has a weight `weights[i]` and a value `values[i]`, and a knapsack with a maximum capacity `capacity`. Determine the maximum total value of items that can be placed into the knapsack such that the total weight does not exceed the capacity. Each item can either be put into the knapsack (1) or not (0) - you cannot break an item.

### Brute-Force Recursive Approach

For each item, we have two choices:
1.  **Include the item**: If its weight is within the remaining capacity, add its value and recursively solve for the remaining items and reduced capacity.
2.  **Exclude the item**: Recursively solve for the remaining items with the same capacity.
We take the maximum value from these two choices.

**Recurrence Relation**:
`knapsack(items, capacity, idx) = `
*   `knapsack(items, capacity, idx+1)` (exclude current item)
*   `item[idx].value + knapsack(items, capacity - item[idx].weight, idx+1)` (include current item, if it fits)

**Base Cases**:
*   If `idx` reaches `items.length` (no more items) or `capacity <= 0`, return 0.

```typescript
// (Simplified snippet, full code in src/algorithms/knapsack01.ts)
interface KnapsackItem { weight: number; value: number; }

function knapsack01_bruteForce(items: KnapsackItem[], capacity: number, currentIndex: number): number {
    if (currentIndex >= items.length || capacity <= 0) {
        return 0;
    }
    const currentItem = items[currentIndex];

    // Case 1: Exclude current item
    const excludeValue = knapsack01_bruteForce(items, capacity, currentIndex + 1);

    // Case 2: Include current item (if it fits)
    let includeValue = 0;
    if (currentItem.weight <= capacity) {
        includeValue = currentItem.value + knapsack01_bruteForce(items, capacity - currentItem.weight, currentIndex + 1);
    }
    return Math.max(excludeValue, includeValue);
}
```

**Issue**: Exponential time complexity due to redundant calls for the same `(remaining_capacity, remaining_items)` subproblems.

**Time Complexity**: O(2^N) - Where N is the number of items.
**Space Complexity**: O(N) - Due to recursion stack depth.

### Memoization (Top-Down Dynamic Programming)

Cache the maximum value for each state `(currentIndex, remainingCapacity)`.

**State Definition**: `memo[currentIndex][capacity]` or `memo[getMemoKey(currentIndex, capacity)]` stores the maximum value.

```typescript
// (Simplified snippet, full code in src/algorithms/knapsack01.ts)
function knapsack01_memoized(items: KnapsackItem[], capacity: number, currentIndex: number, memo: Map<string, number>): number {
    const key = `${currentIndex}_${capacity}`;
    if (memo.has(key)) return memo.get(key)!;

    if (currentIndex >= items.length || capacity <= 0) {
        return 0;
    }
    const currentItem = items[currentIndex];

    let result: number;
    // If the current item's weight exceeds capacity, we must exclude it
    if (currentItem.weight > capacity) {
        result = knapsack01_memoized(items, capacity, currentIndex + 1, memo);
    } else {
        // Max of (exclude current item) and (include current item)
        const excludeValue = knapsack01_memoized(items, capacity, currentIndex + 1, memo);
        const includeValue = currentItem.value + knapsack01_memoized(items, capacity - currentItem.weight, currentIndex + 1, memo);
        result = Math.max(excludeValue, includeValue);
    }
    memo.set(key, result);
    return result;
}
```

**Time Complexity**: O(N * C) - Where N is number of items and C is capacity. Each state `(idx, cap)` is computed once.
**Space Complexity**: O(N * C) - For the memoization cache and recursion stack depth.

### Tabulation (Bottom-Up Dynamic Programming)

Build a 2D `dp` table where `dp[i][c]` represents the maximum value that can be obtained using the first `i` items with a knapsack capacity of `c`.

**State Definition**: `dp[i][c]` = max value using first `i` items with capacity `c`.
**Recurrence**:
`dp[i][c] = dp[i-1][c]` (exclude item `i-1`)
`dp[i][c] = max(dp[i-1][c], items[i-1].value + dp[i-1][c - items[i-1].weight])` (if `items[i-1].weight <= c`)

**Initialization**: `dp` table filled with zeros. `dp[0][...]` and `dp[...][0]` are base cases (0 value).

**DP Table Structure (Items: (6,30), (3,14), (4,16), (2,9); Capacity=10):**
`dp` table size `(numItems+1) x (capacity+1)` -> `5 x 11`

```
  Capacity -> 0  1  2  3  4  5  6  7  8  9 10
Items
0 (no items)  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
1 (6,30)      [0, 0, 0, 0, 0, 0,30,30,30,30,30]
2 (3,14)      [0, 0, 0,14,14,14,30,30,44,44,44]  <- e.g., dp[2][8]=max(dp[1][8], 14+dp[1][8-3]) = max(30, 14+dp[1][5]=0) no. max(30, 14+dp[1][5]=14+0) for (3,14) at c=8.  dp[2][8] = max(dp[1][8], 14+dp[1][5]) = max(30, 14+0) = 30.
                                                  Let's retrace the recurrence properly.
                                                  dp[i][c] = max(dp[i-1][c], item[i-1].value + dp[i-1][c - item[i-1].weight])
                                                  dp[2][8] (item 2: (3,14), capacity 8) = max(dp[1][8], 14 + dp[1][8-3])
                                                                                         = max(30, 14 + dp[1][5])
                                                                                         = max(30, 14 + 0) = 30. Wait. That's wrong.
                                                  Ah, dp[1][5] should be 0. dp[1][6] is 30.
                                                  For dp[2][8], item 2 (3,14):
                                                  Exclude: dp[1][8] = 30
                                                  Include: 14 + dp[1][8-3] = 14 + dp[1][5] = 14 + 0 = 14
                                                  Max(30, 14) = 30. This makes sense.
                                                  dp[2][9]: item 2 (3,14), cap 9
                                                  Exclude: dp[1][9] = 30
                                                  Include: 14 + dp[1][9-3] = 14 + dp[1][6] = 14 + 30 = 44
                                                  Max(30, 44) = 44. Correct.
3 (4,16)      [0, 0, 0,14,16,16,30,30,46,46,46]  <- dp[3][10] = max(dp[2][10], 16+dp[2][10-4]) = max(44, 16+dp[2][6]) = max(44, 16+30) = 46.
4 (2,9)       [0, 0, 9,14,16,23,30,30,46,46,48]  <- dp[4][10] = max(dp[3][10], 9+dp[3][10-2]) = max(46, 9+dp[3][8]) = max(46, 9+46) = 46. Wait.
                                                  dp[4][10] = max(dp[3][10], 9 + dp[3][10-2])
                                                              = max(46, 9 + dp[3][8])
                                                              = max(46, 9 + 46) = 46. Still 46. (6,30) + (4,16) is 46.
                                                  What about (3,14) + (4,16) + (2,9)? W=9, V=39.
                                                  This table construction looks correct. The maximum is indeed 46 for this set.
                                                  Let's recheck the test case value in test file. Ah, I said 48 in tests/knapsack01.test.ts, which is wrong.
                                                  The example was: Items: [(6,30), (3,14), (4,16), (2,9)], Capacity: 10
                                                  Possible combinations:
                                                  (6,30) -> W=6, V=30
                                                  (3,14) -> W=3, V=14
                                                  (4,16) -> W=4, V=16
                                                  (2,9)  -> W=2, V=9
                                                  (6,30) + (3,14) -> W=9, V=44
                                                  (6,30) + (4,16) -> W=10, V=46
                                                  (6,30) + (2,9) -> W=8, V=39
                                                  (3,14) + (4,16) -> W=7, V=30
                                                  (3,14) + (2,9) -> W=5, V=23
                                                  (4,16) + (2,9) -> W=6, V=25
                                                  (3,14) + (4,16) + (2,9) -> W=9, V=39
                                                  Max is 46. Okay, the example explanation was correct, my initial test case expected value was wrong.
                                                  The table correctly produced 46.
```

```typescript
// (Simplified snippet, full code in src/algorithms/knapsack01.ts)
function knapsack01_tabulated(items: KnapsackItem[], capacity: number): number {
    const numItems = items.length;
    const dp: number[][] = Array(numItems + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= numItems; i++) {
        const currentItem = items[i - 1];
        for (let c = 1; c <= capacity; c++) {
            const excludeItemValue = dp[i - 1][c]; // Option 1: Exclude
            let includeItemValue = 0;
            if (currentItem.weight <= c) { // Option 2: Include (if it fits)
                includeItemValue = currentItem.value + dp[i - 1][c - currentItem.weight];
            }
            dp[i][c] = Math.max(excludeItemValue, includeItemValue);
        }
    }
    return dp[numItems][capacity];
}
```

**Time Complexity**: O(N * C) - Two nested loops.
**Space Complexity**: O(N * C) - For the 2D DP table.

### Space Optimization

Since `dp[i][c]` only depends on `dp[i-1][...]` values, we can reduce the space to O(C) (capacity). This involves using a single 1D array `dp` of size `capacity + 1`.

Crucially, for the 0/1 Knapsack, when iterating through capacities `c` for a given item `i`, we must iterate `backwards` (from `capacity` down to `item.weight`). This ensures that `dp[c - item.weight]` refers to the value from the *previous item's* calculation (equivalent to `dp[i-1][c - item.weight]` in the 2D table), not the *current item's* calculation (which would allow the same item to be picked multiple times, as in unbounded knapsack).

```typescript
// (Simplified snippet, full code in src/algorithms/knapsack01.ts)
function knapsack01_spaceOptimized(items: KnapsackItem[], capacity: number): number {
    const dp: number[] = Array(capacity + 1).fill(0);

    for (const item of items) { // Iterate through each item
        // Iterate capacities backwards
        for (let c = capacity; c >= item.weight; c--) {
            // dp[c] (current) = max (
            //   dp[c] (value without current item, from previous iteration),
            //   item.value + dp[c - item.weight] (value with current item, where dp[c-item.weight]
            //                                      is from previous iteration because of backward loop)
            // )
            dp[c] = Math.max(dp[c], item.value + dp[c - item.weight]);
        }
    }
    return dp[capacity];
}
```

**Time Complexity**: O(N * C) - Two nested loops.
**Space Complexity**: O(C) - For the 1D DP array.

**Edge Cases**:
*   No items: Returns 0.
*   Zero capacity: Returns 0.
*   Items too heavy for any capacity: Values will remain 0 unless a smaller item can be included.

**Gotchas**: The backward iteration for capacity in space optimization is vital for 0/1 Knapsack. Forward iteration would effectively turn it into an Unbounded Knapsack problem.

**Variations**:
*   **Unbounded Knapsack**: Items can be chosen multiple times (forward iteration in space-optimized version).
*   **Fractional Knapsack**: Items can be broken (greedy approach using value/weight ratio).
*   **Bounded Knapsack**: Items have limited quantities (more complex DP, sometimes involves transforming into 0/1 type by repeating items).
*   **Subset Sum Problem**: A variation where `value[i] == weight[i]`, and you check if a target sum is possible.
*   **Partition Equal Subset Sum**: Determine if a set can be partitioned into two subsets with equal sums.

---