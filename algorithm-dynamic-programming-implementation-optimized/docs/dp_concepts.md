# Dynamic Programming Concepts

Dynamic Programming (DP) is an algorithmic technique for solving an optimization problem by breaking it down into simpler subproblems and storing the solutions to those subproblems to avoid recomputing them. It's applicable when problems have two key properties:

1.  **Optimal Substructure**: An optimal solution to the problem contains optimal solutions to subproblems.
    *   *Example*: The shortest path from A to C through B contains the shortest path from A to B.

2.  **Overlapping Subproblems**: The same subproblems are encountered multiple times when solving the problem recursively.
    *   *Example*: Calculating `Fib(5)` requires `Fib(4)` and `Fib(3)`. `Fib(4)` requires `Fib(3)` and `Fib(2)`. `Fib(3)` is computed twice.

## How to Identify a DP Problem

Look for problems that involve:
*   Finding the maximum/minimum/count of something.
*   Sequences (strings, arrays, lists).
*   Grids or paths.
*   Decision-making (e.g., include/exclude an item).
*   Recursive structures where subproblems repeat.

## Two Main Approaches to Dynamic Programming

There are two primary ways to implement a DP solution:

### 1. Memoization (Top-Down)

*   **Approach**: This is a "top-down" approach where we solve the problem recursively, starting from the main problem and breaking it down into subproblems. The results of subproblems are stored (memoized) in a cache (e.g., a dictionary or array) so that if the same subproblem is encountered again, we can simply return the cached result instead of recomputing it.
*   **How it works**:
    1.  Define the recursive relation for the problem.
    2.  Create a cache (e.g., `memo = {}` or `memo = [-1] * size`).
    3.  In the recursive function, check if the current state's result is already in the cache. If yes, return it.
    4.  Otherwise, compute the result using the recursive relation, store it in the cache, and then return it.
*   **Pros**:
    *   Often easier to derive from a naive recursive solution.
    *   Only necessary subproblems are solved.
    *   Natural fit for problems with irregular dependencies between subproblems.
*   **Cons**:
    *   Can suffer from recursion depth limits (stack overflow) for very large inputs.
    *   Overhead of recursive calls.

### 2. Tabulation (Bottom-Up)

*   **Approach**: This is a "bottom-up" approach where we solve the problem iteratively, starting from the smallest, most fundamental subproblems and building up to the solution of the main problem. We typically fill a table (array) with solutions to subproblems in a systematic order.
*   **How it works**:
    1.  Identify the states and dimensions of the DP table (e.g., `dp[i]`, `dp[i][j]`).
    2.  Initialize the base cases in the DP table.
    3.  Iteratively fill the table using the recurrence relation, ensuring that all dependencies for a state `dp[i]` are already computed before `dp[i]` is computed.
    4.  The final answer is usually at a specific cell in the table (e.g., `dp[n]`, `dp[m][n]`).
*   **Pros**:
    *   No recursion overhead, generally faster in practice.
    *   Avoids recursion depth limits.
    *   Easier to optimize space complexity.
*   **Cons**:
    *   Can be harder to conceptualize the iteration order.
    *   May compute unnecessary subproblems if the problem has very sparse dependencies.

### 3. Space Optimization (from Tabulation)

*   **Approach**: After implementing tabulation, sometimes you notice that to compute the current state `dp[i]`, you only need results from a few previous states (e.g., `dp[i-1]`, `dp[i-2]`). In such cases, the entire `dp` table doesn't need to be stored. You can reduce the space complexity, often from O(N) or O(N\*M) to O(1) or O(M).
*   **How it works**:
    1.  Analyze the recurrence relation in the tabulation approach.
    2.  Identify which previous `dp` states are absolutely necessary for the current computation.
    3.  Replace the `dp` array (or 2D array) with a few variables (for O(1) optimization) or a smaller array (for O(M) optimization).
    4.  Pay close attention to the order of updates (e.g., for 0/1 Knapsack, iterating columns from right to left is crucial for 1D space optimization).
*   **Pros**: Significant memory savings, especially for large inputs.
*   **Cons**: Can be tricky to implement correctly, especially with 1D DP arrays and dependencies.

## Steps to Solve a DP Problem

1.  **Identify if it's a DP problem**: Check for optimal substructure and overlapping subproblems.
2.  **Define the state**: What are the changing parameters in your recursive function? These will form the dimensions of your DP table/memoization cache. E.g., `dp[i]`, `dp[i][j]`.
3.  **Formulate the recurrence relation**: Express the solution for the current state in terms of solutions to smaller subproblems. This is the core of your DP solution.
    *   *Example (Fibonacci)*: `dp[i] = dp[i-1] + dp[i-2]`
    *   *Example (Knapsack)*: `dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])`
4.  **Identify the base cases**: What are the smallest subproblems for which the solution is known directly, without further recursion/calculation?
    *   *Example (Fibonacci)*: `dp[0]=0`, `dp[1]=1`
    *   *Example (Knapsack)*: `dp[0][w]=0`, `dp[i][0]=0`
5.  **Choose an approach**: Memoization (Top-Down) or Tabulation (Bottom-Up).
    *   If using memoization, implement the recursive function with a cache.
    *   If using tabulation, define the size of the DP table, initialize base cases, and set up loops to fill the table iteratively.
6.  **Consider space optimization**: If possible, reduce the space complexity of your tabulation solution.

## Common DP Patterns / Problem Types

*   **Fibonacci-style**: Simple linear recurrence.
*   **0/1 Knapsack**: Decision for each item (take or leave).
*   **Unbounded Knapsack / Coin Change**: Items can be taken multiple times.
*   **Longest Common Subsequence (LCS) / Edit Distance**: String manipulation problems, usually 2D DP.
*   **Matrix Chain Multiplication / Burst Balloons**: Interval DP, often `dp[i][j]` representing a subproblem on a range.
*   **Grid Problems (Unique Paths, Min Path Sum)**: `dp[i][j]` depends on `dp[i-1][j]` and `dp[i][j-1]`.
*   **Subset Sum / Partition Problems**: Often `dp[sum]` representing if `sum` is possible.

Mastering these core patterns will equip you to tackle a wide range of DP problems in interviews.

---
[Return to README.md](../README.md)
[Check out DP Diagrams](diagrams.txt)
[Explore Problem Variations](problem_variations.md)
---