# Dynamic Programming: Edge Cases, Variations, and Interview Tips

This document provides insights into common variations of DP problems, crucial edge cases to consider, and strategies for performing well in a DP-focused coding interview.

## General Edge Cases for DP Problems

When tackling any DP problem, always consider the following edge cases:

*   **Empty input**: What if a string is empty, a list is empty, or a set of items is empty?
    *   *Example*: LCS of `""` and `"ABC"` should be `0`. Knapsack with `[]` items should yield `0` value.
*   **Zero values**: What if the target amount is `0` (Coin Change), or capacity is `0` (Knapsack)?
    *   *Example*: Minimum coins for `amount=0` is `0`. Ways to make `amount=0` is `1` (by taking no coins).
*   **Single element/item**: How does the algorithm behave with just one element in the input?
    *   *Example*: Fibonacci(1) = 1. LCS("A", "A") = 1.
*   **All elements fail conditions**: What if no solution is possible? (e.g., no coins can make the amount, all knapsack items are too heavy).
    *   *Example*: Coin Change for `amount=3` with `coins=[2]` should return `-1`.
*   **Extremely large inputs**: While brute force fails, how do memoized/tabulated solutions perform? Check for potential integer overflows if sums/counts can become very large.
*   **Constraints**: Be aware of the maximum size of inputs (`N`, `M`, `Capacity`, `Amount`) to estimate time/space complexity and prevent timeouts/memory limits.

## Problem-Specific Variations & Edge Cases

### 1. Fibonacci Sequence

*   **Standard Problem**: Calculate F(n).
*   **Variations**:
    *   **Tribonacci/N-bonacci**: Each number is sum of previous 3 (or N) numbers.
        *   `T(n) = T(n-1) + T(n-2) + T(n-3)`
        *   DP approach extends easily: `dp[i] = dp[i-1] + dp[i-2] + dp[i-3]`. Space optimization would need to store the last N values.
    *   **Fibonacci with modulo**: If `n` is very large, the result can exceed standard integer limits. You might be asked to return `F(n) % M`.
        *   Apply modulo at each addition step: `dp[i] = (dp[i-1] + dp[i-2]) % M`.
*   **Edge Cases**:
    *   `n = 0`: `F(0) = 0`.
    *   `n = 1`: `F(1) = 1`.
    *   Negative `n`: Usually invalid input, or defined as `F(-n) = (-1)^(n+1) * F(n)`, but rarely seen in interviews. Best to raise an error for negative inputs unless specified.

### 2. 0/1 Knapsack Problem

*   **Standard Problem**: Max value within capacity, each item taken once.
*   **Variations**:
    *   **Unbounded Knapsack**: Items can be taken multiple times.
        *   *Difference in Tabulation*: Inner loop for capacity (`w`) runs from left-to-right (`range(current_weight, capacity + 1)`), allowing `dp[w - current_weight]` to use the *current* item's value if it's optimal (i.e., multiple times). For 0/1, it's `range(capacity, current_weight - 1, -1)`.
    *   **Bounded Knapsack**: Each item `i` has `k_i` available copies.
        *   Can be converted to 0/1 by "unrolling" items (creating `k_i` distinct items) or using more complex DP state. Binary splitting (representing `k_i` as powers of 2) is another technique.
    *   **Count Subsets/Partitions**: Given target sum `S`, can it be formed from a subset? How many subsets form `S`? This is essentially a knapsack problem where values = weights = 1.
        *   `dp[s]` could be boolean (is `s` reachable?) or count (how many ways to reach `s`?).
*   **Edge Cases**:
    *   `weights` or `values` are empty: Max value is `0`.
    *   `capacity = 0`: Max value is `0`.
    *   `capacity` is less than all item weights: Max value is `0`.
    *   Negative weights/values: Typically not allowed in standard Knapsack. If allowed, problem definition needs careful clarification.

### 3. Longest Common Subsequence (LCS)

