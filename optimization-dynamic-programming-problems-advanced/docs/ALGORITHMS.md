```markdown
# ALGORITHMS.md - Detailed Algorithm Explanations

This document provides a deeper dive into the algorithmic concepts behind each Dynamic Programming problem implemented in this project. It covers the problem statement, recurrence relations, state definitions, base cases, step-by-step logic for various approaches, and a thorough analysis of time and space complexity.

---

## 1. Longest Common Subsequence (LCS)

**Problem Statement:**
Given two sequences (strings) `S1` and `S2`, find the length of the longest subsequence present in both of them. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Example:**
`S1 = "AGGTAB"`, `S2 = "GXTXAYB"`
LCS is `"GTAB"`, length = 4.

### 1.1. Brute Force Recursive Solution

**Approach:**
This is a direct recursive translation of the problem. We compare characters from the end of both strings.
1.  If the last characters match, they are part of the LCS. We add 1 to the result of the LCS of the remaining strings (excluding the last character of both).
2.  If the last characters don't match, we have two options:
    *   Find the LCS by excluding the last character of `S1`.
    *   Find the LCS by excluding the last character of `S2`.
    We take the maximum of these two options.

**Base Case:** If either string becomes empty, the LCS length is 0.

**Recurrence Relation:**
Let `LCS(S1[0...m-1], S2[0...n-1])` be the length of LCS of `S1` of length `m` and `S2` of length `n`.

*   If `m == 0` or `n == 0`: `LCS = 0`
*   If `S1[m-1] == S2[n-1]`: `LCS = 1 + LCS(S1[0...m-2], S2[0...n-2])`
*   If `S1[m-1] != S2[n-1]`: `LCS = Math.max(LCS(S1[0...m-2], S2[0...n-1]), LCS(S1[0...m-1], S2[0...n-2]))`

**Complexity Analysis:**
*   **Time Complexity:** O(2^(m+n)). In the worst case (e.g., no common characters), each call leads to two recursive calls, resulting in exponential time.
*   **Space Complexity:** O(m+n) due to the recursion stack depth.

### 1.2. Recursive Solution with Memoization (Top-Down DP)

**Approach:**
The brute-force solution suffers from redundant computations of overlapping subproblems. Memoization addresses this by storing the results of already computed subproblems in a DP table (e.g., `dp[m][n]`). Before computing `LCS(m, n)`, we check if `dp[m][n]` already holds a result. If so, we return it directly. Otherwise, we compute it using the recurrence relation and store the result.

**State Definition:** `dp[i][j]` represents the length of the LCS of `S1[0...i-1]` and `S2[0...j-1]`.
**Initialization:** `dp` table elements are initialized to a special value (e.g., -1) to indicate that the subproblem has not been computed yet.

**Complexity Analysis:**
*   **Time Complexity:** O(m*n). Each state `(i, j)` is computed only once. There are `m*n` states.
*   **Space Complexity:** O(m*n) for the memoization table, plus O(m+n) for the recursion stack depth.

### 1.3. Iterative Solution (Bottom-Up DP)

**Approach:**
This approach fills the `dp` table iteratively from the base cases up to the desired solution.
The `dp[i][j]` table stores the length of the LCS of `S1`'s prefix of length `i` and `S2`'s prefix of length `j`.

**State Definition:** Same as memoization: `dp[i][j]` stores the length of the LCS of `S1[0...i-1]` and `S2[0...j-1]`.

**Initialization:**
*   `dp[0][j] = 0` for all `j` (LCS with an empty `S1` prefix is 0).
*   `dp[i][0] = 0` for all `i` (LCS with an empty `S2` prefix is 0).

**Iteration:**
We iterate `i` from 1 to `m` and `j` from 1 to `n`.
*   If `S1.charAt(i-1) == S2.charAt(j-1)`:
    `dp[i][j] = 1 + dp[i-1][j-1]` (match, take diagonal previous)
*   Else (`S1.charAt(i-1) != S2.charAt(j-1)`):
    `dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])` (no match, take max from above or left)

The final answer is `dp[m][n]`.

**Complexity Analysis:**
*   **Time Complexity:** O(m*n). Two nested loops iterating through `m*n` states.
*   **Space Complexity:** O(m*n) for the 2D DP table.

### 1.4. Space-Optimized Iterative Solution

**Approach:**
Observe that in the iterative DP, to compute `dp[i][j]`, we only need values from the current row `(dp[i][j-1])` and the previous row `(dp[i-1][j], dp[i-1][j-1])`. This means we can optimize the space by only storing two rows: `prevRow` and `currRow`.

**State Definition:**
*   `prevRow[j]` stores `LCS(S1[0...i-2], S2[0...j-1])`
*   `currRow[j]` stores `LCS(S1[0...i-1], S2[0...j-1])`

**Iteration:**
We iterate `i` from 1 to `m`. Inside this loop, we calculate `currRow` based on `prevRow`. After `currRow` is fully computed for a given `i`, `prevRow` is updated to `currRow` for the next `i`.

*   Initialize `prevRow` and `currRow` as 1D arrays of size `n+1`.
*   For `i` from 1 to `m`:
    *   For `j` from 1 to `n`:
        *   If `S1.charAt(i-1) == S2.charAt(j-1)`:
            `currRow[j] = 1 + prevRow[j-1]`
        *   Else:
            `currRow[j] = Math.max(prevRow[j], currRow[j-1])`
    *   Copy `currRow` to `prevRow`.

The final answer will be in `currRow[n]` (or `prevRow[n]` after the last copy).

**Complexity Analysis:**
*   **Time Complexity:** O(m*n). Still two nested loops.
*   **Space Complexity:** O(n). We only use two 1D arrays of size `n+1`.

### 1.5. LCS Reconstruction

**Approach:**
To reconstruct the LCS string, we can backtrack through the filled `dp` table (from either memoized or iterative solution). Start from `dp[m][n]` and move towards `dp[0][0]`.

*   If `S1.charAt(i-1) == S2.charAt(j-1)`:
    This character is part of the LCS. Append `S1.charAt(i-1)` to the result and move diagonally up-left (`i--, j--`).
*   Else (`S1.charAt(i-1) != S2.charAt(j-1)`):
    Move to the cell that contributed to `dp[i][j]`'s value.
    *   If `dp[i-1][j] > dp[i][j-1]`: Move up (`i--`). This implies the character `S1[i-1]` was not part of the LCS for this subproblem.
    *   Else (`dp[i-1][j] <= dp[i][j-1]`): Move left (`j--`). This implies the character `S2[j-1]` was not part of the LCS for this subproblem.
    (Note: If `dp[i-1][j] == dp[i][j-1]`, either path is valid. Our implementation prioritizes `j--`.)

The characters are appended in reverse order, so the final string needs to be reversed.

**Complexity Analysis:**
*   **Time Complexity:** O(m+n). In the worst case, we traverse `m+n` cells diagonally or horizontally/vertically.
*   **Space Complexity:** O(m*n) to store the DP table (required for reconstruction) + O(LCS_length) for the string builder.

---

## 2. 0/1 Knapsack Problem

**Problem Statement:**
Given `N` items, each with a `weight[i]` and a `value[i]`, and a knapsack with a maximum `capacity W`. Determine the maximum total value of items that can be included in the knapsack such that the sum of their weights does not exceed `W`. Each item can either be taken (1) or not taken (0).

**Example:**
`weights = {10, 20, 30}`, `values = {60, 100, 120}`, `capacity = 50`
Max value = 220 (by taking items with weights 20 and 30).

### 2.1. Brute Force Recursive Solution

**Approach:**
For each item, we have two choices:
1.  **Include the item**: If its `weight` is less than or equal to the remaining `capacity`. If included, add its `value` to the result and recurse for the remaining items with reduced capacity.
2.  **Exclude the item**: Recurse for the remaining items with the same `capacity`.
We take the maximum value from these two choices.

**Base Cases:**
*   If there are no items left (`itemIndex < 0`).
*   If the knapsack capacity is 0.
In both cases, the maximum value is 0.

**Recurrence Relation:**
Let `knapsack(items[0...idx], capacity)` be the maximum value.

*   If `idx < 0` or `capacity == 0`: `knapsack = 0`
*   If `weights[idx] > capacity`:
    `knapsack = knapsack(items[0...idx-1], capacity)` (cannot include item)
*   Else (`weights[idx] <= capacity`):
    `knapsack = Math.max(values[idx] + knapsack(items[0...idx-1], capacity - weights[idx]),`
    `                  knapsack(items[0...idx-1], capacity))`

**Complexity Analysis:**
*   **Time Complexity:** O(2^N). Each item presents two choices, leading to an exponential number of subproblems.
*   **Space Complexity:** O(N) due to the recursion stack depth.

### 2.2. Recursive Solution with Memoization (Top-Down DP)

**Approach:**
To avoid recomputing overlapping subproblems present in the brute-force approach, we use a 2D DP table `dp[N][W]` to store the results. `dp[i][w]` will store the maximum value obtainable using the first `i` items with a knapsack capacity of `w`.

**State Definition:** `dp[i][w]` stores the maximum value using items `0` to `i-1` with capacity `w`.
**Initialization:** `dp` table elements are initialized to a special value (e.g., -1) to indicate that the subproblem has not been computed yet.

**Complexity Analysis:**
*   **Time Complexity:** O(N*W). Each state `(i, w)` is computed only once. There are `N*W` states.
*   **Space Complexity:** O(N*W) for the memoization table, plus O(N) for the recursion stack depth.

### 2.3. Iterative Solution (Bottom-Up DP)

**Approach:**
This approach fills the `dp` table iteratively.
The `dp[i][w]` table represents the maximum value that can be obtained using the first `i` items (from index `0` to `i-1`) with a knapsack capacity of `w`.

**State Definition:** Same as memoization: `dp[i][w]` stores the maximum value using items `0` to `i-1` with capacity `w`.

**Initialization:**
*   `dp[0][w] = 0` for all `w` (no items, value is 0).
*   `dp[i][0] = 0` for all `i` (zero capacity, value is 0).

**Iteration:**
We iterate `i` from 1 to `N` (number of items) and `w` from 1 to `W` (capacity).
*   If `weights[i-1] > w`:
    `dp[i][w] = dp[i-1][w]` (current item is too heavy, cannot be included, take value from previous `i-1` items)
*   Else (`weights[i-1] <= w`):
    `dp[i][w] = Math.max(dp[i-1][w],`  (exclude current item)
    `                    values[i-1] + dp[i-1][w - weights[i-1]])` (include current item)

The final answer is `dp[N][W]`.

**Complexity Analysis:**
*   **Time Complexity:** O(N*W). Two nested loops iterate through `N*W` states.
*   **Space Complexity:** O(N*W) for the 2D DP table.

### 2.4. Space-Optimized Iterative Solution

**Approach:**
The iterative DP solution uses a 2D table, but to compute the current row `dp[i][...]`, we only need values from the previous row `dp[i-1][...]`. This means we can optimize the space by using only one 1D array (`dp`) representing the current row.

**State Definition:** `dp[w]` stores the maximum value for the current set of items with capacity `w`. When processing item `i`, `dp` array effectively holds the results for `i-1` items.

**Iteration:**
*   Initialize a 1D array `dp` of size `W+1` with all zeros.
*   For each item `i` from `0` to `N-1`:
    *   Let `currentWeight = weights[i]` and `currentValue = values[i]`.
    *   Iterate `w` (current capacity) **from `W` down to `currentWeight`**:
        *   `dp[w] = Math.max(dp[w], currentValue + dp[w - currentWeight])`
        *   **Crucial Note on Iteration Direction:** Iterating `w` from right to left (`W` down to `currentWeight`) ensures that when `dp[w - currentWeight]` is accessed, it still refers to the value from the *previous iteration* (i.e., using `i-1` items). If we iterated left-to-right, `dp[w - currentWeight]` would already contain a value from the *current iteration* (using item `i`), which would be equivalent to allowing the current item to be taken multiple times (unbounded knapsack), not 0/1.

The final answer is `dp[W]`.

**Complexity Analysis:**
*   **Time Complexity:** O(N*W). Still two nested loops.
*   **Space Complexity:** O(W). We only use a single 1D array of size `W+1`.

---

## 3. Coin Change Problem

This problem has two major variations: finding the minimum number of coins, and finding the total number of ways to make change.

### 3.1. Variation 1: Minimum Number of Coins

**Problem Statement:**
Given a set of coin denominations `coins` and a target `amount`, find the minimum number of coins needed to make that `amount`. If the `amount` cannot be made, return -1. Assume an infinite supply of each coin.

**Example:**
`coins = [1, 2, 5]`, `amount = 11`
Minimum coins = 3 (e.g., 5 + 5 + 1).

#### 3.1.1. Brute Force Recursive Solution (Minimum Coins)

**Approach:**
For a given `amount`, try subtracting each `coin` from it. Recursively find the minimum coins for the `remaining amount`. Add 1 (for the current coin) to the recursive result. Take the minimum across all coin choices.

**Base Cases:**
*   If `amount == 0`, return 0 (no coins needed).
*   If `amount < 0`, return -1 (invalid state).

**Recurrence Relation:**
Let `minCoins(amount)` be the minimum coins for `amount`.

*   If `amount == 0`: `minCoins = 0`
*   If `amount < 0`: `minCoins = -1`
*   Else: `minCoins = min(1 + minCoins(amount - coin_i))` for all `coin_i` in `coins`.
    (Ignore results where `minCoins(amount - coin_i)` is -1).

**Complexity Analysis:**
*   **Time Complexity:** O(C^A) where `C` is the number of coins and `A` is the amount. Exponential due to repeated computations.
*   **Space Complexity:** O(A) due to the recursion stack depth.

#### 3.1.2. Recursive Solution with Memoization (Top-Down DP - Minimum Coins)

**Approach:**
Optimize the brute-force recursion by storing the results for `minCoins(amount)` in a 1D `dp` array.
`dp[i]` stores the minimum number of coins for `amount = i`.

**State Definition:** `dp[i]` stores the minimum number of coins to make amount `i`.
**Initialization:** `dp` array elements are initialized to a special value (e.g., -2) to indicate uncomputed. -1 is used for impossible amounts.

**Complexity Analysis:**
*   **Time Complexity:** O(C*A). Each amount `i` is computed once, iterating through `C` coins.
*   **Space Complexity:** O(A) for the memoization table, plus O(A) for the recursion stack.

#### 3.1.3. Iterative Solution (Bottom-Up DP - Minimum Coins)

**Approach:**
This approach builds up the `dp` table iteratively.
`dp[i]` will store the minimum number of coins to make amount `i`.

**State Definition:** `dp[i]` stores the minimum number of coins to make amount `i`.

**Initialization:**
*   `dp[0] = 0` (0 coins for 0 amount).
*   `dp[i] = A + 1` for `i > 0`. `A + 1` acts as "infinity", as the maximum possible coins for amount `A` (using 1-unit coins) is `A`. Any value greater than `A` indicates impossibility.

**Iteration:**
We iterate `i` (current amount) from 1 to `amount`.
For each `i`, we iterate through each `coin` in `coins`.
*   If `i >= coin`:
    `dp[i] = Math.min(dp[i], 1 + dp[i - coin])` (current minimum vs. 1 coin + min coins for remaining amount)

The final answer is `dp[amount]`. If `dp[amount]` is still `A + 1`, return -1.

**Complexity Analysis:**
*   **Time Complexity:** O(C*A). Two nested loops iterating through `C` coins and `A` amounts.
*   **Space Complexity:** O(A) for the 1D DP table.

---

### 3.2. Variation 2: Number of Ways to Make Change

**Problem Statement:**
Given a set of coin denominations `coins` and a target `amount`, find the total number of distinct ways to make that `amount`. Assume an infinite supply of each coin.

**Example:**
`coins = [1, 2, 5]`, `amount = 5`
Ways = 4 (1+1+1+1+1, 1+1+1+2, 1+2+2, 5). Note: (1,2,2) and (2,1,2) are considered the same way. The order of coins does not matter.

#### 3.2.1. Recursive Solution with Memoization (Top-Down DP - Number of Ways)

**Approach:**
This is similar to the knapsack problem where items can be reused (unbounded knapsack). We need to count combinations, not permutations. To ensure distinct combinations, we either:
1.  Always choose coins in increasing/decreasing order.
2.  Pass an `itemIndex` (or `numCoins`) and decide whether to include the current coin or move to the next.

The recurrence `dp[idx][a]` stores the number of ways to make amount `a` using coins `0` to `idx`.
For `coins[idx]`:
*   **Include `coins[idx]`**: `numWays(coins, amount - coins[idx], idx)` (same index allows reuse)
*   **Exclude `coins[idx]`**: `numWays(coins, amount, idx - 1)` (move to next coin, don't use current)
Sum these two possibilities.

**State Definition:** `dp[idx][a]` stores the number of ways to make amount `a` using the first `idx` coins (from index `0` to `idx-1`).
**Initialization:** `dp` table elements initialized to -1.

**Base Cases:**
*   If `amount == 0`: return 1 (one way to make 0: choose no coins).
*   If `amount < 0`: return 0 (invalid state).
*   If `idx == 0` (no coins left) and `amount > 0`: return 0 (cannot make amount).

**Complexity Analysis:**
*   **Time Complexity:** O(C*A). Each state `(idx, amount)` is computed once.
*   **Space Complexity:** O(C*A) for the memoization table, plus O(C+A) for the recursion stack.

#### 3.2.2. Iterative Solution (Bottom-Up DP - Number of Ways)

**Approach:**
This approach fills a 1D `dp` table where `dp[i]` represents the number of ways to make amount `i`.
The key to avoiding permutations and ensuring combinations is the order of loops: **iterate through coins first, then through amounts.**

**State Definition:** `dp[i]` stores the number of ways to make amount `i`.

**Initialization:**
*   `dp[0] = 1` (one way to make amount 0: use no coins).
*   `dp[i] = 0` for `i > 0`.

**Iteration:**
1.  Iterate through each `coin` in `coins`.
2.  For each `coin`, iterate `j` (current amount) **from `coin` to `amount`**:
    *   `dp[j] += dp[j - coin]`
    *   This logic means: for the current `amount j`, the number of ways to make it *including* the current `coin` is added to `dp[j]`. `dp[j - coin]` represents the number of ways to make the `remaining amount` using *all coins considered so far (including multiple uses of the current coin)*.

The final answer is `dp[amount]`.

**Complexity Analysis:**
*   **Time Complexity:** O(C*A). Two nested loops iterate through `C` coins and `A` amounts.
*   **Space Complexity:** O(A) for the 1D DP table.

---
```