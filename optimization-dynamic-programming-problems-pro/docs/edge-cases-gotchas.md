# Dynamic Programming: Edge Cases and Gotchas

Dynamic Programming can be tricky. Understanding common edge cases and potential pitfalls is crucial for writing robust and correct DP solutions.

## General DP Gotchas

1.  **Incorrect Base Cases**:
    *   **Problem**: If base cases are wrong, the entire DP table will be filled incorrectly.
    *   **Example**: For Fibonacci, if `F(0)` is `1` instead of `0`, all subsequent numbers will be off. For climbing stairs, `ways(0)` is usually `1` (one way to stay put), not `0`.
    *   **Tip**: Double-check what the "smallest" valid input or state should produce. Often, 0 or 1 for count/length, or a default value.

2.  **Off-by-One Errors in Indices**:
    *   **Problem**: When mapping problem indices (e.g., 1-based item numbers, string characters) to array indices (0-based).
    *   **Example**: If `text1` has length `m`, `text1[i-1]` is used when `dp` table is `(m+1) x (n+1)`. For `knapsackTabulation`, `weights[i-1]` and `values[i-1]` are used for `i`-th item.
    *   **Tip**: Be consistent. If your DP table is `(N+1)` size, index `i` in `dp` usually corresponds to `i-1` in the original input array/string. Draw out a small `dp` table for simple inputs.

3.  **Wrong Order of Iteration (Tabulation)**:
    *   **Problem**: In tabulation, the order of loops matters. You must compute `dp[state]` *after* all states it depends on (`dp[smaller_state]`) are already computed.
    *   **Example**: For `knapsackSpaceOptimized`, the inner loop for capacity `w` must iterate **downwards** (`W` to `currentWeight`). If it iterates upwards, `dp[w - currentWeight]` would be referencing a value for the *current* item being processed, making it an "unbounded knapsack" (allowing multiple takes of the same item) rather than 0/1.
    *   **Tip**: Trace dependencies. `dp[i]` depends on `dp[i-1]` and `dp[i-2]`? Loop `i` forwards. `dp[i][j]` depends on `dp[i-1][j-1]`, `dp[i-1][j]`, `dp[i][j-1]`? Outer loop `i` forwards, inner loop `j` forwards.

4.  **Incorrect Memoization Key/Cache Structure**:
    *   **Problem**: Using a `Map` incorrectly (e.g., combining multiple variables into a single string key for 2D DP) or not initializing a 2D array with a distinct "uncomputed" value (like -1 or `null`).
    *   **Example**: For LCS `memo[idx1][idx2]`. If you use `memo.set(`${idx1},${idx2}`, result)` with a `Map`, ensure you retrieve it with the same key. If using a 2D array, make sure `null` or `undefined` isn't a valid computed result, or pick a value like -1 (if all valid results are non-negative).
    *   **Tip**: For 2D DP with known bounds, a 2D array is often simpler and faster than `Map<string, ...>` or `Map<number, Map<number, ...>>`. Initialize it with a sentinel value (-1) to indicate uncomputed.

5.  **Integer Overflow (Less common in JS for typical interview inputs)**:
    *   **Problem**: DP problems often involve sums that can grow very large (e.g., number of ways, max value).
    *   **Example**: Large Fibonacci numbers or climbing stairs ways.
    *   **Tip**: In languages like C++/Java, use `long long` or `BigInteger`. In JavaScript, numbers are floating-point 64-bit, so they can handle large integers up to `2^53 - 1` without precision loss. For numbers exceeding this (e.g., `n=100` for Fibonacci), you'd need `BigInt`. For typical interview constraints (`n=50`, `capacity=1000`), standard numbers are usually fine.

6.  **Copying Arrays/Objects vs. Referencing**:
    *   **Problem**: Modifying shared mutable objects when a copy was intended.
    *   **Example**: In memoization, if the subproblem solution involves an array or object, ensure you're storing a *copy* of the result if the recursive calls might modify it later. For pure numerical results, this is not an issue.
    *   **Tip**: For path reconstruction or complex object states, be mindful of deep vs. shallow copies.

## Problem-Specific Edge Cases

### Fibonacci Number / Climbing Stairs

*   `n = 0`:
    *   Fibonacci `F(0) = 0`.
    *   Climbing Stairs `ways(0) = 1` (one way to climb 0 steps: do nothing). This is a common point of confusion.
*   `n = 1`:
    *   Fibonacci `F(1) = 1`.
    *   Climbing Stairs `ways(1) = 1`.
*   Negative `n`: Our implementations return 0/1. Clarify with interviewer how to handle negative inputs (error, treat as 0, etc.).

### Longest Common Subsequence (LCS)

*   **Empty strings**: `lcs("", "abc")` should be `0`. `lcs("", "")` should be `0`. The DP table initialization usually handles this naturally.
*   **One string empty**: Effectively treated as empty strings.
*   **Identical strings**: `lcs("abc", "abc")` should be `3`.
*   **No common characters**: `lcs("abc", "def")` should be `0`.
*   **Single character strings**: `lcs("a", "a") = 1`, `lcs("a", "b") = 0`.

### 0/1 Knapsack Problem

*   **No items**: `knapsack([], [], capacity)` should be `0`.
*   **Zero capacity**: `knapsack(weights, values, 0)` should be `0`.
*   **All items too heavy**: If all `weights[i] > capacity`, the max value is `0`.
*   **All items fit**: Sum of all values.
*   **Mixed item sizes and values**: The core DP logic handles this by making optimal choices at each step.
*   **Capacity constraint vs. item count constraint**: Ensure you understand if capacity is the only limiting factor or if there's also a limit on the number of items. (0/1 Knapsack usually only has capacity constraint).

## Debugging DP Problems

1.  **Start with the smallest inputs**: Test `n=0, 1, 2` for 1D DP, or empty strings/arrays, single elements for 2D DP.
2.  **Draw the DP table**: For small inputs, manually fill out the `dp` table. Compare your manual trace with your code's output. This is especially helpful for 2D problems like LCS or Knapsack.
3.  **Print statements**: Add `console.log` statements within your loops (tabulation) or at the entry/exit of your recursive function (memoization) to see intermediate `dp` values or memo keys/results.
4.  **Isolate base cases**: Temporarily hardcode expected base case results to ensure your main recurrence is correct if base cases are tricky.
5.  **Confirm dependencies**: For a cell `dp[i][j]`, manually verify which `dp[x][y]` cells it depends on and if those cells are correctly computed *before* `dp[i][j]`. This helps catch incorrect iteration orders.

By being mindful of these common issues, you can approach DP problems with greater confidence and accuracy.
```