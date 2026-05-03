# Dynamic Programming: Algorithm Explanations

This document provides a deeper dive into the Dynamic Programming (DP) concepts and the specific problems solved in this project.

## What is Dynamic Programming?

Dynamic Programming is an optimization technique that solves complex problems by breaking them down into simpler subproblems. It's applicable to problems exhibiting two key properties:

1.  **Optimal Substructure:** An optimal solution to the problem contains optimal solutions to its subproblems. This means you can build up the solution to the main problem by solving smaller, related subproblems first.
2.  **Overlapping Subproblems:** The same subproblems are encountered multiple times when solving the larger problem. DP aims to solve each subproblem only once and store its result (memoization) or build up solutions from base cases (tabulation), avoiding redundant computations.

There are two main approaches to Dynamic Programming:

*   **Memoization (Top-Down DP):** This is a recursive approach where solutions to subproblems are computed "on demand" and stored in a cache (e.g., dictionary or array) for future use. When a subproblem is encountered again, its pre-computed result is returned, avoiding re-calculation.
*   **Tabulation (Bottom-Up DP):** This is an iterative approach where a DP table (array) is systematically filled, starting from the base cases. Solutions to smaller subproblems are computed first, and these are then used to build up solutions to larger subproblems until the final solution is reached.

## Problems and Solutions

### 1. Fibonacci Sequence

**Problem:** Given an integer `n`, return the `nth` Fibonacci number. `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n-1) + F(n-2)` for `n > 1`.

**Recurrence Relation:**
`F(n) = F(n-1) + F(n-2)`
`Base Cases: F(0) = 0, F(1) = 1`

#### Approach 1: Recursive with Memoization (`fibonacci_memoized`)

*   **Logic:** Directly implements the recurrence relation. Uses a cache (`functools.lru_cache`) to store `F(n)` once it's computed.
*   **Time Complexity:** O(n) - Each `F(i)` is computed exactly once.
*   **Space Complexity:** O(n) - For the recursion stack (depth `n`) and the memoization cache.

#### Approach 2: Iterative with Tabulation (`fibonacci_tabulation`)

*   **Logic:** Builds a DP array `dp` where `dp[i]` stores `F(i)`. It starts with `dp[0]=0`, `dp[1]=1`, and then iteratively computes `dp[i] = dp[i-1] + dp[i-2]` for `i` from 2 to `n`.
*   **Time Complexity:** O(n) - Single loop from 2 to `n`.
*   **Space Complexity:** O(n) - For the `dp` array.

#### Approach 3: Space-Optimized Iterative (`fibonacci_space_optimized`)

*   **Logic:** Observes that `F(i)` only depends on `F(i-1)` and `F(i-2)`. We only need to store the previous two Fibonacci numbers instead of the entire array.
*   **Time Complexity:** O(n) - Single loop from 2 to `n`.
*   **Space Complexity:** O(1) - Only two variables (`a`, `b`) are used.

### 2. 0/1 Knapsack Problem

**Problem:** Given weights and values of `N` items, and a knapsack capacity `W`. Find the maximum value that can be put into the knapsack. Each item can either be taken or not taken (0/1 property).

**State Definition:**
Let `dp[i][w]` be the maximum value that can be obtained from the first `i` items with a knapsack capacity of `w`.

**Recurrence Relation:**
For item `i` (with `weight_i` and `value_i`):

*   **If `weight_i > w` (current item cannot fit):**
    `dp[i][w] = dp[i-1][w]` (Value is same as not considering item `i`)
*   **If `weight_i <= w` (current item can fit):**
    `dp[i][w] = max(dp[i-1][w], value_i + dp[i-1][w - weight_i])`
    (Maximum of: not including item `i`, or including item `i` and the optimal value from remaining capacity `w - weight_i` using previous items)

**Base Cases:**
`dp[0][w] = 0` for all `w` (no items, no value)
`dp[i][0] = 0` for all `i` (zero capacity, no value)

#### Approach 1: Recursive with Memoization (`knapsack_memoized`)

*   **Logic:** `solve(idx, current_capacity)` computes `dp[idx][current_capacity]`. It makes two recursive calls: one excluding `items[idx]` and one including it (if possible), memoizing results.
*   **Time Complexity:** O(N * W) - Each unique state `(idx, current_capacity)` is computed once.
*   **Space Complexity:** O(N * W) - For the memoization dictionary and recursion stack.

#### Approach 2: Iterative with Tabulation (`knapsack_tabulation`)

*   **Logic:** Builds a 2D `dp` table. `dp[i][j]` means using the first `i` items and a capacity `j`. It iterates `i` from 1 to `N` and `j` from 1 to `W`, applying the recurrence relation.