*   **Standard Problem**: Find length of LCS between two strings.
*   **Variations**:
    *   **Reconstruct LCS**: As shown in the solution, backtrack through the DP table.
    *   **Shortest Common Supersequence (SCS)**: The shortest string that has both `s1` and `s2` as subsequences. `len(SCS) = len(s1) + len(s2) - len(LCS)`.
    *   **Edit Distance / Levenshtein Distance**: Minimum operations (insert, delete, replace) to transform one string into another. Similar 2D DP structure, different recurrence.
    *   **Longest Palindromic Subsequence**: LCS of `s` and `reverse(s)`.
*   **Edge Cases**:
    *   Empty strings: LCS length `0`.
    *   Identical strings: LCS length equals string length.
    *   No common characters: LCS length `0`.
    *   Case sensitivity: Clarify if 'A' == 'a'.

### 4. Coin Change Problem

*   **Standard Problem 1: Minimum Coins**: Find minimum coins for an amount.
*   **Standard Problem 2: Number of Ways**: Find number of combinations (order doesn't matter) for an amount.
*   **Variations**:
    *   **Order matters (Permutations)**: If `(1,2)` is different from `(2,1)` for amount 3.
        *   *Difference in Tabulation for Ways*: Outer loop iterates through `amount`, inner loop iterates through `coins`. This effectively means `dp[i]` sums up results from `dp[i - c]` for all `c` *after* all previous `c'` have contributed to `dp[i]`, counting permutations.
    *   **Limited Coin Supply**: If each coin has a count (e.g., 3 quarters, 2 dimes). This turns into a more complex 0/1 Knapsack style problem.
*   **Edge Cases**:
    *   `amount = 0`: Min coins = `0`, Ways = `1`.
    *   `coins` list is empty: Min coins = `-1` (or infinity), Ways = `0` (unless amount is 0, then 1).
    *   `amount < 0`: Invalid, return -1/0/raise error.
    *   `amount` cannot be made: Min coins = `-1`, Ways = `0`.
    *   Coin denominations include `0` or negative values: Invalid, assume positive.

## Interview Tips for Dynamic Programming

1.  **Don't Jump to DP Immediately**: First, try to solve the problem with a simple recursive (brute-force) approach. This helps you define the state and recurrence relation naturally.
2.  **Identify Overlapping Subproblems**: Once you have a recursive solution, draw a recursion tree. If you see repeated calls with the same arguments, it's a strong indicator for DP.
3.  **Identify Optimal Substructure**: Can the optimal solution for the whole problem be built from optimal solutions of its subproblems?
4.  **Memoize Your Recursion (Top-Down First)**: This is often the easiest transition from brute force. Add a cache to your recursive function. Explain that you're trading space for time.
5.  **Convert to Tabulation (Bottom-Up Next)**: Once you have a memoized solution, think about how to fill the DP table iteratively. This removes recursion overhead and stack depth issues.
    *   Determine the dimensions of the DP table based on your state variables.
    *   Initialize base cases.
    *   Figure out the correct iteration order for your loops.
6.  **Optimize Space**: After a correct tabulation solution, look for dependencies. If `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, you can optimize space. Be careful with 1D DP arrays and inner loop direction (especially for Knapsack variations).
7.  **Talk Through Your Thought Process**:
    *   Explain the brute force idea.
    *   Point out overlapping subproblems and optimal substructure.
    *   Define your DP state (`dp[i]` means..., `dp[i][j]` means...).
    *   State your recurrence relation clearly.
    *   Walk through base cases.
    *   Explain the time and space complexity at each stage (recursive, memoized, tabulated, space-optimized).
8.  **Draw Diagrams**: For 2D DP problems (Knapsack, LCS), drawing a small DP table and walking through how values are filled can be immensely helpful to both you and the interviewer. (See `diagrams.txt`).
9.  **Practice Common Patterns**: The more common DP problems you solve, the easier it becomes to recognize the pattern and apply the correct technique.

---
[Return to README.md](../README.md)
[Check out DP Concepts](dp_concepts.md)
[Explore DP Diagrams](diagrams.txt)
---