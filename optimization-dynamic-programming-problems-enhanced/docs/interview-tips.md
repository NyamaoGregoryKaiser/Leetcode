# Dynamic Programming: Interview Tips & Gotchas

Dynamic Programming (DP) questions are a staple in coding interviews. Mastering them requires not just understanding the algorithms but also a strategic approach to problem-solving and communication.

## Identifying Dynamic Programming Problems

DP problems often have a few tell-tale signs:

*   **Optimal Substructure**: The optimal solution to the problem can be constructed from optimal solutions of its subproblems. (e.g., the longest common subsequence of two strings depends on the LCS of their prefixes).
*   **Overlapping Subproblems**: The same subproblems are solved repeatedly by a recursive algorithm. (e.g., `fib(5)` needs `fib(3)` and `fib(4)`, and `fib(4)` also needs `fib(3)`).
*   **Optimization/Counting**: Questions often ask for:
    *   "Find the maximum/minimum value..."
    *   "Count the number of ways..."
    *   "Is it possible to partition/subset...?"
*   **Constraints**: Often involves sequences, arrays, grids, strings, or trees, with constraints (e.g., "cannot rob adjacent houses", "only move right/down").
*   **Recursive Structure**: If you can define the problem recursively, and the recursion tree shows repeated computations, it's a strong indicator for DP.

**Keywords to look for**: "longest", "shortest", "maximum", "minimum", "count ways", "number of combinations", "subset sum", "knapsack", "grid paths".

## Communicating Your Thought Process (STAR Method)

Interviewers want to understand *how* you think, not just the final answer. Use a structured approach:

1.  **S**ituation: Restate the problem in your own words. Clarify ambiguities (e.g., 0-indexed vs 1-indexed, empty inputs, constraints).
2.  **T**ask: Explain the goal (e.g., "My goal is to find the maximum value...").
3.  **A**pproach:
    *   **Brute Force/Naive Recursion**: Start with the most straightforward (often recursive) solution. Explain its logic, base cases, and recurrence relation.
    *   **Analyze Complexity**: Point out the high time complexity (e.g., O(2^N)) and identify the overlapping subproblems.
    *   **Introduce Memoization**: Explain how caching results of subproblems can optimize the recursive solution (Top-Down DP). Discuss new time/space complexity.
    *   **Introduce Tabulation**: Explain how to convert the memoized approach to an iterative, bottom-up DP solution. Discuss how you'd build the DP table and its order of filling. Analyze time/space complexity.
    *   **Space Optimization (if applicable)**: Can you reduce the DP table's space by only keeping track of a few previous states?
4.  **R**esult: Present your chosen optimal solution. Walk through an example or two with your DP table/variables.

**Crucial Point**: Don't jump straight to the most optimized solution. Show your progression of thought!

## Edge Cases and Gotchas

When designing and testing your DP solution, always consider:

1.  **Empty Inputs**:
    *   Empty array (`nums = []` for House Robber).
    *   Empty strings (`s1 = ""`, `s2 = ""` for LCS).
    *   Zero capacity (`capacity = 0` for Knapsack).
    *   1x1 grid (`m=1, n=1` for Unique Paths).
    *   `n=0` or `n=1` for Fibonacci.
    *   What should the function return? (e.g., 0, 1, error?)

2.  **Single Element/Minimal Inputs**:
    *   `nums = [5]` for House Robber.
    *   `s1 = "A", s2 = "A"`.
    *   `weights = [10], values = [100], capacity = 5` (item doesn't fit).
    *   `weights = [10], values = [100], capacity = 10` (item fits exactly).

3.  **Maximum Constraints**:
    *   How large can `N` be? This determines if O(N^2), O(N*W), or O(N) is acceptable.
    *   Large numbers can cause integer overflow in languages with fixed-size integers (TypeScript uses floating-point numbers for `number`, so large integers might lose precision, though for typical interview ranges, it's usually fine).

4.  **Off-by-One Errors**:
    *   Careful with array indexing (`i` vs `i-1`).
    *   Dimensions of DP table (`N` vs `N+1`).
    *   Loop bounds (`< N` vs `<= N`).

5.  **Initialization of DP Table/Memo Cache**:
    *   What value indicates "uncomputed"? (`-1`, `null`, `undefined`)
    *   What are the base cases? Make sure they are correctly initialized. For sum/count problems, base cases are often 0 or 1. For max/min problems, often 0 (for no items/paths) or a very large/small number.

6.  **Correct Recurrence Relation**:
    *   Double-check that your relation correctly captures the problem logic.
    *   Ensure all necessary dependencies are accounted for.

7.  **Order of Computation (Tabulation)**:
    *   Are you filling the DP table in an order such that when `dp[i]` is computed, all values it depends on (e.g., `dp[i-1]`, `dp[i-2]`, `dp[i-1][j]`, `dp[i][j-1]`) are already correctly calculated?

## Interview Tips

*   **Think out loud**: Verbalize your thought process, even the parts that seem obvious. It shows how you approach problems.
*   **Draw Diagrams**: Use diagrams (recursion trees, DP tables) to explain your logic. This helps both you and the interviewer.
*   **Write clean code**: Use meaningful variable names, add comments for complex logic, and format correctly.
*   **Test with examples**: Walk through your code with small examples to demonstrate correctness and how the DP table/variables change.
*   **Complexity Analysis**: Always provide time and space complexity for each approach (brute force, memoized, tabulated, space-optimized). Explain *why* they are what they are.
*   **Be prepared for variations**: Interviewers might ask "What if...?" (e.g., "What if adjacent houses *can* be robbed?", "What if items in knapsack can be repeated?"). Think about how your recurrence relation or state definition would change.

By practicing these points, you'll not only solve DP problems more effectively but also impress interviewers with your structured problem-solving skills.