*   **DP Table Visualization (Example):**
    `Weights = [10, 20, 30]`, `Values = [60, 100, 120]`, `Capacity = 50`

    ```
         Capacity (j) ->
            0   10  20  30  40  50
        +----------------------------
    Items |
    (i)   |
        0 |   0   0   0   0   0   0  (No items)
        1 |   0  60  60  60  60  60  (Item 0: w=10, v=60)
        2 |   0  60 100 160 160 160  (Item 1: w=20, v=100)
        3 |   0  60 100 160 180 220  (Item 2: w=30, v=120)
    ```
    *   `dp[1][10]`: Take item 0 (w=10, v=60). Total 60.
    *   `dp[2][20]`: Max of:
        *   `dp[1][20]` (don't take item 1) = 60
        *   `values[1] + dp[1][20-20]` (take item 1) = 100 + dp[1][0] = 100 + 0 = 100
        *   Max is 100.
    *   `dp[2][30]`: Max of:
        *   `dp[1][30]` (don't take item 1) = 60
        *   `values[1] + dp[1][30-20]` (take item 1) = 100 + dp[1][10] = 100 + 60 = 160
        *   Max is 160.
    *   `dp[3][50]`: Max of:
        *   `dp[2][50]` (don't take item 2) = 160
        *   `values[2] + dp[2][50-30]` (take item 2) = 120 + dp[2][20] = 120 + 100 = 220
        *   Max is 220.

*   **Time Complexity:** O(N * W) - Two nested loops.
*   **Space Complexity:** O(N * W) - For the 2D `dp` table.

#### Approach 3: Space-Optimized Iterative (`knapsack_space_optimized`)

*   **Logic:** Since `dp[i][w]` only depends on `dp[i-1][...]` (the previous row), we can reduce the 2D `dp` table to a 1D array. When processing item `i`, `dp[j]` represents `dp[i-1][j]`. We iterate capacity `j` *backwards* to ensure `dp[j - current_weight]` still refers to values from the `i-1` iteration (or earlier in the same iteration if we iterate forwards, which would effectively make it Unbounded Knapsack).
*   **Time Complexity:** O(N * W) - Two nested loops.
*   **Space Complexity:** O(W) - For the 1D `dp` array.

### 3. Longest Common Subsequence (LCS)

**Problem:** Given two strings `text1` and `text2`, return the length of their longest common subsequence.

**State Definition:**
Let `dp[i][j]` be the length of the LCS of `text1[0...i-1]` and `text2[0...j-1]`.

**Recurrence Relation:**
*   **If `text1[i-1] == text2[j-1]` (characters match):**
    `dp[i][j] = 1 + dp[i-1][j-1]` (Add 1 to LCS of previous prefixes)
*   **If `text1[i-1] != text2[j-1]` (characters don't match):**
    `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (Take the max LCS length by skipping one character from either string)

**Base Cases:**
`dp[0][j] = 0` for all `j` (empty `text1` prefix)
`dp[i][0] = 0` for all `i` (empty `text2` prefix)

#### Approach 1: Recursive with Memoization (`lcs_memoized`)

*   **Logic:** `solve(i, j)` finds the LCS length for suffixes `text1[i:]` and `text2[j:]`. If `text1[i] == text2[j]`, it's `1 + solve(i+1, j+1)`. Otherwise, it's `max(solve(i+1, j), solve(i, j+1))`. Results are memoized.
*   **Time Complexity:** O(m * n) - `m` is `len(text1)`, `n` is `len(text2)`. Each state `(i, j)` computed once.
*   **Space Complexity:** O(m * n) - For memoization dictionary and recursion stack.

#### Approach 2: Iterative with Tabulation (`lcs_tabulation`)

*   **Logic:** Builds a 2D `dp` table of size `(m+1) x (n+1)`. It iterates `i` from 1 to `m` and `j` from 1 to `n`, applying the recurrence relation.

*   **DP Table Visualization (Example):**
    `text1 = "AGGTAB"`, `text2 = "GXTXAYB"`

    ```
          "" G X T X A Y B
         +------------------
       ""| 0  0 0 0 0 0 0 0
       A | 0  0 0 0 0 1 1 1
       G | 0  1 1 1 1 1 1 1
       G | 0  1 1 1 1 1 1 1
       T | 0  1 1 2 2 2 2 2
       A | 0  1 1 2 2 3 3 3
       B | 0  1 1 2 2 3 4 4
    ```
    *   `dp[i][j]` considers `text1[i-1]` and `text2[j-1]`.
    *   `dp[1][5]` (for 'A' and 'A'): `text1[0]=='A'`, `text2[4]=='A'`. Match. `1 + dp[0][4] = 1+0=1`.
    *   `dp[4][4]` (for 'T' and 'X'): `text1[3]=='T'`, `text2[3]=='X'`. No match. `max(dp[3][4], dp[4][3]) = max(1, 1) = 1`.
    *   `dp[4][6]` (for 'T' and 'Y'): `text1[3]=='T'`, `text2[5]=='Y'`. No match. `max(dp[3][6], dp[4][5]) = max(2, 2) = 2`. (Error in previous line. Should be dp[3][6]=2 from AGG vs GXTXAY, and dp[4][5]=2 from AGGT vs GXTXA) -> `max(2,2)=2`
    *   `dp[6][7]` (for 'B' and 'B'): `text1[5]=='B'`, `text2[6]=='B'`. Match. `1 + dp[5][6] = 1+3=4`. Final answer.

*   **Time Complexity:** O(m * n) - Two nested loops.
*   **Space Complexity:** O(m * n) - For the 2D `dp` table.

#### Approach 3: Space-Optimized Iterative (`lcs_space_optimized`)

*   **Logic:** Similar to Knapsack, `dp[i][j]` only depends on `dp[i-1][j-1]`, `dp[i-1][j]`, and `dp[i][j-1]` (previous row and current row's left element). We can use two rows (current and previous) to reduce space. To optimize to `O(min(m,n))`, ensure the shorter string is iterated as columns.
*   **Time Complexity:** O(m * n).
*   **Space Complexity:** O(min(m, n)) - For two 1D `dp` arrays.

### 4. Coin Change Problem (Minimum Coins)

**Problem:** Given coin denominations `coins` and a target `amount`, find the minimum number of coins needed to make up that amount. Infinite supply of each coin. Return -1 if impossible.

**State Definition:**
Let `dp[i]` be the minimum number of coins required to make the amount `i`.

**Recurrence Relation:**
`dp[i] = min(1 + dp[i - coin])` for all `coin` in `coins` where `i - coin >= 0`.

**Base Case:**
`dp[0] = 0` (0 coins for amount 0)
Initialize all other `dp[i]` to `infinity`.

#### Approach 1: Recursive with Memoization (`coin_change_memoized`)

*   **Logic:** `solve(target)` tries to make `target` amount. It iterates through all `coins`, recursively calls `solve(target - coin)`, and adds 1 (for the current coin), taking the minimum result. Memoizes `solve(target)`.
*   **Time Complexity:** O(amount * N) - Where N is number of coin denominations. Each `target` from 1 to `amount` is computed once.
*   **Space Complexity:** O(amount) - For the memoization dictionary and recursion stack.

#### Approach 2: Iterative with Tabulation (`coin_change_tabulation`)

*   **Logic:** Builds a 1D `dp` array of size `(amount+1)`. Initializes `dp[0]=0` and rest to infinity. Iterates `i` from 1 to `amount`. For each `i`, it iterates through `coins`. If `i - coin` is valid, it updates `dp[i] = min(dp[i], 1 + dp[i - coin])`.

*   **DP Table Visualization (Example):**
    `coins = [1, 2, 5]`, `amount = 11`

    ```
    Amount (i): 0   1   2   3   4   5   6   7   8   9   10  11
    -----------------------------------------------------------------
    dp[i]:      0  inf inf inf inf inf inf inf inf inf inf inf (Initial)

    After processing coin=1:
    dp[i]:      0   1   2   3   4   5   6   7   8   9   10  11

    After processing coin=2: (e.g., dp[3] = min(dp[3], 1+dp[1]) = min(3, 1+1) = 2)
    dp[i]:      0   1   1   2   2   3   3   4   4   5   5   6

    After processing coin=5: (e.g., dp[6] = min(dp[6], 1+dp[1]) = min(3, 1+1) = 2)
    dp[i]:      0   1   1   2   2   1   2   2   3   3   2   3
    ```
    *   `dp[5]` becomes `1` (from `1 + dp[0]` using coin 5).
    *   `dp[6]` becomes `min(dp[6], 1+dp[1])` from coin 5 => `min(3, 1+1) = 2`. Using coin 1: `1+dp[5]` gives `1+1=2`. Using coin 2: `1+dp[4]` gives `1+2=3`. Using coin 5: `1+dp[1]` gives `1+1=2`. So `dp[6]` is 2. (e.g., 5+1 or 2+2+2)
    *   `dp[11]` becomes `min(dp[11], 1+dp[6])` from coin 5 => `min(6, 1+2) = 3`. (e.g., 5+5+1)

*   **Time Complexity:** O(amount * N) - Outer loop for `amount`, inner loop for `coins`.
*   **Space Complexity:** O(amount) - For the 1D `dp` array.

**Note on Space Optimization:** For the Coin Change problem (unbounded knapsack variant), the tabulation approach is already space-optimized to O(amount). This is because `dp[i]` is computed based on `dp[i - coin_val]`, and these smaller `dp` values are already available in the same 1D array from previous calculations. No further `O(1)` space optimization like Fibonacci is typically feasible or necessary without altering the problem's interpretation.