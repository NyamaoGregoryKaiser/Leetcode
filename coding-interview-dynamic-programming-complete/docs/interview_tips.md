# Dynamic Programming: Interview Tips and Variations

This document offers practical advice for identifying and solving Dynamic Programming problems in a coding interview, covers common pitfalls, and suggests variations to the problems presented.

## How to Identify a Dynamic Programming Problem

Look for these characteristics:

1.  **Optimization or Counting:**
    *   "Find the **maximum/minimum** value..." (e.g., Knapsack, Coin Change)
    *   "Count the number of **ways** to do something..." (e.g., unique paths, combinations)
    *   "Is it **possible** to achieve X?" (often can be reframed as min/max/count)
2.  **Overlapping Subproblems:**
    *   If you draw a recursion tree, do you see the same sub-problems being computed multiple times? (e.g., `fib(5)` needs `fib(3)` and `fib(4)`. `fib(4)` needs `fib(2)` and `fib(3)` - `fib(3)` is repeated.)
3.  **Optimal Substructure:**
    *   Can the optimal solution to the problem be constructed from optimal solutions to its subproblems?
    *   If `LCS(X, Y)` is optimal, then `LCS(X[1:], Y)` or `LCS(X, Y[1:])` or `LCS(X[1:], Y[1:])` must also be optimal.
4.  **Sequential/Positional Dependence:**
    *   Problems involving sequences (strings, arrays, linked lists) or grids often lend themselves to DP. The decision at one position affects future positions.

## Step-by-Step Approach to Solving DP Problems

1.  **Understand the Problem (and Brute Force):**
    *   Clearly define the inputs, outputs, and constraints.
    *   Try to solve a small instance manually.
    *   Formulate a brute-force recursive solution. This helps establish the structure, parameters, and base cases. This initial solution will likely be exponential.

2.  **Identify Overlapping Subproblems & Optimal Substructure:**
    *   Run the brute-force recursion with a small input and trace the calls. Do you see redundant calls?
    *   Consider if the solution to a larger problem depends on the optimal solutions of its smaller parts.

3.  **Define the DP State:**
    *   What information do you need to store to solve future subproblems? This becomes your `dp` table/array dimensions.
    *   For example:
        *   `dp[i]` for problems depending on a single variable (e.g., `fibonacci(i)`, `coin_change(i)`).
        *   `dp[i][j]` for problems depending on two variables (e.g., `knapsack(i, j)`, `lcs(i, j)`).
        *   Sometimes `dp[i][j][k]` etc.

4.  **Formulate the Recurrence Relation:**
    *   How does `dp[current_state]` relate to `dp[previous_states]`?
    *   This is the core of your DP solution. It defines how to transition from smaller subproblems to larger ones.
    *   Think about the choices you can make at each step and how they affect the `dp` value.

5.  **Identify Base Cases:**
    *   What are the smallest, trivial instances of your subproblems? These are the starting points for your `dp` table or the stopping conditions for recursion.

6.  **Choose an Approach (Memoization vs. Tabulation):**
    *   **Memoization (Top-Down):** Start from the main problem, make recursive calls, and store results in a cache. Often more intuitive if you already have a recursive solution.
        *   Pros: Only computes reachable states; easier to translate direct recursion.
        *   Cons: Recursion overhead, potential for stack overflow with deep recursion.
    *   **Tabulation (Bottom-Up):** Build the `dp` table iteratively from base cases to the final solution.
        *   Pros: No recursion overhead, guaranteed to avoid stack overflow, often slightly faster due to cache locality.
        *   Cons: Requires careful thought on iteration order; might compute unreachable states.

