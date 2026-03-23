```markdown
# Dynamic Programming Algorithms Explained

Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems. It is applicable to problems that exhibit two key properties:

1.  **Overlapping Subproblems**: The same subproblems are encountered multiple times. DP solves each subproblem once and stores its result.
2.  **Optimal Substructure**: The optimal solution to the problem can be constructed from optimal solutions to its subproblems.

There are two primary ways to implement Dynamic Programming:

*   **Memoization (Top-Down DP)**: This is a recursive approach where the results of expensive function calls are stored (cached) and returned when the same inputs occur again. It starts from the main problem and recursively solves subproblems, storing results as it goes.
*   **Tabulation (Bottom-Up DP)**: This is an iterative approach where the problem is solved by filling up a "DP table" (usually an array or 2D array) from the base cases upwards to the final solution.

## Key Concepts

*   **State**: The subproblem definition. For example, for Fibonacci `F(n)`, the state is `n`. For LCS `LCS(s1, s2)`, the state might be `(index1, index2)`.
*   **Base Cases**: The simplest subproblems that can be solved directly without further recursion or dependency on other subproblems.
*   **Recurrence Relation (Transition Function)**: An equation that defines how the solution to a given state can be derived from solutions to smaller states.

---

## 1. Fibonacci Number (F(n))

**Problem**: `F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)` for `n > 1`.

### A. Recursive (Brute-Force)

*   **Recurrence**: `F(n) = F(n-1) + F(n-2)`
*   **Base Cases**: `F(0) = 0`, `F(1) = 1`
*   **Logic**: Directly applies the recurrence relation.
*   **Why it's inefficient**: `F(5)` calls `F(4)` and `F(3)`. `F(4)` calls `F(3)` and `F(2)`. Notice `F(3)` is computed twice. This redundancy grows exponentially.
*   **Time Complexity**: `O(2^n)` (exponential)
*   **Space Complexity**: `O(n)` (recursion stack depth)

### B. Memoization (Top-Down DP)

*   **Logic**: Same recursive structure as brute-force, but introduces a `memo` (e.g., a `Map` or array) to store results. Before computing `F(n)`, check if `memo[n]` exists. If yes, return it. Otherwise, compute, store, then return.
*   **Time Complexity**: `O(n)`. Each `F(k)` is computed only once.
*   **Space Complexity**: `O(n)` (for `memo` and recursion stack).

### C. Tabulation (Bottom-Up DP)

*   **Logic**: Create a `dp` array of size `n+1`.
    *   Initialize `dp[0] = 0` and `dp[1] = 1`.
    *   Iterate `i` from `2` to `n`, calculating `dp[i] = dp[i-1] + dp[i-2]`.
    *   The result is `dp[n]`.
*   **Time Complexity**: `O(n)` (single loop).
*   **Space Complexity**: `O(n)` (for `dp` array).

### D. Space-Optimized Tabulation

*   **Logic**: Observe that `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`. We don't need the entire `dp` array. We can maintain just two variables, `a` (for `F(i-2)`) and `b` (for `F(i-1)`), and update them in a loop.
*   **Time Complexity**: `O(n)` (single loop).
*   **Space Complexity**: `O(1)` (constant extra space).

---

## 2. Climbing Stairs

**Problem**: `n` steps. Can climb 1 or 2 steps at a time. How many distinct ways?

### A. Recursive (Brute-Force)

*   **Recurrence**: Let `ways(n)` be the number of ways to climb `n` stairs. To reach step `n`, you must have come from step `n-1` (taking 1 step) or step `n-2` (taking 2 steps).
    So, `ways(n) = ways(n-1) + ways(n-2)`.
*   **Base Cases**:
    *   `ways(0) = 1` (one way to climb 0 steps: do nothing).
    *   `ways(1) = 1` (one way to climb 1 step: [1]).
*   **Logic**: Identical to Fibonacci.
*   **Time Complexity**: `O(2^n)`
*   **Space Complexity**: `O(n)`

### B. Memoization (Top-Down DP)

*   **Logic**: Cache `ways(n)` results.
*   **Time Complexity**: `O(n)`
*   **Space Complexity**: `O(n)`

### C. Tabulation (Bottom-Up DP)

*   **Logic**: Create `dp` array of size `n+1`.
    *   `dp[0] = 1` (base case for 0 steps).
    *   `dp[1] = 1` (base case for 1 step).
    *   Iterate `i` from `2` to `n`, `dp[i] = dp[i-1] + dp[i-2]`.
*   **Time Complexity**: `O(n)`
*   **Space Complexity**: `O(n)`

### D. Space-Optimized Tabulation

*   **Logic**: Use two variables (`prev2`, `prev1`) to store the results for `i-2` and `i-1` steps respectively.
*   **Time Complexity**: `O(n)`
*   **Space Complexity**: `O(1)`

---

## 3. Longest Common Subsequence (LCS)

**Problem**: Find the length of the longest common subsequence between two strings `text1` and `text2`.

### A. Recursive (Brute-Force)

*   **State**: `LCS(text1, text2, i, j)` represents the length of LCS of `text1[i...]` and `text2[j...]`.
*   **Base Cases**: If `i` reaches `text1.length` or `j` reaches `text2.length`, return `0`.
*   **Recurrence**:
    *   If `text1[i] === text2[j]`: They match! This character is part of LCS.
        `1 + LCS(text1, text2, i+1, j+1)`
    *   If `text1[i] !== text2[j]`: They don't match. We have to choose:
        *   Skip `text1[i]`: `LCS(text1, text2, i+1, j)`
        *   Skip `text2[j]`: `LCS(text1, text2, i, j+1)`
        *   Take `max` of these two options.
*   **Time Complexity**: `O(2^(m+n))` where `m` and `n` are lengths of `text1` and `text2`.
*   **Space Complexity**: `O(m+n)` (recursion stack depth).

### B. Memoization (Top-Down DP)

*   **Logic**: Use a 2D `memo` table `memo[i][j]` to store results for `LCS(text1, text2, i, j)`.
*   **Time Complexity**: `O(m*n)`. Each state `(i, j)` is computed once.
*   **Space Complexity**: `O(m*n)` (for `memo` table and recursion stack).

### C. Tabulation (Bottom-Up DP)

*   **Logic**: Create a 2D `dp` table of size `(m+1) x (n+1)`. `dp[i][j]` stores the LCS length for `text1[0...i-1]` and `text2[0...j-1]`.
    *   Initialize `dp[0][j] = 0` and `dp[i][0] = 0` (base cases for empty strings).
    *   Iterate `i` from `1` to `m`, and `j` from `1` to `n`:
        *   If `text1[i-1] === text2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]` (diagonal)
        *   Else: `dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])` (above or left)
*   **Result**: `dp[m][n]`
*   **Time Complexity**: `O(m*n)` (two nested loops).
*   **Space Complexity**: `O(m*n)` (for `dp` table).

---

## 4. 0/1 Knapsack Problem

**Problem**: Given `n` items with `weights[i]` and `values[i]`, and a knapsack capacity `W`. Maximize total value without exceeding capacity. Each item can be taken once or not at all (0/1).

### A. Recursive (Brute-Force)

*   **State**: `knapsack(weights, values, capacity, n)` represents the maximum value for `n` items (from index 0 to `n-1`) with given `capacity`.
*   **Base Cases**: If `n = 0` (no items left) or `capacity = 0`, return `0`.
*   **Recurrence**:
    *   If `weights[n-1] > capacity`: Current item is too heavy. Cannot include.
        `knapsack(weights, values, capacity, n-1)` (move to next item).
    *   Else (item can fit): Two choices:
        *   **Include item `n-1`**: `values[n-1] + knapsack(weights, values, capacity - weights[n-1], n-1)`
        *   **Exclude item `n-1`**: `knapsack(weights, values, capacity, n-1)`
        *   Take `max` of these two choices.
*   **Time Complexity**: `O(2^n)`
*   **Space Complexity**: `O(n)`

### B. Memoization (Top-Down DP)

*   **Logic**: Use a 2D `memo` table `memo[n][capacity]` to store results.
*   **Time Complexity**: `O(n*W)`. `n` is number of items, `W` is max capacity. Each state `(i, j)` is computed once.
*   **Space Complexity**: `O(n*W)` (for `memo` table and recursion stack).

### C. Tabulation (Bottom-Up DP)

*   **Logic**: Create a 2D `dp` table of size `(n+1) x (W+1)`. `dp[i][w]` stores the max value using the first `i` items with capacity `w`.
    *   Initialize `dp[0][w] = 0` and `dp[i][0] = 0` (base cases).
    *   Iterate `i` from `1` to `n` (for each item):
        *   Iterate `w` from `0` to `W` (for each capacity):
            *   If `weights[i-1] <= w`: (current item can fit)
                `dp[i][w] = Math.max(values[i-1] + dp[i-1][w - weights[i-1]], dp[i-1][w])`
            *   Else (`weights[i-1] > w`): (current item too heavy)
                `dp[i][w] = dp[i-1][w]`
*   **Result**: `dp[n][W]`
*   **Time Complexity**: `O(n*W)`
*   **Space Complexity**: `O(n*W)`

### D. Space-Optimized Tabulation

*   **Logic**: Observe that `dp[i][w]` only depends on `dp[i-1][...]`. We can reduce the `dp` table to a 1D array of size `(W+1)`.
    *   `dp[w]` stores the max value for capacity `w` considering items processed so far.
    *   Iterate `i` from `0` to `n-1` (for each item):
        *   Crucially, iterate `w` from `W` **down to** `weights[i]`. This reverse iteration ensures that when `dp[w - weights[i]]` is accessed, it still holds the value from the *previous* item's calculation, not the current item's.
        *   If `currentWeight <= w`:
            `dp[w] = Math.max(dp[w], currentValue + dp[w - currentWeight])`
*   **Result**: `dp[W]`
*   **Time Complexity**: `O(n*W)`
*   **Space Complexity**: `O(W)`

```