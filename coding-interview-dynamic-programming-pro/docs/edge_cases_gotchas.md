# Dynamic Programming: Edge Cases and Gotchas

Dynamic Programming problems often hide subtle traps and edge cases that can lead to incorrect solutions or runtime errors if not carefully considered. Here's a rundown of common pitfalls and how to address them:

## 1. Incorrect Base Cases

**Gotcha:** Incorrectly initializing your `dp` table or memoization cache.
*   **Example (Coin Change):** `dp[0]` should be 0 (0 coins for 0 amount). If `dp[0]` is initialized to a large number (infinity), `dp[coin]` might incorrectly become `infinity + 1`.
*   **Example (LCS):** `dp[i][0]` and `dp[0][j]` (LCS with an empty string) should always be 0.
*   **Example (Knapsack):** `dp[0][j]` (0 items) and `dp[i][0]` (0 capacity) should always be 0.
*   **Solution:** Always explicitly write down and test your base cases. Consider the smallest possible inputs and their expected outcomes.

## 2. Off-by-One Errors

**Gotcha:** Mismatches between array indices (0-based) and problem constraints (1-based, or number of items/length).
*   **`N` vs `N-1` vs `i` vs `i-1`:** When iterating `i` from 1 to `N`, `weights[i-1]` refers to the `i`-th item. Similarly for strings, `text[i-1]` is the `i`-th character. Be consistent.
*   **`dp` table size:** If you have `N` items/length, your `dp` table for `N` states typically needs size `N+1` if `dp[0]` is a base case and `dp[N]` is the target solution.
*   **Solution:** Draw out a small `dp` table for a simple example and manually trace the indices to ensure they align with the problem statement and your logic.

## 3. Infinity/Max Value Management

**Gotcha:** Using `Infinity` (or a very large number) improperly, especially when dealing with minimums or sums.
*   **`amount + 1` for "infinity":** In problems like Coin Change (minimum coins), if an amount is unreachable, you might want to mark it with a value larger than any possible valid answer. `amount + 1` is a safe choice because the maximum number of coins needed to make amount `X` cannot exceed `X` (if a 1-unit coin exists). If you use `Number.MAX_SAFE_INTEGER`, be wary of potential overflow if you add to it.
*   **`Math.min` with `Infinity`:** `Math.min(X, Infinity)` works as expected.
*   **`Math.max` with `-Infinity`:** `Math.max(X, -Infinity)` works as expected.
*   **Solution:** Always consider the maximum possible valid answer for your problem to choose an appropriate "infinity" value.

## 4. Incorrect State Definition

**Gotcha:** Defining `dp[i]` in a way that doesn't capture all necessary information for future calculations.
*   **Example (House Robber, circular street):** If houses are arranged in a circle, `dp[i]` = max money up to house `i` is not enough. You need to know if the first house was robbed to make a decision about the last. This usually requires solving two separate linear problems (rob 0 to N-2, rob 1 to N-1).
*   **Solution:** Think about what information you *absolutely need* to make a correct decision for `dp[i]` based on `dp[<smaller states>]`. If you're missing info, your state definition or problem decomposition is flawed.

## 5. Incorrect Iteration Order (for Tabulation/Space Optimization)

**Gotcha:** Filling the `dp` table in an order that accesses uncomputed states.
*   **Example (0/1 Knapsack Space-Optimized):** When using a 1D `dp` array for 0/1 Knapsack, the inner loop for capacity `j` must iterate *downwards* (from `W` to `weight`). If it iterates upwards, `dp[j - currentItemWeight]` would already contain the value for the *current* item being considered, effectively allowing the item to be picked multiple times (making it unbounded knapsack, not 0/1).
*   **Solution:** Understand the dependencies. If `dp[i]` depends on `dp[i-1]` and `dp[i-2]`, you must compute `dp[0], dp[1], dp[2], ...` in that order. For a 2D table `dp[i][j]`, if it depends on `dp[i-1][j]` and `dp[i][j-1]`, you typically iterate `i` then `j` (or `j` then `i`). Visualize the DP table and trace which cells are needed for the current cell.

## 6. Recursion Stack Overflow (for Memoization/Brute Force)

**Gotcha:** For very large `N`, a recursive solution (even with memoization) can lead to a "Maximum call stack size exceeded" error in JavaScript.
*   **Example (Fibonacci N=10000):** `fibonacciMemoization(10000)` will likely crash due to deep recursion.
*   **Solution:** For problems with large `N` (e.g., thousands or more), always prefer the iterative (tabulation) approach. If memoization is a requirement, discuss with the interviewer about language limitations or strategies to avoid stack overflow (e.g., iterative memoization, trampolines, though these are more advanced).

## 7. Performance Bottlenecks with Objects/Maps as Keys

**Gotcha:** Using objects or arrays as keys in a JavaScript `Map` (or `Object` as a hash map) for memoization can be slower or problematic than using primitive numbers/strings or 2D arrays.
*   **JavaScript `Map` vs `Object`:** `Map` can use objects as keys, but comparison is by reference. `Object` keys are coerced to strings. For `memo[i][j]`, a 2D array is efficient. For a state like `[index, remainingAmount]`, a custom string key like `"${index},${remainingAmount}"` might be faster than creating actual array/object keys repeatedly for a `Map`.
*   **Solution:** Stick to 2D arrays for multi-dimensional DP states when indices are contiguous integers. For sparse states or complex keys, consider custom string serialization as keys for a `Map` or a plain object.

## 8. Misinterpreting Problem Constraints

**Gotcha:** Not paying attention to whether values can be negative, zero, or if input arrays can be empty.
*   **Empty input arrays:** What should happen if `nums` is empty in House Robber? What if `coins` is empty in Coin Change? Always define behavior for these.
*   **Zero values:** `nums = [0,0,0]` for House Robber should return 0. `amount = 0` for Coin Change should return 0. These are often base cases.
*   **Negative values:** DP problems usually have non-negative values/weights/amounts. If negatives are allowed, the interpretation of "maximum" or "minimum" might change, and DP state definitions may need adjustment.
*   **Solution:** Clarify all constraints with the interviewer. Always test with empty inputs, single element inputs, and inputs containing zeros.

By being mindful of these common edge cases and "gotchas," you can write more robust and correct Dynamic Programming solutions.