7.  **Implement and Optimize:**
    *   Write the code based on your chosen approach.
    *   **Space Optimization:** After getting a working solution, consider if you can reduce space complexity. Often, if `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, you might reduce an `O(N)` space to `O(1)`. For 2D DP tables, if `dp[i][j]` only depends on `dp[i-1][...]`, you can often reduce `O(N*M)` to `O(M)`.

8.  **Test Thoroughly:**
    *   Test base cases, small examples, typical cases, and edge cases.
    *   Compare results with brute force (for small inputs) or known solutions.

## Edge Cases and Gotchas

*   **Empty Inputs:** Empty strings, empty arrays, zero capacity.
*   **Zero/Negative Values:** Zero amount, zero weight, negative numbers (if applicable).
*   **Single Element Inputs:** Arrays/strings with one element.
*   **Large Inputs:** Consider `int` overflow (Python handles large ints automatically, but other languages might not).
*   **Initialization:** Correctly initializing your `dp` table (e.g., `float('inf')` for minimum problems, `0` for count/maximum problems).
*   **Index Out of Bounds:** Off-by-one errors when translating string/array indices to `dp` table indices (e.g., `text1[i-1]` for `dp[i][j]`).
*   **Iteration Order:** Crucial for tabulation. For 0/1 Knapsack with space optimization, iterating capacity backwards is essential. For unbounded Knapsack or Coin Change, iterating forwards is typically correct.
*   **Floating Point Precision:** If problems involve division or floating point numbers, be mindful of precision issues.

## Interview Tips

*   **Talk Through Your Thought Process:** Don't just start coding. Explain your brute-force idea, identify DP properties, define the state, and derive the recurrence.
*   **Start with Memoization:** If you're stuck, writing the recursive brute force and then adding `lru_cache` (or a manual memoization dict) is a quick way to get an O(N*M) solution. You can then discuss converting to tabulation.
*   **Whiteboard/Pseudocode First:** Especially for 2D DP, drawing the DP table and working through a few cells can help clarify the recurrence.
*   **Analyze Complexity:** Always state time and space complexity for your solutions. Discuss tradeoffs.
*   **Ask Clarifying Questions:** About constraints, input types, expected output format.
*   **Handle Edge Cases:** Explicitly consider and test them.

## Problem Variations

### Fibonacci Sequence
*   **Fibonacci with a twist:** What if `F(n) = F(n-1) + F(n-3)`? (Adjust recurrence and base cases).
*   **Tribonacci Sequence:** `T(n) = T(n-1) + T(n-2) + T(n-3)`.
*   **Nth Ugly Number:** Find the Nth number whose prime factors are only 2, 3, or 5. (Requires merging sorted lists/pointers).

### 0/1 Knapsack Problem
*   **Unbounded Knapsack / Coin Change (Max Value):** Infinite supply of items. (Iteration order for capacity changes - forward).
*   **Subset Sum Problem:** Given a set of numbers and a target sum, determine if there's a subset that sums to the target. (Similar DP structure, boolean `dp` table).
*   **Partition Equal Subset Sum:** Can an array be partitioned into two subsets with equal sums? (Relies on Subset Sum).
*   **Minimum Subset Sum Difference:** Partition an array into two subsets such that the absolute difference between their sums is minimized.
*   **Target Sum:** Assign `+` or `-` to each number to achieve a target sum. (Can be solved with a variation of subset sum).
*   **Rod Cutting:** Maximize profit by cutting a rod into pieces of certain lengths and selling them. (Unbounded Knapsack variant).

### Longest Common Subsequence (LCS)
*   **Longest Common Substring:** Consecutive characters. (Slightly different recurrence, `dp[i][j]` resets to 0 on mismatch).
*   **Shortest Common Supersequence:** Find the shortest string that has both `text1` and `text2` as subsequences. (`len(text1) + len(text2) - LCS_length`).
*   **Edit Distance / Levenshtein Distance:** Minimum operations (insert, delete, replace) to transform one string into another. (Classic 2D DP).
*   **Longest Palindromic Subsequence:** Find the longest subsequence that is also a palindrome. (Equivalent to `LCS(s, reverse(s))`).
*   **Longest Increasing Subsequence (LIS):** The elements don't need to be consecutive, but their relative order must be maintained. (Often `O(N^2)` DP or `O(N log N)` with patience sorting).

### Coin Change Problem (Minimum Coins)
*   **Coin Change (Number of Ways):** How many different combinations of coins can make up the amount? (Different recurrence relation, sum up ways).
*   **Combination Sum IV:** Given an array of distinct integers and a target, return the number of possible combinations that sum to target. (Order matters for combinations).
*   **Minimum Cost Climbing Stairs:** Given an array `cost` where `cost[i]` is the cost of `i`-th step. You can either climb one or two steps. Find minimum cost to reach the top.
*   **Word Break:** Given a string `s` and a dictionary of words `wordDict`, determine if `s` can be segmented into a space-separated sequence of one or more dictionary words.

By understanding these patterns, practicing the core problems, and being able to adapt to variations, you'll be well-prepared for DP questions in technical interviews.