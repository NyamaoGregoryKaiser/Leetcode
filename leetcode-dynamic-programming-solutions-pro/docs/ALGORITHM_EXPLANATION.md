# Dynamic Programming Algorithm Explanation

Dynamic Programming (DP) is a powerful technique used to solve complex problems by breaking them down into simpler overlapping subproblems and storing the results of these subproblems to avoid redundant calculations. It is applicable to problems exhibiting two key properties:

1.  **Overlapping Subproblems**: The problem can be broken down into subproblems that are reused multiple times. Instead of recomputing the same subproblem, DP stores its solution.
2.  **Optimal Substructure**: An optimal solution to the problem can be constructed from optimal solutions of its subproblems.

There are two main approaches to Dynamic Programming:

*   **Memoization (Top-Down)**: This is a recursive approach. You write a recursive function that directly solves the problem. Before computing a subproblem, check if its solution is already stored in a cache (memo). If yes, return the cached value. Otherwise, compute it, store it, and then return it.
*   **Tabulation (Bottom-Up)**: This is an iterative approach. You solve the smallest subproblems first and build up solutions to larger subproblems. Typically, this involves filling a DP table (array or matrix) systematically.

## Problems and Detailed Explanations

### 1. Fibonacci Number

**Problem**: Calculate the N-th Fibonacci number. $F(0) = 0, F(1) = 1, F(N) = F(N-1) + F(N-2)$ for $N > 1$.

**1.1 Naive Recursive (Brute Force)**
*   **Recurrence**: `F(N) = F(N-1) + F(N-2)`
*   **Base Cases**: `F(0) = 0`, `F(1) = 1`
*   **Issue**: Highly inefficient. The recursion tree branches significantly, leading to repeated calculations of the same Fibonacci numbers (e.g., `F(5)` calls `F(4)` and `F(3)`; `F(4)` calls `F(3)` and `F(2)` - `F(3)` is computed twice).
*   **Time Complexity**: O($2^N$)
*   **Space Complexity**: O(N) (for recursion stack)

**1.2 Top-Down (Memoization)**
*   **Idea**: Use a cache (e.g., `std::vector` or `std::map`) to store computed `F(N)` values.
*   **Algorithm**:
    1.  Initialize `memo` array/vector with a sentinel value (e.g., -1) indicating "not computed".
    2.  `fib(n)`:
        *   If `n <= 1`, return `n` (base case).
        *   If `memo[n]` is not the sentinel, return `memo[n]`.
        *   Else, compute `res = fib(n-1) + fib(n-2)`.
        *   Store `memo[n] = res`.
        *   Return `res`.
*   **Time Complexity**: O(N) - Each `F(i)` is computed only once.
*   **Space Complexity**: O(N) (for `memo` table and recursion stack)

**1.3 Bottom-Up (Tabulation)**
*   **Idea**: Build the solution iteratively from the base cases.
*   **Algorithm**:
    1.  Create a `dp` array/vector of size `N+1`.
    2.  Initialize base cases: `dp[0] = 0`, `dp[1] = 1`.
    3.  Iterate `i` from 2 to `N`: `dp[i] = dp[i-1] + dp[i-2]`.
    4.  Return `dp[N]`.
*   **Time Complexity**: O(N)
*   **Space Complexity**: O(N)

**1.4 Space-Optimized Tabulation**
*   **Idea**: Notice that `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`. We only need to store the two previous values, not the entire `dp` array.
*   **Algorithm**:
    1.  Initialize `prev2 = 0` (for `F(i-2)`), `prev1 = 1` (for `F(i-1)`).
    2.  Iterate `i` from 2 to `N`:
        *   `current_fib = prev1 + prev2`.
        *   Update `prev2 = prev1`.
        *   Update `prev1 = current_fib`.
    3.  Return `prev1` (which holds `F(N)`).
*   **Time Complexity**: O(N)
*   **Space Complexity**: O(1)

---

### 2. Longest Common Subsequence (LCS)

**Problem**: Find the length of the longest common subsequence of two strings, `text1` and `text2`.

**2.1 Naive Recursive (Brute Force)**
*   **Recurrence**:
    *   If `text1[i-1] == text2[j-1]`: `1 + LCS(text1, text2, i-1, j-1)`
    *   Else: `max(LCS(text1, text2, i-1, j), LCS(text1, text2, i, j-1))`
*   **Base Cases**: If `i == 0` or `j == 0`, `LCS` is 0.
*   **Issue**: Also suffers from overlapping subproblems, leading to exponential time complexity.
*   **Time Complexity**: O($2^{(m+n)}$) (where m, n are lengths of strings)
*   **Space Complexity**: O(m+n) (for recursion stack)

