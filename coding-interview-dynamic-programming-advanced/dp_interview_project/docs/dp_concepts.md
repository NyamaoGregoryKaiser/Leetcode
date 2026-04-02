```markdown
# Dynamic Programming Concepts

Dynamic Programming (DP) is an algorithmic technique for solving complex problems by breaking them down into simpler subproblems. It is applicable to problems that exhibit two key characteristics: **Optimal Substructure** and **Overlapping Subproblems**.

## What is Dynamic Programming?

At its core, Dynamic Programming is about *optimizing* recursive solutions by caching the results of subproblems. When the same subproblem is encountered multiple times, instead of recomputing its solution, we retrieve it from storage. This dramatically reduces computation time from exponential to polynomial.

### Key Characteristics:

1.  **Optimal Substructure:**
    *   A problem has optimal substructure if an optimal solution to the problem can be constructed from optimal solutions of its subproblems.
    *   **Example:** The shortest path between two nodes in a graph has optimal substructure. If the shortest path from A to C goes through B, then the part of the path from A to B must be the shortest path from A to B.
    *   **In DP:** This means that the optimal solution for `dp[i]` depends on the optimal solutions for `dp[i-1]`, `dp[i-2]`, etc.

2.  **Overlapping Subproblems:**
    *   A problem has overlapping subproblems if solving it recursively requires solving the same subproblems repeatedly.
    *   **Example:** In the naive recursive calculation of Fibonacci numbers (`F(n) = F(n-1) + F(n-2)`), `F(n-2)` is computed multiple times (e.g., `F(5)` calls `F(4)` and `F(3)`; `F(4)` calls `F(3)` and `F(2)` - `F(3)` is computed twice).
    *   **In DP:** This is where memoization or tabulation comes in. We store the result of each subproblem the first time it's computed, and reuse it whenever needed.

## Dynamic Programming Paradigms

There are two primary ways to implement a Dynamic Programming solution:

### 1. Memoization (Top-Down DP)

*   **Approach:** This is essentially recursion with caching. You solve the problem recursively, but before computing a subproblem, you check if its solution is already in a cache (often a dictionary or array). If it is, return the cached value. Otherwise, compute it, store it in the cache, and then return it.
*   **Direction:** Starts from the "top" (the main problem) and breaks it down into subproblems, solving them as they are encountered.
*   **Structure:** Often implemented using a recursive function with a global or closure-scoped cache. Python's `functools.lru_cache` is a convenient built-in for memoization.
*   **Advantages:**
    *   Often more intuitive to design, as it closely mirrors the brute-force recursive definition.
    *   Only computes subproblems that are actually needed (lazy evaluation).
*   **Disadvantages:**
    *   Can suffer from recursion depth limits for very large inputs.
    *   Requires managing recursion stack.

#### Visual Diagram (Fibonacci with Memoization)

```
        fib(5)
       /      \
    fib(4)     fib(3)
   /    \     /    \
fib(3) fib(2) fib(2) fib(1)
 |      |     |
 (cached) (cached) (base case)
```
In this diagram, `fib(3)` and `fib(2)` are computed multiple times in a naive recursion, but with memoization, they would be computed once and their results reused.

### 2. Tabulation (Bottom-Up DP)

*   **Approach:** This is an iterative approach. You solve the smallest subproblems first and store their solutions in a table (usually an array or 2D array). Then, you use these solutions to build up solutions for larger subproblems until you reach the solution for the original problem.
*   **Direction:** Starts from the "bottom" (base cases) and iteratively builds up to the "top" (the final solution).
*   **Structure:** Typically implemented with loops filling an array (the DP table).
*   **Advantages:**
    *   Avoids recursion overhead and stack limits.
    *   Often more efficient in terms of constant factors for time and space.
    *   Easier to reason about space optimization as you explicitly control the DP table.
*   **Disadvantages:**
    *   Can be less intuitive to formulate the iterative loop structure initially.
    *   May compute solutions to subproblems that are not strictly necessary for the final answer if the problem has specific "paths" rather than a full dependency graph.

#### Visual Diagram (Fibonacci with Tabulation)

```
DP Table (F[i]):
Index: 0  1  2  3  4  5
Value: 0  1  1  2  3  5

Steps:
1. Initialize F[0]=0, F[1]=1 (Base Cases)
2. For i from 2 to N:
   F[i] = F[i-1] + F[i-2]
   (e.g., F[2] = F[1]+F[0] = 1+0=1)
   (e.g., F[3] = F[2]+F[1] = 1+1=2)
   ...
   (e.g., F[5] = F[4]+F[3] = 3+2=5)
```
The table is filled sequentially, leveraging previously computed values.

### Space Optimization

Many tabulation solutions can be further optimized for space. If `dp[i]` only depends on a fixed number of previous states (e.g., `dp[i-1]` and `dp[i-2]`), you don't need to store the entire DP table. Instead, you can use a constant number of variables to hold only the necessary previous states.

#### Visual Diagram (Fibonacci Space Optimization)

```
Current: prev2, prev1
Loop:
1. next_fib = prev1 + prev2
2. prev2 = prev1
3. prev1 = next_fib

Initial: prev2=0, prev1=1 (for F(0), F(1))

Iteration for F(2):
    next_fib = 1 + 0 = 1
    prev2 = 1
    prev1 = 1
Current state: prev2=1, prev1=1 (for F(1), F(2))

Iteration for F(3):
    next_fib = 1 + 1 = 2
    prev2 = 1
    prev1 = 2
Current state: prev2=1, prev1=2 (for F(2), F(3))

...and so on.
```

## When to use DP?

DP is typically used for optimization problems or counting problems where the problem can be broken down into subproblems, and those subproblems are revisited multiple times.

Look for:
*   **Recursive structure:** Can the problem be defined in terms of smaller instances of itself?
*   **"Find the minimum/maximum of..."** or **"Count the number of ways..."** type questions.
*   Constraints that suggest polynomial time complexity (e.g., N up to a few thousands, implying N^2 or N^3 solution is acceptable).

Understanding these core concepts is the first step to mastering Dynamic Programming. The provided algorithms in this project demonstrate these paradigms in practice.
```