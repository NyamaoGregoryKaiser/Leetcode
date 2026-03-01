# Introduction to Dynamic Programming

Dynamic Programming (DP) is a powerful technique for solving optimization problems by breaking them down into smaller, overlapping subproblems and storing the solutions to these subproblems to avoid redundant calculations. It's particularly useful for problems that exhibit two key properties:

1.  **Optimal Substructure**: An optimal solution to the problem can be constructed from optimal solutions of its subproblems. This means that if we can find the best solution for smaller parts of the problem, we can use those to find the best solution for the whole problem.

2.  **Overlapping Subproblems**: The problem can be broken down into subproblems that are reused multiple times. Instead of recomputing the same subproblem repeatedly, DP suggests storing the result of a subproblem once it's computed and reusing it whenever needed.

## When to Use Dynamic Programming

DP is not a "magic bullet" for all problems, but it's an excellent candidate when you encounter:
*   **Optimization problems**: Finding maximum/minimum values, counts, or specific configurations.
*   **Counting problems**: Counting the number of ways to do something.
*   **Decision problems**: Determining if something is possible.
*   Problems that can be naturally expressed using a recursive relation.
*   Problems where a greedy approach might not yield the optimal solution.

## Key Concepts: Memoization vs. Tabulation

There are two primary ways to implement Dynamic Programming:

### 1. Memoization (Top-Down DP)

*   **Concept**: This is essentially recursion with caching. You write a recursive solution, and whenever you compute the result for a subproblem, you store it in a cache (e.g., an array, map, or hash table). Before computing a subproblem, you first check if its result is already in the cache. If it is, you return the cached value; otherwise, you compute it and then store it.
*   **Flow**: Starts from the main problem, recursively breaks it down, and stores results of subproblems as they are encountered.
*   **Pros**:
    *   Often more intuitive to design, as it closely follows the recursive definition of the problem.
    *   Only computes necessary subproblems (if some subproblems are not reachable, they are not computed).
*   **Cons**:
    *   Can involve recursion overhead (function call stack).
    *   Can lead to stack overflow for very deep recursion.

**Example (Fibonacci Memoization):**

```typescript
function fibonacciMemoization(n: number, memo: number[] = []): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    if (memo[n] !== undefined) return memo[n]; // Check cache

    memo[n] = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo); // Compute and store
    return memo[n];
}
```

### 2. Tabulation (Bottom-Up DP)

*   **Concept**: This is an iterative approach where you build up the solution from the base cases to the final solution. You typically define a DP table (usually an array or 2D array) and fill it in a systematic order, ensuring that all dependencies for a subproblem are already computed before computing the subproblem itself.
*   **Flow**: Starts from the smallest possible subproblems, solves them, and uses their solutions to solve progressively larger subproblems until the main problem is solved.
*   **Pros**:
    *   Eliminates recursion overhead, often making it faster and avoiding stack overflow issues.
    *   Can sometimes be optimized for space by only keeping track of the immediately necessary previous states.
*   **Cons**:
    *   Might require more careful thought to define the iteration order and base cases correctly.
    *   Always computes all subproblems up to the target, even if some aren't strictly necessary.

**Example (Fibonacci Tabulation):**

```typescript
function fibonacciTabulation(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;

    const dp: number[] = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]; // Build up from smaller subproblems
    }
    return dp[n];
}
```

## General Steps to Solve a DP Problem

1.  **Identify if it's a DP problem**: Look for optimal substructure and overlapping subproblems. Can you express the problem in terms of smaller versions of itself?
2.  **Define the State**: What are the changing parameters that define a subproblem? This usually translates to the indices of your memoization table or DP array. For example, `dp[i]` for 1D problems, or `dp[i][j]` for 2D problems.
3.  **Formulate the Recurrence Relation**: Write down the mathematical relationship between the solution of a subproblem and its smaller subproblems. This is the heart of the DP solution.
4.  **Identify Base Cases**: What are the smallest, simplest subproblems whose solutions are known without further recursion? These are your stopping conditions.
5.  **Choose an Approach**:
    *   **Memoization (Top-Down)**: Implement the recursive relation and add caching.
    *   **Tabulation (Bottom-Up)**: Initialize the DP table with base cases and iterate to fill it based on the recurrence relation.
6.  **Determine Order of Computation (for Tabulation)**: Ensure that when you compute `dp[i]`, all `dp[j]` values it depends on (e.g., `dp[i-1]`, `dp[i-2]`) are already computed.
7.  **Optimize Space (Optional but Recommended)**: Can you reduce the space complexity by noticing that `dp[i]` only depends on a few previous `dp` states (e.g., `dp[i-1]` and `dp[i-2]`)? If so, you might be able to use a constant number of variables instead of an entire array.

By following these steps, you can systematically approach and solve a wide range of Dynamic Programming problems.