**2.2 Bottom-Up (Tabulation)**
*   **Idea**: Use a 2D DP table `dp[i][j]` where `dp[i][j]` stores the length of LCS of `text1[0...i-1]` and `text2[0...j-1]`.
*   **State Definition**: `dp[i][j]` = length of LCS of `text1.substr(0, i)` and `text2.substr(0, j)`.
*   **Algorithm**:
    1.  Create `dp` table of size `(m+1) x (n+1)`, initialized to 0.
    2.  Iterate `i` from 1 to `m` (for `text1`):
        *   Iterate `j` from 1 to `n` (for `text2`):
            *   If `text1[i-1] == text2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]` (characters match, extend LCS)
            *   Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (characters don't match, take max from skipping one char from either string)
    3.  Return `dp[m][n]`.
*   **Time Complexity**: O(m * n)
*   **Space Complexity**: O(m * n)

**2.3 Space-Optimized Tabulation**
*   **Idea**: `dp[i][j]` only depends on values from the previous row (`dp[i-1][...]`) and the current row's previous column (`dp[i][j-1]`). We can reduce the 2D table to two 1D arrays: `prev_row` and `current_row`.
*   **Algorithm**:
    1.  Ensure `text1` is the shorter string (swap if necessary) to minimize space for the `dp` array.
    2.  Initialize `prev_dp` and `current_dp` vectors of size `n+1` (where `n` is `text2.length()`) to 0.
    3.  Iterate `i` from 1 to `m` (rows, corresponding to `text1`):
        *   Iterate `j` from 1 to `n` (columns, corresponding to `text2`):
            *   If `text1[i-1] == text2[j-1]`: `current_dp[j] = 1 + prev_dp[j-1]`
            *   Else: `current_dp[j] = max(prev_dp[j], current_dp[j-1])`
        *   After inner loop, `prev_dp = current_dp` (update for next row).
    4.  Return `prev_dp[n]`.
*   **Time Complexity**: O(m * n)
*   **Space Complexity**: O(min(m, n))

---

### 3. 0/1 Knapsack Problem

**Problem**: Given `N` items with `weights[i]` and `values[i]`, and a knapsack of capacity `W`. Choose items to maximize total value without exceeding capacity. Each item can be chosen at most once (0 or 1).

**3.1 Naive Recursive (Brute Force)**
*   **Recurrence**: `knapsack(weights, values, W, n)`
    *   If `weights[n-1] > W`: `knapsack(weights, values, W, n-1)` (cannot include current item)
    *   Else: `max(knapsack(weights, values, W, n-1),` // Don't include current
            `values[n-1] + knapsack(weights, values, W - weights[n-1], n-1))` // Include current
*   **Base Cases**: `n == 0` or `W == 0`, return 0.
*   **Issue**: Explores all $2^N$ subsets of items.
*   **Time Complexity**: O($2^N$)
*   **Space Complexity**: O(N)

**3.2 Bottom-Up (Tabulation)**
*   **Idea**: Use a 2D DP table `dp[i][w]` where `dp[i][w]` is the maximum value that can be obtained using items from `0` to `i-1` with a knapsack capacity of `w`.
*   **State Definition**: `dp[i][w]` = max value using first `i` items with capacity `w`.
*   **Algorithm**:
    1.  Create `dp` table of size `(N+1) x (W+1)`, initialized to 0.
    2.  Iterate `i` from 1 to `N` (for items):
        *   Iterate `w` from 1 to `W` (for capacity):
            *   `current_weight = weights[i-1]`, `current_value = values[i-1]`.
            *   If `current_weight > w`: `dp[i][w] = dp[i-1][w]` (current item too heavy, don't include)
            *   Else: `dp[i][w] = max(dp[i-1][w],` // Don't include
                    `current_value + dp[i-1][w - current_weight])` // Include
    3.  Return `dp[N][W]`.
*   **Time Complexity**: O(N * W)
*   **Space Complexity**: O(N * W)

**3.3 Space-Optimized Tabulation**
*   **Idea**: Similar to LCS, `dp[i][w]` only depends on `dp[i-1][...]`. We can use a 1D `dp` array of size `W+1`.
*   **Crucial Detail**: When iterating for an item `i`, the `w` loop must go **backwards** from `W` down to `weights[i-1]`. This ensures that when we access `dp[w - current_weight]`, we are using the value from the *previous item's* calculation (equivalent to `dp[i-1][w - current_weight]`), not one from the current item's calculations.
*   **Algorithm**:
    1.  Create a `dp` vector of size `W+1`, initialized to 0.
    2.  Iterate `i` from 0 to `N-1` (for each item):
        *   `current_weight = weights[i]`, `current_value = values[i]`.
        *   Iterate `w` from `W` down to `current_weight`:
            *   `dp[w] = max(dp[w], current_value + dp[w - current_weight])`
    3.  Return `dp[W]`.
*   **Time Complexity**: O(N * W)
*   **Space Complexity**: O(W)

---

### 4. Coin Change (Minimum Coins)

**Problem**: Given `coins` (denominations) and an `amount`, find the fewest number of coins to make the `amount`. Infinite supply of each coin. Return -1 if impossible.

**4.1 Bottom-Up (Tabulation)**
*   **Idea**: Use a 1D `dp` array where `dp[a]` stores the minimum number of coins needed to make amount `a`.
*   **State Definition**: `dp[a]` = minimum coins for amount `a`.
*   **Algorithm**:
    1.  Create `dp` vector of size `amount+1`.
    2.  Initialize `dp[0] = 0`. All other `dp[a]` for `a > 0` are initialized to `amount + 1` (a value greater than any possible count, effectively infinity).
    3.  Iterate `a` from 1 to `amount`:
        *   For each `coin` in `coins`:
            *   If `a - coin >= 0`:
                *   `dp[a] = min(dp[a], 1 + dp[a - coin])` (Try taking this coin, then add min coins for remaining amount).
    4.  Return `dp[amount]` if `dp[amount] <= amount` (meaning it's a valid count), else -1.
*   **Time Complexity**: O(amount * N) (where N is number of coin denominations)
*   **Space Complexity**: O(amount)
*   **Note**: This is already the standard space-optimal solution for this problem. There's no further O(1) space optimization like in Knapsack because `dp[a]` needs values for `dp[a - coin]` across all possible `coin` values, which might be far apart, requiring the whole `dp` array.

---

### 5. House Robber (Linear & Circular)

**Problem (Linear)**: Rob houses in a line; adjacent houses cannot be robbed. Maximize total money.

**5.1 Bottom-Up (Tabulation)**
*   **Idea**: `dp[i]` represents the maximum money robbed up to house `i`.
*   **State Definition**: `dp[i]` = max money from houses `0` to `i`.
*   **Algorithm**:
    1.  Handle base cases: empty (`0`), one house (`nums[0]`).
    2.  Create `dp` vector of size `N`.
    3.  Initialize `dp[0] = nums[0]`.
    4.  Initialize `dp[1] = max(nums[0], nums[1])`.
    5.  Iterate `i` from 2 to `N-1`:
        *   `dp[i] = max(dp[i-1],` // Don't rob current house `i`
                `nums[i] + dp[i-2])` // Rob current house `i` and max from two houses prior
    6.  Return `dp[N-1]`.
*   **Time Complexity**: O(N)
*   **Space Complexity**: O(N)

**5.2 Space-Optimized Tabulation (Linear)**
*   **Idea**: `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`. We only need to store two previous values.
*   **Algorithm**:
    1.  Handle base cases: empty (`0`), one house (`nums[0]`).
    2.  Initialize `rob_prev_prev = 0` (max money from two houses ago, effectively `dp[-1]`).
    3.  Initialize `rob_prev = nums[0]` (max money from one house ago, effectively `dp[0]`).
    4.  Iterate `i` from 1 to `N-1`:
        *   `current_max_rob = max(rob_prev, nums[i] + rob_prev_prev)`.
        *   Update `rob_prev_prev = rob_prev`.
        *   Update `rob_prev = current_max_rob`.
    5.  Return `rob_prev`.
*   **Time Complexity**: O(N)
*   **Space Complexity**: O(1)

**Problem (Circular)**: Houses are arranged in a circle; first and last houses are adjacent. Maximize total money.

**5.3 Solution for Circular Arrangement (using Linear DP)**
*   **Idea**: The circular constraint means you cannot rob both the first house (`nums[0]`) and the last house (`nums[N-1]`). This breaks the problem into two independent linear subproblems:
    1.  Rob houses from `0` to `N-2` (excluding the last house).
    2.  Rob houses from `1` to `N-1` (excluding the first house).
*   The maximum of the results from these two subproblems is the answer.
*   **Algorithm**:
    1.  Handle base cases: empty (`0`), one house (`nums[0]`).
    2.  Create a sub-vector for `nums[0...N-2]` and call `house_robber_linear` (or its O(1) space version). Let this be `max_val1`.
    3.  Create a sub-vector for `nums[1...N-1]` and call `house_robber_linear` (or its O(1) space version). Let this be `max_val2`.
    4.  Return `max(max_val1, max_val2)`.
*   **Time Complexity**: O(N) (two calls to linear DP, each O(N))
*   **Space Complexity**: O(N) (for creating sub-vectors, though the linear DP itself might be O(1) space)

---
*(End of ALGORITHM_EXPLANATION.md)*